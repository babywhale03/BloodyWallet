const wallRoute = require("./wallRoute")
const jwtUtils = require("../../../config/jwtUtils");

const wallDao = require("./wallDao");

// 헌혈증 조회
async function selectInfo(connection, id) {
    const selectIdQuery = `
                    SELECT w_type,w_date,w_hos,w_num
                    FROM wallet
                    where u_id =?;
    `;
    const [idRows] = await connection.query(
        selectIdQuery,
        id
    );
    return idRows;
}

async function selectUsedInfo(connection, id) {
    const selectIdQuery = `
                    SELECT w_date,w_content,w_mil
                    FROM wallet
                    where u_id =?;
    `;
    const [idRows] = await connection.query(
        selectIdQuery,
        id
    );
    return idRows;
}

// Create User
async function insertUserInfo(connection, insertUserInfoParams) {
    const insertUserInfoQuery = `
                        INSERT INTO wallet(w_type, w_date, w_hos, u_id)
                        VALUES (?,?,?,20);
    `;

    const insertUserInfoRow = await connection.query(
        insertUserInfoQuery,
        insertUserInfoParams
    );

    return insertUserInfoRow;
}

module.exports = {
    selectInfo,
    insertUserInfo,
    selectUsedInfo
}