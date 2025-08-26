import React from 'react';
import SearchBar from "../../components/searchBar/SearchBar";
import Chatbot from "../../components/Chatbot/Chatbot"; // Import chatbot
import './homePage.scss';

function HomePage() {
  return (
    <div className="homePage">
      {/* Logo Section */}
      <div className="logoContainer">
        <img src="/logo.png" alt="HomeConnect Logo" className="logo" /> {/* Add your logo */}
      </div>

      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Fairfax Housing? HomeConnect is Here to Help.</h1>
          <p>
            Looking for affordable housing that meets both your budget and lifestyle?
            HomeConnect is here to simplify your search and connect you to the perfect
            home in Fairfax. Whether you're renting or buying, we make it easy to find
            options that fit your needs, all while considering environmental impact and
            sustainability. HomeConnect is your trusted companion for finding affordable,
            sustainable, and comfortable housing in Fairfax. Start your search today!
          </p>
          <SearchBar />

          <div className="boxes">
            <div className="box">
              <h2>Affordable Housing</h2>
            </div>
            <div className="box">
              <h2>Climate Change</h2>
            </div>
            <div className="box">
              <h2>First Time Home Buyers</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="imgContainer">
        <img src="/bg.png" alt="Background Image" />
      </div>

      {/* Move the chatbot lower */}
      <section className="chatbot-section">
        <h2>Need Help? Chat with Our AI Assistant</h2>
        <Chatbot />
      </section>
    </div>
  );
}

export default HomePage;
