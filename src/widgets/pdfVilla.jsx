import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import arbkunus from "./../assets/images/arkunus.png";
import hk from "./../assets/images/hk.jpg";
import krdkunus from "./../assets/images/krdkunus.png";

import spedafont from "./../assets/fonts/Speda.ttf";
import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import moment from "moment";
function PdfPageModa({ rowData, showModalPdf, setshowModalPdf }) {
  const [lang, setlang] = useState("kur");
  Font.register({
    family: "myFont",
    src: spedafont,
  });
  const styles = StyleSheet.create({
    smallLabel: {
      width: "100%",
      fontSize: "8px",
      border: "1px solid black",
      backgroundColor: "#C5C5C5",
      padding: 8,
      textAlign: "right",
    },
    modalBody: {
      height: "600px",
      width: "100%",
      textAlign: "rigt",
    },
    page: {
      flexDirection: "column",
      fontFamily: "myFont",
      backgroundColor: "white",
      padding: "10",
      paddingTop: "23",
      fontSize: "12px",
      textAlign: "right",
      justifyContent: "space-between",
    },
    bigSection: {
      flexDirection: "row",
      flexWrap: "wrap",
      backgroundColor: "white",
      fontSize: "10px",
      justifyContent: "flex-end",
    },
    section: {
      width: "100%",
      display: "inline",
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 2,
      textAlign: "right",
    },
    headLineAr: {
      marginTop: 10,

      fontSize: "12px",
      marginBottom: 10,
    },
    headLineKrd: {
      marginTop: 10,
      fontSize: "9.5px",
      marginBottom: 10,
    },
    label: {
      width: "100%",
      fontSize: "10px",
      border: "1px solid black",
      backgroundColor: "#C5C5C5",
      padding: 8,
      textAlign: "right",
    },
    value: {
      width: "80%",
      padding: 8,
      fontSize: "10px",
      textAlign: "right",
      backgroundColor: "#FBE7C6",
    },

    emptyValue: {
      width: "100%",
      padding: 8,
      textAlign: "right",
    },

    rowSection: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 2,
      direction: "rtl",
    },

    header: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      textAlign: "right",
    },

    header_column: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      textAlign: "right",
    },

    header_image: {
      width: "160px",
    },

    seImage: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    imageAr: {
      width: "560px",
    },
  });
  console.log(rowData);
  return (
    <>
      <Modal
        size="xl"
        show={showModalPdf}
        onHide={() => {
          setshowModalPdf(false);
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <button
            className="rounded-lg bg-red-400 p-2 text-white "
            onClick={() => {
              setshowModalPdf(false);
            }}
          >
            داخستن
          </button>
        </Modal.Header>
        <Modal.Body className="h-full w-full ">
          <div>
            <ul className="m-2 flex justify-between text-black">
              <li
                className="w-20 rounded-md bg-blue-500 p-1 text-center text-white"
                onClick={() => {
                  setlang("kur");
                }}
              >
                کوردی
              </li>
              {/* <li
                className="w-20 rounded-md bg-blue-500 p-1 text-center text-white"
                onClick={() => {
                  setlang("en");
                }}
              >
                en
              </li> */}
              <li
                className="w-20 rounded-md bg-blue-500 p-1 text-center text-white"
                onClick={() => {
                  setlang("ar");
                }}
              >
                عربي
              </li>
            </ul>
          </div>
          {rowData && (
            <PDFViewer style={styles.modalBody}>
              <Document>
                <Page size="A4" style={styles.page}>
                  <View style={styles.header}>
                    <View style={styles.header_column}>
                      <Text style={styles.header_column_text}>
                        {rowData.id}
                        {lang == "kur" ? "   ژمارە :" : "   رقم: "}
                      </Text>
                      <Text style={styles.header_column_text}>
                        {moment().format('YYYY/MM/DD')}
                        {lang == "kur" ? "  بەروار  :" : "   تاریخ: "}
                      
                      </Text>
                    </View>
                    <View style={styles.header_image}>
                      <Image src={hk} style={styles.image} />
                    </View>

                    <View style={styles.header_column}>
                      <Text style={styles.header_column_text}>
                      {lang == "kur" ? "دەستەى وەبەرهێنان" : "مجلس الاستثمار"}

                        
                      </Text>
                      <Text style={styles.header_column_text}>
                      {lang == "kur" ? "لیژنەى چارەسەرکردنى کێشەکانى" : "لجنة حل مشكلات "}

                      </Text>
                      <Text style={styles.header_column_text}>
                      {lang == "kur" ? "پرۆژەى وەرین ستى " : " المشروع ورین سیتي"}

                       
                      </Text>
                    </View>
                  </View>
                  <View style={styles.bigSection}>
                    <Text
                      style={
                        lang == "kur" ? styles.headLineKrd : styles.headLineAr
                      }
                    >
                      {lang == "kur"
                        ? "ئەم کۆنوسە لەلایەن لیژنەی چارەسەرکردنی کێشەکانی پرۆژەی وەرین ستی رێکخراوە بە فەرمانی ب .گ. وەبەرهێنانى هەولێر بە ژمارە)3575( لە )62/01/2202 ( "
                        : ` محضر اللجنة المشكلة لمعالجة مشاكل مشروع ورين ستى حسب امر المديرية العامة استثمار اربيل رقم )3575( في )62/01/2202/(`}
                    </Text>
                    <View style={styles.rowSection}>
                      <View style={styles.section}>
                        <Text style={styles.value}>{rowData.phone1}</Text>
                        <Text style={styles.label}>
                          {lang == "kur"
                            ? " ژمارەی مۆبایل ١"
                            : "رقم الهاتف المحمول"}
                        </Text>
                      </View>

                      <View style={styles.section}>
                        <Text style={styles.value}>{rowData.location}</Text>
                        <Text style={styles.label}>
                          {lang == "kur" ? "ناونیشان" : "عنوان"}
                        </Text>
                      </View>

                      <View style={styles.section} direction="rtl">
                        <Text style={styles.value}>{rowData.fullName}</Text>
                        <Text style={styles.label}>
                          {lang == "kur" ? "ناو " : "الاسم"}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.rowSection}>
                      <View style={styles.section}>
                        <Text style={styles.value}>{rowData.phone2}</Text>
                        <Text style={styles.label}>
                          {lang == "kur" ? "ژمارەی مۆبایل ٢ " : "رقم الجوال"}
                        </Text>
                      </View>
                      <View style={styles.section}>
                        <Text style={styles.value}>{rowData.contractDate}</Text>
                        <Text style={styles.label}>
                          {lang == "kur" ? "بەرواری عەقد" : "تاريخ العقد"}
                        </Text>
                      </View>
                      <View style={styles.section}>
                        <Text style={styles.value}>
                          {rowData.contractNumber}
                        </Text>
                        <Text style={styles.label}>
                          {lang == "kur" ? "ژمارەی عەقد" : "رقم العقد"}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.rowSection}>
                      <View style={styles.section}>
                        <Text style={styles.value}>{rowData.houseNumber}</Text>
                        <Text style={styles.label}>
                          {lang == "kur" ? "ژمارەی خانوو" : "رقم الدار"}
                        </Text>
                      </View>

                      <View style={styles.section}>
                        <Text style={styles.value}>{rowData.Size}</Text>
                        <Text style={styles.label}>
                          {lang == "kur" ? " ڕووبەر" : " المساحە"}
                        </Text>
                      </View>
                      <View style={styles.section}>
                        <Text style={styles.value}>{rowData.unitType}</Text>
                        <Text style={styles.label}>
                          {lang == "kur" ? "جۆری یەکە" : "جۆری یەکە"}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.rowSection}>
                      <View style={styles.section}>
                        <Text style={styles.emptyValue}>{"-"}</Text>
                        <Text style={styles.emptyValue}>{"-"}</Text>{" "}
                      </View>
                      <View style={styles.section}>
                        <Text style={styles.value}>
                          {rowData.newHouseNumber}
                        </Text>
                        <Text style={styles.label}>
                          {lang == "kur"
                            ? "ژمارەی نوێی زانوو"
                            : "عدد الدار الجديدة"}
                          :
                        </Text>
                      </View>
                      <View style={styles.section}>
                        <Text style={styles.value}>{rowData.floor}</Text>
                        <Text style={styles.label}>
                          {lang == "kur" ? "نهۆم " : "أرضية"}
                        </Text>
                      </View>
                    </View>

                    {rowData.type == true ? (
                      <View>
                        <View style={styles.rowSection}>
                          <View style={styles.section}>
                            <Text style={styles.value}>
                              {rowData.theEndDateOfTheInstallment}
                            </Text>
                            <Text style={styles.label}>
                              {lang == "kur"
                                ? "بەرواری کۆتای قیست "
                                : "تاريخ استحقاق القسط"}
                            </Text>
                          </View>
                          <View style={styles.section}>
                            <Text style={styles.value}>
                              {rowData.theStartDateOfTheInstallment}
                            </Text>
                            <Text style={styles.label}>
                              {lang == "kur"
                                ? "بەرواری قیستی یەکەم"
                                : "تاريخ بداية القسط"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.rowSection}>
                          <View style={styles.section}>
                            <Text style={styles.value}>
                              {rowData.installmentRemainingMonthlyAmount}
                            </Text>
                            <Text style={styles.label}>
                              {lang == "kur"
                                ? "بڕی پارەی ماوە"
                                : "المبلغ المتبقي من المال"}
                            </Text>
                          </View>
                          <View style={styles.section}>
                            <Text style={styles.value}>
                              {rowData.theAmountOfMonthlyInstallments}
                            </Text>
                            <Text style={styles.label}>
                              {lang == "kur"
                                ? "بڕی پارەی مانگانە:"
                                : "مبلغ القسط الشهري"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ) : (
                      <View>
                        <View style={styles.rowSection}>
                          <View style={styles.section}>
                            <Text style={styles.value}>
                              {rowData.doesNotHaveAnyMoneyLeft}
                            </Text>
                            <Text style={styles.smallLabel}>
                              {lang == "kur"
                                ? "بڕی پارەی نەماوە:"
                                : "ليس لديه أي نقود متبقية"}
                            </Text>
                          </View>
                          <View style={styles.section}>
                            <Text style={styles.value}>
                              {rowData.moneyRemainingAmount}
                            </Text>
                            <Text style={styles.smallLabel}>
                              {lang == "kur"
                                ? "بڕی پارەی ماوە:"
                                : "المبلغ المتبقي من المال"}
                            </Text>
                          </View>
                          <View style={styles.section}>
                            <Text style={styles.value}>
                              {rowData.moneyCurrenceAmount}
                            </Text>
                            <Text style={styles.label}>
                              {lang == "kur"
                                ? "بڕی پارەی دراو"
                                : "مقدار النقود العملة"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                  <View style={styles.seImage}>
                    <Image
                      src={lang == "kur" ? krdkunus : arbkunus}
                      style={lang == "kur" ? styles.imageKrd : styles.imageAr}
                    />
                  </View>
                </Page>
              </Document>
            </PDFViewer>
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default PdfPageModa;
