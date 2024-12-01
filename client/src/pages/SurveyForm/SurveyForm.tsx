import axios from "axios";
import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Modal,
  Alert,
} from "react-bootstrap";

const SurveyForm: React.FC = () => {
  const [step, setStep] = useState<"artist" | "musician" | null>(null);
  const [selectedCeleb, setSelectedCeleb] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<"fanDetails" | "survey">(
    "survey"
  );
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [formData, setFormData] = useState({
    bestPerformance: "",
    worstPerformance: "",
    loveAboutCeleb: "",
    wantToQuit: "",
    additionalFeedback: "",
  });
  const [fanDetails, setFanDetails] = useState({
    email: "",
    whatsappNumber: "",
    country: "",
    name: "",
    allowContact: "", // Initially not selected
  });

  const artists = [
    "Leonardo DiCaprio",
    "Meryl Streep",
    "Will Smith",
    "Emma Watson",
  ];
  const musicians = ["Beyoncé", "Drake", "Adele", "Ed Sheeran"];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (currentStep === "fanDetails") {
      setFanDetails({ ...fanDetails, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCelebChange = (e: any) => {
    setSelectedCeleb(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/submit-survey", {
        step,
        selectedCeleb,
        formData,
        fanDetails,
      });
      alert(response.data.message);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred while submitting."
      );
    }
  };
  
  const handlePrevious = () => {
    if (currentStep === "fanDetails") {
      setCurrentStep("survey");
    }
  };

  const handleNext = () => {
    if (currentStep === "survey") {
      setCurrentStep("fanDetails");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="py-5">
      <Form onSubmit={handleSubmit}>
        {currentStep === "fanDetails" && (
          <>
            {/* Fan Details Form */}
            <Row className="mb-4">
              <Col>
                <h4>Fan Details</h4>
              </Col>
            </Row>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={fanDetails.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </Form.Group>

            <Form.Group controlId="whatsappNumber" className="mb-3">
              <Form.Label>WhatsApp Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="whatsappNumber"
                value={fanDetails.whatsappNumber}
                onChange={handleInputChange}
                placeholder="Enter your WhatsApp number"
                required
              />
            </Form.Group>

            <Form.Group controlId="country" className="mb-3">
              <Form.Label>Country of Residence</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={fanDetails.country}
                onChange={handleInputChange}
                placeholder="Enter your country"
                required
              />
            </Form.Group>

            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name (Optional)</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={fanDetails.name}
                onChange={handleInputChange}
                placeholder="Enter your name (if you wish)"
              />
            </Form.Group>

            <Form.Group controlId="allowContact" className="mb-3">
              <Form.Label>
                Would you like to be contacted by the celebrity and their team?
              </Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  id="allowContactYes"
                  label="Yes"
                  name="allowContact"
                  value="yes"
                  checked={fanDetails.allowContact === "yes"}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="radio"
                  id="allowContactNo"
                  label="No"
                  name="allowContact"
                  value="no"
                  checked={fanDetails.allowContact === "no"}
                  onChange={handleInputChange}
                />
              </div>
            </Form.Group>
            <Row className="text-center mt-4"></Row>
          </>
        )}

        {currentStep === "survey" && (
          <>
            <Row className="text-center mb-4">
              <Col>
                <h1>Celebrity Survey</h1>
                <p>We value your feedback about your favorite celebrities.</p>
              </Col>
            </Row>

            {!step ? (
              <Row className="text-center">
                <Col>
                  <h4>Choose a Category</h4>
                  <Button
                    variant="primary"
                    className="mx-2"
                    onClick={() => setStep("artist")}
                  >
                    Artist
                  </Button>
                  <Button
                    variant="secondary"
                    className="mx-2"
                    onClick={() => setStep("musician")}
                  >
                    Musician
                  </Button>
                </Col>
              </Row>
            ) : (
              <>
                <Form.Group controlId="selectCelebrity" className="mb-3">
                  <Form.Label>Select a {step}</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedCeleb || ""}
                    onChange={handleCelebChange}
                    required
                  >
                    <option value="" disabled>
                      Choose a {step}
                    </option>
                    {(step === "artist" ? artists : musicians).map(
                      (celeb, index) => (
                        <option key={index} value={celeb}>
                          {celeb}
                        </option>
                      )
                    )}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="bestPerformance" className="mb-3">
                  <Form.Label>
                    What was the best performance by{" "}
                    {selectedCeleb || "this celebrity"}?
                  </Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    name="bestPerformance"
                    value={formData.bestPerformance}
                    onChange={handleInputChange}
                    placeholder="Describe the best performance..."
                    required
                  />
                </Form.Group>

                <Form.Group controlId="worstPerformance" className="mb-3">
                  <Form.Label>
                    What was the worst performance by{" "}
                    {selectedCeleb || "this celebrity"}?
                  </Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    name="worstPerformance"
                    value={formData.worstPerformance}
                    onChange={handleInputChange}
                    placeholder="Describe the worst performance..."
                    required
                  />
                </Form.Group>

                <Form.Group controlId="loveAboutCeleb" className="mb-3">
                  <Form.Label>
                    What do you love about {selectedCeleb || "this celebrity"}?
                  </Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    name="loveAboutCeleb"
                    value={formData.loveAboutCeleb}
                    onChange={handleInputChange}
                    placeholder="What makes them special to you?"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="wantToQuit" className="mb-3">
                  <Form.Label>
                    What do you want {selectedCeleb || "this celebrity"} to
                    quit?
                  </Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    name="wantToQuit"
                    value={formData.wantToQuit}
                    onChange={handleInputChange}
                    placeholder="Is there something you'd want them to stop doing?"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="additionalFeedback" className="mb-3">
                  <Form.Label>Any additional feedback?</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="additionalFeedback"
                    value={formData.additionalFeedback}
                    onChange={handleInputChange}
                    placeholder="Share any other thoughts or suggestions..."
                    rows={3}
                  />
                </Form.Group>
              </>
            )}
          </>
        )}

        {/* Navigation Buttons */}
        {step && (
          <Row className="text-center mt-4">
            <Col>
              {currentStep === "fanDetails" && (
                <Button
                  variant="secondary"
                  onClick={handlePrevious}
                  className="me-2"
                >
                  Previous
                </Button>
              )}
              {currentStep === "survey" && (
                <Button variant="primary" onClick={handleNext} className="me-2">
                  Next
                </Button>
              )}
              {currentStep === "fanDetails" && (
                <Button variant="success" type="submit">
                  Submit
                </Button>
              )}
            </Col>
          </Row>
        )}
      </Form>
     {/* Success Modal */}
<Modal show={showModal && !errorMessage} onHide={handleCloseModal} centered>
  <Modal.Header closeButton>
    <Modal.Title>Submission Successful</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Alert variant="success">
      <p>Thank you for completing the survey! Your feedback is invaluable.</p>
      <p>We appreciate your time and effort in sharing your thoughts about your favorite celebrity.</p>
    </Alert>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="primary" onClick={handleCloseModal}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

{/* Error Modal */}
{errorMessage && (
  <Modal show={showModal} onHide={handleCloseModal} centered>
    <Modal.Header closeButton>
      <Modal.Title>Submission Unsuccessful</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Alert variant="danger">
        <p>Sorry, your request was not submitted due to an error.</p>
        <p>Please try again later.</p>
      </Alert>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={handleCloseModal}>
        Back To Home
      </Button>
    </Modal.Footer>
  </Modal>
)}
    </Container>
  );
};

export default SurveyForm;
