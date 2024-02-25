const express = require('express');
const multer = require('multer');
const path = require('path');
// require('/var/www/server_nodejs/2023-Server-Study/server_nodejs_templete/upload/img');
module.exports = function (app) {
    var fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '/upload');
        },
        filename: (req, file, cb) => {
            cb(null, file.filename + '-' + file.originalname);
        }
    });
    const fileFilter = (req, file, cb) => { // 확장자 필터링 
        if (file.mimetype === 'img/png' || file.mimetype === 'img/jpg' || file.mimetype === 'img/jpeg') {
            cb(null, true); // 해당 mimetype만 받겠다는 의미 
        }
        else { // 다른 mimetype은 저장되지 않음 
            cb(null, false);
        }
    };
    app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('img')); // 라우터

    var upload = multer({ storage: fileStorage });
    app.post("/app/user/img", upload.single('img'), (req, res, next) => {
        const img = `/var/www/server_nodejs/2023-Server-Study/server_nodejs_templete/upload/${req.file.filename}`;
        const data = [img];

        const sql = "INSERT INTO user(u_img) values(?)";
        connection.query(sql, data, (err, rows) => {
            if (err)
                console.error("err: " + err);
            else
                console.log("rows: " + JSON.stringify(rows));
            res.redirect("/user");
        });
    });


}
