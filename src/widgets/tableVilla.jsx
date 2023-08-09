import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import EditeVillaModel from "./editeVillaModal";

const theme = createTheme({
  typography: {
    fontFamily: "speda",
    fontWeightBold: "bold",
    fontSize: "16px",
  },
});

const columns = [];

const TableVilla = ({ editeHandle, deleteHandle }) => {
  const [rows, setRows] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [filter, setfilter] = useState([]);

  const [showEditModal, setshowEditModal] = useState(false);
  const [villaToEdit, setvillaToEdit] = useState(null);

  useEffect(() => {
    fetchData(1);
  }, []);

  useEffect(() => {
    fetchData();
  }, [filter, currentPage]);

  const fetchData = async () => {
    console.log(filter);
    const res = await axios.get(
      `https://api.waren-d.com/public/api/SelfHouse?page=${currentPage}`,
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
    );
    setRows(res.data.data);
    setTotalPages(res.data.total);
  };

  const handlePageChange = (params) => {
    let page = params.page;
    page += 1;
    setCurrentPage(page);
  };
  const handleFilterChange = async (params) => {
    setfilter(params.items);
  };

  return (
    <div
      style={{
        height: "500px",
        width: "100%",
        fontSize: "16px",
        direction: "rtl",
      }}
    >
      {villaToEdit && (
        <EditeVillaModel
          show={showEditModal}
          setShow={setshowEditModal}
          villa={villaToEdit}
        />
      )}
      <ThemeProvider theme={theme}>
        <DataGrid
          className="font-sans"
          columns={[
            { field: "id", headerName: "ID", width: 90 },
            { field: "newNumber", headerName: "ژمارەی نوێ", width: 200 },
            { field: "oldNumber", headerName: "ژمارەی کۆن", width: 200 },
            { field: "location", headerName: "ناونیشان", width: 200 },
            {
              field: "-",
              headerName: " -",
              sortable: false,
              width: 100,
              renderCell: (params) => (
                <button
                  onClick={() => {
                    setvillaToEdit(params.row);
                    setshowEditModal(true);
                  }}
                  className="rounded-md bg-green-500 p-2 text-center text-white"
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
        />
      </ThemeProvider>
    </div>
  );
};

export default TableVilla;
