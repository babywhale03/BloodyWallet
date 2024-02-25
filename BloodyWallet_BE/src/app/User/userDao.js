const userRoute = require("./userRoute")
const jwtUtils = require("../../../config/jwtUtils");


async function selectUserImg(connection) {
    const selectUserImgQuery = `
                    SELECT u_img
                    FROM user
                    `;
    const [imgRows] = await connection.query(selectUserImgQuery);
    return imgRows;
}
async function selectUserImgEmail(connection, email) {
    const selectUserImgQuery = `
                    SELECT u_img
                    FROM user
                    WHERE  u_email =?;
                    `;
    const [imgRows] = await connection.query(selectUserImgQuery, email);
    return imgRows;
}

// 모든 유저 조회
async function selectUser(connection) {
    const selectUserListQuery = `
                    SELECT u_email, u_name, u_description
                    FROM user
                    where u_status  = 1;
    `;
    const [userRows] = await connection.query(selectUserListQuery);
    return userRows;
}

// 이메일로 유저 조회
async function selectUserEmail(connection, email) {
    const selectUserEmailQuery = `
                    SELECT u_email, u_name, u_description
                    FROM user
                    where u_status = 1 and u_email= ?;
    `;
    const [emailRows] = await connection.query(selectUserEmailQuery, email);
    return emailRows;
}

// Create User
async function insertUserInfo(connection, insertUserInfoParams) {
    const insertUserInfoQuery = ` 
                        INSERT INTO user(u_email, u_pw, u_name, u_description, u_status)
                        VALUES (?, ?, ?, ?, 1);
    `;

    const insertUserInfoRow = await connection.query(
        insertUserInfoQuery,
        insertUserInfoParams
    );

    return insertUserInfoRow;
}

// selectUserPassword
async function selectUserPassword(connection, selectUserPasswordParams) {
    const selectUserPasswordQuery = `
        SELECT u_email, u_pw
        FROM user
        WHERE u_email = ? AND u_pw = ?;`; // 두 값이 동시에 일치할 때만 리턴
    const selectUserPasswordRow = await connection.query(
        selectUserPasswordQuery,
        selectUserPasswordParams
    );
    return selectUserPasswordRow;
}

// selectUserAccount
async function selectUserAccount(connection, email) {
    const selectUserAccountQuery = `
        SELECT u_status, uid
        FROM user
        WHERE u_email = ?;`;

    const selectUserAccountRow = await connection.query(
        selectUserAccountQuery,
        email
    );
    return selectUserAccountRow[0];
}

// refresh token store in DB
async function updateRefreshToken(connection, updateRefreshTokenParams) {
    const updateRefreshTokenQuery = `
        UPDATE user
        SET u_token = ?
        WHERE id = ?;`;

    const updateRefreshTokenRow = await connection.query(
        updateRefreshTokenQuery,
        updateRefreshTokenParams
    );

    return updateRefreshTokenRow;
}

module.exports = {
    selectUser,
    selectUserEmail,
    insertUserInfo,
    selectUserPassword,
    selectUserAccount,
    updateRefreshToken,
    selectUserImgEmail,
    selectUserImg
}