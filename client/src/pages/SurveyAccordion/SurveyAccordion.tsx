import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import useFetchSurveys from "../../hooks/UseFetchSurveys";


const SurveysAccordion: React.FC = () => {
  const { surveys, loading, error } = useFetchSurveys();

  if (loading) return <Spinner animation="border" role="status" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Accordion>
      {surveys.map((survey, index) => (
        <Accordion.Item eventKey={index.toString()} key={survey.id}>
          <Accordion.Header>
            {survey.fanDetails.firstName} {survey.fanDetails.lastName}
          </Accordion.Header>
          <Accordion.Body>
            <p><strong>Step:</strong> {survey.step}</p>
            <p><strong>Selected Celebrity:</strong> {survey.selectedCeleb}</p>
            <p><strong>Form Data:</strong> {JSON.stringify(survey.formData, null, 2)}</p>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default SurveysAccordion;
