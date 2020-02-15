import React from "react";
import styled from "styled-components";

const ContentCard = ({ children }) => {
  const ContentCard = styled.div`
    display: block;
    flex-direction: column;
    ${"" /* border: 4px solid #fbf4e8; */}
    ${"" /* border: 4px solid #f1f3f6; */}
    background-color: #fff9e6;
    ${"" /* box-shadow: 9px 9px 16px rgb(241, 243, 246, 0.6),
      -9px -9px 16px rgba(255, 255, 255, 0.5); */}
    box-shadow: 9px 9px 16px rgb(234, 207, 164, 0.2),
      -9px -9px 16px rgba(255, 255, 255, 0.5);
    ${"" /* box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1),
      -5px -5px 15px rgba(255, 255, 255, 0.8); */}
    border-radius: 5px;
    margin-bottom: 10px;
    @media only screen and (max-width: 768px) {
      max-width: 500px;
      max-height: 30vh;
      overflow: hidden;
      scroll-snap-align: center;
      justify-content: flex-start;
      align-items: flex-start;
    }
  `;
  return <ContentCard>{children}</ContentCard>;
};

export default ContentCard;
