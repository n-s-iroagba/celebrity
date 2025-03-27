import React, { useMemo, useRef, useState } from "react";
import SearchBar from "../../components/SearchBar";
import Celebrity from "../../types/Celebrity";
import SearchPic from "../../components/SearchPic";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/useUserContext";
import {
  Button,
  Form,
  InputGroup,
  Modal,
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import useFetchAllCelebrities from "../../hooks/useFetchAllCelebrities";
import { fanSignUpUrl } from "../../data/urls";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import countryList from "react-select-country-list";
import AuthOption from "../../components/AuthOption";
import ErrorMessage from "../../components/ErrorMessage";
import Logo from "../../components/Logo";
import MiniFooter from "../../components/MiniFooter";
import Select from "react-select";
import { Fan } from "../../types/Fan";
import { OptionalIdProps } from "../../types/idProps";

const Shoutout: React.FC<OptionalIdProps>= (id) => {
  const [fanData, setFanData] = useState<Fan>({
    firstName: "",
    surname: "",
    dateOfBirth: null,
    country: "",
    gender: "",
    email: "",
    whatsappNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [showRecordingModal, setShowRecordingModal] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );
  const options = useMemo(() => countryList().getData(), []);
  const [startDate, setStartDate] = useState(new Date());
  const { celebrities, loading, error } = useFetchAllCelebrities();
  const [query, setQuery] = useState("");
  const [selectedCelebrity, setSelectedCelebrity] = useState<Celebrity | null>(
    null
  );
  const [message, setMessage] = useState("");
  const [mediaType, setMediaType] = useState<"text" | "video" | "voice" | "">(
    ""
  );
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedMedia, setRecordedMedia] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const videoPreviewRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();

  const { isSignedIn } = useUserContext();

  const showPassword = () => {
    setPasswordType((prev) => (prev === "text" ? "password" : "text"));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFanData({ ...fanData, [event.target.name]: event.target.value });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fanData.firstName.trim())
      newErrors.firstName = "First Name is required.";
    if (!fanData.surname.trim()) newErrors.surname = "Surname is required.";
    if (!fanData.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required.";
    if (!fanData.country) newErrors.country = "Country is required.";
    if (!fanData.gender) newErrors.gender = "Gender is required.";
    if (!fanData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(fanData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!fanData.password) {
      newErrors.password = "Password is required.";
    } else if (fanData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (fanData.password !== fanData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const startRecording = async () => {
    setShowRecordingModal(true);
    setIsRecording(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: mediaType === "video",
        audio: true,
      });

      mediaStreamRef.current = stream;

      if (mediaType === "video" && videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
        videoPreviewRef.current.play();
      }

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: mediaType === "video" ? "video/webm" : "audio/webm",
        });
        setRecordedMedia(URL.createObjectURL(blob));
        setShowRecordingModal(false);
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      console.error("Error accessing media devices:", error);
      setShowRecordingModal(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const discardRecording = () => {
    setRecordedMedia(null);
    recordedChunksRef.current = [];
    setShowRecordingModal(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMediaFile(file);
      setRecordedMedia(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCelebrity) {
      alert("Please select a celebrity.");
      return;
    }

    if (!mediaType) {
      alert("Please select a media type.");
      return;
    }

    const formData = new FormData();
    formData.append("celebrity", JSON.stringify(selectedCelebrity));
    formData.append("message", message);
    formData.append("mediaType", mediaType);

    if (mediaFile) {
      formData.append("mediaFile", mediaFile);
    }

    try {
      if (!isSignedIn) {
        if (!validateForm()) {
          return;
        }

        setSubmitting(true);
        setErrorMessage("");

        const {
          firstName,
          surname,
          dateOfBirth,
          country,
          gender,
          email,
          password,
          whatsappNumber,
        } = fanData;

        const fanDataPayload = {
          firstName,
          surname,
          dateOfBirth,
          country,
          gender,
          whatsappNumber,
        };

        const userDataPayload = {
          email,
          password,
        };

        formData.append("fanData", JSON.stringify(fanDataPayload));
        formData.append("userData", JSON.stringify(userDataPayload));
        fetch(fanSignUpUrl, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            navigate(`verify-email/${data}`);
          })
          .catch((error) => {
            setErrorMessage("Sorry an error, occurred try again later");
            console.error("Error sending shoutout:", error);
          });
        return;
      }
      alert("hi");
    } catch (er) {
      setSubmitting(false);
      console.error(er);
    }
  };

  const handleSearchChange = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  const handleSelectCelebrity = (celebrity: Celebrity) => {
    setSelectedCelebrity(celebrity);
    setQuery("");
  };

  const handleMediaTypeChange = (type: "text" | "video" | "voice") => {
    setMediaType(type);
    setMediaFile(null); // Reset media file when changing media type
    setRecordedMedia(null); // Reset recorded media when changing media type
  };

  const createTempCelebrity = (name: string) => {
    const newCelebrity: Celebrity = {
      id: null,
      stageName: name,
      firstName: name.split(" ")[0],
      surname: name.split(" ")[1] || "",
      image: "",
      bio: "",
      isConfirmed: false,
    };
    setSelectedCelebrity(newCelebrity);
    setQuery("");
  };

  const filteredCelebrities = celebrities.filter(
    (celebrity) =>
      celebrity.stageName.toLowerCase().includes(query.toLowerCase()) ||
      celebrity.firstName.toLowerCase().includes(query.toLowerCase()) ||
      celebrity.surname.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) {
    return <div>Loading celebrities...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="md-w-50 px-5">
        <h6 className="mt-3 text-center">
          Connect With Your Favorite Celebrities All Over The World!
        </h6>
        <SearchPic />
        <div className="d-flex justify-content-center text-center py-3">
          <small>
            Kindly search the celebrity you wish to send a shoutout to.
          </small>
        </div>
        <SearchBar
          query={query}
          onQueryChange={handleSearchChange}
          items={filteredCelebrities}
          onSelectItem={handleSelectCelebrity}
          renderItem={(celebrity) => (
            <div className="d-flex align-items-center">
              <img
                src={celebrity.image}
                alt={celebrity.stageName}
                style={{ width: 40, height: 40, borderRadius: "50%" }}
                className="me-3"
              />
              <div>
                <strong>
                  {celebrity.firstName} {celebrity.surname}
                </strong>
                <br />
                <small>{celebrity.stageName}</small>
              </div>
            </div>
          )}
          createEntity={createTempCelebrity}
        />

        {selectedCelebrity && (
          <>
            <p className="mt-3 mb-0">
              <b>
                You picked {selectedCelebrity.firstName}{" "}
                {selectedCelebrity.surname} ({selectedCelebrity.stageName})
              </b>
            </p>
            <Form className="p-2 pb-5">
              <div className="mb-3">
                <Button
                  variant={mediaType === "text" ? "primary" : "outline-primary"}
                  onClick={() => handleMediaTypeChange("text")}
                  className="me-2"
                >
                  Text
                </Button>
                <Button
                  variant={
                    mediaType === "video" ? "primary" : "outline-primary"
                  }
                  onClick={() => handleMediaTypeChange("video")}
                  className="me-2"
                >
                  Video
                </Button>
                <Button
                  variant={
                    mediaType === "voice" ? "primary" : "outline-primary"
                  }
                  onClick={() => handleMediaTypeChange("voice")}
                >
                  Voice Note
                </Button>
              </div>
              <Modal show={showRecordingModal} onHide={discardRecording} centered>
        <Modal.Header closeButton>
          <Modal.Title>Recording {mediaType}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {mediaType === "video" && (
            <video ref={videoPreviewRef} className="w-100" autoPlay muted />
          )}
          {mediaType === "voice" && <Spinner animation="border" />}
          <p>Recording in progress...</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={discardRecording}>
            Discard
          </Button>
          <Button variant="success" onClick={stopRecording}>
            Stop Recording
          </Button>
        </Modal.Footer>
      </Modal>
              {recordedMedia && (
        <div className="mt-3">
          {mediaType === "video" ? (
            <video src={recordedMedia} controls className="w-100" />
          ) : (
            <audio src={recordedMedia} controls />
          )}
          <Button variant="danger" onClick={discardRecording} className="mt-2">
            Discard & Retake
          </Button>
        </div>
      )}

              {mediaType === "text" && (
                <Form.Group className="mb-3" controlId="formMessage">
                  <p className="text-sm text-neutral-950 mb-2">
                    Write a heartfelt message to {selectedCelebrity.firstName}{" "}
                    {selectedCelebrity.surname}
                  </p>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    placeholder="Type your message here..."
                    className="border-black"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Form.Group>
              )}

              {(mediaType === "video" || mediaType === "voice") && (
                <Form.Group className="mb-3" controlId="formMedia">
                  <Form.Label>
                    Upload or Record{" "}
                    {mediaType === "video" ? "Video" : "Voice Note"}
                  </Form.Label>
                  <div className="d-flex flex-column gap-2">
                    {/* File Upload */}
                    <Form.Control
                      type="file"
                      accept={mediaType === "video" ? "video/*" : "audio/*"}
                      onChange={handleFileUpload}
                    />

                    {/* Video Preview */}
                    {mediaType === "video" && (
                      <video
                        ref={videoPreviewRef}
                        style={{
                          width: "100%",
                          display: isRecording ? "block" : "none",
                        }}
                        muted
                      />
                    )}

                    {/* Voice Recording Bar */}
                    {mediaType === "voice" && isRecording && (
                      <div className="mt-3">
                        <ProgressBar
                          now={(recordingTime % 30) * (100 / 30)}
                          label={`${recordingTime}s`}
                        />
                        <small>Recording in progress...</small>
                      </div>
                    )}

                    {/* Record from Camera/Microphone */}
                    <div className="d-flex gap-2">
                      <Button
                        variant={isRecording ? "danger" : "success"}
                        onClick={isRecording ? stopRecording : startRecording}
                      >
                        {isRecording ? "Stop Recording" : "Start Recording"}
                      </Button>
                    </div>


                  </div>
                </Form.Group>
              )}
              {!isSignedIn && (
                <>
                  <div className="auth-wrapper">
                    <div>
                      <AuthOption
                        route={"login"}
                        title={"Already have an account?"}
                        buttonText={"Login"}
                      />
                    </div>
                    <p className="text-sm text-muted text-center">
                      <small>
                        Please kindly sign up. We'll use your email and phone
                        number to send you important information about your
                        request.
                      </small>
                    </p>

                    <Form className="form-wrapper p-2 pb-5">
                      <div className="d-flex justify-content-center my-3">
                        <Logo />
                      </div>
                      <h6 className="text-center">Sign Up</h6>

                      {/* Form fields for fanData */}
                      <Form.Group className="mb-3" controlId="formName">
                        <Form.Label className="text-sm text-neutral-950 mb-2">
                          First Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your full name"
                          className="custom-input"
                          name="firstName"
                          value={fanData.firstName}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formSurname">
                        <Form.Label className="text-sm text-neutral-950 mb-2">
                          Surname
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your surname"
                          className="custom-input"
                          name="surname"
                          value={fanData.surname}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3 d-flex gap-3 flex-wrap align-items-center"
                        controlId="validationFormik04"
                      >
                        <Form.Label>Date of birth</Form.Label>
                        <DatePicker
                          className="bg-light date-input text-center"
                          selected={startDate}
                          onChange={(date: any) => {
                            setFanData({ ...fanData, dateOfBirth: date });
                            setStartDate(date);
                          }}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="validationFormik04"
                      >
                        <Form.Label>Country of residence</Form.Label>
                        <Select
                          options={options}
                          onChange={(e: any) =>
                            setFanData({ ...fanData, country: e.label })
                          }
                          className="bg-light date-input"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="validationFormik04"
                      >
                        <Form.Label>Gender</Form.Label>
                        <Form.Select
                          onChange={(e) =>
                            setFanData({ ...fanData, gender: e.target.value })
                          }
                          className="bg-light form-control"
                        >
                          <option value="">Select your gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="non-binary">Non-binary</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label className="text-sm text-neutral-950 mb-2">
                          Email Address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          className="custom-input"
                          name="email"
                          value={fanData.email}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formContactNumber"
                      >
                        <Form.Label className="text-sm text-neutral-950 mb-2">
                          Whatsapp Number
                          <FontAwesomeIcon icon={faWhatsapp} className="me-2" />
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="whatsappNumber"
                          placeholder={`Enter your Whatsapp number`}
                          className="custom-input"
                          value={fanData.whatsappNumber}
                          required
                          pattern="^\+?[1-9]\d{1,14}$"
                          maxLength={15}
                          onChange={handleChange}
                        />
                        <Form.Text className="text-muted">
                          Please enter a valid phone number (e.g., +1234567890).
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type={passwordType}
                            required
                            name="password"
                            value={fanData.password}
                            onChange={handleChange}
                            className="custom-input bg-transparent form-control text-light"
                          />
                          <InputGroup.Text onClick={showPassword}>
                            <FontAwesomeIcon
                              icon={
                                passwordType === "text" ? faEye : faEyeSlash
                              }
                            />
                          </InputGroup.Text>
                        </InputGroup>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type={passwordType}
                            required
                            name="confirmPassword"
                            value={fanData.confirmPassword}
                            onChange={handleChange}
                            className="custom-input bg-transparent form-control text-light"
                          />
                          <InputGroup.Text onClick={showPassword}>
                            <FontAwesomeIcon
                              icon={
                                passwordType === "text" ? faEye : faEyeSlash
                              }
                            />
                          </InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    </Form>

                    {errorMessage && <ErrorMessage message={errorMessage} />}
                    {Object.keys(errors).length > 0 && (
                      <div className="alert alert-danger mt-3">
                        <ul className="mb-0">
                          {Object.values(errors).map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <Button className="auth-button mt-3" onClick={handleSubmit}>
                      {submitting ? (
                        <Spinner as="span" animation="border" size="sm" />
                      ) : (
                        "Send Shoutout"
                      )}
                    </Button>

                    <MiniFooter />
                  </div>
                </>
              )}
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default Shoutout;
