import React, { useState } from "react";
import logo from "./../../assets/images/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import ChangePasswordModal from "../changePasswordModal";

export function Navbar() {
  const [showChangePassword, setshowChangePassword] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <ChangePasswordModal
        show={showChangePassword}
        setShow={setshowChangePassword}
      />

      <div dir="ltr">
        <nav className="border-gray-200 bg-white dark:bg-gray-900">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
            <img
              onClick={() => {
                window.location.reload();
              }}
              src={logo}
              className="my-[-30px] w-[200px]"
              alt="Flowbite Logo"
            />

            <div className="flex items-center">
              <button
                type="button"
                className="mr-2 mb-2 rounded-lg bg-[#080a54] px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-400 "
                onClick={() => {
                  let result = window.confirm("دەتەوێت بچیە دەرەوە؟");
                  if (result) {
                    localStorage.clear();
                    navigate("/sign-in");
                  }
                }}
              >
                چوونەدەرەوە
              </button>
              <button
                type="button"
                className="mr-2 mb-2 rounded-lg bg-[#ff3434] px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-400 "
                onClick={() => {
                  setshowChangePassword(true);
                }}
              >
                گۆڕینی وشەی نهێنی
              </button>
              <button
                type="button"
                class="mr-2 mb-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={() => {
                  window.alert(
                    `ناو : ${
                      JSON.parse(localStorage.getItem("userData")).name
                    }    |     ئیمەیڵ : ${
                      JSON.parse(localStorage.getItem("userData")).email
                    }     |     ڕۆل : ${
                      JSON.parse(localStorage.getItem("userData")).role
                    }`
                  );
                }}
              >
                بەکارهێنەر
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
