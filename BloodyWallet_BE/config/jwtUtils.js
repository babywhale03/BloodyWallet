const jwt = require(`jsonwebtoken`);
const secret_config = require('./secret');
const userRoute = require('../src/app/User/userRoute');
// import secret_config from './secret';
// const userInfo = {id: user}


const makeToken = (Object) => {
    let token = jwt.sign(
        {
            userId: Object,
        },
        secret_config.jwtsecret,
        {
            expiresIn: "2m",
            subject: "userInfo",
        }
    );
    return token;
};

const makeRefreshToken = () => {
    let token = jwt.sign(
        {},
        secret_config.jwtsecret,
        {
            expiresIn: "10d",
            subject: "userInfo",
        }
    );
    return token;
};

module.exports = {
    makeToken,
    makeRefreshToken
};