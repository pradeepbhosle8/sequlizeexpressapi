module.exports = app => {
    const users = require('../controller/user.controller');
    const { verifySignUp } = require('../middleware');

    var router = require('express').Router();


    //Create a New Users
    router.post('/', [verifySignUp.checkDuplicateUsernameOrEmail],
        users.create);

    // Retriveve all Users
    router.get('/', users.findAll);

    // Retrieve all Publish user
    router.get('/published', users.finadAllPublished);

    // Retrieve singe user
    router.get('/:id', users.findOne);

    // Update a Users with id
    router.put('/:id', users.update);

    // Delete a Users with id
    router.delete('/:id', users.delete);

    // Delete all Users
    // router.delete();

    // login User ir signUp user
    router.post('/signin', users.signin)

    app.use('/api/users', router);
}