
import styled from 'styled-components';

export const AboutUsContainer = styled.div`
  padding: 40px;
  max-width: 1000px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  color: #4b0082;
`;

export const Section = styled.section`
  margin-bottom: 20px;
  font-size: 1.1rem;
  line-height: 1.6;
`;


export const LearnMoreButton = styled.button`
  display: block;
  margin: 2rem auto;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const LogoExplanation = styled.div`

  display: flex;
  align-items: flex-start;
  gap: 30px;
  margin-top: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;


export const LogoImage = styled.img`
  width: 250px;
  height: auto;
  object-fit: contain;
  flex-shrink: 0;
`;

export const TextBlock = styled.div`

  flex: 1;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.05rem;
    line-height: 1.6;
    margin-bottom: 10px;
  }
`;




