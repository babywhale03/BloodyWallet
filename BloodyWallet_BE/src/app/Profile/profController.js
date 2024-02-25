const jwtMiddleware = require("../../../config/jwtMiddleware");
const profProvider = require("../../app/Profile/profProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const regexEmail = require("regex-email");
// const { emit } = require("nodemon");
const { application } = require("express");
const { Hash } = require("crypto");

const multer = require('multer');
const upload = multer({ dest: './upload' });

/*
API No.1
API Name: 쿠폰 조회
[GET] /app/prof/cup
*/
exports.getCup = async function (req, res) {
    const id = req.query.id;

    if (!id) {
        // id가 없거나 유효하지 않는 경우 실패 응답 보내기
        const errorResponse = baseResponse.USER_USERID_EMPTY; // INVALID_INPUT은 유효하지 않은 입력을 나타내는 오류 코드
        return res.send(response(errorResponse, "Invalid or missing ID.")); // 오류 메시지와 함께 응답 보내기
    }
    else {
        const profCupResult = await profProvider.retrieveProfCup(id);
        return res.send(response(baseResponse.SUCCESS, profCupResult));
    }
}
/*
API No.2 
API NAME : 마일리지 조회
[GET] /app/prof/mil
 */
exports.getMil = async function (req, res) {
    const id = req.query.id;

    if (!id) {
        // id가 없거나 유효하지 않는 경우 실패 응답 보내기
        const errorResponse = baseResponse.USER_USERID_EMPTY; // INVALID_INPUT은 유효하지 않은 입력을 나타내는 오류 코드
        return res.send(response(errorResponse, "Invalid or missing ID.")); // 오류 메시지와 함께 응답 보내기
    }
    else {
        const profMilResult = await profProvider.retrieveProfMil(id);
        return res.send(response(baseResponse.SUCCESS, profMilResult));
    }
}

exports.exMil = async function (req, res) {
    // const id = req.query.id;
    const { cup, mil } = req.body;
    console.log(cup);
    console.log(mil);
    const signUpResponse = await profProvider.exProfMil(
        cup,
        mil
    );
    return res.send(signUpResponse);
}

exports.donate = async function (req, res) {
    const { cup } = req.body;
    console.log(cup);

    const signUpResponse = await profProvider.donateCup(
        cup
    );
    return res.send(signUpResponse);
}