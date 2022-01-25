module.exports = {
    HOST: "localhost",
    USER: "phpmyadmin",
    PASSWORD: "P@$$word@1234",
    DB: "expressapi",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idel: 10000
    }
};