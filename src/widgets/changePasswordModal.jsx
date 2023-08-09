import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ChangePasswordModal = ({ show, setShow }) => {
  const [current_password, setcurrent_password] = useState("");
  const [new_password, setnew_password] = useState("");
  const [new_password_confirmation, setnew_password_confirmation] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(current_password, new_password, new_password_confirmation);
    try {
      const response = await axios.post(
        "https://api.waren-d.com/public/api/change-password",
        {
          current_password,
          new_password,
          new_password_confirmation,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userData")).token
            }`,
          },
        }
      );
      console.log(response);
      setcurrent_password("");
      setnew_password("");
      setnew_password_confirmation("");
      toast.success("successfully!");
      setShow(false);
    } catch (error) {
      console.log(error.response.data.message);
      console.error(JSON.stringify(error));
      toast.error(error.response.data.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
          //   window.location.reload();
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          color="#0000FF"
          className="flex items-center justify-between text-blue-500 "
        >
          <Modal.Title>{`گۆڕینی وشەی نهێنی`} </Modal.Title>
          <button
            className="  rounded-lg bg-red-400 p-2 text-center text-[13px]  text-white"
            onClick={() => {
              setShow(false);
            }}
          >
            داخستن
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-6">
            <label
              htmlFor="success"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              وشەی نهێنی کۆن{" "}
            </label>
            <input
              value={current_password}
              onChange={(e) => {
                setcurrent_password(e.target.value);
              }}
              type="text"
              id="success"
              className="block w-full  rounded-lg  border bg-green-50 p-2.5  text-sm text-gray-900 placeholder-gray-400"
              placeholder={' وشەی نهێنی کۆن'}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="success"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              وشەی نهێنی نوێ
            </label>
            <input
              value={new_password}
              onChange={(e) => {
                setnew_password(e.target.value);
              }}
              type="text"
              id="success"
              className="block w-full  rounded-lg  border bg-green-50 p-2.5  text-sm text-gray-900 placeholder-gray-400"
              placeholder={' وشەی نهێنی نوێ '}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="success"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              دووبارە وشەی نهێنی نوێ
            </label>
            <input
              value={new_password_confirmation}
              onChange={(e) => {
                setnew_password_confirmation(e.target.value);
              }}
              type="text"
              id="success"
              className="block w-full  rounded-lg  border bg-green-50 p-2.5  text-sm text-gray-900 placeholder-gray-400"
              placeholder={'دووبارە وشەی نهێنی نوێ'}
            />
          </div>
          
          <div
            className="flex items-center justify-center rounded-lg bg-blue-500 px-3 py-2.5 text-center text-white"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            گۆڕین
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
