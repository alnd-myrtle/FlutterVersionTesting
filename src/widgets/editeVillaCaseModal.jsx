import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment/moment";
import { Autocomplete, TextField } from "@mui/material";

const CustomAddVillasCase = ({ show, setShow, villaCase }) => {
  console.log(villaCase);
  const [isInstallment, setisInstallment] = useState(true);
  const [loading, setLoading] = useState(false);
  const [houseOldNumberfilter, sethouseOldNumberfilter] = useState("");
  const [villasSelf, setvillasSelf] = useState([]);
  const [selectedHouseNumber, setSelectedHouseNumber] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    location: "",
    phone1: "",
    phone2: "",
    contractNumber: "",
    contractDate: "",
    unitType: "فیلا- ڤێلا",
    Size: "",
    buildingNumber: "",
    floor: "",
    unitNumber: "",
    newHouseNumber: "",
    moneyCurrenceAmount: "-",
    moneyRemainingAmount: "-",
    doesNotHaveAnyMoneyLeft: "-",
    theStartDateOfTheInstallment: moment().format("YYYY-MM-DD"),
    theEndDateOfTheInstallment: moment().format("YYYY-MM-DD"),
    theAmountOfMonthlyInstallments: "-",
    installmentRemainingMonthlyAmount: "-",
    exist: "0",
    type: "notInstallment",
    type2: "0",
    type3: "0",
    username: "0",
  });

  const setDataAsDefault = () => {
    setisInstallment((villaCase.type = "installment" ? true : false));
    setFormData({
      fullName: villaCase.fullName,
      location: villaCase.location,
      phone1: villaCase.phone1,
      phone2: villaCase.phone2,
      contractNumber: villaCase.contractNumber,
      contractDate: villaCase.contractDate,
      unitType: villaCase.unitType,
      Size: villaCase.Size,
      houseNumber: villaCase.houseNumber,
      floor: villaCase.floor,
      newHouseNumber: villaCase.newHouseNumber,
      moneyCurrenceAmount: villaCase.moneyCurrenceAmount,
      moneyRemainingAmount: villaCase.moneyRemainingAmount,
      doesNotHaveAnyMoneyLeft: villaCase.doesNotHaveAnyMoneyLeft,
      theStartDateOfTheInstallment: villaCase.theStartDateOfTheInstallment,
      theEndDateOfTheInstallment: villaCase.theEndDateOfTheInstallment,
      theAmountOfMonthlyInstallments: villaCase.theAmountOfMonthlyInstallments,
      installmentRemainingMonthlyAmount:
        villaCase.installmentRemainingMonthlyAmount,
      exist: villaCase.exist,
      type: villaCase.type,
      type2: villaCase.type2,
      type3: villaCase.type3,
      username: villaCase.username,
    });
  };
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
        "http://api.waren-d.com/api/villas/" + villaCase.id,
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
      toast.success("بەسەرکەوتووی گۆڕدرا");
      setFormData({
        fullName: "",
        location: "",
        phone1: "",
        phone2: "",
        contractNumber: "",
        contractDate: "",
        unitType: "villa",
        Size: "",
        houseNumber: "",
        floor: "",
        newHouseNumber: "",
        moneyCurrenceAmount: "",
        moneyRemainingAmount: "",
        doesNotHaveAnyMoneyLeft: "",
        theStartDateOfTheInstallment: "",
        theEndDateOfTheInstallment: "",
        theAmountOfMonthlyInstallments: "",
        installmentRemainingMonthlyAmount: "",
        exist: "0",
        type: false,
        type2: "0",
        type3: "0",
        username: "0",
      });
      console.log(formData);
      // window.location.reload();
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.response.data.msg);
    }
  };
  useEffect(() => {
    setDataAsDefault();
  }, [villaCase]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log("run fetch");
    const res = await axios.get(
      `https://api.waren-d.com/public/api/SelfHouse?`,
      {
        params:
          houseOldNumberfilter.length > 0
            ? {
                houseNumber: houseOldNumberfilter,
              }
            : {},
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userData")).token
          }`,
        },
      }
    );
    setvillasSelf([
      ...res.data.data.map((villaSelf) => {
        return {
          label: villaSelf.newNumber,
          id: villaSelf.id,
          newHouseNumber: villaSelf.newNumber,
          oldNumber: villaSelf.oldNumber,
        };
      }),
    ]);
  };

  return (
    <>
      <ToastContainer />
      <Modal
        size="lg"
        scrollable
        show={show}
        onHide={() => {}}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="flex flex-row items-center justify-between text-blue-500">
          <Modal.Title>{`زیادکردنی کەیس بۆ ڤێلا`} </Modal.Title>
          <button
            className="  rounded-lg bg-red-400 p-2 text-center text-[13px]  text-white"
            onClick={() => {
              setSelectedHouseNumber("");
              setShow(false);
            }}
          >
            داخستن
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="flex h-screen flex-col  items-center  " dir="rtl">
            <ToastContainer />
            <h2 className="mb-10 mt-10 text-2xl font-bold"></h2>
            <form className="w-full max-w-md" onSubmit={handleSubmit}>
              <div className="-mx-3 mb-6 flex items-center justify-between">
                <div className="m-3">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={villaCase.newHouseNumber}
                    options={villasSelf}
                    sx={{ width: 300 }}
                    onChange={(v, value) => {
                      console.log(value);
                      setSelectedHouseNumber(value.oldNumber);
                      setFormData({
                        ...formData,
                        ["houseNumber"]: value.oldNumber,
                        ["newHouseNumber"]: value.newHouseNumber,
                      });
                    }}
                    renderInput={(params) => {
                      return (
                        <TextField {...params} label="ژمارەی خانوو (نوێ)" />
                      );
                    }}
                  />
                </div>
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <div className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                    ژمارەی خانوو (کۆن)
                    {selectedHouseNumber.length < 1 ? (
                      <h1 className="text-2xl">{villaCase.houseNumber}</h1>
                    ) : (
                      <h1 className="text-2xl"> {selectedHouseNumber}</h1>
                    )}
                  </div>
                </div>
              </div>
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
                    htmlFor="phone2"
                  >
                    ژمارەی مۆبایل{" "}
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="phone2"
                    type="text"
                    placeholder="تکایە لێرە بنووسە"
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
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
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
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <label
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    htmlFor="unitType"
                  >
                    ڕووبەر
                  </label>
                  <input
                    className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    id="unitType"
                    type="text"
                    placeholder="تکایە لێرە بنووسە"
                    name="Size"
                    value={formData.Size}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* newHouseNumber */}
              </div>

              <div className="m-4 flex flex-row-reverse items-center justify-evenly  rounded-xl p-2 shadow-xl">
                <div className=" flex items-center">
                  <input
                    id="default-radio-1"
                    value={isInstallment}
                    onChange={(e) => {
                      setisInstallment(true);
                      setFormData({
                        ...formData,
                        type: true,
                      });
                    }}
                    type="radio"
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
                        type: false,
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
                        htmlFor="moneyCurrenceAmount"
                      >
                        بڕی پارەی دراو
                      </label>
                      <input
                        className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        id="moneyCurrenceAmount"
                        type="text"
                        placeholder="تکایە لێرە بنووسە"
                        name="moneyCurrenceAmount"
                        value={formData.moneyCurrenceAmount}
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
                        htmlFor="doesNotHaveAnyMoneyLeft"
                      >
                        بڕی پارەی نەماوە
                      </label>
                      <input
                        className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        id="doesNotHaveAnyMoneyLeft"
                        type="text"
                        placeholder="تکایە لێرە بنووسە"
                        name="doesNotHaveAnyMoneyLeft"
                        value={formData.doesNotHaveAnyMoneyLeft}
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
                  <div className="-mx-3 mb-6 flex flex-wrap">
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                      <label
                        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                        htmlFor="theStartDateOfTheInstallment"
                      >
                        بەرواری دەستپیکردنی قیست
                      </label>
                      <input
                        className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        id="theStartDateOfTheInstallment"
                        type="Date"
                        placeholder="تکایە لێرە بنووسە"
                        name="theStartDateOfTheInstallment"
                        value={formData.theStartDateOfTheInstallment}
                        onChange={handleChangeDate}
                        required
                      />
                    </div>{" "}
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                      <label
                        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                        htmlFor="theEndDateOfTheInstallment"
                      >
                        بەرواری کۆتای قیست
                      </label>
                      <input
                        className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        id="theEndDateOfTheInstallment"
                        type="date"
                        placeholder="تکایە لێرە بنووسە"
                        name="theEndDateOfTheInstallment"
                        value={formData.theEndDateOfTheInstallment}
                        onChange={handleChangeDate}
                        required
                      />
                    </div>
                  </div>

                  <div className="-mx-3 mb-6 flex flex-wrap">
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                      <label
                        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                        htmlFor="installmentRemainingMonthlyAmount"
                      >
                        بڕی پارەی قیستی ماوە
                      </label>
                      <input
                        className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        id="installmentRemainingMonthlyAmount"
                        type="text"
                        placeholder="تکایە لێرە بنووسە"
                        name="installmentRemainingMonthlyAmount"
                        value={formData.installmentRemainingMonthlyAmount}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                      <label
                        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                        htmlFor="theAmountOfMonthlyInstallments"
                      >
                        بڕی مانگانە قیست
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

export default CustomAddVillasCase;
