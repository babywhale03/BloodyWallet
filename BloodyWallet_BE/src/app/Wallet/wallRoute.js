const express = require('express');
const multer = require('multer');
const path = require('path');

module.exports = function (app) {
    const wall = require('../Wallet/wallController');

    // 지갑
    // 1. 정보 가져오기
    app.get('/app/wall/blood', wall.getBlood);
    // 2. 정보 넣기
    app.post('/app/wall/blood', wall.postBlood);
    // 3. 사용내역 조회
    // app.get('/app/wall/bloodused', wall.getBloodUsed);
    // 에러 핸들링을 추가함
    process.on('unhandledRejection', (err, promise) => {
        console.log('Unhandled Rejection detect:', err.stack || err)
    }) // err.stack에서 에러의 원인을 설명한다.
};

