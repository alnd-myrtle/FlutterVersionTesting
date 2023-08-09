import {
  Card,
  CardHeader,
  CardBody,
  div,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";

import axios from "axios";
import EditeVillaModel from "@/widgets/editeVillaModal";
import CustomAddVillasCase from "@/widgets/AddVIllaCasemodal";
import EditeVillaCaseModel from "@/widgets/editeVillaCaseModal";
import PdfPageModa from "@/widgets/pdfVilla";
import TableVillaCase from "@/widgets/tableVillaCase";

export function VillasCase() {
  const [showAddModal, setshowAddModal] = useState(false);
  const [showEditModal, setshowEditModal] = useState(false);
  const [villasData, setVillasData] = useState(null);
  const [villasSelfData, setVillaSelfData] = useState(null);
  const [villaToEdit, setvillaToEdit] = useState(null);
  const [filedSelected, setFieldSelected] = useState("");
  const [searchValue, setsearchValue] = useState("");

  const [showModalPdf, setshowModalPdf] = useState(false);
  const [rowData, setrowData] = useState(null);

  const handleDelete = (id) => {
    const r = window.confirm("Are you sure you want to delete");
    if (!r) {
      return;
    }
    axios
      .delete(
        `https://api.waren-d.com/api/villas/${id}`,

        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userData")).token
            }`,
          },
        }
      )
      .then(() => {
        // Remove the deleted villa case from the state
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };



  return (
    <div className="mt-0 mb-8 flex flex-col gap-12">
      {showModalPdf && (
        <PdfPageModa
          rowData={rowData}
          showModalPdf={showModalPdf}
          setshowModalPdf={setshowModalPdf}
        />
      )}
      <CustomAddVillasCase
        show={showAddModal}
        setShow={setshowAddModal}
        villasData={villasSelfData}
      />
      {/* {villaToEdit && (
        <EditeVillaCaseModel
          setShow={setshowEditModal}
          show={showEditModal}
          villaCase={villaToEdit}
          villasData={villasSelfData}
        />
      )} */}

      <Card>
        <CardHeader className="mb-8 flex justify-between bg-[#080a54] p-6">
          <div className=" flex w-full flex-col items-center pr-3 sm:flex-col md:mb-0  md:flex-row ">
            <div className=" mr-10 text-center text-[20px] text-white">
              کەیسی ڤێلاکان
            </div>
           
            <button
              onClick={() => setshowAddModal(true)}
              className="m-3 rounded-[10px] bg-green-500 p-2 text-white"
            >
              زیادکردنی کەیس بۆ ڤێلا
            </button>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <TableVillaCase
        deleteHandle={(id) => {
          handleDelete(id.id);
        }}
      />
          {/* <table className="w-full min-w-[640px] table-auto ">
            <thead>
              <tr>
                {[
                  "ناو",
                  "ژمارەی نوێی ڤێلا",
                  "ژمارەی ڤێلای کۆن",
                  "جۆری یەکە",
                  "ژمارەی مۆبایل ١",
                  "ژمارەی مۆبایل ٢",
                  "",
                  "",
                  "",
                ].map((el, key) => {
                  return (
                    <th
                      key={key}
                      className=" border border-blue-gray-50 p-2 text-end"
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
              {villasData &&
                villasData.map((villaCase, key) => {
                  const className = `py-3 px-2 ${
                    key === villasData.length - 1
                      ? ""
                      : "border border-blue-gray-50"
                  }`;
                  return (
                    <tr key={villaCase.id}>
                      <td className={className}>
                        <div className="flex items-center gap-4 text-[14px]">
                          <div>
                            <div
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {villaCase.fullName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <div className="text-[14px] font-semibold text-blue-gray-600">
                          {villaCase.houseNumber}
                        </div>
                      </td>
                      <td className={className}>
                        <div className="text-[14px] font-semibold text-blue-gray-600">
                          {villaCase.unitType}
                        </div>
                      </td>
                      <td className={className}>
                        <div className="text-[14px] font-semibold text-blue-gray-600">
                          {villaCase.newHouseNumber}
                        </div>
                      </td>{" "}
                      <td className={className}>
                        <div className="text-[14px] font-semibold text-blue-gray-600">
                          {villaCase.phone1}
                        </div>
                      </td>{" "}
                      <td className={className}>
                        <div className="text-[14px] font-semibold text-blue-gray-600">
                          {villaCase.phone2}
                        </div>
                      </td>
                      <td className={className}>
                        <div className="flex items-center justify-center rounded-lg bg-green-500 px-3 py-2.5 text-center text-white">
                          {" "}
                          <button
                            onClick={() => {
                              setrowData(villaCase);

                              setshowModalPdf(true);
                            }}
                          >
                            پڕینت
                          </button>
                        </div>
                      </td>
                      <td className={className}>
                        <div className="flex items-center justify-center rounded-lg bg-blue-500 px-3 py-2.5 text-center text-white">
                          <button
                            onClick={() => {
                              setvillaToEdit(villaCase);
                              setshowEditModal(true);
                            }}
                          >
                            دەسکاری
                          </button>
                        </div>
                      </td>{" "}
                      <td className={className}>
                        <div className="flex items-center justify-center rounded-lg bg-red-500 px-3 py-2.5 text-center text-white">
                          <button
                            onClick={() => {
                              handleDelete(villaCase.id);
                            }}
                          >
                            سڕینەوە
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table> */}
        </CardBody>
      </Card>
    </div>
  );
}

export default VillasCase;
