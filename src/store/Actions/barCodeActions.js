import {
  fetchBarCodesFail,
  fetchBarCodesSuccess,
  fetchingBarcodes,
} from "store/Slices/barCodeSlice";

export const fetchBardCodes = (authToken) => {
  return async (dispatch) => {
    dispatch(fetchingBarcodes(true));
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASEURL}/api/v1/bar-codes`,
        {
          method: "GET",
          headers: new Headers({
            "Content-type": "application/json",
            Authorization: "Bearer " + authToken,
            apiKey: process.env.REACT_APP_APIKEY,
          }),
        }
      );
      const data = await response.json();
      dispatch(fetchBarCodesSuccess(data.barcodes));
      dispatch(fetchingBarcodes(false));
    } catch (error) {
      dispatch(fetchBarCodesFail(error));
      dispatch(fetchingBarcodes(false));
    }
  };
};
