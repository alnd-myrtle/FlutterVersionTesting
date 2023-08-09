import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DataGridPro } from "@mui/x-data-grid-pro";

import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import EditeVillaModel from "./editeVillaModal";
import EditeVillaCaseModel from "./editeVillaCaseModal";
import { makeStyles } from "@material-ui/core/styles";
import PdfPageModa from "./pdfVilla";
import EditAppartmentCaseModal from "./editeAppartmentCaseModal";
import PdfPageModalAppartment from "./pdfAppartment";
import CustomEditAppartmentCase2 from "./EditAppartmentCaseModal2";

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiDataGrid-mainGridContainer": {
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    "& .MuiDataGrid-cell": {
      display: "flex",
      alignItems: "center",
    },
    "& .MuiDataGrid-colCellTitle": {
      fontWeight: "bold",
    },
    "& .MuiDataGrid-colCellWrapper": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    "& .MuiDataGrid-colCellTitleWrapper": {
      display: "flex",
      alignItems: "center",
      position: "sticky",
      top: 0,
      zIndex: 1,
      backgroundColor: "#fff",
    },
  },
}));

const theme = createTheme({
  typography: {
    fontFamily: "speda",
    fontWeightBold: "bold",
    fontSize: "16px",
  },
});

const TableAppartmentCase = ({ editeHandle, deleteHandle }) => {
  const [rows, setRows] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setfilter] = useState([]);
  const [showEditModal, setshowEditModal] = useState(false);
  const [appartmentToEditAndPrint, setappartmentToEditAndPrint] =
    useState(null);
  const [showModalPdf, setshowModalPdf] = useState(false);

  useEffect(() => {
    fetchData(1);
  }, []);

  useEffect(() => {
    fetchData();
  }, [filter, currentPage]);

  const fetchData = async () => {
    console.log(filter);
    axios
      .get(
        `https://api.waren-d.com/public/api/apartments?page=${currentPage}`,
        {
          params:
            filter.length > 0
              ? {
                  [filter[0].field]: filter[0].value,
                }
              : {},
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userData")).token
            }`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setRows(res.data.data);
        setTotalPages(res.data.total);
      })
      .catch((error) => console.log(error));
  };

  const handlePageChange = (params) => {
    let page = params.page;
    page += 1;
    console.log(params.page);
    setCurrentPage(page);
  };
  const handleFilterChange = async (params) => {
    setfilter(params.items);
  };

  const classes = useStyles();
  //return
  return (
    <div
      style={{
        width: "100%",
        fontSize: "16px",
        direction: "ltr",
      }}
      className={classes.root}
    >
      {appartmentToEditAndPrint && (
        <CustomEditAppartmentCase2
          show={showEditModal}
          setShow={setshowEditModal}
          appartmentCase={appartmentToEditAndPrint}
        />
      )}

      {showModalPdf && (
        <PdfPageModalAppartment
          rowData={appartmentToEditAndPrint}
          showModalPdf={showModalPdf}
          setshowModalPdf={setshowModalPdf}
        />
      )}
      <ThemeProvider theme={theme}>
        <DataGrid
          className="overflow-x-auto "
          style={{
            textAlign: "right",
          }}
          columns={[
            {
              field: "-",
              headerName: " -",
              sortable: false,
              width: 100,
              renderCell: (params) => (
                <button
                  onClick={() => {
                    setappartmentToEditAndPrint(params.row);
                    setshowEditModal(true);
                  }}
                  className="rounded-md bg-blue-500 p-2 text-center text-white"
                >
                  دەسکاری
                </button>
              ),
            },
            {
              field: "---",
              headerName: " ---",
              sortable: false,
              width: 100,
              renderCell: (params) => (
                <button
                  onClick={() => {
                    setappartmentToEditAndPrint(params.row);
                    setshowModalPdf(true);
                  }}
                  className="rounded-md bg-green-500 p-2 text-center text-white"
                >
                  پرێنت
                </button>
              ),
            },
            { field: "username", headerName: "ناوی زیادکەر", width: 150 },
            { field: "unitPrice", headerName: "نرخی یەکە", width: 150 },
            { field: "unitNumber", headerName: "ژمارەی یەکە", width: 150 },
            { field: "unitType", headerName: "جۆری یەکە", width: 150 },
            { field: "location", headerName: "ناونیشان", width: 150 },
            { field: "phone2", headerName: "ژماراەی مۆبایل ٢", width: 150 },
            { field: "phone1", headerName: "ژمارەی مۆبایل ١", width: 150 },
            { field: "exist", headerName: "بەرواری گڕیبەست", width: 150 },
            { field: "fullName", headerName: "ناو", width: 150 },
            { field: "id", headerName: "ژمارەی کۆنوس", width: 150 },

         
          ]}
          rows={rows}
          pagination
          onPaginationModelChange={(page) => {
            handlePageChange(page);
          }}
          onRowClick={(e) => {
            console.log(e);
          }}
          pageSizeOptions={[0]}
          pageSize={5}
          paginationMode="true"
          rowCount={totalPages}
          onPageChange={handlePageChange}
          onFilterModelChange={handleFilterChange}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          autoHeight
          autoWidth
        />
      </ThemeProvider>
    </div>
  );
};

export default TableAppartmentCase;
