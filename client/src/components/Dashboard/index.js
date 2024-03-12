import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Dashboard = () => {
  //console.log(sessionStorage.getItem("token"), "token");

  const [token, setToken] = useState();

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, [token]);

  const [secretData, setSecretData] = useState("");

  const getSecretData = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(
        `${process.env.REACT_APP_JSONWEBTOKEN_URL}/dashboard`,
        config
      );
      console.log(res, "res");

      const data = res.data;
      console.log(data, "dd");
      setSecretData(data.message + data?.secret);
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="flex flex-col container mx-auto justify-center place-items-center mt-2  p-8 w-full">
        <h2 className="flex my-4 font-semibold text-2xl"> Dashboard</h2>

        {token ? (
          <span className="my-1 text-green-800 font-semibold">
            {" "}
            Token present
          </span>
        ) : (
          <span className="my-1 text-red-800 font-semibold">
            {" "}
            No Token present
          </span>
        )}

        <span className="text-lg font-bold my-6">{secretData}</span>

        <div className="form-control mt-12 w-full">
          <button
            className="btn btn-primary text-md p-0"
            onClick={() => getSecretData()}
          >
            Get Data
          </button>
        </div>
      </div>
    </>
  );
};
