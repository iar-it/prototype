import React from "react";
import {
  getPrayers,
  getPrayersNext,
  getPrayersPrev
} from "../../services/actions/Prayers";
import { capitalCase } from "change-case";
import moment from "moment";
import {
  Button,
  IconButton,
  Card,
  CardContent,
  CardActions
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

import {
  NavigateNext as NextIcon,
  NavigateBefore as PrevIcon
} from "@material-ui/icons";

const useStyles = makeStyles({
  card: {
    maxWidth: "500px",
    border: "1px solid #f3deb9",
    borderLeft: "10px solid #f3deb9",
    backgroundColor: "#fff9e6",
    padding: "10px",
    marginTop: "10px",
    marginBottom: "10px"
  }
});

// Neo Colors:

const Prayers = ({ store }) => {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(store);

  React.useEffect(() => {
    const prayers = async () => {
      try {
        await getPrayers(dispatch);
      } catch (error) {
        console.log(error);
      }
    };

    prayers();
  }, []);

  console.log(state.prayers);

  const { hijri, adhan, iqamah, day } = state.prayers;

  const prayerNames = ["fajr", "shuruq", "dhuhr", "asr", "maghrib", "isha"];

  const TableRows = () => {
    return prayerNames.map(key => (
      <tr key={key}>
        <th scope="row">{capitalCase(key)}</th>
        <td>{adhan[key]}</td>
        <td>{iqamah[key]}</td>
      </tr>
    ));
  };

  const GregorianDate = moment().format("dddd, MMMM Do YYYY");

  const HijriDate = `${hijri.month} ${hijri.day}, ${hijri.year} Hijri`;

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between">
        <h2 className="">Prayer Times</h2>
        <h2 style={{ textAlign: "right" }} title="اوقات الصلاة&nbsp;">
          اوقات الصلاة&nbsp;
        </h2>
      </div>

      {/* <h2 title="اوقات الصلاة&nbsp;">اوقات الصلاة&nbsp;</h2>
      <h4>{GregorianDate}</h4>
      <h4>{HijriDate}</h4> */}
      {/* <Card className={classes.card}>
        <CardContent>
          <h4>{GregorianDate}</h4>
          <h4>{HijriDate}</h4>
          <table>
            <thead>
              <tr>
                <th>Prayer</th>
                <th>Athan</th>
                <th>Iqamah</th>
              </tr>
            </thead>
            <tbody>
              <TableRows />
            </tbody>
          </table>
          <IconButton onClick={() => getPrayersPrev(dispatch, day)}>
            <PrevIcon />
          </IconButton>
          <IconButton onClick={() => getPrayersNext(dispatch, day)}>
            <NextIcon />
          </IconButton>
        </CardContent>
      </Card>*/}
      <NeoWrap className="row justify-content-between">
        <div className="col-sm-6 col-md-12 col-lg-12 py-3">
          <NeoBox>
            <NeoHeader>{GregorianDate}</NeoHeader>
            <NeoHeader>{HijriDate}</NeoHeader>
            <PrayerTable>
              <table className="table table-sm ">
                <thead>
                  <tr>
                    <th scope="col">Prayer</th>
                    <th scope="col">Athan</th>
                    <th scope="col">Iqamah</th>
                  </tr>
                </thead>
                <tbody>
                  <TableRows />
                </tbody>
              </table>
            </PrayerTable>
            <PrayerActions>
              <IconButton onClick={() => getPrayersPrev(dispatch, day)}>
                <PrevIcon />
              </IconButton>
              <IconButton onClick={() => getPrayersNext(dispatch, day)}>
                <NextIcon />
              </IconButton>
            </PrayerActions>
          </NeoBox>
        </div>
        <div className="col-sm-6 col-md-12 col-lg-12 py-3">
          <NeoBox>
            <NeoHeader>{GregorianDate}</NeoHeader>
            <NeoHeader>{HijriDate}</NeoHeader>
            <PrayerTable>
              <table>
                <thead>
                  <tr>
                    <th>Prayer</th>
                    <th>Athan</th>
                    <th>Iqamah</th>
                  </tr>
                </thead>
                <tbody>
                  <TableRows />
                </tbody>
              </table>
            </PrayerTable>
          </NeoBox>
        </div>
      </NeoWrap>

      {/* <NeoWrap>
        <NeoBox />
      </NeoWrap> */}
    </div>
  );
};

// width: 315px;
// height: 315px;
// background: transparent;
// width: 315px;
// height: 315px;
// background: #fff9e6;
// box-shadow: -5px -5px 15px rgba(255, 255, 255, 0.8);
// width: 315px;
// height: 315px;
// background: #fff9e6;
// box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);

const NeoWrap = styled.div`
  background-color: #fff9e6;
  position: relative;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1),
    -5px -5px 15px rgba(255, 255, 255, 0.8);
  ${"" /* box-shadow: 9px 9px 16px rgb(234, 207, 164, 0.2),
    -9px -9px 16px rgba(255, 255, 255, 0.5); */}
  border-radius: 5px;
  ${"" /* @media only screen and (max-width: 768px) {
    display: flex;
  }
  @media only screen and (max-width: 550px) {
    display: block;
  } */}
`;

const PrayerTable = styled.div`
  align-self: center;
`;

const PrayerActions = styled.div`
  align-self: center;
`;

const NeoBox = styled.div`
  display: flex;
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
  ${"" /* max-width: 250px; */}
`;

const NeoHeader = styled.h1`
  align-self: center;
  font-size: 1rem;
  margin: 0;
`;

// Light color: fbf4e8
// Mid (main) color: f7e9d0
// Dark color: f3deb9

export default Prayers;
