import axios from "axios";
import moment from "moment";

export const getPrayers = async dispatch => {
  const resSuccess = data => {
    const payload = {
      day: 0,
      hijri: data.hijri,
      adhan: data.adhan,
      iqamah: data.iqamah
    };
    return dispatch({ type: "GET_PRAYERS", payload: payload });
  };
  const resError = error => {
    console.error(error);
    return dispatch({ type: "GET_ERRORS", payload: error });
  };
  try {
    const response = await axios.get("/api/v1/prayers");
    if (response.data.success) {
      return resSuccess(response.data);
    } else {
      resError(response);
    }
  } catch (error) {
    return resError(error);
  }
};

export const getPrayersNext = async (dispatch, day) => {
  const offset = day + 1;

  const resSuccess = data => {
    const payload = {
      day: offset,
      hijri: data.hijri,
      adhan: data.adhan,
      iqamah: data.iqamah
    };
    return dispatch({ type: "GET_PRAYERS", payload: payload });
  };
  const resError = error => {
    console.error(error);
    return dispatch({ type: "GET_ERRORS", payload: error });
  };
  try {
    const date = moment()
      .add(offset, "days")
      .format("YYYY-MM-DD");
    const response = await axios.get(`/api/v1/prayers/${date}`);
    if (response.data.success) {
      return resSuccess(response.data);
    } else {
      resError(response);
    }
  } catch (error) {
    return resError(error);
  }
};

export const getPrayersPrev = async (dispatch, day) => {
  const offset = day - 1;

  const resSuccess = data => {
    const payload = {
      day: offset,
      hijri: data.hijri,
      adhan: data.adhan,
      iqamah: data.iqamah
    };
    return dispatch({ type: "GET_PRAYERS", payload: payload });
  };
  const resError = error => {
    console.error(error);
    return dispatch({ type: "GET_ERRORS", payload: error });
  };
  try {
    const date = moment()
      .add(offset, "days")
      .format("YYYY-MM-DD");
    const response = await axios.get(`/api/v1/prayers/${date}`);
    if (response.data.success) {
      return resSuccess(response.data);
    } else {
      resError(response);
    }
  } catch (error) {
    return resError(error);
  }
};
