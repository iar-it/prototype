import React, { createContext, useReducer } from "react";
import moment from "moment";

const dayStart = moment()
  .add(0, "days")
  .hours(0)
  .minutes(0)
  .seconds(0)
  .toISOString();

const dayEnd = moment()
  .add(0, "days")
  .hours(23)
  .minutes(59)
  .seconds(59)
  .toISOString();

const initialState = {
  prayers: {
    day: 0,
    gregorian: {},
    hijri: {},
    adhan: {},
    iqamah: {}
  },
  announcements: [],
  announcement: {
    entry_id: "",
    entry_modified_on: "",
    entry_title: "",
    entry_excerpt: "",
    fileinfo_url: "",
    fileinfo_file_path: ""
  },
  calendars: {}
};
export const store = createContext();
const { Provider } = store;

// Reducer Function
function reducer(state, action) {
  switch (action.type) {
    case "GET_PRAYERS":
      return { ...state, prayers: action.payload };
    case "GET_ANNOUNCEMENTS":
      return { ...state, announcements: action.payload };
    default:
      return state;
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Provider value={value}>{children}</Provider>;
};
