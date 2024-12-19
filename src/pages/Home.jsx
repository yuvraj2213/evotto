import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <header className="hero-section">
        <h1>Drive with Ease - Your Automobile Partner</h1>
        <p>Rent, buy, and service vehicles effortlessly with Evotto.</p>
      </header>
      <section className="services">
        <h2>Our Services</h2>
        <div className="service-card">
          <h3>Automobile Rental</h3>
          <p>Rent vehicles for personal or business use effortlessly.</p>
        </div>
        <div className="service-card">
          <h3>Second-Hand Cars</h3>
          <p>Explore and buy verified, affordable pre-owned cars.</p>
        </div>
        <div className="service-card">
          <h3>Vehicle Servicing</h3>
          <p>Schedule services, repairs, or maintenance with trusted vendors.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
