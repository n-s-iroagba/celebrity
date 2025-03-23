


  import React, { useRef, useState } from 'react';
  import SearchBar from '../../components/SearchBar';
  import Celebrity from '../../types/Celebrity';
  import SearchPic from '../../components/SearchPic';
  import { useNavigate } from 'react-router-dom';
  import { useUserContext } from '../../context/useUserContext';
  import { Button, Form, ProgressBar } from 'react-bootstrap';
  import useFetchAllCelebrities from '../../hooks/useFetchAllCelebrities';
  
  const Shoutout: React.FC = () => {

    const { celebrities, loading, error } = useFetchAllCelebrities();
  
    const [query, setQuery] = useState('');
    const [selectedCelebrity, setSelectedCelebrity] = useState<Celebrity | null>(null);
    const [shoutout, setShoutout] = useState('');
    const [mediaType, setMediaType] = useState<'text' | 'video' | 'voice'|''>('');
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedMedia, setRecordedMedia] = useState<string | null>(null);
    const [recordingTime, setRecordingTime] = useState(0)

  
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordedChunksRef = useRef<Blob[]>([]);
    const videoPreviewRef = useRef<HTMLVideoElement | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const navigate = useNavigate();
    const { isSignedIn } = useUserContext();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: mediaType === 'video',
        audio: true,
      });

      mediaStreamRef.current = stream;

      // Show video preview
      if (mediaType === 'video' && videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
        videoPreviewRef.current.play();
      }

      // Initialize MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: mediaType === 'video' ? 'video/webm' : 'audio/webm',
        });
        const mediaUrl = URL.createObjectURL(blob);
        setRecordedMedia(mediaUrl);

        // Convert Blob to File for submission
        const file = new File([blob], `recording.${mediaType === 'video' ? 'webm' : 'webm'}`, {
          type: blob.type,
        });
        console.log('Recorded file:', file);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      // Start recording timer for voice notes
      if (mediaType === 'voice') {
        setRecordingTime(0);
        recordingIntervalRef.current = setInterval(() => {
          setRecordingTime((prevTime) => prevTime + 1);
        }, 1000);
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // Stop recording timer
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }

      // Stop all tracks in the stream
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setRecordedMedia(URL.createObjectURL(file));
    }
  };

  

  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      if (!isSignedIn) {
        // Navigate to signup if user is not signed in
        navigate('/signup', { state: { selectedCelebrity, shoutout, mediaType, mediaFile } });
        return;
      }
  
      // Handle shoutout submission for signed-in users
      const formData = new FormData();
      formData.append('celebrityId', selectedCelebrity?.id || '');
      formData.append('shoutout', shoutout);
      formData.append('mediaType', mediaType);
      if (mediaFile) {
        formData.append('mediaFile', mediaFile);
      }
  
      // Send the shoutout to the server
      fetch('/api/shoutouts', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Shoutout sent successfully:', data);
          navigate('/confirmation'); // Navigate to a confirmation page
        })
        .catch((error) => {
          console.error('Error sending shoutout:', error);
        });
    };
  
    const handleSearchChange = (searchQuery: string) => {
      setQuery(searchQuery);
    };
  
    const handleSelectCelebrity = (celebrity: Celebrity) => {
      setSelectedCelebrity(celebrity);
      setQuery('');
    };
  
    const handleMediaTypeChange = (type: 'text' | 'video' | 'voice') => {
      setMediaType(type);
      setMediaFile(null); // Reset media file when changing media type
    };
  
  

    const createTempCelebrity = (name: string) => {
      const newCelebrity: Celebrity = {
        id:null,
        stageName: name,
        firstName: name.split(' ')[0],
        surname: name.split(' ')[1] || '',
        image: '',
        bio:'',
        isConfirmed:false
      };
      celebrities.push(newCelebrity);
      setSelectedCelebrity(newCelebrity);
      setQuery('');
  
    }
  
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
            <small>Kindly search the celebrity you wish to send a shoutout to.</small>
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
                  style={{ width: 40, height: 40, borderRadius: '50%' }}
                  className="me-3" />
                <div>
                  <strong>
                    {celebrity.firstName} {celebrity.surname}
                  </strong>
                  <br />
                  <small>{celebrity.stageName}</small>
                </div>
              </div>
            )} createEntity={createTempCelebrity}          />
  
          {selectedCelebrity && (
            <>
              <p className="mt-3 mb-0">
                <b>
                  You picked {selectedCelebrity.firstName} {selectedCelebrity.surname} (
                  {selectedCelebrity.stageName})
                </b>
              </p>
              <Form className="p-2 pb-5" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <Button
                    variant={mediaType === 'text' ? 'primary' : 'outline-primary'}
                    onClick={() => handleMediaTypeChange('text')}
                    className="me-2"
                  >
                    Text
                  </Button>
                  <Button
                    variant={mediaType === 'video' ? 'primary' : 'outline-primary'}
                    onClick={() => handleMediaTypeChange('video')}
                    className="me-2"
                  >
                    Video
                  </Button>
                  <Button
                    variant={mediaType === 'voice' ? 'primary' : 'outline-primary'}
                    onClick={() => handleMediaTypeChange('voice')}
                  >
                    Voice Note
                  </Button>
                </div>
  
                {mediaType === 'text' && (
                  <Form.Group className="mb-3" controlId="formShoutout">
                    <p className="text-sm text-neutral-950 mb-2">
                      Write a heartfelt message to {selectedCelebrity.firstName} {selectedCelebrity.surname}
                    </p>
                    <Form.Control
                      as="textarea"
                      rows={10}
                      placeholder="Type your message here..."
                      className="border-black"
                      value={shoutout}
                      onChange={(e) => setShoutout(e.target.value)}
                    />
                  </Form.Group>
                )}

                 {/* Media Input */}
        {(mediaType === 'video' || mediaType === 'voice') && (
   <div>
   <Form.Group className="mb-3" controlId="formMedia">
     <Form.Label>Upload or Record {mediaType === 'video' ? 'Video' : 'Voice Note'}</Form.Label>
     <div className="d-flex flex-column gap-2">
       {/* File Upload */}
       <Form.Control
         type="file"
         accept={mediaType === 'video' ? 'video/*' : 'audio/*'}
         onChange={handleFileUpload}
       />

       {/* Video Preview */}
       {mediaType === 'video' && (
         <video
           ref={videoPreviewRef}
           style={{ width: '100%', display: isRecording ? 'block' : 'none' }}
           muted
         />
       )}

       {/* Voice Recording Bar */}
       {mediaType === 'voice' && isRecording && (
         <div className="mt-3">
           <ProgressBar now={(recordingTime % 30) * (100 / 30)} label={`${recordingTime}s`} />
           <small>Recording in progress...</small>
         </div>
       )}

       {/* Record from Camera/Microphone */}
       <div className="d-flex gap-2">
         <Button
           variant={isRecording ? 'danger' : 'success'}
           onClick={isRecording ? stopRecording : startRecording}
         >
           {isRecording ? 'Stop Recording' : 'Start Recording'}
         </Button>
       </div>

       {/* Preview Recorded Media */}
       {recordedMedia && (
         <div className="mt-3">
           {mediaType === 'video' ? (
             <video controls src={recordedMedia} style={{ width: '100%' }} />
           ) : (
             <audio controls src={recordedMedia} style={{ width: '100%' }} />
           )}
         </div>
       )}
     </div>
   </Form.Group>
 </div>
        )}
  
                {(mediaType === 'video' || mediaType === 'voice') && (
                  <Form.Group className="mb-3" controlId="formMedia">
                    <Form.Label>Upload {mediaType === 'video' ? 'Video' : 'Voice Note'}</Form.Label>
                    <Form.Control type="file" accept={mediaType === 'video' ? 'video/*' : 'audio/*'} onChange={handleFileUpload} />
                  </Form.Group>
                )}
  
                <Button className="auth-button mt-3" type="submit">
                  Send Shoutout
                </Button>
              </Form>
            </>
          )}
        </div>
      </div>
    );
  };
  
  export default Shoutout;