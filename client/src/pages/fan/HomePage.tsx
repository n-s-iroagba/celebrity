import React from "react";
import "../../assets/styles/HomePage.css";
import CircularImageSlider from "../../components/CircularImageSlider";
import NavbarComponent from "../../components/NavbarComponent";
import VideoContent from "../../components/VideoContent";
import HowItWorks from "../../components/HowItWorks";
import ActionButtons from "../../components/ActionButtons";
import Footer from "../../components/Footer";

const HomePage: React.FC = () => {
  return (
    <div>
      <NavbarComponent />
      <div className="text-center">
        <h3> Connect Globally with Your Favorite Stars! 🌍</h3>
        <p>
          Book phone calls, video calls, shoutouts, and personalized videos with
          celebrities you love. Your dream interaction, just a click away!
        </p>
      </div>
      <CircularImageSlider/>
      <div className="px-5">
      <VideoContent/>
      <ActionButtons/>
      <HowItWorks/>
      <ActionButtons/>
      <Footer />
      </div>
    </div>
  );
};

export default HomePage;
