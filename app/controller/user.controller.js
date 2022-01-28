const db = require('../models');
const config = require('../config/auth.config');
const Users = db.Users;
const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


// create and save new Users
exports.create = async(req, res) => {

    // console.log(req.body);
    //Validate Request
    if (!req.body.username || !req.body.Password || !req.body.fname || !req.body.lname || !req.body.publish) {
        if (!req.body.username) {
            res.send({
                message: 'Username Not be empty!'
            })
        } else if (!req.body.Password) {
            res.send({
                message: 'Password Not be empty'
            })
        } else if (!req.body.fname) {
            res.send({
                message: 'First Name Not be empty'
            })
        } else {

            res.status(400).send({

                message: 'Content can not be empty!'
            });
        }

        return;
    }

    // Create Users
    const user = await {
            username: req.body.username,
            email: req.body.email,
            Password: bcrypt.hashSync(req.body.Password, 8),

            // Password: req.body.Password,
            fname: req.body.fname,
            lname: req.body.lname,
            gender: req.body.gender,
            publish: req.body.publish ? req.body.publish : false
        }
        // console.log('sadsada:  ' + Users);

    // SAve Users in database Users.create
    await Users.create(user)
        .then(data => {
            // if (req.body.roles) {
            //     Role.findAll({
            //             where: {
            //                 name: {
            //                     [Op.or]: req.body.roles
            //                 }
            //             }
            //         })
            //         .then(data => {
            //             data.setRoles(roles).then(() => {
            //                 res.send({
            //                     message: 'User Was registered Successfully !'
            //                 })
            //             })
            //         })
            // } else {
            //     // user role = 1
            //     user.setRoles([1]).then(() => {
            //         res.send({ message: "User was registered successfully!" });
            //     });
            // }
            res.send({
                message: 'User was registered successfully!'
            });
        })

    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Users."
        });
    });

};

// Retrieve all Users from the dadtabase
exports.findAll = async(req, res) => {

    // Operators = Op 
    // const username = await Users.findAll({
    //     attributes: ['id', 'username', 'fname', 'lname', 'publish'],
    //    where:{
    //        [Op.and]: [{a:5},{b,6}],  //(a = 5) AND (b = 6)
    //        [Op.or]: [{ a: 5 }, { b: 6 }],  //(a = 5) OR (b = 6)
    //    }

    // });
    // console.log(username);
    // console.log(JSON.stringify(username));

    // method 2
    const username = req.query.username;
    var condition = username ? {
        [Op.username]: `%${username}%`
    } : null;

    await Users.findAll({
            where: condition

        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving Users.'
            })
        })


};

// Find a single Users with an id
exports.findOne = async(req, res) => {

    const id = req.params.id;
    // console.log(id);

    await Users.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Users with id=${id}.`
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Users with id=" + id
            })
        })



};

// Update a USers by the id in the request
exports.update = (req, res) => {

    // update base on id 
    const id = req.params.id;
    // console.log(id);
    // console.log(req.body);

    Users.update(req.body, {
            where: { id: id }
        })
        .then((data) => {
            if (data == 1) {
                res.send({
                    message: 'User Has been Update Successfully.'
                });
            } else {
                res.send({
                    message: `Cannot update Users with id=${id}. Maybe Users was not found or req.body is empty!`
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Users with id=" + id
            })
        })


};

// Delete a user with specific id
exports.delete = (req, res) => {

    const id = req.params.id;

    Users.destroy({
            where: {
                id: id
            }
        })
        .then((data) => {
            // console.log(data);
            if (data == 1) {
                res.send({
                    message: 'User Has Been Deleted Successfully'
                });
            } else {
                res.send({
                    message: `Cannot Delete Users with id=${id}. Maybe Users was not Found`
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Users with id=" + id
            })
        })

}

// Delete All Users From databse  
exports.deleteAll = (req, res) => {

    Users.destroy({
            where: {},
            truncate: false
        })
        .then((data) => {
            res.send({
                message: `${nums} Users were deleted successfully!`
            })
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Users."
            })
        })


};

//Find all published USers
exports.finadAllPublished = (req, res) => {
    // console.log(req.body.username);
    Users.findAll({
            where: { publish: true }
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Userss."
            })
        })
};

// login 

exports.signin = (req, res) => {
    Users.findOne({
            where: {
                // username: req.body.username,
                email: req.body.email
            }
        }).then(user => {
            if (!user) {
                return res.status(404).send({
                    message: 'User Not Found'
                })
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.Password,
                user.Password
            );


            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: 'Invalid Password'
                })
            }
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            // var authorities = [];

            user.getRoles().then(roles => {
                // for (let i = 0; i < roles.length; i++) {
                //     authorities.push("ROLE_" + roles[i].name.toUpperCase());
                // }
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    // roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });

        })
}