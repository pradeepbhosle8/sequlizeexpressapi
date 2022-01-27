const req = require('express/lib/request');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken');

const config = require('../config/auth.config');
const { role } = require('../models');
const db = require('../models');

const User = db.Users;

verifyToken = (res, req, next) => {
    let token = req.headers('x-access-token');

    if (token) {
        return res.status(403).send({
            message: 'No token provided!'
        })
    }
}

jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
        return res.status(401).send({
            message: 'Unauthorized'
        })
    }

    req.userId = decoded.id;

    next();
})

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'admin') {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: 'Required Admin Role!'
            });
            return;
        })
    })
}

isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (role[i].name === 'moderator') {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: 'Require Moderator Role!'
            })
        })
    })
}

isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (role[i].name === 'moderator') {
                    next();
                    return;
                }

                if (role[i].name === 'admin') {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: 'Require Moderator or Admin Role!'
            })
        })
    })
}

const authjwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
}

module.exports = authjwt;