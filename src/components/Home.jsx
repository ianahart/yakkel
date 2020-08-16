import React from 'react';
import homeImage from '../images/home.jpg';
import '../css/Home.css';
const Home = () => {
  return (
    <div className="home">
      <div className="image-container">
        <img className="home-image" src={homeImage} alt="blog" />
      </div>
      <div className="home-main-content">
        <h1>YaKKel</h1>
        <h3>
          <i className="fas fa-award ribbon-icon"></i>
          <em>
            Voted <span>#1</span> in newest blogs, for having a diverse userbase
          </em>
        </h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          cupiditate nisi optio placeat ducimus dolore, dicta rerum quis
          repellendus quos quaerat mollitia dolor perspiciatis veniam minima
          ipsam temporibus esse illum.
        </p>
        <div className="merits">
          <span>
            <i className="fas fa-check"></i>Plenty of Topics
          </span>
          <span>
            <i className="fas fa-check"></i>Continuous Updates
          </span>
          <span>
            <i className="fas fa-check"></i>Easy Setup
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
