import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import EditeVillaModel from "./editeVillaModal";
import EditeVillaCaseModel from "./editeVillaCaseModal";
import { makeStyles } from "@material-ui/core/styles";
import PdfPageModa from "./pdfVilla";

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

const TableVillaCase = ({ editeHandle, deleteHandle }) => {
  const [rows, setRows] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setfilter] = useState([]);
  const [showEditModal, setshowEditModal] = useState(false);
  const [villaToEditAndPrint, setvillaToEditAndPrint] = useState(null);
  const [showModalPdf, setshowModalPdf] = useState(false);

  useEffect(() => {
    fetchData(1);
  }, []);

  useEffect(() => {
    fetchData();
  }, [filter, currentPage]);

  const fetchData = async () => {
    axios
      .get(`https://api.waren-d.com/api/villas?page=${currentPage}`, {
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
      })
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
      {villaToEditAndPrint && (
        <EditeVillaCaseModel
          show={showEditModal}
          setShow={setshowEditModal}
          villaCase={villaToEditAndPrint}
          setvillaToEditAndPrint={setvillaToEditAndPrint}
        />
      )}

      {showModalPdf && (
        <PdfPageModa
          rowData={villaToEditAndPrint}
          showModalPdf={showModalPdf}
          setshowModalPdf={setshowModalPdf}
        />
      )}
      <ThemeProvider theme={theme}>
        <DataGrid
          className="overflow-x-auto"
          columns={[
            { field: "fullName", headerName: "ناو", width: 150 },
            { field: "location", headerName: "ناونیشان", width: 150 },
            { field: "phone1", headerName: "ژمارەی مۆبایل ١ ", width: 150 },
            { field: "phone2", headerName: "ژمارەی مۆبایل ٢", width: 150 },
            {
              field: "contractNumber",
              headerName: "ژمارەی گرێبەست",
              width: 150,
            },
            {
              field: "contractDate",
              headerName: "بەرواری گرێبەست",
              width: 150,
            },
            { field: "unitType", headerName: "جۆری یەکە", width: 150 },
            { field: "Size", headerName: "ڕووبەر", width: 150 },
            {
              field: "houseNumber",
              headerName: "(کۆن) ژمارەی خانوو",
              width: 150,
            },
            {
              field: "newHouseNumber",
              headerName: "ژمارەی نوێی  (نوێ)",
              width: 150,
            },
            { field: "floor", headerName: "نهۆم", width: 150 },

            {
              field: "moneyCurrenceAmount",
              headerName: "بڕی پارەی دراو",
              width: 150,
            },
            {
              field: "moneyRemainingAmount",
              headerName: "بڕی پارەی ماوە",
              width: 150,
            },
            {
              field: "doesNotHaveAnyMoneyLeft",
              headerName: "بڕی پارەی نەماوە",
              width: 150,
            },
            {
              field: "theStartDateOfTheInstallment",
              headerName: "بەرواری دەستپێکردنی قیست",
              width: 150,
            },
            {
              field: "theEndDateOfTheInstallment",
              headerName: "بەرواری کۆتای قیست",
              width: 150,
            },
            {
              field: "theAmountOfMonthlyInstallments",
              headerName: "بڕی مانگانە قیست",
              width: 150,
            },
            {
              field: "installmentRemainingMonthlyAmount",
              headerName: "بری پارەی ماوەی قیست",
            },

            { field: "id", headerName: "ID", width: 90 },
            {
              field: "---",
              headerName: " ---",
              sortable: false,
              width: 100,
              renderCell: (params) => (
                <button
                  onClick={() => {
                    setvillaToEditAndPrint(params.row);
                    setshowModalPdf(true);
                  }}
                  className="rounded-md bg-green-500 p-2 text-center text-white"
                >
                  پرێنت
                </button>
              ),
            },
            {
              field: "-",
              headerName: " -",
              sortable: false,
              width: 100,
              renderCell: (params) => (
                <button
                  onClick={() => {
                    setvillaToEditAndPrint(params.row);
                    setshowEditModal(true);
                  }}
                  className="rounded-md bg-blue-500 p-2 text-center text-white"
                >
                  دەسکاری
                </button>
              ),
            },
            {
              field: "--",
              headerName: "--",
              sortable: false,
              width: 100,
              renderCell: (params) => (
                <button
                  onClick={() => deleteHandle(params.row)}
                  className="rounded-md bg-red-500 p-2 text-center text-white"
                >
                  سڕینەوە
                </button>
              ),
            },
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

export default TableVillaCase;
