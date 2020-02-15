import React from "react";
import axios from "axios";

export const getAnnouncements = async dispatch => {
  const resSuccess = data => {
    const payload = data.announcements;

    return dispatch({ type: "GET_ANNOUNCEMENTS", payload: payload });
  };
  const resError = error => {
    console.error(error);
    return dispatch({ type: "GET_ERRORS", payload: error });
  };
  try {
    const response = await axios.get("/api/v1/announcements");
    if (response.data.success) {
      return resSuccess(response.data);
    } else {
      resError(response);
    }
  } catch (error) {
    return resError(error);
  }
};
