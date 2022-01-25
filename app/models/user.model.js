module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define('users', {
        username: {
            type: Sequelize.STRING
        },
        Password: {
            type: Sequelize.STRING
        },
        fname: {
            type: Sequelize.STRING
        },
        lname: {
            type: Sequelize.STRING
        },
        publish: Sequelize.BOOLEAN
    }, {
        timestamps: false
    });

    return Users;
}