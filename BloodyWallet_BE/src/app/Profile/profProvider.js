const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const profDao = require("./profDao");

exports.retrieveProfCup = async function (id) {
    if (!id) {
        const connection = await pool.getConnection(async (conn) => conn);
        const profCupResult = await profDao.selectCup(connection);
        connection.release();

        return profCupResult;
    } else {
        const connection = await pool.getConnection(async (conn) => conn);
        const profCupResult = await profDao.selectCup(connection, id);
        connection.release();
        return profCupResult;
    }
}
exports.retrieveProfMil = async function (id) {
    if (!id) {
        const connection = await pool.getConnection(async (conn) => conn);
        const profMilResult = await profDao.selectMil(connection);
        connection.release();

        return profMilResult;
    } else {
        const connection = await pool.getConnection(async (conn) => conn);
        const profMilResult = await profDao.selectMil(connection, id);
        connection.release();
        return profMilResult;
    }
}
exports.exProfMil = async function (cup, mil) {
    const insertUserInfoParams = [cup, mil];

    // connection
    const connection = await pool.getConnection(async (conn) => conn);

    const userIdResult = await profDao.exMil(connection, insertUserInfoParams);
    console.log(`Added Member: ${userIdResult[0].insertId}`);

    //connection release
    connection.release();
    return userIdResult;
}

exports.donateCup = async function (cup) {
    const insertUserInfoParams = [cup];
    const connection = await pool.getConnection(async (conn) => conn);

    const userIdResult = await profDao.donateCup(connection, insertUserInfoParams);
    console.log(`Added Member: ${userIdResult[0].insertId}`);

    //connection release
    connection.release();
    return userIdResult;
}