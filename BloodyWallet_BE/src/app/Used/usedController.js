const wallProvider = require("./usedProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { application } = require("express");
const mysql = require('mysql2/promise');
// const connection = await pool.getConnection(async (conn) => conn);

const multer = require('multer');
const upload = multer({ dest: './upload' });


exports.getBloodUsed = async function (req, res) {
    const id = req.query.id;

    if (!id) {
        // id가 없거나 유효하지 않는 경우 실패 응답 보내기
        const errorResponse = baseResponse.USER_USERID_EMPTY; // INVALID_INPUT은 유효하지 않은 입력을 나타내는 오류 코드
        return res.send(response(errorResponse, "Invalid or missing ID.")); // 오류 메시지와 함께 응답 보내기
    }
    else {
        const wallBloodResult = await wallProvider.retrieveWallUsedInfo(id);
        return res.send(response(baseResponse.SUCCESS, wallBloodResult));
    }
};