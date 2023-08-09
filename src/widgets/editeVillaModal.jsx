import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const EditeVillaModel = ({ show, setShow, villa }) => {
  const [newNumber, setnewNumber] = useState(null);
  const [oldNumber, setoldNumber] = useState(null);
  const [size, setsize] = useState(null);
  const [location, setlocation] = useState(null);

  const editRe = async (id) => {
    console.log(newNumber, oldNumber, size, location);
    try {
      const response = await axios.post(
        `https://api.waren-d.com/api/SelfHouse/${id}`,
        {
          userId: villa.userId,
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
      setShow(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="flex items-center justify-between">
          <Modal.Title>
            {`دەسکاری ڤێلای -ژمارە نوێ - ${villa.newNumber}`}{" "}
          </Modal.Title>
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
              ژمارەی نوێ{" "}
            </label>
            <input
              value={newNumber}
              onChange={(e) => {
                setnewNumber(e.target.value);
              }}
              type="text"
              id="success"
              className="block w-full  rounded-lg  border bg-green-50 p-2.5  text-sm text-gray-900 placeholder-gray-400"
              placeholder={villa.newNumber}
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
                setoldNumber(e.target.value);
              }}
              type="text"
              id="success"
              className="block w-full  rounded-lg  border bg-green-50 p-2.5  text-sm text-gray-900 placeholder-gray-400"
              placeholder={villa.oldNumber}
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
                setsize(e.target.value);
              }}
              type="text"
              id="success"
              className="block w-full  rounded-lg  border bg-green-50 p-2.5  text-sm text-gray-900 placeholder-gray-400"
              placeholder={villa.size}
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
                setlocation(e.target.value);
              }}
              type="text"
              id="success"
              className="block w-full  rounded-lg  border bg-green-50 p-2.5  text-sm text-gray-900 placeholder-gray-400"
              placeholder={villa.location}
            />
          </div>
          <div
            className="flex items-center justify-center rounded-lg bg-blue-500 px-3 py-2.5 text-center text-white"
            onClick={() => {
              editRe(villa.id);
            }}
          >
            دەسکاری
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default EditeVillaModel;
