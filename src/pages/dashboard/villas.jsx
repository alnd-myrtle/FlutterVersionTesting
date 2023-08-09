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
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import CustomModalAddVilla from "@/widgets/AddVIllamodal";
import axios from "axios";
import EditeVillaModel from "@/widgets/editeVillaModal";
import { Pagination, PaginationItem } from "@mui/material";
import TableVilla from "@/widgets/tableVilla";

export function Villas() {
  const [showAddModal, setshowAddModal] = useState(false);
  const [showEditModal, setshowEditModal] = useState(false);
  const [villasData, setVillasData] = useState(null);
  const [villaToEdit, setvillaToEdit] = useState(null);
  const [filedSelected, setFieldSelected] = useState("");
  const [searchValue, setsearchValue] = useState("");

  // const [totalPages, tsetTotalPages] = useState(1);

  // //delete villa
  const handleDelete = async (id) => {
   
    var r = window.confirm("Are you sure you want to delete");
    if (!r) {
      return;
    }
    try {
      const response = await axios.delete(
        `https://api.waren-d.com/public/api/SelfHouse/${id.id}`,
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

  // //searchTime
  // const handleSearch = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.waren-d.com/api/SelfHouse?`,
  //       {
  //         params: {
  //           [filedSelected]: searchValue,
  //         },
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${
  //             JSON.parse(localStorage.getItem("userData")).token
  //           }`,
  //         },
  //       }
  //     );
  //     console.log("vilas data", villasData);
  //     tsetTotalPages(response.data.total);
  //     setVillasData(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   if (searchValue.length < 1) return;
  //   let timeOut = setTimeout(() => {
  //     handleSearch();
  //     if (searchValue.length < 1) {
  //       return;
  //     }
  //   }, 1000);
  //   return () => {
  //     clearTimeout(timeOut);
  //   };
  // }, [searchValue]);

  // const getHousesHandle = async (page) => {
  //   if (searchValue.length > 0 && searchValue != " ") return;
  //   console.log("run is");
  //   axios
  //     .get(`https://api.waren-d.com/public/api/SelfHouse?page=${page}`, {
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: `Bearer ${
  //           JSON.parse(localStorage.getItem("userData")).token
  //         }`,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       tsetTotalPages(response.data.total);
  //       setVillasData(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // //hetHouses
  // useEffect(() => {
  //   getHousesHandle(1);
  // }, [searchValue]);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <CustomModalAddVilla show={showAddModal} setShow={setshowAddModal} />
      {villaToEdit && (
        <EditeVillaModel
          show={showEditModal}
          setShow={setshowEditModal}
          villa={villaToEdit}
        />
      )}
      <Card>
        <CardHeader className=" flex items-center justify-between bg-[#080a54] p-6">
          <div className=" flex w-full flex-col items-center px-3 sm:flex-col md:mb-0  md:flex-row ">
            <div className=" mx-10 text-center text-[20px] text-white">
              ڤێلاکان
            </div>

            <button
              onClick={() => setshowAddModal(true)}
              className="m-2 rounded-lg bg-green-500 p-2 text-white"
            >
              زیادکردنی ڤیلا +
            </button>
          </div>
        </CardHeader>
        <CardBody className="mt-5 overflow-x-scroll px-0 pt-0 pb-2">
          <TableVilla deleteHandle={(id) => handleDelete(id)} />
          {/* <table className="w-full min-w-[640px] table-auto text-end">
            <thead>
              <tr>
                {["ژمارەی نوێ", "ژمارەی کۆن", "ڕووبەر", "ناونیشان", ""].map(
                  (el) => {
                    return (
                      <th
                        key={el}
                        className="border border-blue-gray-50 py-3 px-5  text-[16px]"
                      >
                        <div
                          variant="small"
                          className=" font-bold uppercase text-black"
                        >
                          {el}
                        </div>
                      </th>
                    );
                  }
                )}
              </tr>
            </thead>
            <tbody>
              {villasData &&
                villasData.map(
                  ({ id, newNumber, oldNumber, size, location }, key) => {
                    const className = `py-3 px-5 ${
                      key === villasData.length - 1
                        ? ""
                        : "border border-blue-gray-50 "
                    }`;

                    return (
                      <tr key={key}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div>
                              <div
                                variant="small"
                                color="blue-gray"
                                className="font-bold"
                              >
                                {newNumber}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="text-[14px] font-bold text-blue-gray-600">
                            {oldNumber}
                          </div>
                        </td>
                        <td className={className}>
                          <div className="text-[18px] font-bold text-blue-gray-600">
                            {size}
                          </div>
                        </td>
                        <td className={className}>
                          <div className="text-[18px] font-bold text-blue-gray-600">
                            {location}
                          </div>
                        </td>
                        <td className={className}>
                          <div className="rounded-lg bg-blue-600 p-2 text-center text-[14px] font-bold text-white ">
                            <button
                              onClick={() => {
                                setvillaToEdit({
                                  id,
                                  userId: "1",
                                  newNumber,
                                  oldNumber,
                                  size,
                                  location,
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
          </table>
          <div className="w-full border border-gray-300 p-2 shadow-xl">
            <Pagination
              count={totalPages}
              color="primary"
              onChange={(event, page) => {
                getHousesHandle(page);
              }}
            />
          </div> */}
        </CardBody>
      </Card>
    </div>
  );
}

export default Villas;
