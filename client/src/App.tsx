import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SurveyForm from './pages/SurveyForm/SurveyForm';
import SurveysAccordion from './pages/SurveyAccordion/SurveyAccordion';

const App: React.FC = () => {
  return (
    <Router>

      <Routes>
        <Route  path="/" Component={HomePage} />
        <Route path="/survey" Component={SurveyForm} />
        <Route path="/client" Component={SurveysAccordion} />
      </Routes>
    </Router>
  );
};

export default App