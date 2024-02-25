const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const secret_config = require("../../../config/secret");
const wallProvider = require("./wallProvider");
const wallDao = require("./wallDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");


require('dotenv').config();
const { connect } = require("http2");
const { userInfo } = require("os");

exports.addBlood = async function (type, date, hos) {
    try {
        const insertUserInfoParams = [type, date, hos];

        // connection
        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await wallDao.insertUserInfo(connection, insertUserInfoParams);
        console.log(`Added Blood: ${userIdResult[0].insertId}`);
        //connection release
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App_ADD_WALL_ERROR\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);

    }
}
