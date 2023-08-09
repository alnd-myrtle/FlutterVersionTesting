import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
//
const CustomEditAppartmentCase2 = ({ show, setShow, appartmentCase }) => {
  const [isInstallment, setisInstallment] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    location: "",
    phone1: "",
    phone2: "",
    contractNumber: "-",
    contractDate: "",
    unitType: "",
    buildingSize: "",
    buildingType: "-",
    buildingNumber: "-",
    floor: "",
    unitNumber: "",
    unitPrice: "",
    apartmentArt: moment().format("YYYY-MM-DD"),
    remainingAmount: 0,
    moneyRemainingAmount: 0,
    notRemainingAmount: 0,
    theStartDateOfTheFirstInstallment: moment().format("YYYY-MM-DD"),
    theEndDateOfTheFirstInstallment: moment().format("YYYY-MM-DD"),
    installmentRemainingAmount: 0,
    theAmountOfMonthlyInstallments: 0,
    thePeriod: 0,
    amountPayments: 0,
    exist: "0",
    type: "notInstallment",

    type2: "-",
    type3: "-",
    username: JSON.parse(localStorage.getItem("userData")).name,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChangeDate = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: moment(e.target.value).format("YYYY-MM-DD"),
    });
  };
  const handleSubmit = async () => {
    setLoading(true);

    console.log("Data", formData);
    console.log("Data", formData);
    console.log("Data", formData);
    console.log("Data", formData);
    console.log("Data", formData);
    console.log("Data", formData);
    console.log("Data", formData);
    console.log("Data", formData);
    console.log("Data", formData);
    console.log("Data", formData);
    console.log("Data", formData);
    console.log("Data", formData);
    console.log("Data", formData);
    console.log("Data", formData);
    console.log("Data", formData);
    console.log("Data", formData);
    console.log("Data", formData);
    console.log("Data", formData);
    console.log("Data", formData);
    console.log("Data", formData);
    console.log("Data", formData);
    console.log("Data", formData);
    console.log("Data", formData);
    console.log(appartmentCase.id);

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

      setShow(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.response.data.msg);
    }
  };
  useEffect(() => {
    setisInstallment(appartmentCase.type == "installment" ? true : false);
    setFormData({
      fullName: appartmentCase.fullName,
      location: appartmentCase.location,
      phone1: appartmentCase.phone1,
      phone2: appartmentCase.phone2,
      contractNumber: appartmentCase.contractNumber,
      contractDate: appartmentCase.contractDate,
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
      unitType: appartmentCase.unitType,
      username: JSON.parse(localStorage.getItem("userData")).name,
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
        size="lg"
      >
        <Modal.Header className="flex flex-row items-center justify-between text-blue-500">
          <Modal.Title>
            {` دەسکاری کۆنووسی ژمارە ${appartmentCase.id}`}{" "}
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
        <Modal.Body className="overflow-y-scroll">
          <div
            className="flex h-screen w-full  flex-col  items-center "
            dir="rtl"
          >
            <ToastContainer />
            <h2 className="mb-10 mt-10 text-2xl font-bold"></h2>
            <div className="flex w-full  flex-wrap">
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                <label
                  className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
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
                  className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
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
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                <label
                  className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
                  htmlFor="phone1"
                >
                  1 ژمارەی مۆبایل{" "}
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
                  className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
                  htmlFor="phone2"
                >
                  2 ژمارەی مۆبایل{" "}
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
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                <label
                  className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
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
                  className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
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

              <div className="m-4 flex w-full flex-row-reverse items-center  justify-evenly rounded-xl p-2 shadow-xl">
                <div className=" flex items-center">
                  <input
                    id="default-radio-11"
                    value={formData.unitType}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        unitType: "villa",
                      });
                    }}
                    checked={formData.unitType == "villa"}
                    type="radio"
                    name="default-radiouni"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    htmlFor="default-radio-11"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    ڤێلا
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    value={formData.unitType}
                    id="default-radio-22"
                    type="radio"
                    checked={formData.unitType == "appartment"}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        unitType: "appartment",
                      });
                    }}
                    name="default-radiouni"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    htmlFor="default-radio-22"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    شوقە
                  </label>
                </div>
              </div>
              {/* check unit type */}
              {formData.unitType == "appartment" ? (
                <>
                  <div className="mb-6 w-full px-3 ">
                    <label
                      className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
                      htmlFor="buildingSize"
                    >
                      پێوانەی گشتی م٢
                    </label>
                    <input
                      className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      id="buildingSize"
                      type="number"
                      placeholder="پێوانەی گشتی م٢ "
                      name="buildingSize"
                      value={formData.buildingSize}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                    <label
                      className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
                      htmlFor="buildingNumber"
                    >
                      جۆری باڵەخانە
                    </label>
                    <Autocomplete
                      size="small"
                      style={{
                        width: "190px",
                        direction: "rtl",
                      }}
                      id="combo-box-demo"
                      value={formData.buildingType}
                      options={[
                        { label: "A" },
                        { label: "B" },
                        { label: "C" },
                        { label: "D" },
                        { label: "E" },
                      ]}
                      sx={{ width: 300 }}
                      onChange={(_, value) => {
                        setFormData({
                          ...formData,
                          buildingType: value.label,
                        });
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="جۆری باڵەخانە" />
                      )}
                    />
                  </div>
                  <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                    <label
                      className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
                      htmlFor="buildingNumber"
                    >
                      <span className="text-white">
                        {formData.buildingNumber}
                      </span>
                      ژمارەی باڵەخانە
                    </label>
                    <Autocomplete
                      value={formData.buildingNumber}
                      size="small"
                      style={{
                        width: "190px",
                        direction: "rtl",
                      }}
                      id="combo-box-demo"
                      options={[
                        { label: "1", value: "1" },
                        { label: "2", value: "2" },
                        { label: "3", value: "3" },
                        { label: "4", value: "4" },
                        { label: "5", value: "5" },
                      ]}
                      sx={{ width: 300 }}
                      onChange={(_, value) => {
                        setFormData({
                          ...formData,
                          buildingNumber: value.label,
                        });
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="ژمارەی باڵەخانە" />
                      )}
                    />
                  </div>
                  <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                    <label
                      className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
                      htmlFor="buildingNumber"
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
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          floor: e.target.value,
                        });
                      }}
                      required
                    />
                    {/* <Autocomplete
                      size="small"
                      style={{
                        width: "190px",
                        direction: "rtl",
                      }}
                      id="combo-box-demo"
                      options={[
                        ...Array.from({ length: 25 }, (_, i) => {
                          return { label: i + 1 };
                        }),
                      ]}
                      sx={{ width: 300 }}
                      onChange={(_, value) => {
                        setFormData({
                          ...formData,
                          floor: value.label,
                        });
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="نهۆم" />
                      )}
                    /> */}
                  </div>
                  <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                    <label
                      className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
                      htmlFor="buildingNumber"
                    >
                      ژمارەی شوقە
                    </label>

                    <input
                      className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      id="floor"
                      type="text"
                      placeholder="تکایە لێرە بنووسە"
                      name="floor"
                      value={formData.unitNumber}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          unitNumber: e.target.value,
                        });
                      }}
                      required
                    />
                    {/* <Autocomplete
                      size="small"
                      style={{
                        width: "190px",
                        direction: "rtl",
                      }}
                      id="combo-box-demo"
                      options={[
                        ...Array.from({ length: 7 }, (_, i) => {
                          return { label: i + 1 };
                        }),
                      ]}
                      sx={{ width: 300 }}
                      onChange={(_, value) => {
                        setFormData({
                          ...formData,
                          unitNumber: value.label,
                        });
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="ژمارەی شوقە
"
                        />
                      )}
                    /> */}
                  </div>
                  <div className="w-full px-3 ">
                    <label
                      className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
                      htmlFor="type2"
                    >
                      جۆری شووقە
                    </label>
                    <input
                      className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      id="type2"
                      type="text"
                      placeholder="جۆری شووقە بنووسە"
                      name="type2"
                      value={formData.type2}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-6 w-full px-3 ">
                    <label
                      className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
                      htmlFor="buildingSize"
                    >
                      پێوانەی گشتی م٢
                    </label>
                    <input
                      className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      id="buildingSize"
                      type="number"
                      placeholder="پێوانەی گشتی م٢ "
                      name="buildingSize"
                      value={formData.buildingSize}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="w-full px-3 md:w-1/2">
                    <label
                      className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
                      htmlFor="unitNumber"
                    >
                      ژمارەی یەکەی خانوو
                    </label>
                    <input
                      className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      id="unitNumber"
                      type="text"
                      placeholder="تکایە لێرە بنووسە"
                      name="unitNumber"
                      value={formData.unitNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                    <label
                      className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
                      htmlFor="buildingNumber"
                    >
                      نهۆم
                    </label>
                    <Autocomplete
                      value={formData.floor}
                      size="small"
                      style={{
                        width: "190px",
                        direction: "rtl",
                      }}
                      id="combo-box-demo"
                      options={[
                        { label: "زەوی" },
                        { label: "کامل" },

                        { label: "تابقی یەکەم" },
                        { label: "تابقی دووەم" },
                      ]}
                      sx={{ width: 300 }}
                      onChange={(_, value) => {
                        setFormData({
                          ...formData,
                          floor: value.label,
                        });
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="نهۆم" />
                      )}
                    />
                  </div>
                </>
              )}

              {/* check pay              */}
              <div className="m-4 flex w-full flex-row-reverse items-center  justify-evenly rounded-xl p-2 shadow-xl">
                <div className=" flex items-center">
                  <input
                    id="default-radio-1"
                    value={isInstallment}
                    checked={isInstallment == true}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        type: "installment",
                        amountPayments: 0,
                        unitPrice: 0,
                        remainingAmount: 0,
                      });
                      setisInstallment(true);
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
                    checked={isInstallment == false}
                    onChange={(e) => {
                      setisInstallment(false);
                      setFormData({
                        ...formData,
                        type: "notInstallment",
                        amountPayments: 0,
                        unitPrice: 0,
                        remainingAmount: 0,
                      });
                    }}
                    name="default-radio"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    htmlFor="default-radio-2"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    نەقد
                  </label>
                </div>
              </div>
              {!isInstallment && (
                <>
                  <div className="mb-6 w-full px-3 ">
                    <label
                      className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
                      htmlFor="unitPrice"
                    >
                      نرخی یەکە
                    </label>
                    <input
                      className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      id="unitPrice"
                      type="number"
                      placeholder="تکایە لێرە بنووسە"
                      name="unitPrice"
                      value={formData.unitPrice}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          unitPrice: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>
                  <div className="mb-6 w-full px-3 ">
                    <label
                      className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
                      htmlFor="amountPayments"
                    >
                      بڕی پارەی دراو
                    </label>
                    <input
                      className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      id="amountPayments"
                      type="text"
                      placeholder="تکایە لێرە بنووسە"
                      name="amountPayments"
                      value={formData.amountPayments}
                      onChange={(e) => {
                        if (
                          parseInt(e.target.value) >
                          parseInt(formData.unitPrice)
                        ) {
                          window.confirm(
                            "تکایە نابێ بڕی پارەی دراو زیاتر بێت لە نرخی یەکە"
                          );
                        } else {
                          setFormData({
                            ...formData,
                            amountPayments: e.target.value,
                            remainingAmount:
                              parseInt(formData.unitPrice) -
                              parseInt(e.target.value),
                          });
                        }
                      }}
                      required
                    />
                  </div>
                  <div className="mb-6 w-full px-3 ">
                    <label
                      className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
                      htmlFor="remainingAmount"
                    >
                      بڕی پارەی ماوە
                    </label>
                    <input
                      className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      id="remainingAmount"
                      type="number"
                      disabled
                      placeholder="تکایە لێرە بنووسە"
                      name="remainingAmount"
                      value={formData.remainingAmount}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}
              {/* قییییییییییییییییییییییییییییییییییییییسسسسسسسسسسسسسسسسسسسسسسسسسسسسستتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتت */}
              {isInstallment && (
                <>
                  <div className="mb-6 w-full px-3 ">
                    <label
                      className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
                      htmlFor="unitPrice"
                    >
                      نرخی یەکە
                    </label>
                    <input
                      className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      id="unitPrice"
                      type="number"
                      placeholder="تکایە لێرە بنووسە"
                      name="unitPrice"
                      value={formData.unitPrice}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          unitPrice: e.target.value,
                          remainingAmount: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>
                  <div className="mb-6 w-full px-3 ">
                    <label
                      className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
                      htmlFor="amountPayments"
                    >
                      بڕی پارەی دراو
                    </label>
                    <input
                      className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      id="amountPayments"
                      type="text"
                      placeholder="تکایە لێرە بنووسە"
                      name="amountPayments"
                      value={formData.amountPayments}
                      onChange={(e) => {
                        if (
                          parseInt(e.target.value) >
                          parseInt(formData.unitPrice)
                        ) {
                          window.confirm(
                            "تکایە نابێ بڕی پارەی دراو زیاتر بێت لە نرخی یەکە"
                          );
                        } else {
                          setFormData({
                            ...formData,
                            amountPayments: e.target.value,
                            remainingAmount:
                              parseInt(formData.unitPrice) -
                              parseInt(e.target.value),
                          });
                        }
                      }}
                      required
                    />
                  </div>
                  <div className="mb-6 w-full px-3 ">
                    <label
                      className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
                      htmlFor="remainingAmount"
                    >
                      بڕی پارەی ماوە
                    </label>
                    <input
                      className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      id="remainingAmount"
                      type="number"
                      disabled
                      placeholder="تکایە لێرە بنووسە"
                      name="remainingAmount"
                      value={formData.remainingAmount}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-6 w-full px-3 ">
                    <label
                      className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
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
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          theStartDateOfTheFirstInstallment: moment(
                            e.target.value
                          ).format("YYYY-MM-DD"),
                        });
                      }}
                      required
                    />
                  </div>{" "}
                  <div className="mb-6 w-full px-3 ">
                    <label
                      className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
                      htmlFor="theAmountOfMonthlyInstallments"
                    >
                      ماوەی قیستەکان
                    </label>
                    <input
                      className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      id="theAmountOfMonthlyInstallments"
                      type="number"
                      placeholder="تکایە لێرە بنووسە"
                      name="theAmountOfMonthlyInstallments"
                      value={formData.theAmountOfMonthlyInstallments}
                      onChange={(e) => {
                        const endDate = moment(
                          theStartDateOfTheFirstInstallment.value
                        )
                          .add(e.target.value, "months")
                          .calendar();
                        //
                        setFormData({
                          ...formData,
                          theEndDateOfTheFirstInstallment:
                            moment(endDate).format("YYYY-MM-DD"),
                          theAmountOfMonthlyInstallments: e.target.value,
                          installmentRemainingAmount:
                            e.target.value < 1
                              ? 0
                              : (
                                  parseInt(formData.remainingAmount) /
                                  parseInt(e.target.value)
                                ).toFixed(2),
                        });
                      }}
                      required
                    />
                  </div>
                  {/* theEndDateOfTheFirstInstallment */}
                  <div className="mb-6 w-full px-3 ">
                    <label
                      className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
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
                      disabled
                      onChange={(e) => {
                        handleChange(e);
                        const startDate = moment(
                          formData.theStartDateOfTheFirstInstallment,
                          "YYYY-MM-DD"
                        );

                        const dateFromInput = moment(
                          e.target.value,
                          "YYYY-MM-DD"
                        );

                        if (dateFromInput.isValid() && startDate.isValid()) {
                          if (dateFromInput.isBefore(startDate)) {
                            window.confirm(
                              "تکایە دەبێت ڕێکەوتی دەستپێکردن پێش ڕێکەوتی کۆتای بێت"
                            );
                          } else if (dateFromInput.isAfter(startDate)) {
                            const diffInMonths = dateFromInput.diff(
                              startDate,
                              "months"
                            );

                            if (diffInMonths == 0 || diffInMonths < 1) {
                              window.confirm(
                                "تکایە دەبێت ماوەی نێوان قیستی یەکەم و کۆتا قیست مانگێک یان لە مانگێک زیاتر بێت"
                              );
                              return;
                            }
                            setFormData({
                              ...formData,
                              theEndDateOfTheFirstInstallment: moment(
                                e.target.value
                              ).format("YYYY-MM-DD"),
                              theAmountOfMonthlyInstallments: diffInMonths,
                              installmentRemainingAmount: (
                                parseInt(formData.remainingAmount) /
                                parseInt(diffInMonths)
                              ).toFixed(2),
                            });
                          } else {
                            window.confirm(
                              "نابێت لە هەمان کاتدا بن (دەستپێکردن و کۆتای) "
                            );
                          }
                        } else {
                          console.log("Invalid date string");
                        }
                      }}
                      required
                    />
                  </div>
                  <div className="mb-6 w-full px-3 ">
                    <label
                      className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
                      htmlFor="installmentRemainingAmount"
                    >
                      بڕی مانگانە قیست
                    </label>
                    <input
                      className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      id="installmentRemainingAmount"
                      type="text"
                      disabled
                      placeholder="تکایە لێرە بنووسە"
                      name="installmentRemainingAmount"
                      value={formData.installmentRemainingAmount}
                      onChange={handleChange}
                      required
                    />
                  </div>{" "}
                </>
              )}
              <div className="mb-6 w-full px-3 ">
                <label
                  className="text-ms mb-2 mt-3 block font-bold uppercase tracking-wide text-gray-700"
                  htmlFor="type3"
                >
                  تێبینی
                </label>
                <textarea
                  className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  id="type3"
                  type="text"
                  placeholder="تکایە لێرە بنووسە"
                  name="type3"
                  value={formData.type3}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full px-3">
                <button
                  className="mr-2 mb-2 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  {loading ? "چاوەڕوانبە" : " دەسکاری"}
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomEditAppartmentCase2;
