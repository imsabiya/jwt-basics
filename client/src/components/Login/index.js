import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const submitHandler = async (loginData) => {
    //console.log(loginData, "data");

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_JSONWEBTOKEN_URL}/login`,
        loginData
      );
      const data = res.data;
      //console.log(data, "dd");
      sessionStorage.setItem("token", data.token);
      reset();
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <>
    <ToastContainer autoClose={2000} />
      <div className="flex flex-col container mx-auto justify-center place-items-center mt-2 rounded-md shadow-xl p-8 w-full">
        <h2 className="flex my-4 font-bold text-xl"> Login / Register</h2>
        <form className="" onSubmit={handleSubmit(submitHandler)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter user name"
              className="input input-bordered"
              required
              {...register("userName", {
                required: "userName is required",
                pattern: {
                  value: /^[A-Za-z]+[A-Za-z0-9 -]*/i,
                  message: "Invalid userName",
                },
              })}
            />
          </div>
          {errors.userName && (
            <span className="text-red-400 text-left text-sm ml-1 my-1">
              {errors.userName}
            </span>
          )}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="input input-bordered"
              required
              {...register("password", {
                required: "Password is required",
                minLength: 6,
              })}
            />
          </div>
          {errors.password && (
            <span className="text-red-400 text-left text-sm ml-1 my-1">
              {errors.password}
            </span>
          )}
          <div className="form-control mt-6">
            <button className="btn btn-primary text-md">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};
