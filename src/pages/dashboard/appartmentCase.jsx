import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";

import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import spedaFont from "./../../assets/fonts/NotoNaskhArabic-Regular.ttf";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import CustomAddAppartmentCase from "@/widgets/AddAppartmentCaseModal";
import TableAppartmentCase from "@/widgets/tableAppartmentCase";
import { Navbar } from "@/widgets/layout";
import ChangePasswordModal from "@/widgets/changePasswordModal";

const ApartmentCasesPage = () => {
  const [showAddModal, setshowAddModal] = useState(false);
  const [showEditModal, setshowEditModal] = useState(false);
  const [appartmenCasetData, setAppartmenCasetData] = useState(null);
  const [appartmentToEdit, setAppartmentTo] = useState(null);
  const [filedSelected, setFieldSelected] = useState("");
  const [searchValue, setsearchValue] = useState("");


  useEffect(() => {
    axios
      .get(
        "https://api.waren-d.com/public/api/apartments",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userData")).token
            }`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setAppartmenCasetData(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id) => {
    // Send a DELETE request to the API to delete the villa case with the specified ID
    let r = window.confirm("Are you sure you want to delete");
    if (!r) {
      return;
    }
    axios
      .delete(
        `https://api.waren-d.com/public/api/apartments/${id.id}`,

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
    <>
      <Navbar  />
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <CustomAddAppartmentCase
          setShow={setshowAddModal}
          show={showAddModal}
          appartmenCasetData={appartmenCasetData}
        />

        <Card>
          <CardHeader className=" flex items-center justify-between bg-[#080a54] p-6">
            <div className=" flex w-full flex-col items-center px-3 sm:flex-col md:mb-0  md:flex-row ">
              <div className=" mx-10 text-center text-[20px] text-white"></div>

              <div className=" text-center text-[20px] text-white">
                کۆنوسەکانی ڤێلاو شووقە
              </div>

              <button
                onClick={() => setshowAddModal(true)}
                className="m-2 rounded-[10px] bg-green-500 p-2 text-white"
              >
                زیادکردنی کۆنوس +
              </button>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-5 pt-4 pb-2">
            <TableAppartmentCase deleteHandle={handleDelete} />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ApartmentCasesPage;
