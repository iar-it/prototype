import React from "react";
import { getAnnouncements } from "../services/actions/Announcements";
import styled from "styled-components";
import { CardContent, Box } from "@material-ui/core";
import ContentCard from "./ContentCard";
const parse5 = require("parse5");

const Announcements = ({ store }) => {
  const { state, dispatch } = React.useContext(store);

  React.useEffect(() => {
    const announcements = async () => {
      try {
        await getAnnouncements(dispatch);
      } catch (error) {
        console.log(error);
      }
    };

    announcements();
  }, []);

  console.log(state.announcements);

  const announcements = state.announcements;

  const AnnouncementList = () =>
    announcements.map(item => {
      const {
        entry_title,
        entry_id,
        entry_excerpt,
        serialHtml,
        serialHtml2,
        parsedHtml,
        parsedHtmlNoImg
      } = item;

      // const before = new RegExp('src="/', "gi");
      // const after = 'src="https://raleighmasjid.org/';
      // const newHtml = parsedHtml.replace(before, after);
      // console.log(newHtml);

      // const doc = parse5.serialize(JSON.parse(newHtml));
      // console.log(doc);

      return (
        <ContentCard>
          <CardContent>
            <Item key={entry_id}>
              <Title>{entry_title}</Title>
              {/* <Excerpt>{newHtml}</Excerpt> */}
              <Excerpt
                dangerouslySetInnerHTML={{
                  __html: serialHtml2
                }}
              ></Excerpt>
            </Item>
          </CardContent>
        </ContentCard>
      );
    });
  const AnnouncementSlider = styled.div`
  @media only screen and (max-width: 768px) {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(${state.announcements.length}, minmax(200px, 500px));
    grid-template-rows: 1fr;
    overflow-x: scroll;
    scroll-snap-type: x proximity;
    padding-bottom: calc(.75 * 20px);
    margin-bottom: calc(-.25 * 20px);
    list-style: none;
    padding: 0;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar
        display: none;
    }
`;

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between">
        <h2 className="">Announcements</h2>
        <h2 style={{ textAlign: "right" }} title="الإعلانات&nbsp;">
          الإعلانات&nbsp;
        </h2>
      </div>
      <AnnouncementSlider>
        <AnnouncementList />
      </AnnouncementSlider>
    </div>
  );
};

const Item = styled.div`
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 20px;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  line-height: 1.2;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-family: inherit;
`;

const Excerpt = styled.span`
  font-size: 0.8rem;
  font-weight: 300;
  margin-bottom: 10px;
  overflow-y: scroll;
`;

export default Announcements;
