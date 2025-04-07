import React, { useState } from 'react';
import {
  AboutUsContainer,
  Title,
  Section,
  LearnMoreButton,
  LogoExplanation,
  LogoImage,
  TextBlock
} from './AboutUsStyle';
import COLORSLOGO from "../../assets/images/LOGOCOLORS.png";


function AboutUs() {
  const [showMore, setShowMore] = useState(false);

  const handleLearnMore = () => {
    setShowMore(!showMore);
  };

  return (
    <AboutUsContainer>
      <Title>About Us</Title>
      <Section>
        <p>
        Welcome to JUniVerse, a platform designed to empower and connect the bright minds of the King Abdullah II School of Information Technology.  Our goal is to create a friendly online space where students can work together, share knowledge, and come up with new ideas. We want to help make your learning and social life even better.        </p>
      </Section>
      <Section>
        <p>
        JUniVerse is a comprehensive platform designed to support your academic and personal journey.– 
        It provides you with the opportunity to chat with others, exchange files, access mental health support, and stay up-to-date with the latest news, all in one place. Whether you’re looking to connect with peers, seek guidance, or stay informed, JUniVerse helps you explore new ideas, grow personally and academically, and connect with the resources that matter most.        </p>
      </Section>
      <LearnMoreButton onClick={handleLearnMore}>About the logo</LearnMoreButton>
      {showMore && (
  <LogoExplanation>
<LogoImage src={COLORSLOGO} alt="Logo Concept" style={{ width: '400px', height: '600' }} />
<TextBlock>
  <br/>
  <br/>

      <h2 style={{ color: '#4b0082' }} >Logo Concept Explanation</h2>
      <p>
        The colors in the JUNIVERSE logo are inspired by the galaxy—glowing, colorful, and full of energy. Just like space is full of stars and planets, JUNIVERSE is full of ideas, creativity, and connection.
      </p>
      <p>
        This platform is made for KASIT students to have their own universe—a place where they can learn, share, collaborate, and grow together during their university journey.
      </p>
    </TextBlock>
  </LogoExplanation>
)}

    </AboutUsContainer>
  );
}

export default AboutUs;
