import React from "react";
import { getAnnouncements } from "../services/actions/Announcements";
import styled from "styled-components";
import {
  CardContent,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import parse from "html-react-parser";

const Announcements = ({ store }) => {
  const { state, dispatch } = React.useContext(store);
  const [open, setOpen] = React.useState(false);
  const [card, setCard] = React.useState({ serialHTML: "" });

  const handleClickOpen = item => {
    setOpen(true);
    setCard(item);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const EntryHTML = () => {
    const entry_HTML = parse(card.serialHtml, {
      replace: domNode => {
        if (domNode.attribs && domNode.name === "img") {
          return (
            <img
              src={`https://raleighmasjid.org${domNode.attribs.src}`}
              width="100%"
              alt={`https://raleighmasjid.org${domNode.attribs.src}`}
            />
          );
        }
      }
    });

    return entry_HTML;
  };

  React.useEffect(() => {
    const announcements = async () => {
      try {
        await getAnnouncements(dispatch);
      } catch (error) {}
    };
    announcements();
  }, []);

  const announcements = state.announcements;

  const AnnouncementList = () =>
    announcements.map(item => {
      const { entry_title, entry_id, serialHtml } = item;

      const newHtmlText = parse(serialHtml, {
        replace: domNode => {
          if (domNode.attribs && domNode.name === "img") {
            return React.createElement(React.Fragment);
          }
        }
      });

      return (
        <CardWrapper key={entry_id}>
          {/* <Card> */}
          <CardActionArea onClick={() => handleClickOpen(item)}>
            <CardContent>
              <Item key={entry_id}>
                <Title>{entry_title}</Title>
                <Excerpt>{newHtmlText}</Excerpt>
                {/* <Excerpt>{parse(serialHtml2)}</Excerpt> */}
              </Item>
            </CardContent>
          </CardActionArea>
          {/* </Card> */}
        </CardWrapper>
      );
    });

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between">
        <h2 className="">Announcements</h2>
        <h2 style={{ textAlign: "right" }} title="الإعلانات&nbsp;">
          الإعلانات&nbsp;
        </h2>
      </div>
      <AnnouncementSlider length={state.announcements.length}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {card.entry_title}
          </DialogTitle>
          <DialogContent>
            <EntryHTML />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <AnnouncementList />
      </AnnouncementSlider>
    </div>
  );
};

export default Announcements;

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

const CardWrapper = styled.div`
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

const AnnouncementSlider = styled.div`
@media only screen and (max-width: 768px) {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(${props => props.length}, minmax(200px, 500px));
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
