import React from "react";
import styled from "styled-components";

const ContentCard = ({ children }) => {
  const ContentCard = styled.div`
    display: block;
    flex-direction: column;
    background-color: #fff9e6;
    box-shadow: 9px 9px 16px rgb(234, 207, 164, 0.2),
      -9px -9px 16px rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    margin-bottom: 10px;
    @media only screen and (max-width: 768px) {
      max-width: 500px;
      max-height: 30vh;
      overflow-y: scroll;
      overflow-x: hidden;
      scroll-snap-align: center;
      justify-content: flex-start;
      align-items: flex-start;
    }
  `;
  return <ContentCard>{children}</ContentCard>;
};

export default ContentCard;
