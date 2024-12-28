import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/fan/HomePage';
import BookCall from './components/BookCall';
import Login from './pages/fan/Login';


const App: React.FC = () => {
  return (
    <Router>

      <Routes>
        <Route  path="/" element={<HomePage/>} />

         {/* <Route  path="/send/shout-out" element={<BookShoutOut/>} /> */}
        <Route  path="/book/video-call" element={<BookCall isVideo/>} />
        <Route  path="/book/phone-call" element={<BookCall/>} />
         {/* <Route  path="/fan/send/shout-out" element={<BookShoutOut isFan/>} /> */}
        <Route  path="/fan/book/video-call" element={<BookCall isFan isVideo/>} />
        <Route  path="/fan/book/phone-call" element={<BookCall isFan/>} />
        {/* <Route  path="/signup" element={<SignUp/>} /> */}
        <Route  path="/login" element={<Login/>} />
        {/* <Route  path="forgot-password" element={<Forgot/>} />
        <Route  path="/reset-password" element={<Reset/>} />
        <Route  path="/profile" element={<Profile/>} />
        <Route  path="/dashboard" element={<Dashboard/>} />
        <Route  path="/cart" element={<Cart/>} />
        <Route path="/book/tour" element={<BookTour/>} />
        <Route path="/book/membership-club" element={<BookMembership/>} />
        <Route path="/book/charity" element={<BookCharity/>} />
        <Route path="/souvenirs" element={<Souvenirs/>} />
        <Route path="/souvernirs/:id" element={<SouvenirDetails/>} /> */}


       
    
      </Routes>
    </Router>
  );
};

export default App