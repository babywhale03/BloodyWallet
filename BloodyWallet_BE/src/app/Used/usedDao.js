const wallRoute = require("./usedRoute")
const jwtUtils = require("../../../config/jwtUtils");

const wallDao = require("./usedDao");

async function selectUsedInfo(connection, id) {
    const selectIdQuery = `
                    SELECT pi_date,pi_content,pi_used
                    FROM used
                    where u_id =?;
    `;
    const [idRows] = await connection.query(
        selectIdQuery,
        id
    );
    return idRows;
}


module.exports = {
    selectUsedInfo
}