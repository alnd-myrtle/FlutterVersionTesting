import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment/moment";
const EditAppartmentCaseModal = ({ show, setShow, appartmentCase }) => {
  const [isInstallment, setisInstallment] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    location: "",
    phone1: "",
    phone2: "",
    contractNumber: "",
    contractDate: "",
    unitType: "",
    buildingSize: "",
    buildingType: "",
    buildingNumber: "",
    floor: "",
    unitNumber: "",
    unitPrice: "",
    apartmentArt: "",
    remainingAmount: "-",
    moneyRemainingAmount: "-",
    notRemainingAmount: "-",
    theStartDateOfTheFirstInstallment: moment().format("YYYY-MM-DD"),
    theEndDateOfTheFirstInstallment: moment().format("YYYY-MM-DD"),
    installmentRemainingAmount: "-",
    theAmountOfMonthlyInstallments: "-",
    thePeriod: "-",
    amountPayments: "-",
    exist: "0",
    type: "nonInstallment",
    type2: "0",
    type3: "0",
    username: "0",
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
        "https://api.waren-d.com/api/apartments/" + appartmentCase.id,
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
        location: "",
        phone1: "",
        phone2: "",
        contractNumber: "",
        contractDate: "",
        unitType: "",
        buildingSize: "",
        buildingType: "",
        buildingNumber: "",
        floor: "",
        unitNumber: "",
        unitPrice: "",
        apartmentArt: "",
        remainingAmount: "-",
        moneyRemainingAmount: "-",
        notRemainingAmount: "-",
        theStartDateOfTheFirstInstallment: moment().format("YYYY-MM-DD"),
        theEndDateOfTheFirstInstallment: moment().format("YYYY-MM-DD"),
        installmentRemainingAmount: "-",
        theAmountOfMonthlyInstallments: "-",
        thePeriod: "-",
        amountPayments: "-",
        exist: "0",
        type: "0",
        type2: "0",
        type3: "0",
        username: "0",
      });
      console.log(res);
      setShow(false);
      // window.location.reload();
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.response.data.msg);
    }
  };
  useEffect(() => {
    setFormData({
      fullName: appartmentCase.fullName,
      location: appartmentCase.location,
      phone1: appartmentCase.phone1,
      phone2: appartmentCase.phone2,
      contractNumber: appartmentCase.contractNumber,
      contractDate: appartmentCase.contractDate,
      unitType: appartmentCase.unitType,
      buildingSize: appartmentCase.buildingSize,
      buildingType: appartmentCase.buildingType,
      buildingNumber: appartmentCase.buildingNumber,
      floor: appartmentCase.floor,
      unitNumber: appartmentCase.unitNumber,
      unitPrice: appartmentCase.unitPrice,
      apartmentArt: appartmentCase.apartmentArt,
      remainingAmount: appartmentCase.remainingAmount,
      moneyRemainingAmount: appartmentCase.moneyRemainingAmount,
      notRemainingAmount: appartmentCase.notRemainingAmount,
      theStartDateOfTheFirstInstallment:
        appartmentCase.theStartDateOfTheFirstInstallment,
      theEndDateOfTheFirstInstallment:
        appartmentCase.theEndDateOfTheFirstInstallment,
      installmentRemainingAmount: appartmentCase.installmentRemainingAmount,
      theAmountOfMonthlyInstallments:
        appartmentCase.theAmountOfMonthlyInstallments,
      thePeriod: appartmentCase.thePeriod,
      amountPayments: appartmentCase.amountPayments,
      exist: appartmentCase.exist,
      type: appartmentCase.type,
      type2: appartmentCase.type2,
      type3: appartmentCase.type3,
      username: appartmentCase.username,
    });
  }, [appartmentCase]);
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
          <Modal.Title>{`زیادکردنی کەیس بۆ ڤێلا`} </Modal.Title>
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
                    htmlFor="location"
                  >
                    ناونیشان
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="location"
                    type="text"
                    placeholder="ناونیشان بنووسە"
                    name="location"
                    value={formData.location}
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
                    1 ژمارەی مۆبایل{" "}
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="phone1"
                    type="number"
                    placeholder="،  ژمارەی ئینگلیزی، تکایە لێرە بنووسە"
                    name="phone1"
                    value={formData.phone1}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="phone2"
                  >
                   2 ژمارەی مۆبایل{" "}
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="phone2"
                    type="number"
                    placeholder="،  ژمارەی ئینگلیزی، تکایە لێرە بنووسە"
                    name="phone2"
                    value={formData.phone2}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="contractNumber"
                  >
                    ژمارەی گرێبەست{" "}
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="contractNumber"
                    type="text"
                    placeholder="تکایە لێرە بنووسە"
                    name="contractNumber"
                    value={formData.contractNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="contractDate"
                  >
                    بەرواری گرێبەست{" "}
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="contractDate"
                    data-date-format="DD MMMM YYYY"
                    type="date"
                    placeholder="Enter Contract Date"
                    name="contractDate"
                    value={formData.contractDate}
                    onChange={handleChangeDate}
                    required
                  />
                </div>
              </div>
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="unitType"
                  >
                    جۆری یەکە{" "}
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="unitType"
                    type="text"
                    placeholder="تکایە لێرە بنووسە"
                    name="unitType"
                    value={formData.unitType}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <label
                    className="text-xsD mb-2 block font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="unitNumber"
                  >
                    ژمارەی یەکە
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="unitNumber"
                    type="text"
                    placeholder="تکایە لێرە بنووسە"
                    name="unitNumber"
                    value={formData.unitNumber}
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
                    htmlFor="buildingSize"
                  >
                    ڕووبەر
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="buildingSize"
                    type="text"
                    placeholder="تکایە لێرە بنووسە"
                    name="buildingSize"
                    value={formData.buildingSize}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="buildingType"
                  >
                    جۆری بینایە
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="buildingType"
                    type="text"
                    placeholder="تکایە لێرە بنووسە"
                    name="buildingType"
                    value={formData.buildingType}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* //houseNumber */}
              </div>
              <div className="-mx-3 mb-6 flex flex-wrap">
                {/* floor */}
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
                    placeholder="تکایە لێرە بنووسە"
                    name="floor"
                    value={formData.floor}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* newHouseNumber */}
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="buildingNumber"
                  >
                    ژمارەی بینایە
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="buildingNumber"
                    type="text"
                    placeholder="تکایە لێرە بنووسە"
                    name="buildingNumber"
                    value={formData.buildingNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              //
              <div className="-mx-3 mb-6 flex flex-wrap">
                {/* unitPrice */}
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="unitPrice"
                  >
                    نرخی یەکە
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="unitPrice"
                    type="text"
                    placeholder="تکایە لێرە بنووسە"
                    name="unitPrice"
                    value={formData.unitPrice}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* newHouseNumber */}
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="apartmentArt"
                  >
                    شێوازی شوقە
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="apartmentArt"
                    type="date"
                    placeholder="تکایە لێرە بنووسە"
                    name="apartmentArt"
                    value={formData.apartmentArt}
                    onChange={handleChangeDate}
                    required
                  />
                </div>
              </div>
              //
              <div className="m-4 flex flex-row-reverse items-center justify-evenly  rounded-xl p-2 shadow-xl">
                <div className=" flex items-center">
                  <input
                    id="default-radio-1"
                    value={isInstallment}
                    onChange={(e) => {
                      setisInstallment(true);
                      setFormData({
                        ...formData,
                        type: "installment",
                      });
                    }}
                    type="radio"
                    defaultChecked
                    defaultValue
                    name="default-radio"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    htmlFor="default-radio-1"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    قیست
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    value={isInstallment}
                    id="default-radio-2"
                    type="radio"
                    onChange={(e) => {
                      setisInstallment(false);
                      setFormData({
                        ...formData,
                        type: "notInstallment",
                      });
                    }}
                    name="default-radio"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    htmlFor="default-radio-2"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    نەقد{" "}
                  </label>
                </div>
              </div>
              {!isInstallment && (
                <>
                  <div className="-mx-3 mb-6 flex flex-wrap">
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                      <label
                        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                        htmlFor="remainingAmount"
                      >
                        بڕی پارەی دراو
                      </label>
                      <input
                        className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        id="remainingAmount"
                        type="text"
                        placeholder="تکایە لێرە بنووسە"
                        name="remainingAmount"
                        value={formData.remainingAmount}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                      <label
                        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                        htmlFor="moneyRemainingAmount"
                      >
                        بڕی پارەی ماوە
                      </label>
                      <input
                        className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        id="moneyRemainingAmount"
                        type="text"
                        placeholder="تکایە لێرە بنووسە"
                        name="moneyRemainingAmount"
                        value={formData.moneyRemainingAmount}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="-mx-3 mb-6 flex flex-wrap">
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                      <label
                        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                        htmlFor="notRemainingAmount"
                      >
                        بڕی پارەی نەماوە
                      </label>
                      <input
                        className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        id="notRemainingAmount"
                        type="text"
                        placeholder="تکایە لێرە بنووسە"
                        name="notRemainingAmount"
                        value={formData.notRemainingAmount}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </>
              )}
              {/* قییییییییییییییییییییییییییییییییییییییسسسسسسسسسسسسسسسسسسسسسسسسسسسسستتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتت */}
              {isInstallment && (
                <div>
                  <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                    <label
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                      htmlFor="theStartDateOfTheFirstInstallment"
                    >
                      بەرواری دەستپیکردنی قیست
                    </label>
                    <input
                      className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      id="theStartDateOfTheFirstInstallment"
                      type="Date"
                      placeholder="تکایە لێرە بنووسە"
                      name="theStartDateOfTheFirstInstallment"
                      value={formData.theStartDateOfTheFirstInstallment}
                      onChange={handleChangeDate}
                      required
                    />
                  </div>{" "}
                  <div className="-mx-3 mb-6 flex flex-wrap">
                    {/* theEndDateOfTheFirstInstallment */}
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                      <label
                        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                        htmlFor="theEndDateOfTheFirstInstallment"
                      >
                        بەرواری کۆتای قیست
                      </label>
                      <input
                        className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        id="theEndDateOfTheFirstInstallment"
                        type="date"
                        placeholder="تکایە لێرە بنووسە"
                        name="theEndDateOfTheFirstInstallment"
                        value={formData.theEndDateOfTheFirstInstallment}
                        onChange={handleChangeDate}
                        required
                      />
                    </div>
                    {/* installmentRemainingAmount */}
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                      <label
                        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                        htmlFor="installmentRemainingAmount"
                      >
                        بڕی مانگانە قیست
                      </label>
                      <input
                        className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        id="installmentRemainingAmount"
                        type="text"
                        placeholder="تکایە لێرە بنووسە"
                        name="installmentRemainingAmount"
                        value={formData.installmentRemainingAmount}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>{" "}
                  <div className="-mx-3 mb-6 flex flex-wrap">
                    {/* theAmountOfMonthlyInstallments */}
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                      <label
                        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                        htmlFor="theAmountOfMonthlyInstallments"
                      >
                        بڕی پارەی قیستی ماوە
                      </label>
                      <input
                        className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        id="theAmountOfMonthlyInstallments"
                        type="text"
                        placeholder="تکایە لێرە بنووسە"
                        name="theAmountOfMonthlyInstallments"
                        value={formData.theAmountOfMonthlyInstallments}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="-mx-3 mb-6 flex flex-wrap"></div>
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

export default EditAppartmentCaseModal;
