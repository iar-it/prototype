import Announcements from "../home/Announcements";
import Prayers from "../home/Prayers";
import styled from "styled-components";
import React from "react";

export const Home = ({ store }) => {
  const globalState = React.useContext(store);

  return (
    <Content>
      <Main>
        <PrayerWrap>
          <Prayers store={store} />
        </PrayerWrap>
        <AnnouncementWrap>
          <Announcements store={store} />
        </AnnouncementWrap>
      </Main>
    </Content>
  );
};

const Content = styled.div`
  display: block;
  max-width: 1032px;
  ${"" /* max-width: 724px; */}
  margin: 75px auto;
  ${"" /* margin: 25px 50px 75px 100px; */}
`;

const Main = styled.div`
  @media only screen and (max-width: 768px) {
    display: block;
  }

  display: flex;
  ${"" /* background-color: #fff9e6; */}
  justify-content: space-between;
  width: 100%;
`;

const AnnouncementWrap = styled.div`
  order: 1;
  ${"" /* border: 3px solid black; */}
  padding: 15px;
  ${"" /* background-color: #fff; */}
  min-height: 150vh;
  width: 100%;
  max-width: 700px;
`;

const PrayerWrap = styled.div`
  order: 2;
  ${"" /* border: 3px solid black; */}
  padding: 15px;
  ${"" /* background-color: #fff; */}
  min-width: 300px;
  top: 0;
  right: 0;
  @media only screen and (min-width: 768px) {
    width: 300px;
    height: 100%;
    position: -webkit-sticky;
    position: sticky;
  }
`;
