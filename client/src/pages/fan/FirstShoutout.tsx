import { useState } from "react";
import Shoutout from "./Shoutout";
import SignUp from "../auth/Signup"; // Ensure this component exists
import Celebrity from "../../types/Celebrity";
import { validateForm } from "../../utils/utils";
import { User } from "../../types/User";
import { Fan } from "../../types/Fan";
import { fanSignUpUrl } from "../../data/urls";
import { useNavigate } from "react-router-dom";

const FirstShoutout = () => {
  const [message, setMessage] = useState("");
  const [selectedCelebrity, setSelectedCelebrity] = useState<Celebrity | null>(
    null
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mediaType, setMediaType] = useState<"text" | "video" | "voice" | "">(
    ""
  );
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [componentView, setComponentView] = useState<"shoutout" | "signup">(
    "shoutout"
  );
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    whatsAppNumber: "",
  });
  const [fan, setFan] = useState<Fan>({
    firstName: "",
    surname: "",
    countryOfResidence: "",
    dateOfBirth: new Date(),
    gender: "",
    occupation: "",
  });

  const handleFanChange = (e: any) => {
    setFan({ ...fan, [e.target.name]: e.target.value });
  };

  const handleUserChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("celebrity", JSON.stringify(selectedCelebrity));
    formData.append("message", message);
    formData.append("mediaType", mediaType);
    if (mediaFile) {
      formData.append("mediaFile", mediaFile);
    }

    try {
      if (!validateForm(fan, user, setErrors, confirmPassword)) {
        return;
      }

      setSubmitting(true);
      setErrorMessage("");

      formData.append("fan", JSON.stringify(fan));
      formData.append("user", JSON.stringify(user));
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
          console.error("Error sending SignUp:", error);
        });
      return;
    } catch (er) {
      setSubmitting(false);
      console.error(er);
    }
  };

  return componentView === "shoutout" ? (
    <Shoutout
      setComponentView={setComponentView}
      selectedCelebrity={selectedCelebrity}
      setSelectedCelebrity={setSelectedCelebrity}
      message={message}
      setMediaType={setMediaType}
      setMessage={setMessage}
      mediaType={mediaType}
      mediaFile={mediaFile}
      setMediaFile={setMediaFile}
    />
  ) : (
    <SignUp
      setComponentView={setComponentView}
      handleSubmit={handleSubmit}
      handleFanChange={handleFanChange}
      handleUserChange={handleUserChange}
      setFan={setFan}
      fan={fan}
      user={user}
      errorMessage={errorMessage}
      submitting={submitting}
      errors={errors}
      setConfirmPassword={setConfirmPassword}
      confirmPassword={confirmPassword}
    />
  );
};

export default FirstShoutout;
