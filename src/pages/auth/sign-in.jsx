import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@material-ui/core";
import { Navigate, useNavigate } from "react-router-dom";
import logo2 from "./../../assets/images/1.png"
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://api.waren-d.com/public/api/login",
        {
          email,
          password,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

       localStorage.setItem(
        "userData",
        JSON.stringify({ ...response.data })
      );
      console.log(localStorage.getItem("userData"));
      if (response.status != 200) {
        toast.error("Invalid email or password.");
      }
      navigate("/dashboard/appartmentCase");
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password  !!!");
    }
    setIsLoading(false);
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <a
            href="#"
            className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="mr-2 w-64" src={logo2} />
            
          </a>
          <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                چوونەژورەوە
              </h1>
              <div className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    ئیمەیڵ
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    وشەی نهێنی
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900  sm:text-sm"
                  />
                </div>

                <button
                  onClick={() => {
                    handleSubmit();
                  }}
                  className="hover:scale-105 transition-all focus:ring-primary-300  w-full rounded-lg bg-[#080a54] px-5 py-3  text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "چوونەژورەوە"
                  )}
                </button>
                {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="#"
                    className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                  >
                    Sign up
                  </a>
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Email</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Login"
            )}
          </button>
        </form> */}
      <ToastContainer />
      {/* </div> */}
    </>
  );
}

export default LoginPage;
