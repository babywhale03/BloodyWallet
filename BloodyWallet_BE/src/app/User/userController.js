const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const regexEmail = require("regex-email");
// const { emit } = require("nodemon");
const { application } = require("express");
const { Hash } = require("crypto");

const multer = require('multer');
const upload = multer({ dest: './upload' });

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
exports.getTest = async function (req, res) {
    return res.send(response(baseResponse.SUCCESS))
};

/*
API No.2 
API NAME : 유저 API 조회
[GET] /app/users
 */
exports.getUsers = async function (req, res) {

    /* Query String: name */
    const email = req.query.email; // email을 바탕으로 유저 정보 제공

    if (!email) {
        // 유저 전체 조회
        const userListResult = await userProvider.retrieveUserList();
        return res.send(response(baseResponse.SUCCESS, userListResult));
    } else {
        const userLisByEmail = await userProvider.retrieveUserList(email);
        return res.send(response(baseResponse.SUCCESS, userLisByEmail));
    }
    // 유저 검색 조회
};

/*
[POST] /app/usrs
*/
exports.postUsers = async function (req, res) {

    /* Body부분: 이메일, 비번, 별명, 이름, 설명*/
    const { email, password, name, description_p } = req.body;

    // 빈 값 체크
    if (!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

    // length check
    if (email.length > 30)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

    // type check
    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    // description 없는 경우 null 있으면 값 저장
    description = description_p || null

    // etc
    const signUpResponse = await userService.createUser(
        email,
        password,
        name,
        description
    );
    return res.send(signUpResponse);
};

/*
[POST] /app/login
*/
exports.postLogin = async function (req, res) {
    /* Body부분: 이메일, 비번 */
    const { email, password } = req.body;
    const signInResponse = await userService.postSignIn(email, password);
    return res.send(signInResponse);
};
/*
[GET] /app/user/img
*/
exports.getImg = async function (req, res) {
    const email = req.query.email;
    if (!email) {
        const userListByResult = await userProvider.retrieveUserImg();
        return res.send(response(baseResponse.SUCCESS, userListByResult));
    } else {

        const userListByImg = await userProvider.retrieveUserImg(email);
        return res.send(response(baseResponse.SUCCESS, userListByImg));
    }
}


// /*
// 이미지 업로드
// [POST] /app/user/img
// */
// exports.postImg = async function (req, res) {
//     const { email } = req.body;
//     // 빈 값 체크
//     if (!email)
//         return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

//     // length check
//     if (email.length > 30)
//         return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

//     // type check
//     if (!regexEmail.test(email))
//         return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));
// };

// /* 
// 업로드된 이미지 조회
// [GET] /app/user/img
// */



