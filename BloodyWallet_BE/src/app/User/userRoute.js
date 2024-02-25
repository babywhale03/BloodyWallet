const express = require('express');
const multer = require('multer');
const path = require('path');

module.exports = function (app) {
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 테스트 API
    app.get('/app/user/test', user.getTest)

    // 유저
    // 1. 유저 조회 API (+ 검색)
    app.get('/app/user/users', user.getUsers);
    // 2. 유저 생성
    app.post('/app/user/users', user.postUsers);
    // 3. 유저 로그인
    app.post('/app/user/login', user.postLogin);

    // 에러 핸들링을 추가함
    process.on('unhandledRejection', (err, promise) => {
        console.log('Unhandled Rejection detect:', err.stack || err)
    }) // err.stack에서 에러의 원인을 설명한다.
};

