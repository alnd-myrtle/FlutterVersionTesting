import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";

const EditeappartmentModel = ({ show, setShow, appartmentData }) => {
  console.log(appartmentData);
  const [selectedappartmentData, setselectedappartmentData] = useState({});
//
  const [formData, setFormData] = useState({
    fullName: "",
    apartmentNumber: "",
    phone1: "",
    price: "",
    invoice: "",
    unitType: "",
    amount: "",
    note: "",
    floor: "",
    builidng: "",
    type1: "0",
    type2: "0",
    type3: "0",
  });

  const [loading, setLoading] = useState(false);

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
        "https://api.waren-d.com/api/Selfapartment/" + appartmentData.id,
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
      console.log(res);
      setLoading(false);
      toast.success("بەسەرکەوتووی گۆڕدرا");
      setFormData({
        fullName: "",
        apartmentNumber: "",
        phone1: "",
        price: "",
        invoice: "",
        unitType: "",
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

  useEffect(() => {
    setFormData({
      fullName: appartmentData.fullName,
      apartmentNumber: appartmentData.apartmentNumber,
      phone1: appartmentData.phone1,
      price: appartmentData.price,
      invoice: appartmentData.invoice,
      unitType: appartmentData.unitType,
      amount: appartmentData.amount,
      note: appartmentData.note,
      floor: appartmentData.floor,
      builidng: appartmentData.builidng,
      type1: 0,
      type2: 0,
      type3: 0,
    });
  }, [appartmentData]);

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
        <Modal.Header className="text-blue-500">
          <Modal.Title>{`دەسکاری کەیسی ڤیلا `} </Modal.Title>
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
                    placeholder={appartmentData.fullName}
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="apartmentNumber"
                  ></label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="apartmentNumber"
                    type="text"
                    placeholder={appartmentData.apartmentNumber}
                    name="apartmentNumber"
                    value={formData.apartmentNumber}
                    onChange={handleChange}
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
                    placeholder={appartmentData.phone1}
                    name="phone1"
                    value={formData.phone1}
                    onChange={handleChange}
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
                    placeholder={appartmentData.price}
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="invoice"
                  >
                    حساب
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="invoice"
                    type="text"
                    placeholder={appartmentData.invoice}
                    name="invoice"
                    value={formData.invoice}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="unitType"
                  >
                    جۆری یەکە{" "}
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="unitType"
                    data-date-format="DD MMMM YYYY"
                    type="text"
                    placeholder={appartmentData.unitType}
                    name="unitType"
                    value={formData.unitType}
                    onChange={handleChangeDate}
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
                    placeholder={appartmentData.amount}
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
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
                    placeholder={appartmentData.note}
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
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
                    نهۆم
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="floor"
                    type="text"
                    placeholder={appartmentData.floor}
                    name="floor"
                    value={formData.floor}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="-mx-3 mb-6 flex flex-wrap">
                {/* builidng */}
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="builidng"
                  >
                    باڵەخانە
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="builidng"
                    type="text"
                    placeholder={appartmentData.builidng}
                    name="builidng"
                    value={formData.builidng}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="w-full px-3">
                  <button
                    className="mr-2 mb-2 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                    type="submit"
                  >
                    {loading ? "چاوەڕوانبە" : " دەسکاری"}
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

export default EditeappartmentModel;
