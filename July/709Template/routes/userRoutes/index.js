const router = require('express').Router();
const { 
    createUserApi, 
    confirmUserApi
 } = require('./../../controllers/userController')

router
    .post('/signIn', confirmUserApi)
    .post('/signUp', createUserApi)

module.exports = router