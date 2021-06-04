import jwt from 'jsonwebtoken';
const secret = 'GULAG';

const auth = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;   //Oauth token is more than 500 chars, and our jwt less than 500

        let decodeData;
        if(token && isCustomAuth) { //if our token
            decodeData = jwt.verify(token, secret);
            req.userId = decodeData?.id;
        }else{ //if Oauth token
            decodeData = jwt.decode(token);
            req.userId = decodeData?.sub;
        }

        next();
    }catch(err){
        console.log(err);
    }
};

export default auth;