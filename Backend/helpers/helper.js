const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'arunjazz1997@gmail.com',
        pass: 'ymxv jruo acsl zmqx'
    }
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ status: false, message: 'Token is missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET , (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: false, message: 'Invalid token' });
        }
        req.userId = decoded.id;
        next();
    });
}

// Middleware to generate JWT token
function generateToken(id , expireTime) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: expireTime });
}

function generateSecretKey(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';
    let secretKey = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        secretKey += characters[randomIndex];
    }
    return secretKey;
}

function verifyTokenChangePassword(req, res, next) {
    const token = req.body['token'];
    if (!token) {
        return res.status(401).json({ status: false, message: 'Token is missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET , (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: false, message: 'Invalid token' });
        }
        req.email = decoded.id;
        next();
    });
}


function sendEmail(mailOptions , callback) {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            callback(false , error)
        } else {
            callback(true , info.response)
        }
    });    
}

function generateOrderReceiptId(prefix, length) {
    const randomNum = Math.floor(Math.random() * Math.pow(10, length));
    return prefix + randomNum;
}


module.exports = {
    verifyToken,
    generateToken,
    verifyTokenChangePassword,
    sendEmail,
    generateOrderReceiptId
};