const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const wallDao = require("./wallDao");

exports.retrieveWallInfo = async function (id) {
    if (!id) {
        const connection = await pool.getConnection(async (conn) => conn);
        const wallInfoResult = await wallDao.selectInfo(connection, id);
        connection.release();

        return wallInfoResult;
    } else {
        const connection = await pool.getConnection(async (conn) => conn);
        const wallInfoResult = await wallDao.selectInfo(connection, id);
        connection.release();

        return wallInfoResult;
    }
}
exports.retrieveWallUsedInfo = async function (id) {
    if (!id) {
        const connection = await pool.getConnection(async (conn) => conn);
        const wallInfoResult = await wallDao.selectUsedInfo(connection, id);
        connection.release();

        return wallInfoResult;
    } else {
        const connection = await pool.getConnection(async (conn) => conn);
        const wallInfoResult = await wallDao.selectUsedInfo(connection, id);
        connection.release();

        return wallInfoResult;
    }
}
// exports.idCheck = async function (id) {
//     const connection = await pool.getConnection(async (conn) => conn);
//     const idCheckResult = await wallDao.selectWallId(connection, id);
//     connection.release();

//     return idCheckResult;
// };
