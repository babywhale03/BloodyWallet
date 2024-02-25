const wallProvider = require("../../app/Wallet/wallProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const wallService = require("../Wallet/wallService");
const { response, errResponse } = require("../../../config/response");
const { application } = require("express");
const mysql = require("mysql2/promise");
// const connection = await pool.getConnection(async (conn) => conn);

const multer = require("multer");
const upload = multer({ dest: "./upload" });
const { ImageAnnotatorClient } = require("@google-cloud/vision");

// Google Cloud Vision API 클라이언트 설정
const client = new ImageAnnotatorClient({
  keyFilename:
    "/home/ubuntu/gdsc/server_nodejs_templete/valued-rigging-409512-fa70fd80beca.json",
});

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/wall
 */
exports.getBlood = async function (req, res) {
  const id = req.query.id;

  if (!id) {
    // id가 없거나 유효하지 않는 경우 실패 응답 보내기
    const errorResponse = baseResponse.USER_USERID_EMPTY; // INVALID_INPUT은 유효하지 않은 입력을 나타내는 오류 코드
    return res.send(response(errorResponse, "Invalid or missing ID.")); // 오류 메시지와 함께 응답 보내기
  } else {
    const wallBloodResult = await wallProvider.retrieveWallInfo(id);
    return res.send(response(baseResponse.SUCCESS, wallBloodResult));
  }
};

exports.postBlood = async function (req, res) {
  // const { type, date, hos } = req.body;

  // // if (!id) {
  // //     return res.send(response(baseResponse.USER_USERID_NOT_EXIST));
  // // }
  // const signUpResponse = await wallService.addBlood(
  //     type,
  //     date,
  //     hos,
  // );
  // return res.send(signUpResponse);
  // 데이터베이스 연결 설정

  let imagePath = "/home/ubuntu/gdsc/server_nodejs_templete/upload/test.png";
  detectTextAndExtractInfo(imagePath)
    .then((info) => {
      console.log(info);
    })
    .catch((error) => {
      console.error(error);
    });

  return response(baseResponse.SUCCESS);
};
// 이미지에서 텍스트를 추출하는 함수
async function detectTextAndExtractInfo(imagePath) {
  try {
    // 이미지에서 텍스트 검출
    const [result] = await client.textDetection(imagePath);
    const detections = result.textAnnotations;
    let text = detections[0].description;

    // 각 정보를 추출하기 위한 정규식 패턴 정의
    const donationDatePattern = /헌혈일자:?\s*(.*?)\s*\n/;
    const namePattern = /헌혈종류?\s*(.*?)\s*\n/;
    const donationPlacePattern = /혈액원명:?\s*(.*?)\s*\n/;
    const numPattern = /\d{2}-\d{2}-\d{6}/;

    // 정보 추출
    const donationDateMatch = text.match(donationDatePattern);
    const nameMatch = text.match(namePattern);
    const donationPlaceMatch = text.match(donationPlacePattern);
    const numMatch = text.match(numPattern);
    // console.log(donationDateMatch);
    // 예시 문자열 생성
    const type = nameMatch[1].trim(); //+ new Date().toISOString();
    const date = donationDateMatch[1].trim(); //+ new Date().toISOString();
    const hos = donationPlaceMatch[1].trim(); //+ new Date().toISOString();
    const num = numMatch[0]; //+ new Date().toISOString();

    const db = mysql.createPool({
      host: "gdsc.cizaocjakvvv.ap-northeast-2.rds.amazonaws.com",
      user: "root",
      port: "3306",
      password: "",
      database: "erd",
    });
    // 데이터베이스에 저장
    const query =
      "INSERT INTO wallet(w_type,w_date,w_hos,w_num,u_id) VALUES (?,?,?,?,20)";
    db.query(query, [type, date, hos, num], (err, result) => {
      if (err) throw err;
      console.log("String saved to database");
    });
    // 추출된 정보 반환
    return {
      bloodType: nameMatch ? nameMatch[1].trim() : null,
      donationDate: donationDateMatch ? donationDateMatch[1].trim() : null,
      donationPlace: donationPlaceMatch ? donationPlaceMatch[1].trim() : null,
      donationNumber: numMatch ? numMatch[0] : null,
    };
  } catch (error) {
    console.error("텍스트 추출 중 오류가 발생했습니다.", error);
    throw error;
  }
}

// 내역
exports.getBlood = async function (req, res) {
  const id = req.query.id;

  if (!id) {
    // id가 없거나 유효하지 않는 경우 실패 응답 보내기
    const errorResponse = baseResponse.USER_USERID_EMPTY; // INVALID_INPUT은 유효하지 않은 입력을 나타내는 오류 코드
    return res.send(response(errorResponse, "Invalid or missing ID.")); // 오류 메시지와 함께 응답 보내기
  } else {
    const wallBloodResult = await wallProvider.retrieveWallInfo(id);
    return res.send(response(baseResponse.SUCCESS, wallBloodResult));
  }
};

exports.getBloodUsed = async function (req, res) {
  const id = req.query.id;

  if (!id) {
    // id가 없거나 유효하지 않는 경우 실패 응답 보내기
    const errorResponse = baseResponse.USER_USERID_EMPTY; // INVALID_INPUT은 유효하지 않은 입력을 나타내는 오류 코드
    return res.send(response(errorResponse, "Invalid or missing ID.")); // 오류 메시지와 함께 응답 보내기
  } else {
    const wallBloodResult = await wallProvider.retrieveWallUsedInfo(id);
    return res.send(response(baseResponse.SUCCESS, wallBloodResult));
  }
};
