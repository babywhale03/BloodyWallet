const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const secret_config = require("../../../config/secret");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");
const jwtMake = require("../../../config/jwtUtils");

require('dotenv').config();
// const jwtMake = require("../../../config/jwtMiddleware");


const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const { connect } = require("http2");
const { userInfo } = require("os");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createUser = async function (email, password, name, description) {
    try {
        //redundant email handling
        const emailRows = await userProvider.emailCheck(email);
        if (emailRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);

        // encryption
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");


        // check 
        console.log(hashedPassword);

        // user info parameters
        const insertUserInfoParams = [email, hashedPassword, name, description];

        // connection
        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
        console.log(`Added Member: ${userIdResult[0].insertId}`);

        //connection release
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App_CREATE_USER_ERROR\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.postSignIn = async function (email, password) {
    try {
        // email여부 확인
        const emailRows = await userProvider.emailCheck(email);

        if (emailRows.length < 1)
            return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);

        const selectEmail = emailRows[0].u_email

        // password check
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const selectUserPasswordParams = [selectEmail, hashedPassword];
        const passwordRows = await userProvider.passwordCheck(selectUserPasswordParams);

        /* console.log */
        console.log("현재 hashedPassword: ", +hashedPassword);
        console.log("현재 passwordRows[0]: ", +passwordRows[0]);
        if (passwordRows[0].u_pw !== hashedPassword) {
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }

        // 계정 상태 확인
        const userInfoRows = await userProvider.accountCheck(email);

        if (userInfoRows[0].u_status == 0) {
            return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
        } else if (userInfoRows[0].u_status == 2) {
            return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
        }

        let uid = userInfoRows[0].id;
        //token 생성
        let token = jwtMake.makeToken(uid);
        console.log("token: ", +token);
        //refreshtoken 생성
        let refreshToken = jwtMake.makeRefreshToken();
        console.log("refresh token: ", +refreshToken);

        const updateRefreshTokenParams = [refreshToken, uid];

        const connection = await pool.getConnection(async (conn) => conn);

        const refreshTokenResult = await userDao.updateRefreshToken(connection, updateRefreshTokenParams);
        console.log(`refreshToken 입력: ${uid}`);
        connection.release();

        return response(baseResponse.SUCCESS, { 'userId': userInfoRows[0].id, 'jwt-accessToken': token, 'jwt-refreshToken': refreshToken });

    } catch (err) {
        logger.error(`APP_postSignIn_Service_ERROR\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}
