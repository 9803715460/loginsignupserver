let jwt = require('jsonwebtoken');
const JWT={
 
    verifyToken: (token) => {
        if(token) {
            token = token ? token.split(' ') : [];
            if(token[0] === 'JWT')
                token = token[1];
        }
        else
            token = null;
        try {
            return jwt.verify(token, process.env.JWT_KEY, null);
        } catch(error) {
            throw error;

    }

}};
module.exports = JWT