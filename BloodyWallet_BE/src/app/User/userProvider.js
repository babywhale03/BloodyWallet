const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

exports.retrieveUserImg = async function (email) {
    if (!email) {
        const connection = await pool.getConnection(async (conn) => conn);
        const userImg = await userDao.selectUserImg(connection);
        connection.release();
        return userImg;
    } else {
        const connection = await pool.getConnection(async (conn) => conn);
        const userImg = await userDao.selectUserImgEmail(connection, email);
        connection.release();
        return userImg;
    }
}

exports.retrieveUserList = async function (email) {
    if (!email) {
        const connection = await pool.getConnection(async (conn) => conn);
        const userListResult = await userDao.selectUser(connection);
        connection.release();

        return userListResult;
    } else {
        const connection = await pool.getConnection(async (conn) => conn);
        const userListResult = await userDao.selectUserEmail(connection, email);

        connection.release();

        return userListResult;
    }
}

// emailCheck
exports.emailCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const emailCheckResult = await userDao.selectUserEmail(connection, email);
    connection.release();

    return emailCheckResult;
};

// passwordCheck
exports.passwordCheck = async function (selectUserPasswordParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const passwordCheckResult = await userDao.selectUserPassword(
        connection,
        selectUserPasswordParams
    );
    connection.release();
    console.log("현재 passwordRows[0]: ", +passwordCheckResult[0]);
    return passwordCheckResult[0];
};

// accountCheck
exports.accountCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userAccountResult = await userDao.selectUserEmail(connection, email);
    connection.release();
    return userAccountResult;
}


