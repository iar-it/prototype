import React from "react";
import { getAnnouncements } from "../../services/actions/Announcements";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    // padding: 10,
    // margin: 10
  }
});

const Announcements = ({ store }) => {
  const classes = useStyles();
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

  const List = () =>
    announcements.map(item => {
      const { entry_title, entry_id, entry_excerpt } = item;
      return (
        <Card className={classes.card}>
          <CardContent>
            <Item key={entry_id}>
              <Title>{entry_title}</Title>
              <Excerpt
                dangerouslySetInnerHTML={{
                  __html: entry_excerpt
                }}
              ></Excerpt>
            </Item>
          </CardContent>
        </Card>
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
      <List />
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
`;

export default Announcements;
