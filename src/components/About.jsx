import React, { useState, useEffect, useRef } from 'react';

import about1 from '../images/about-1.jpg';
import about2 from '../images/about-2.jpg';
import '../css/About.css';

const About = () => {
  const imageOneRef = useRef(null);
  const imageTwoRef = useRef(null);
  const [isImageOneActive, setIsImageOneActive] = useState(false);
  const [isImageTwoActive, setIsImageTwoActive] = useState(false);

  const isInViewport = (element) => {
    if (!element) {
      return;
    } else {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  };

  useEffect(() => {
    const handleScroll = (ref, set) => {
      if (isInViewport(ref)) {
        set(true);
      } else {
        set(false);
      }
    };

    window.addEventListener('scroll', () => {
      handleScroll(imageOneRef.current, setIsImageOneActive);
      handleScroll(imageTwoRef.current, setIsImageTwoActive);
    });
    const ref1 = imageOneRef.current;
    const ref2 = imageTwoRef.current;

    return () => {
      window.removeEventListener('scroll', () => {
        handleScroll(ref1, setIsImageOneActive);
        handleScroll(ref2, setIsImageTwoActive);
      });
    };
  }, []);

  const imageOneClassName = isImageOneActive
    ? 'slide-in-img-1 '
    : 'hide-img-1 ';
  const imageTwoClassName = isImageTwoActive ? 'slide-in-img-2' : 'hide-img-2';
  return (
    <div className="about">
      <header>
        <h1>About Us</h1>
      </header>
      <div className="about-wrapper">
        <div className="main-content">
          <div className="row">
            <h2>
              &quot;Doing Blogging{' '}
              <span>
                <strong>Differently</strong>
              </span>{' '}
              Since 2020&quot;
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum sed risus magna. Ut laoreet rhoncus ex, a semper nulla
              luctus eu. Curabitur eleifend gravida ante et placerat. Praesent
              enim nibh, suscipit at <span>nunc eget, eleifend</span> posuere
              ex. Aliquam molestie dui sit amet finibus vestibulum. Pellentesque
              sollicitudin eros sit amet erat interdum tincidunt. Cras non
              tellus lacus. Duis sit amet tempus arcu, eu accumsan magna.
              Quisque ac <strong>feugiat urna</strong>. Phasellus sodales, sem
              non pellentesque condimentum, justo orci dignissim erat, vel
              aliquet purus diam nec metus. Maecenas non mi ipsum.{' '}
              <span>Quisque ut nisl</span> at odio mollis dignissim in rhoncus
              enim. Interdum et malesuada fames ac ante ipsum primis in
              faucibus. Fusce ultrices massa id pellentesque porta.
            </p>
          </div>
          <div className="row">
            <img
              src={about1}
              alt="Person Working On a Computer"
              className={imageOneClassName}
            />
            <div>
              <h3>The YaKKel Story</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent tincidunt in justo quis sodales. Sed malesuada leo eu
                accumsan imperdiet. Aenean a metus non orci efficitur facilisis.
                Pellentesque non neque nisl. Proin viverra sem sit amet purus
                consequat dapibus. <span>Pellentesque habitant</span> morbi
                tristique senectus et netus et malesuada fames ac turpis
                egestas. Sed maximus magna vel velit commodo, at porttitor mi
                porta.
              </p>
              <p ref={imageOneRef}>
                Nullam vestibulum nisi vel ultricies bibendum. Aliquam lacus
                magna, auctor eget sodales nec, commodo vel magna. Cras accumsan
                augue eu volutpat tincidunt. In vehicula interdum orci non
                fringilla. Maecenas <strong>massa</strong> arcu, faucibus sit
                amet diam non, pulvinar sollicitudin mauris. Nullam arcu lorem,
                vestibulum ac lectus quis, facilisis aliquam eros. Duis vehicula
                nisl a magna blandit hendrerit. Ut rutrum tincidunt malesuada.
                Vestibulum sodales tellus ut maximus fermentum.
              </p>
            </div>
          </div>
          <div className="row">
            <div>
              <h3>Our Mission</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                porttitor ex et pulvinar sagittis. Duis dictum quis arcu a
                aliquam. Donec suscipit <span>velit non leo</span> fringilla
                feugiat. Fusce fringilla posuere leo nec viverra.
              </p>
              <p ref={imageTwoRef}>
                Sed sit amet tincidunt augue. Aenean ac ante arcu. Nam aliquet
                ligula a velit tristique bibendum. Nam ac enim porta, elementum
                diam eu, ullamcorper tellus. Pellentesque condimentum, urna id
                vulputate egestas, nisl mauris sollicitudin urna, eget feugiat
                elit mauris ultrices felis. Mauris dolor ligula, varius id justo
                et, hendrerit condimentum ligula.
              </p>
              <p>
                Maecenas tristique, ex sed vulputate posuere, purus justo
                egestas tortor, ut efficitur urna leo sed neque. Integer sit
                amet egestas risus, <span>sit amet molestie</span> justo. Donec
                hendrerit turpis felis, at condimentum erat ornare dictum. Nunc
                ultricies velit metus, quis mattis massa hendrerit eget. Vivamus
                placerat tellus sit amet volutpat laoreet.
              </p>
            </div>

            <img
              className={imageTwoClassName}
              src={about2}
              alt="Computer On a Table"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
