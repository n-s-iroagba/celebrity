import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DonationCampaigns from './pages/fan/DonationCampaigns';
import EventTickets from './pages/fan/EventTickets';
import ForgotPassword from './pages/fan/ForgotPassword';
import Login from './pages/fan/Login';
import MyClubMembership from './pages/fan/MyClubMembership';
import TourPackages from './pages/fan/TourPackages';
import MyTours from './pages/fan/MyTours';
import MyEventTickets from './pages/fan/MyEvenTickets';
import MyDonationCampaigns from './pages/fan/MyDonationCampaigns';
import Souvenirs from './pages/fan/Souvenir';
import MySouvenirs from './pages/fan/MySouvenirs';
import { ClubMembership } from './pages/fan/ClubMembership';
import Cart from './pages/fan/Cart';
import { News } from './pages/fan/News';
import NewsDetails from './pages/fan/NewsDetails';
import { MyCelebrityNews } from './pages/fan/MyCelebrityNews';
import Bio from './pages/fan/Bio';
import Gallery from './pages/fan/Gallery';
import SignUp from './pages/fan/SignUp';
import Profile from './pages/fan/Profile';
import NewPassword from './pages/fan/NewPassword';
import BookCall from './pages/fan/BookCall';
import Home from './pages/fan/Home';
import AdminDashboardLayout from './components/AdminDashboardLayout';
import Clients from './pages/admin/Client';
import Donations from './pages/admin/Donations';
import Schedules from './pages/admin/Schedules';
import Tours from './pages/admin/Tours';
import CelebrityDashboardLayout from './components/CelebrityDashboardLayout';
import CryptoCheckOut from './pages/fan/CryptoCheckOut';
import Contacts from './pages/fan/Contacts';
import PersonalizedVideo from './pages/fan/PersonalizedVideo';
import Shoutout from './pages/fan/ShoutOut';
import VerificationForm from './pages/fan/VerificationForm';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 
        <Route  path="verification" Component={Verify()} />
        */}

        <Route path="/" element={<Home />} />

        <Route path="/book/:talent/video-call" element={<BookCall isVideo />} />
        <Route path="/book/:talent/phone-call" element={<BookCall />} />
        <Route path="/book/:talent/personalised-video" element={<PersonalizedVideo />} />
        <Route path="/book/:talent/shout-out" element={<Shoutout/>}/>
        
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<NewPassword />} />
        <Route path="/verify/:email" element={<VerificationForm />} />

        <Route path="/profile" element={<Profile />} />
        <Route  path="/contacts" element={<Contacts/>} /> 
        <Route path="/my-club-membership/:id" element={<MyClubMembership />} />
        <Route path="/my-events/:id" element={<MyEventTickets />} />
        <Route path="/my-tours/:id" element={<MyTours />} />
        <Route path="/my-donations/:id" element={<MyDonationCampaigns />} />
        <Route path="/my-souvenirs/:id" element={<MySouvenirs />} />
        <Route path="/news" element={<News />} />
        <Route path="/news-details/:id" element={<NewsDetails />} />
        <Route path="/cart/:id" element={<Cart />} />

        <Route path="/tours/:id" element={<TourPackages />} />
        <Route path="/events/:id" element={<EventTickets />} />
        <Route path="/donations/:id" element={<DonationCampaigns />} />
        <Route path="/souvenirs/:id" element={<Souvenirs />} />
        <Route path="/club-membership/:id" element={<ClubMembership />} />
        <Route path="/news/:id" element={<MyCelebrityNews />} />
        <Route path="/bio/:id" element={<Bio />} />
        <Route path="/gallery/:id" element={<Gallery />} />
        <Route path="/check-out/:id" element={<CryptoCheckOut/>} />

        <Route path="/admin/schedules" element={<AdminDashboardLayout><Schedules /></AdminDashboardLayout>} />
        <Route path="/admin/clients" element={<AdminDashboardLayout><Clients /></AdminDashboardLayout>} />
        <Route path="/celebrity/donations" element={<CelebrityDashboardLayout><Donations /></CelebrityDashboardLayout>} />
        <Route path="/celebrity/tours" element={<CelebrityDashboardLayout><Tours /></CelebrityDashboardLayout>} />

      </Routes>
    </Router>
  );
};

export default App