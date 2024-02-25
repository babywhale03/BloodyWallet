const express = require('express');
const multer = require('multer');
const path = require('path');

module.exports = function (app) {
    const prof = require('../Profile/profController');
    // 프로필
    // 1. 쿠폰 조회
    app.get('/app/prof/cup', prof.getCup);
    // 2. 마일리지 조회
    app.get('/app/prof/mil', prof.getMil);
    // 3. 마일리지 변환
    app.put('/app/prof/ex', prof.exMil);
    // 4. 기부
    app.put('/app/prof/don', prof.donate);

    // 에러 핸들링을 추가함
    process.on('unhandledRejection', (err, promise) => {
        console.log('Unhandled Rejection detect:', err.stack || err)
    }) // err.stack에서 에러의 원인을 설명한다.
};

