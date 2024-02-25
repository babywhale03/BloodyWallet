const profRoute = require("./profRoute")
const jwtUtils = require("../../../config/jwtUtils");

// 쿠폰
async function selectCup(connection, id) {
    const selectCupQuery = `
                    SELECT p_cup
                    FROM profile
                    where u_id =?;
    `;
    const selectCupRow = await connection.query(
        selectCupQuery,
        id
    );
    return selectCupRow;
}
//마일리지
async function selectMil(connection, id) {
    const selctMilQuery = `
                    SELECT p_mil
                    FROM profile
                    where u_id = ?;
    `;
    const selectMilRow = await connection.query(
        selctMilQuery,
        id
    );
    return selectMilRow;
}

async function exMil(connection, insertUserInfoParams) {
    const updateStatement = `
                    UPDATE profile
                    SET p_cup = ?, p_mil = ?
`;

    const updateStateRow = await connection.query(updateStatement,
        insertUserInfoParams);
    return updateStateRow;
}
async function donateCup(connection, insertUserInfoParams) {
    const updateStatement = `
                    UPDATE profile
                    SET p_cup = ?
`;

    const updateStateRow = await connection.query(updateStatement,
        insertUserInfoParams);
    return updateStateRow;
}

module.exports = {
    selectCup,
    selectMil,
    exMil,
    donateCup
}

