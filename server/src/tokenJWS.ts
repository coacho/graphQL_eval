import jwt from 'jsonwebtoken';

const tokenJWS = {
    generateToken,
    verifyToken
};

export { tokenJWS };

function  generateToken(user, secretKey) {
    return jwt.sign(user, secretKey, { expiresIn: '1h' });
}

function verifyToken(token, secretKey) {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
    return error = new Error('Invalid token');
}
}


