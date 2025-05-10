import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatList from './components/ChatList';
import ForgotPassword from './pages/auth/ForgotPassword';
import Login from './pages/auth/Login';
import NewPassword from './pages/auth/ResetPassword';
import VerifyEmail from './pages/auth/VerifyEmail';
import FirstShoutout from './pages/fan/FirstShoutout';
import Home from './pages/Home';
import CelebrityReply from './pages/temp/CelebrityReply';


const App = () => {
  return (
    <Router>
      <Routes>
        

        <Route path="/" element={<Home />} />

        <Route path="/book/shout-out" element={<FirstShoutout />} />

  
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<SignUp/>} /> */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<NewPassword />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        <Route path="/replies" element={<CelebrityReply />} />

        <Route path="/dashboard" element={<ChatList/>}/>
  
       
  

      </Routes>
    </Router>
  );
};

export default App