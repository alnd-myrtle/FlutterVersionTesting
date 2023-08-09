import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
//
import moment from "moment/moment";
const CustomAddApartment = ({ show, setShow, appartmentData }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    apartmentNumber: "",
    phone1: "",
    price: "",
    invoice: "",
    unitType: "appartment",
    amount: "",
    note: "",
    floor: "",
    builidng: "",
    type1: "0",
    type2: "0",
    type3: "0",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChangeDate = (e) => {
    console.log(e);
    setFormData({
      ...formData,
      [e.target.name]: moment(e.target.value).format("YYYY-MM-DD"),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axios.post(
        "https://api.waren-d.com/api/Selfapartment",
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userData")).token
            }`,
          },
        }
      );
      setLoading(false);
      toast.success("بەسەرکەوتووی زیادکرا");
      setFormData({
        fullName: "",
        apartmentNumber: "",
        phone1: "",
        price: "",
        invoice: "",
        unitType: "appartment",
        amount: "",
        note: "",
        floor: "",
        builidng: "",
        type1: "0",
        type2: "0",
        type3: "0",
      });
      setShow(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.response.data.msg);
    }
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
        <Modal.Header className="flex flex-row items-center justify-between text-blue-500">
          <Modal.Title>{`زیادکردنی شوقە`} </Modal.Title>
          <button
            className="  rounded-lg bg-red-400 p-2 text-center text-[13px]  text-white"
            onClick={() => {
              setShow(false);
            }}
          >
            داخستن
          </button>
        </Modal.Header>
        <Modal.Body className="overflow-y-scroll">
          <div className="flex h-screen flex-col  items-center  " dir="rtl">
            <ToastContainer />
            <h2 className="mb-10 mt-10 text-2xl font-bold"></h2>
            <form className="w-full max-w-md" onSubmit={handleSubmit}>
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="fullName"
                  >
                    ناو{" "}
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="fullName"
                    type="text"
                    placeholder="ناوی تەواو"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="apartmentNumber"
                  >
                    'ژمارەی شوقە'
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="apartmentNumber"
                    type="text"
                    placeholder="ناونیشان بنووسە"
                    name="apartmentNumber"
                    value={formData.apartmentNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="phone1"
                  >
                    ژمارەی مۆبایل{" "}
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="phone1"
                    type="text"
                    placeholder="تکایە لێرە بنووسە"
                    name="phone1"
                    value={formData.phone1}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="price"
                  >
                    نرخ{" "}
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="price"
                    type="text"
                    placeholder="تکایە لێرە بنووسە"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="invoice"
                  >
                    ڕەچەتە{" "}
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="invoice"
                    type="text"
                    placeholder="تکایە لێرە بنووسە"
                    name="invoice"
                    value={formData.invoice}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="builidng"
                  >
                    باڵەخانە{" "}
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="builidng"
                    type="text"
                    placeholder="تکایە لێرە بنووسە"
                    name="builidng"
                    value={formData.builidng}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="amount"
                  >
                    ماوە{" "}
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="amount"
                    type="text"
                    placeholder="تکایە لێرە بنووسە"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="note"
                  >
                    تێبینی{" "}
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="note"
                    type="text"
                    placeholder="تکایە لێرە بنووسە"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="-mx-3 mb-6 flex flex-wrap">
                {/* houseNumber */}
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="floor"
                  >
                    ڕووبەر
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="floor"
                    type="text"
                    placeholder="تکایە لێرە بنووسە"
                    name="floor"
                    value={formData.floor}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
             
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="w-full px-3">
                  <button
                    className="mr-2 mb-2 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                    type="submit"
                  >
                    {loading ? "چاوەڕوانبە" : " زیادکردن"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomAddApartment;
