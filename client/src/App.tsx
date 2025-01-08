import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/fan/HomePage';
import BookCall from './components/BookCall';



const App: React.FC = () => {
  return (
    <Router>

      <Routes>
        <Route  path="/" element={<HomePage/>} />

       
        <Route  path="/book/:talent/video-call" element={<BookCall isVideo/>} />
        <Route  path="/book/:talent/phone-call" element={<BookCall/>} />
        {/* <Route  path="/send/:talent/shout-out" element={<BookShoutOut/>} />
        <Route  path="/book/:talent/personal-video" element={RequestVideo}/> */}
        
        {/* <Route  path="/signup" element={<SignUp/>} />
        <Route  path="/login" element={<Login/>} />
        * <Route  path="/forgot-password" element={<ForgotPassword/>} />
        <Route  path="/reset-password" element={<ResetPassword/>} />
        * <Route  path="verification" Component={Verify()} /> */}
      
        {/* <Route  path="/dashboard" element={<Dashboard/>} />
        <Route  path="/profile" element={<Profile/>} />
        <Route  path="/cart" element={<Cart/>} />
        <Route path="/tours/:id" element={<ImmersionTours/>} />
        <Route path="/club-membership/:id" element={<BookMembership/>} />
        <Route path="/donations/:id" element={<DonationCampaigns/>} />
        <Route path="/events/:id" element={<EventTickets/>} />
        <Route path="/souvenirs/:id" element={<Souvenirs/>} />
        <Route path="/souvenir/:id" element={<SouvenirDetails/>} />  */}
      </Routes>
    </Router>
  );
};

export default App