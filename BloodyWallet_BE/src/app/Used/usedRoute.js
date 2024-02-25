const express = require('express');
const multer = require('multer');
const path = require('path');

module.exports = function (app) {
    const used = require('./usedController');

    // 지갑

    // 3. 사용내역 조회
    app.get('/app/used/bloodused', used.getBloodUsed);
    // 에러 핸들링을 추가함
    process.on('unhandledRejection', (err, promise) => {
        console.log('Unhandled Rejection detect:', err.stack || err)
    }) // err.stack에서 에러의 원인을 설명한다.
};

