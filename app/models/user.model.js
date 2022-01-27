module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define('users', {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
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
        gender: {
            type: Sequelize.ENUM('m', 'f')
        },
        created_at: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false

        },
        updated_at: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        publish: Sequelize.BOOLEAN
    }, {
        timestamps: false
    });

    return Users;
}