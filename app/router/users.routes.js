module.exports = app => {
    const users = require('../controller/user.controller');

    var router = require('express').Router();


    //Create a New Users
    router.post('/', users.create);

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

    app.use('/api/users', router);
}