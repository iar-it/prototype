import Announcements from "../components/Announcements";
import Prayers from "../components/Prayers";
import styled from "styled-components";
import React from "react";

export const Main = ({ store }) => {
  return (
    <ContentWrapper>
      <Content>
        <PrayerWrap>
          <Prayers store={store} />
        </PrayerWrap>
        <AnnouncementWrap>
          <Announcements store={store} />
        </AnnouncementWrap>
      </Content>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  @media only screen and (max-width: 768px) {
    margin: 0;
  }
  display: block;
  max-width: 1032px;
  ${"" /* margin: 75px auto; */}
`;

const Content = styled.div`
  @media only screen and (max-width: 768px) {
    display: block;
  }

  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const AnnouncementWrap = styled.div`
  order: 1;
  padding: 15px;
  width: 100%;
  max-width: 700px;
`;

const PrayerWrap = styled.div`
  order: 2;
  padding: 15px;
  min-width: 300px;
  top: 0;
  right: 0;
  overflow-x: scroll;
  @media only screen and (min-width: 768px) {
    width: 300px;
    height: 100%;
    position: -webkit-sticky;
    position: sticky;
  }
`;
