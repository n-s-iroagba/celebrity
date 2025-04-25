import React, { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import SearchBar from "../../components/SearchBar";
import Celebrity from "../../types/Celebrity";
import SearchPic from "../../components/SearchPic";
import { useNavigate } from "react-router-dom";
import '../../assets/styles/Shoutout.css'
import {
  Button,
  Container,
  Form,
  Modal,
  ProgressBar,

} from "react-bootstrap";
import useFetchAllCelebrities from "../../hooks/useFetchAllCelebrities";
import { fanSignUpUrl } from "../../data/urls";
import { faVideo, faComment, faMicrophone, faTimesCircle, faUsersBetweenLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMeetup } from "@fortawesome/free-brands-svg-icons";
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

 const stopMediaTracks = () => {
  if (mediaStreamRef.current) {
    mediaStreamRef.current.getTracks().forEach(track => track.stop());
    mediaStreamRef.current = null;
  }
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
        const file = new File([blob], "recording.webm", { type: blob.type });
        setMediaFile(file);
        
        stopMediaTracks(); // Add this line
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
<div className="purple-gradient-bg vh-100">
      <Container className="glassmorphic-card py-4">
        <div className="px-md-4">
          <h3 className="text-center mb-3 mobile-heading">
            <FontAwesomeIcon icon={faVideo} className="me-2" />
            Connect With Celebrities
          </h3>

          <div className="text-center mb-3">
            <small className="text-muted instruction-text">
              Search below to send personalized messages
            </small>
          </div>

          <SearchPic />

          <div className="mb-4">
            <SearchBar
              query={query}
              onQueryChange={handleSearchChange}
              items={filteredCelebrities}
              onSelectItem={handleSelectCelebrity}
              renderItem={(celebrity) => (
                <div className="d-flex align-items-center py-2 search-result-item">
                  <img
                    src={celebrity.image}
                    alt={celebrity.stageName}
                    className="celebrity-avatar me-3"
                  />
                  <div>
                    <strong className="celebrity-name">
                      {celebrity.firstName} {celebrity.surname}
                    </strong>
                    <br />
                    <small className="text-muted stage-name">{celebrity.stageName}</small>
                  </div>
                </div>
              )}
              createEntity={createTempCelebrity}
            />
          </div>

          {selectedCelebrity && (
            <>
              <div className="text-center mb-4">
                <h5 className="selected-celebrity">
                  Shoutout for{' '}
                  <span className="highlight-name">
                    {selectedCelebrity.stageName}
                  </span>
                </h5>
              </div>

              <div className="media-selector-buttons d-flex flex-column flex-md-row gap-2 mb-4">
                <Button
                  variant={mediaType === "text" ? "primary" : "outline-primary"}
                  className="media-button"
                  onClick={() => handleMediaTypeChange("text")}
                >
                  <FontAwesomeIcon icon={faComment} className="me-2" style={{color:'purple'}} />
                  <span className="button-text">Text</span>
                </Button>
                <Button
                  variant={mediaType === "video" ? "primary" : "outline-primary"}
                  className="media-button"
                  onClick={() => handleMediaTypeChange("video")}
                >
                  <FontAwesomeIcon icon={faVideo} className="me-2"  style={{color:'purple'}}/>
                  <span className="button-text">Video</span>
                </Button>
                <Button
                  variant={mediaType === "voice" ? "primary" : "outline-primary"}
                  className="media-button"
                  onClick={() => handleMediaTypeChange("voice")}
                >
                  <FontAwesomeIcon icon={faMicrophone} className="me-2"  style={{color:'purple'}}/>
                  <span className="button-text">Voice</span>
                </Button>
              </div>
              {(mediaType === "video" || mediaType === "voice") && (
  <div className="recording-section mb-4">
    {recordedMedia ? (
      <div className="media-preview-container">
        <div className="media-wrapper shadow-sm rounded-lg overflow-hidden">
          {mediaType === "video" ? (
            <video 
              src={recordedMedia} 
              controls 
              className="w-100 rounded-lg"
              style={{ maxHeight: '60vh' }}
            />
          ) : (
            <div className="audio-player-container bg-light-purple p-3 rounded-lg">
              <audio src={recordedMedia} controls className="w-100" />
            </div>
          )}
        </div>
        <Button 
          variant="outline-danger" 
          onClick={discardRecording}
          className="mt-3 discard-button"
        >
          <FontAwesomeIcon icon={faTimesCircle} className="me-2" />
          Discard & Retake
        </Button>
      </div>
    ) : (
      <div className="recording-controls">
        <Button
          variant={isRecording ? "danger" : "success"}
          onClick={isRecording ? stopRecording : startRecording}
          className="w-100 recording-button py-3"
        >
          <div className="d-flex align-items-center justify-content-center">
            <FontAwesomeIcon 
              icon={mediaType === "video" ? faVideo : faMicrophone} 
              className="h4 mb-0 me-3"
            />
            <span className="button-label">
              {isRecording ? (
                <>
                  <span className="pulsating-dot me-2"></span>
                  Recording {mediaType}...
                </>
              ) : (
                `Start ${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} Recording`
              )}
            </span>
          </div>
        </Button>
        {!isRecording && (
          <small className="d-block text-muted text-center mt-2 helper-text">
            {mediaType === "video" 
              ? "Make sure you're in a well-lit environment"
              : "Find a quiet space for best quality"}
          </small>
        )}
      </div>
    )}
  </div>
)}

<Modal 
  show={showRecordingModal} 
  onHide={discardRecording} 
  centered 
  className="modern-recording-modal"
>
  <Modal.Header className="modal-header mb-0">

          <span className="action-text">{isRecording ? 'Recording  ' : 'Ready  '}   </span> 
          <span className="action-text">{' '+ mediaType} Session</span>
 
  </Modal.Header>
  
  <Modal.Body className="modal-body my-0 py-0">
    <div className="visual-feedback">
      {mediaType === "video" ? (
        <video 
          ref={videoPreviewRef} 
          className="live-preview" 
          autoPlay 
          muted 
          style={{ borderRadius: '12px' }}
        />
      ) : (
        <div className="audio-visualization">
          <div className={`sound-wave ${isRecording ? 'active' : ''}`}>
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bar" />
            ))}
          </div>
        </div>
      )}
    </div>
    
    <div className="recording-status py-0 my-0">
      <div className={`pulse-container ${isRecording ? 'recording' : ''}`}>
        <div className="pulse-ring"></div>
        <FontAwesomeIcon 
          icon={mediaType === 'video' ? faVideo : faMicrophone} 
          className="status-icon"
        />
      </div>
    </div>
  </Modal.Body>

  <Modal.Footer className="d-flex justify-content-center my-0 py-0">
    <div >
      <button 
        className={`control-btn ${isRecording ? 'stop-btn' : 'start-btn'}`}
        onClick={stopRecording}
      >
        {isRecording ? (
          <>
            <span className="pulse-dot"></span>
            <span>Stop Recording</span>
          </>
        ) : 'Start Session'}
      </button>
    </div>
  </Modal.Footer>
</Modal>


              {mediaType === "text" && (
                <Form.Group className="mb-4">
                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder={`Write your message to ${selectedCelebrity.firstName}...`}
                    className="message-textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Form.Group>
              )}

              <Button 
                onClick={handleSubmit} 
                className="submit-button w-100 py-3"
              >
                Send Shoutout 🌟
              </Button>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Shoutout;
