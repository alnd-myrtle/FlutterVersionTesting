import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import CustomModalAddVilla from "@/widgets/AddVIllamodal";
import axios from "axios";
import EditeVillaModel from "@/widgets/editeVillaModal";
import CustomAddApartment from "@/widgets/AddAppartmentModal";
import EditeAppartmentCaseModel from "@/widgets/editeAppartmentModal";
import TableAppartment from "@/widgets/tableAppartment";

export function Appartments() {
  const [showAddModal, setshowAddModal] = useState(false);
  const [showEditModal, setshowEditModal] = useState(false);
  const [appartmentData, setAppartmentData] = useState(null);
  const [appartmentToEdit, setAppartmentTo] = useState(null);
  const [filedSelected, setFieldSelected] = useState("");
  const [searchValue, setsearchValue] = useState("");

  //delete villa
  const handleDelete = async (id) => {
    var r = window.confirm("Are you sure you want to delete" + id.id);
    if (!r) {
      return;
    }
    try {
      const response = await axios.delete(
        `https://api.waren-d.com/api/Selfapartment/${id.id}`,
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

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    console.log(`Deleting villa with id ${id}`);
  };


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <CustomAddApartment
        setShow={setshowAddModal}
        show={showAddModal}
        appartmentData={appartmentData}
      />
   
      <Card>
        <CardHeader className=" flex items-center justify-between bg-[#080a54] p-6">
          <div className=" flex w-full flex-col items-center px-3 sm:flex-col md:mb-0  md:flex-row ">
            <div className=" mx-10 text-center text-[20px] text-white"></div>

            <div className=" text-center text-[20px] text-white">شوقەکان</div>
            <select
              className="m-2 block  rounded border border-gray-200 bg-gray-200 p-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="newHouseNumber"
              name="newHouseNumber"
              value={filedSelected}
              onChange={(e) => {
                setFieldSelected(e.target.value);
              }}
              required
            >
              <option value={""}>هەموو</option>
              {[
                "fullName",
                "apartmentNumber",
                "phone1",
                "price",
                "invoice",
                "unitType",
                "amount",
                "note",
                "floor",
                "builidng",
              ].map((item, key) => {
                console.log(item);
                return (
                  <option key={key} value={item}>
                    {item == "fullName"
                      ? "ناو"
                      : item == "apartmentNumber"
                      ? "ژمارەی شوقە"
                      : item == "phone1"
                      ? "ژمارەی مۆبایل"
                      : item == "price"
                      ? "نرخ"
                      : item == "invoice"
                      ? "حساب"
                      : item == "unitType"
                      ? "جۆری یەکە"
                      : item == "amount"
                      ? "ماوە"
                      : item == "note"
                      ? "تێبینی"
                      : item == "floor"
                      ? "نهۆم"
                      : item == "builidng"
                      ? "باڵەخانە"
                      : "data"}
                  </option>
                );
              })}
            </select>

            {filedSelected.length > 0 && (
              <div className="relative flex items-center ">
                <div className="pointer-events-none absolute inset-y-0 right-0 mr-7 flex items-center ">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  value={searchValue}
                  type="search"
                  id="default-search"
                  className="block w-full min-w-[200px] rounded-lg border border-gray-300 bg-gray-50 p-2 pl-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="    گەڕان   "
                  onChange={(e) => {
                    if (e.target.value.length < 1) {
                      console.log(e.target.value);
                      setsearchValue("");
                      setFieldSelected("");
                      return;
                    }
                    setsearchValue(e.target.value);
                    // handleSearch(e.target.value);
                  }}
                />
              </div>
            )}

            <button
              onClick={() => setshowAddModal(true)}
              className="m-2 rounded-[10px] bg-green-500 p-2 text-white"
            >
              زیادکردنی شوقە +
            </button>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">

        <TableAppartment deleteHandle={handleDelete} />
          {/* <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "ژمارەی شووقە",
                  "ژمارەی مۆبایل",
                  "نرخ",
                  "ڕەچەتە",
                  "جۆری یەکە",
                  "ماوە",
                  "تێبینی",
                  "نهۆم",
                  "بینایە",
                  "",
                  "",
                ].map((el) => {
                  return (
                    <th
                      key={el}
                      className="border border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <div className="text-[16px] font-bold uppercase text-black">
                        {el}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {appartmentData &&
                appartmentData.map(
                  (
                    {
                      id,
                      fullName,
                      apartmentNumber,
                      phone1,
                      price,
                      invoice,
                      unitType,
                      amount,
                      note,
                      floor,
                      builidng,
                    },
                    key
                  ) => {
                    const className = `py-3 px-5 ${
                      key === appartmentData.length - 1
                        ? ""
                        : "border border-blue-gray-50"
                    }`;

                    return (
                      <tr key={key}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div>
                              <div className="text-[16px] font-semibold">
                                {apartmentNumber}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-sm font-semibold text-blue-gray-600">
                            {phone1}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-sm font-semibold text-blue-gray-600">
                            {price}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-sm font-semibold text-blue-gray-600">
                            {invoice}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-sm font-semibold text-blue-gray-600">
                            {unitType}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-sm font-semibold text-blue-gray-600">
                            {amount}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-sm font-semibold text-blue-gray-600">
                            {note}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-sm font-semibold text-blue-gray-600">
                            {floor}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-sm font-semibold text-blue-gray-600">
                            {builidng}
                          </Typography>
                        </td>

                        <td className={className}>
                          <div className="rounded-lg bg-blue-600 p-2 text-center text-[14px] font-bold text-white ">
                            <button
                              onClick={() => {
                                setAppartmentTo({
                                  id,
                                  fullName,
                                  apartmentNumber,
                                  phone1,
                                  price,
                                  invoice,
                                  unitType,
                                  amount,
                                  note,
                                  floor,
                                  builidng,
                                });
                                setshowEditModal(true);
                              }}
                            >
                              دەسکاری
                            </button>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="rounded-lg bg-red-600 p-2 text-center text-[14px] font-bold text-white ">
                            <button
                              onClick={() => {
                                handleDelete(id);
                              }}
                            >
                              سڕینەوە
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table> */}
        </CardBody>
      </Card>
    </div>
  );
}

export default Appartments;
