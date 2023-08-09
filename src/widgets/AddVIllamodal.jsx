import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const CustomAddVillas = ({ show, setShow }) => {
  const [newNumber, setNewNumber] = useState("");
  const [oldNumber, setOldNumber] = useState("");
  const [size, setSize] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    console.log(oldNumber, newNumber, size, location, isLoading);
    try {
      const response = await axios.post(
        "https://api.waren-d.com/public/api/SelfHouse",
        {
          userId: "1",
          newNumber,
          oldNumber,
          size,
          location,
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
      setLocation("");
      setNewNumber("");
      setOldNumber("");
      setSize("");
      toast.success("successfully!");
      setShow(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      console.error(JSON.stringify(error));
      toast.error("Error adding house. Please try again.");
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
          <Modal.Title>{`زیادکردنی ڤێلای نوێ `} </Modal.Title>
          <button
            className="  text-[13px] rounded-lg text-white p-2 text-center  bg-red-400"
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
              ژمارەی نوێ
            </label>
            <input
              value={newNumber}
              onChange={(e) => {
                setNewNumber(e.target.value);
              }}
              type="text"
              id="success"
              className="block w-full  rounded-lg  border bg-green-50 p-2.5  text-sm text-gray-900 placeholder-gray-400"
              placeholder={newNumber}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="success"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              ژمارەی کۆن
            </label>
            <input
              value={oldNumber}
              onChange={(e) => {
                setOldNumber(e.target.value);
              }}
              type="text"
              id="success"
              className="block w-full  rounded-lg  border bg-green-50 p-2.5  text-sm text-gray-900 placeholder-gray-400"
              placeholder={oldNumber}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="success"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              ڕووبەر
            </label>
            <input
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
              }}
              type="text"
              id="success"
              className="block w-full  rounded-lg  border bg-green-50 p-2.5  text-sm text-gray-900 placeholder-gray-400"
              placeholder={size}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="success"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              ناونیشان
            </label>
            <input
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              type="text"
              id="success"
              className="block w-full  rounded-lg  border bg-green-50 p-2.5  text-sm text-gray-900 placeholder-gray-400"
              placeholder={location}
            />
          </div>
          <div
            className="flex items-center justify-center rounded-lg bg-blue-500 px-3 py-2.5 text-center text-white"
            onClick={(e) => {
              handleSubmit(e);
             
            }}
          >
            زیادکردن
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomAddVillas;
