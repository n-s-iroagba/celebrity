import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

const VideoRecorder: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);

  const startRecording = useCallback(() => {
    setRecording(true);
    const stream = webcamRef.current?.stream;
    if (stream) {
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        setVideoBlob(blob);
      };

      mediaRecorderRef.current.start();
    }
  }, []);

  const stopRecording = useCallback(() => {
    setRecording(false);
    mediaRecorderRef.current?.stop();
  }, []);

  const handleSendVideo = async () => {
    if (!videoBlob) return;
    
    const formData = new FormData();
    formData.append("video", videoBlob, "recorded-video.webm");

    try {
      const response = await fetch("YOUR_SERVER_UPLOAD_ENDPOINT", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Video uploaded successfully!");
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div>
      <Webcam audio={true} ref={webcamRef} />
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
      {videoBlob && (
        <div>
          <video src={URL.createObjectURL(videoBlob)} controls />
          <button onClick={handleSendVideo}>Send Video</button>
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
