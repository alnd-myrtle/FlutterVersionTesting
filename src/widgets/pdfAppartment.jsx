import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import arbkunus from "./../assets/images/arkunus.png";
import hk from "./../assets/images/hk.jpg";
import krdkunus from "./../assets/images/krdkunus.png";
import krdkunusName from "./../assets/images/konusNamesKrd.png";
import arkunusName from "./../assets/images/konusNamesAr.png";

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
import { padding } from "@mui/system";

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
let arabicDigitsRegex = /^[\u0660-\u0669]+$/; // regular expression to match Arabic digits
let arabicDigitsRegexBoth = /[\u0660-\u0669]/; // regular expression to match any Arabic digit

function reverseString(str) {
  // empty string
  let newString = "";
  for (let i = str.length - 1; i >= 0; i--) {
    newString += str[i];
  }
  return newString;
}
function isArabicNumber(str) {
  // Create a regular expression that matches any Arabic number.
  const regex = /[٠١٢٣٤٥٦٧٨٩]/u;

  // Return true if the string contains any Arabic numbers.
  return regex.test(str);
}
function PdfPageModalAppartment({ rowData, showModalPdf, setshowModalPdf }) {
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
      textAlign: "right",
    },
    note: {
      direction: "rtl",
      fontSize: "10px",
      marginBottom: 20,
    },
    page: {
      flexDirection: "column",
      fontFamily: "myFont",
      backgroundColor: "white",
      padding: "30",
      paddingTop: "23",
      fontSize: "12px",
      textAlign: "right",
      justifyContent: "flex-start",
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
      marginVertical: 1,
      textAlign: "right",
    },
    section2: {
      width: "120%",
      display: "inline",
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 1,
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
      padding: 3,
      textAlign: "right",
    },
    label3: {
      width: "40%",
      fontSize: "10px",
      border: "1px solid black",
      backgroundColor: "#C5C5C5",
      padding: 3,
      textAlign: "right",
    },
    label2: {},
    value: {
      width: "80%",
      padding: 3,

      fontSize: "10px",
      textAlign: "right",
      backgroundColor: "#FBE7C6",
    },
    value2: {
      width: "95%",
      padding: 3,

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
      marginVertical: 0,
      direction: "rtl",
    },
    rowSection2: {
      marginBottom: -3,
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
    header_column2: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      textAlign: "right",
    },
    rowText: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      textAlign: "right",
    },

    header_image: {
      width: "160px",
    },
    owner: {
      marginTop: 20,
      fontSize: "11px",
    },
    seImage: {
      display: "flex",
      width: "490px",
      textAlign: "center",
      position: "absolute",
      bottom: "0px",

      right: "0",
    },

    title: {
      marginVertical: 8,
      display: "flex",
    },

    bottom: {
      marginTop: 0,
      padding: 10,
    },
    mla: {
      fontSize: 12,
      backgroundColor: "",
    },
    imageKrd: {
      width: "90%",

      marginHorizontal: "auto",
      marginTop: 20,
    },
    imageAr: {
      width: "90%",
      marginHorizontal: "auto",
      marginTop: 20,
    },

    siginPlace: {
      fontSize: "11px",
    },
    headText: {
      display: "block",
      width: "100%",
      textAlign: "center",
    },

    headText2: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
    subHeadText2: {
      marginRight: 5,
    },

    justFlex: {
      display: "flex",
      fontSize: "11px",
    },
  });

  const styles2 = StyleSheet.create({
    textContainer: {
      backgroundColor: "#FBE7C6",
      paddingRight: "10px",
      display: "flex",
      flexDirection: "row-reverse",
      flexWrap: "wrap",
      textAlign: "right",
    },

    textContainer2: {
      display: "flex",
      flexDirection: "row-reverse",

      width: "120%",
      alignItems: "center",
      marginVertical: 1,
      textAlign: "right",
    },
    text: {
      direction: "rtl",
      margin: "0 1px",
      paddingRight: "10px",
      display: "flex",
      textAlign: "right",
      fontSize: "11px",
    },
    text2: {
      backgroundColor: "#FBE7C6",

      margin: "0 1px",
      paddingRight: "2px",
      display: "flex",
      textAlign: "right",
      fontSize: "11px",
    },
  });

  return (
    <>
      <Modal
        size="xl"
        show={showModalPdf}
        onHide={() => {
          setshowModalPdf(false);
          window.location.reload();
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <button
            className="rounded-lg bg-red-400 p-2 text-white "
            onClick={() => {
              setshowModalPdf(false);
              window.location.reload();
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
                    <View style={styles.header_column2}>
                      <View style={styles.rowText}>
                        <Text style={styles.header_column_text}>
                          {rowData.id}
                          {lang == "kur" ? "   ژمارە :" : "   رقم: "}
                        </Text>
                        <Text style={styles.header_column_text}>
                          {rowData.exist == "0"
                            ? moment().format("YYYY-MM-DD")
                            : rowData.exist}
                          {lang == "kur" ? "  بەروار  :" : "   تاریخ: "}
                        </Text>
                      </View>{" "}
                    </View>

                    <View style={styles.header_image}>
                      <Image src={hk} style={styles.image} />
                    </View>

                    <View style={styles.header_column}>
                      <Text style={styles.header_column_text}>
                        {lang == "kur" ? "دەستەى وەبەرهێنان" : "مجلس الاستثمار"}
                      </Text>
                      <Text style={styles.header_column_text}>
                        {lang == "kur"
                          ? "لیژنەى چارەسەرکردنى کێشەکانى"
                          : "لجنة حل مشكلات "}
                      </Text>
                      <Text style={styles.header_column_text}>
                        {lang == "kur"
                          ? "پرۆژەى وەرین ستى "
                          : " المشروع ورین سیتي"}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.bigSection}>
                    {lang == "kur" ? (
                      <>
                        <View style={styles.headText}>
                          <Text style={styles.headText}>
                            ئەم کۆنوسە لەلایەن لیژنەی چارەسەرکردنی کێشەکانی
                            پرۆژەی وەرین ستی رێکخراوە بە فەرمانی كارگێری ب .گ.
                            وەبەرهێنانى
                          </Text>
                        </View>
                        <View style={styles.headText2}>
                          <Text style={styles.subHeadText2}> (2023/6/13</Text>
                          <Text style={styles.subHeadText2}>لە</Text>
                          <Text style={styles.subHeadText2}> 2862 )</Text>
                          <Text style={styles.subHeadText2}>و</Text>
                          <Text style={styles.subHeadText2}> (2023/4/11</Text>
                          <Text style={styles.subHeadText2}>لە</Text>
                          <Text style={styles.subHeadText2}> 1917 )</Text>
                          <Text style={styles.subHeadText2}>و</Text>
                          <Text style={styles.subHeadText2}> (2022/10/26</Text>
                          <Text style={styles.subHeadText2}>لە</Text>
                          <Text style={styles.subHeadText2}> 5753 )</Text>
                          <Text style={styles.subHeadText2}>
                            هەولێر بە ژمارە{" "}
                          </Text>
                        </View>
                      </>
                    ) : (
                      <>
                        <View style={styles.headText}>
                          <Text style={styles.headText}>
                            محضر اللجنة المشكلة لمعالجة مشاكل مشروع ورين ستى وفق
                            أمر اداري صادر من المديرية العامة استثمار
                          </Text>
                        </View>
                        <View style={styles.headText2}>
                          <Text style={styles.subHeadText2}> (2023/4/11</Text>
                          <Text style={styles.subHeadText2}>في</Text>
                          <Text style={styles.subHeadText2}> 1917 )</Text>
                          <Text style={styles.subHeadText2}>و</Text>
                          <Text style={styles.subHeadText2}> (2022/10/26</Text>
                          <Text style={styles.subHeadText2}>في</Text>
                          <Text style={styles.subHeadText2}> 5753 )</Text>
                          <Text style={styles.subHeadText2}>اربيل رقم</Text>
                        </View>
                      </>
                    )}

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
                        <Text style={styles.label3}>
                          {lang == "kur" ? "ناونیشان" : "عنوان"}
                        </Text>
                      </View>

                      <View style={styles2.textContainer2} direction="rtl">
                        {" "}
                        <Text style={styles.label3}>
                          {lang == "kur" ? "ناو " : "الاسم"}
                        </Text>
                        <View style={styles2.textContainer}>
                          {rowData.fullName.split(" ").map((item) => (
                            <Text style={styles2.text2}>{`${item} `}</Text>
                          ))}
                        </View>
                        {/* <Text style={styles.value2}>{rowData.fullName}</Text> */}
                      </View>
                    </View>
                    <View style={styles.rowSection}>
                      <View style={styles.section}>
                        <Text style={styles.value}>{rowData.phone2}</Text>
                        <Text style={styles.label}>
                          {lang == "kur"
                            ? "ژمارەی مۆبایل ٢ "
                            : "رقم الهاتف المحمول"}
                        </Text>
                      </View>
                      <View style={styles.section}>
                        <Text style={styles.value}>{rowData.contractDate}</Text>
                        <Text style={styles.label}>
                          {lang == "kur" ? "بەرواری گرێبەست" : "تاريخ العقد"}
                        </Text>
                      </View>
                      <View style={styles.section}>
                        <Text style={styles.value}>
                          {rowData.contractNumber}
                        </Text>
                        <Text style={styles.label}>
                          {lang == "kur" ? "ژمارەی گرێبەست" : "رقم العقد"}
                        </Text>
                      </View>
                    </View>
                    {rowData.unitType == "villa" ? (
                      <>
                        <View style={styles.rowSection}>
                          {" "}
                          <View style={styles.section}>
                            <Text style={styles.value}>
                              {rowData.unitPrice}
                            </Text>
                            <Text style={styles.label}>
                              {lang == "kur" ? "نرخی یەکە" : "السعر الوحدة"}
                            </Text>
                          </View>
                          <View style={styles.section}>
                            <Text style={styles.value}>
                              {rowData.unitNumber}
                            </Text>
                            <Text style={styles.label}>
                              {lang == "kur" ? "ژمارەی یەکە" : "رقم الوحده"}
                            </Text>
                          </View>{" "}
                          <View style={styles.section}>
                            <Text style={styles.value}>
                              {rowData.unitType == "villa" ? "ڤێلا" : "شووقە"}
                            </Text>{" "}
                            <Text style={styles.label}>
                              {lang == "kur" ? " جۆری یەکە" : "نوع الوحدە"}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.rowSection}>
                          <View style={styles.section}>
                            <Text style={styles.value}>
                              {rowData.type == "installment" ? "قسط" : "نقد"}
                            </Text>
                            <Text style={styles.label}>
                              {lang == "kur" ? "شێوازی پارەدان" : "طريقة الدفع"}
                            </Text>
                          </View>
                          <View style={styles.section}>
                            <Text style={styles.value}>{rowData.floor}</Text>
                            <Text style={styles.label}>
                              {lang == "kur" ? "نهۆم" : "الطابق"}
                            </Text>
                          </View>
                          <View style={styles.section}>
                            <Text style={styles.value}>
                              {rowData.buildingSize}
                            </Text>
                            <Text style={styles.label}>
                              {lang == "kur"
                                ? "پێوانەی گشتی م٢"
                                : "مساحة البناء م٢"}
                            </Text>
                          </View>
                        </View>
                      </>
                    ) : (
                      <>
                        <View style={styles.rowSection}>
                          <View style={styles.rowSection}>
                            <View style={styles.section}>
                              <Text style={styles.value}>
                                {rowData.unitPrice}
                              </Text>
                              <Text style={styles.label}>
                                {lang == "kur" ? "نرخی یەکە" : "السعر الوحدة"}
                              </Text>
                            </View>
                            <View style={styles.section}>
                              <Text style={styles.value}>
                                {rowData.unitNumber}
                              </Text>
                              <Text style={styles.label}>
                                {lang == "kur" ? "ژمارەی یەکە" : "رقم الوحده"}
                              </Text>
                            </View>{" "}
                            <View style={styles.section}>
                              <Text style={styles.value}>
                                {rowData.unitType == "villa" ? "ڤێلا" : "شووقە"}
                              </Text>{" "}
                              <Text style={styles.label}>
                                {lang == "kur" ? " جۆری یەکە" : "نوع الوحدە"}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.rowSection}>
                          <View style={styles.section}>
                            <Text style={styles.value}>
                              {rowData.buildingNumber}
                            </Text>
                            <Text style={styles.label}>
                              {lang == "kur"
                                ? "ژمارەی باڵەخانە"
                                : "رقم البناية"}
                            </Text>
                          </View>

                          <View style={styles.section}>
                            <Text style={styles.value}>
                              {rowData.buildingType}
                            </Text>
                            <Text style={styles.label}>
                              {lang == "kur" ? " جۆری باڵەخانە" : "نوع البناية"}
                            </Text>
                          </View>
                          <View style={styles.rowSection}>
                            <View style={styles.section}>
                              <Text style={styles.value}>{rowData.type2}</Text>
                              <Text style={styles.label}>
                                {lang == "kur" ? "جۆری شووقە" : "فئة الشقة"}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.rowSection}>
                          <View style={styles.section}>
                            <Text style={styles.value}>
                              {rowData.type == "installment" ? "قسط" : "نقد"}
                            </Text>
                            <Text style={styles.label}>
                              {lang == "kur" ? "شێوازی پارەدان" : "طريقة الدفع"}
                            </Text>
                          </View>
                          <View style={styles.section}>
                            <Text style={styles.value}>{rowData.floor}</Text>
                            <Text style={styles.label}>
                              {lang == "kur" ? "نهۆم" : "الطابق"}
                            </Text>
                          </View>
                          <View style={styles.section}>
                            <Text style={styles.value}>
                              {rowData.buildingSize}
                            </Text>
                            <Text style={styles.label}>
                              {lang == "kur"
                                ? "پێوانەی گشتی م٢"
                                : "مساحة البناء م٢"}
                            </Text>
                          </View>
                        </View>
                      </>
                    )}

                    {rowData.type != "notInstallment" ? (
                      <View>
                        <View style={styles.rowSection}>
                          <View style={styles.section}>
                            <Text style={styles.value}>
                              {rowData.theEndDateOfTheFirstInstallment}
                            </Text>
                            <Text style={styles.label}>
                              {lang == "kur"
                                ? "بەرواری کۆتای قیست "
                                : "تاريخ استحقاق القسط"}
                            </Text>
                          </View>
                          <View style={styles.section}>
                            <Text style={styles.value}>
                              {rowData.theStartDateOfTheFirstInstallment}
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
                              {rowData.amountPayments}
                            </Text>
                            <Text style={styles.label}>
                              {lang == "kur"
                                ? "بڕی پارەی دراو"
                                : " المبلغ الدفوع"}
                            </Text>
                          </View>
                          <View style={styles.section}>
                            <Text style={styles.value}>
                              {rowData.theAmountOfMonthlyInstallments}
                            </Text>
                            <Text style={styles.label}>
                              {lang == "kur"
                                ? "ماوەی قیستەکان )مانگ("
                                : "فترة التقسيط )أشهر("}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.rowSection}>
                          <View style={styles.section}>
                            <Text style={styles.value}>
                              {rowData.remainingAmount}
                            </Text>
                            <Text style={styles.label}>
                              {lang == "kur"
                                ? "بڕی پارەی ماوە"
                                : "المبلغ المتبقي من المال"}
                            </Text>
                          </View>

                          <View style={styles.section}>
                            <Text style={styles.value}>
                              {rowData.installmentRemainingAmount}
                            </Text>
                            <Text style={styles.label}>
                              {lang == "kur"
                                ? "بڕی پارەی مانگانە"
                                : "مبلغ الدفع الشهري"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.rowSection}>
                        <View style={styles.section}>
                          <Text style={styles.value}>
                            {rowData.remainingAmount}
                          </Text>
                          <Text style={styles.label}>
                            {lang == "kur"
                              ? "بڕی پارەی ماوە"
                              : "المبلغ المتبقي من المال"}
                          </Text>
                        </View>
                        <View style={styles.section}>
                          <Text style={styles.value}>
                            {rowData.amountPayments}
                          </Text>
                          <Text style={styles.label}>
                            {lang == "kur"
                              ? "بڕی پارەی دراو"
                              : "مقدار النقود العملة"}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                  <View style={styles.rowSection2}>
                    <Text style={styles.title}>
                      {" "}
                      {lang == "kur" ? "پابەندیەکان:" : "التزامات"}
                    </Text>
                  </View>
                  <Image
                    src={lang == "kur" ? krdkunus : arbkunus}
                    style={lang == "kur" ? styles.imageKrd : styles.imageAr}
                  />

                  <Text style={styles.owner}>
                    {rowData.fullName}{" "}
                    {lang == "kur" ? "ناوی خاوەن یەکە:" : "مالک الوحدە:"}
                  </Text>
                  <View style={styles.siginPlace}>
                    <View style={styles2.textContainer}>
                      <Text> {lang == "kur" ? "تێبینی:" : "ملاحظه:"}</Text>

                      {rowData.type3.split(" ").map((item) => {
                        let text = "";
                        if (item.slice(-1) == ")" && item[0] == "(") {
                          const last = item.slice(0, -1);
                          let first = last.replace(/^./, "");
                          if (first.includes("$")) {
                            var newStr = first.replace("$", "");

                            if (isNumeric(newStr)) {
                              return (
                                <Text style={styles.text}>
                                  {`(${newStr}$)`}{" "}
                                </Text>
                              );
                            }

                            if (arabicDigitsRegex.test(newStr)) {
                              return (
                                <Text style={styles.text}>
                                  ({`${reverseString(newStr)}$`})
                                </Text>
                              );
                            } else if (isArabicNumber(first)) {
                              console.log(first);

                              return (
                                <Text style={styles.text}>
                                  ({`${reverseString(first)}`}){" "}
                                </Text>
                              );
                            } else {
                              console.log("yes2");
                              return (
                                <Text style={styles.text}>({`${first}`}) </Text>
                              );
                            }
                          } else if (isNumeric(first)) {
                            return (
                              <Text style={styles.text}>{`(${first})`} </Text>
                            );
                          } else if (arabicDigitsRegex.test(first)) {
                            return (
                              <Text style={styles.text}>
                                ({`${reverseString(first)}`})
                              </Text>
                            );
                          } else if (isArabicNumber(first)) {
                            console.log(first);

                            return (
                              <Text style={styles.text}>
                                ({`${reverseString(first)}`}){" "}
                              </Text>
                            );
                          } else {
                            console.log("yes2");
                            return (
                              <Text style={styles.text}>({`${first}`}) </Text>
                            );
                          }
                        }

                        for (let i = 0; i < item.length; i++) {
                          if (item.toString().charAt(i) == "(") {
                            text += ")";
                          } else if (item.toString().charAt(i) == ")") {
                            text += "(";
                          } else {
                            text += item.toString().charAt(i);
                          }
                        }
                        return <Text style={styles.text}>{`${text}`} </Text>;
                      })}
                    </View>

                    <View>
                      <Image
                        src={lang == "kur" ? krdkunusName : arkunusName}
                        style={lang == "kur" ? styles.imageKrd : styles.imageAr}
                      />

                      <Text style={styles.bottom}>
                        {rowData.username}{" "}
                        {lang == "kur" ? " ڕێکخەر:" : "منظم:"}
                      </Text>
                    </View>
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

export default PdfPageModalAppartment;
