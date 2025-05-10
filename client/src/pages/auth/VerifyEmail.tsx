import { useState, useRef, useEffect } from "react";
import {
    Container,
    Form,
    Button,
    Card,
    Alert,
    Row,
    Col,
    FormControl
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { resendVerificationCodeUrl, verifyEmailUrl } from "../../data/urls";



const VerifyEmail = () => {
    const { token: urlToken } = useParams<{ token: string }>();
    const [token, setToken] = useState<string>(urlToken || "");
    const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const [message, setMessage] = useState<string>("");
    const [timeLeft, setTimeLeft] = useState<number>(300); // 5-minute countdown
    const [canResend, setCanResend] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (urlToken) {
            setToken(urlToken);
        } else {
            setMessage("Invalid or missing verification token.");
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [urlToken]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return; // Allow only numbers

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        const verificationCode = code.join("");

        if (!token) {
            setMessage("Verification token is missing");
            return;
        }

        try {
            const res = await fetch(verifyEmailUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ verificationToken:token, code: verificationCode }),
            });

            if (!res.ok) {
                throw new Error("Verification failed");
            }

            const data = await res.json();
            localStorage.setItem('netlyLoginToken', data.token);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setMessage("Verification failed. Please try again.");
        }
    };

    const handleResendCode = async () => {
        if (!token) {
            setMessage("Cannot resend code without a valid token");
            return;
        }

        setCanResend(false);
        setTimeLeft(300);

        try {
            const res = await fetch(resendVerificationCodeUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ verificationToken:token }),
            });

            const data = await res.json();
            if (data.token) {
                setToken(data.token);
            }
            setMessage(data.message || "Verification code resent successfully");
        } catch (err) {
            console.error(err);
            setMessage("Failed to resend verification code");
        }
    };

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Card className="p-4 w-100" style={{ maxWidth: '400px' }}>
                <Card.Body>
                    <Card.Title className="text-center mb-4">Verify Your Email</Card.Title>

                    {message && (
                        <Alert variant={message.toLowerCase().includes("invalid") ? "danger" : "info"} className="text-center">
                            {message}
                        </Alert>
                    )}

                    {token ? (
                        <Form onSubmit={handleVerify}>
                            <Row className="justify-content-center mb-4">
                                {code.map((digit, index) => (
                                    <Col xs={2} key={index} className="px-1">
                                        <FormControl
                                            ref={(el: HTMLInputElement) => {
                                                if (el) {
                                                    inputRefs.current[index] = el;
                                                }
                                            }}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                            onKeyDown={(e: any) => handleKeyDown(index, e)}
                                            className="text-center"
                                        />
                                    </Col>
                                ))}
                            </Row>

                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100 mb-3"
                                disabled={code.some(c => c === "")}
                            >
                                Verify
                            </Button>
                        </Form>
                    ) : (
                        <Alert variant="danger" className="text-center">
                            Missing verification token
                        </Alert>
                    )}

                    <p className="text-center text-muted mb-2">
                        {canResend
                            ? "Didn't receive a code?"
                            : `Resend code in ${formatTime(timeLeft)}`}
                    </p>

                    <Button
                        variant={canResend ? "outline-primary" : "outline-secondary"}
                        onClick={handleResendCode}
                        disabled={!canResend || !token}
                        className="w-100"
                    >
                        Resend Code
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default VerifyEmail;