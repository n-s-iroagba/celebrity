import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewPassword from './pages/fan/NewPassword';
import Home from './pages/fan/Home';
import AdminDashboardLayout from './components/AdminDashboardLayout';
import Clients from './pages/admin/Client';

import Schedules from './pages/admin/Schedules';

import CryptoCheckOut from './pages/fan/CryptoCheckOut';



import CelebrityReply from './pages/fan/CelebrityReply';
import VerifyEmail from './pages/fan/VerifyEmail';
import Dashboard from './pages/fan/Dashboard';
import ForgotPassword from './pages/fan/ForgotPassword';
import Login from './pages/fan/Login';
import FirstShoutout from './pages/fan/FirstShoutout';
import CelebrityDashboard from './pages/fan/CelebrityDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 
        <Route  path="verification" Component={Verify()} />
        */}

        <Route path="/" element={<Home />} />

        <Route path="/book/shout-out" element={<FirstShoutout />} />

  
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<NewPassword />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        <Route path="/replies" element={<CelebrityReply />} />

        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/celebrity-dashboard/:fanId/:celebrityId" element={<CelebrityDashboard/>}/>
       
        {/* <Route path="/tours/:id" element={<Tours />} /> */}
        {/* <Route path="/events/:id" element={<EventTickets />} />
        <Route path="/donations/:id" element={<DonationCampaigns />} />
        <Route path="/souvenirs/:id" element={<Souvenirs />} />
        <Route path="/club-membership/:id" element={<ClubMembership />} /> */}
        {/* <Route path="/bio/:id" element={<Bio />} />
        <Route path="/gallery/:id" element={<Gallery />} /> */}
        {/* <Route path="/celebrity/donations" element={<CelebrityDashboardLayout><Donations /></CelebrityDashboardLayout>} /> */}
        <Route path="/check-out/:id" element={<CryptoCheckOut />} />

        <Route path="/admin/schedules" element={<AdminDashboardLayout><Schedules /></AdminDashboardLayout>} />
        <Route path="/admin/clients" element={<AdminDashboardLayout><Clients /></AdminDashboardLayout>} />
     
        {/* <Route path="/celebrity/tours" element={<CelebrityDashboardLayout><Tours /></CelebrityDashboardLayout>} /> */}

      </Routes>
    </Router>
  );
};

export default App