import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { Dialog } from "@mui/material";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { showSnackbar, showDialogBox } = useAppContext();
  const request = async (url) => {
    setLoading(true);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          // showSnackbar(`Your session has expired`, "error");
          showDialogBox(
            "Session Expired",
            "Your session has expired. Please log in again."
          );
        }
        if (!res.ok) {
          console.log(res);
          throw new Error(`HTTP Status: ${res.status}`);
        }
        return res.json();
      })
      .catch((err) => {
        showSnackbar(`Something went wrong. (${err.message})`, "error");
        setLoading(false);
      });
    setLoading(false);
    return response;
  };
  const postData = async (url, payload) => {
    setLoading(true);
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": Cookies.get("csrf_access_token"),
      },
      credentials: "include",
      body: JSON.stringify(payload ? payload : {}),
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            showDialogBox(
              "Session Expired",
              "Your session has expired. Please log in again."
            );
          } else {
            throw new Error(`HTTP Status: ${res.status}`);
          }
        }
        return res.json();
      })
      .catch((err) => {
        showSnackbar(`Something went wrong. (${err.message})`, "error");
        setLoading(false);
      });
    setLoading(false);
    return response;
  };
  return { request, postData, loading, open, setOpen };
  //

  // const fetchData = async (url, options = {}) => {
  //   // Set up default headers
  //   const defaultHeaders = {

  //     "X-CSRF-TOKEN": Cookies.get("csrf_access_token"), // CSRF token
  //     credentials: "include", // Send credentials
  //   };

  //   const fetchOptions = {
  //     ...options,
  //     headers: {
  //       ...defaultHeaders,
  //       ...options.headers, // Merge with options.headers so it can be overridden
  //     },
  //   };

  //   try {
  //     const response = await fetch(url, fetchOptions);
  //     if (!response.ok) {
  //       const jsonResponse = await response.json();
  //       if (response.status === 401) {
  //         if (jsonResponse.msg === "Token has expired") {
  //           showSnackbar("Your session has expired. Please log in again.");
  //         }
  //       } else {
  //         showSnackbar(jsonResponse.msg, "error");
  //       }
  //       // throw new Error(`HTTP error! Status: ${response.status}`); // Throw an error
  //     }

  //     // You may want to handle non-JSON responses differently
  //     const data = await response.json();

  //     return data;
  //   } catch (error) {
  //     // If there was a network error or JSON decoding error, show a general error message
  //     showSnackbar(error.message, "error");
  //   }
  // };

  // ]\\\\\return fetchData;
};

export default useFetch;
