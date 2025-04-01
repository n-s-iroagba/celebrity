import React, { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import SearchBar from "../../components/SearchBar";
import Celebrity from "../../types/Celebrity";
import SearchPic from "../../components/SearchPic";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Form,
  Modal,
  ProgressBar,

} from "react-bootstrap";
import useFetchAllCelebrities from "../../hooks/useFetchAllCelebrities";
import { fanSignUpUrl } from "../../data/urls";
interface ShoutoutProps {
  setComponentView: Dispatch<SetStateAction<"shoutout" | "signup">>;
  selectedCelebrity: Celebrity | null;
  setSelectedCelebrity: Dispatch<SetStateAction<Celebrity|null>>;
  message: string;
  setMessage: (msg: string) => void;
  mediaType: "text" | "video" | "voice" | "";
  setMediaType: (type: "text" | "video" | "voice" | "") => void;
  mediaFile:File|null
  setMediaFile:Dispatch<SetStateAction<File|null>>
}

const Shoutout: React.FC<ShoutoutProps>= ({setComponentView,mediaType,setMediaType,selectedCelebrity,setSelectedCelebrity,message,setMessage,mediaFile,setMediaFile}) => {
 
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { celebrities, loading, error } = useFetchAllCelebrities();
  const [query, setQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordedMedia, setRecordedMedia] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const videoPreviewRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const navigate = useNavigate();
 const isSignedIn = false



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
        const file = new File([blob], "recording.webm", { type: blob.type });
        setMediaFile(file);
        
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
    if(!isSignedIn){
      setComponentView('signup')
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
            {mediaType === "voice" &&(
                      <div className="mt-3">
                        <ProgressBar
                        striped style={{backgroundColor:'black'}}
                          now={40}
                          
                        />
                      </div>
                    )}
            <small>Recording in progress...</small>
                      
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
              
                  
                  <div className="d-flex flex-column gap-2">
                   
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
              
              )}
              <Button onClick={handleSubmit}>Submit</Button>
              
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default Shoutout;
