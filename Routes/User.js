const express = require('express')
const router = express.Router()
const user = require('../Models/User')
const nodemailer = require('nodemailer')
const UserController = require('../Controllers/UserController')
const upload = require('../Middleware/Upload')
const authenticate = require('../Middleware/Authenticate')
const { application } = require('express')


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - cin
 *         - email
 *         - password
 *         - role
 *         - image
 *         - phone_number
 *         - emailToken
 *         - isVerified
 *         - code
 *       properties:
 *         first_name:
 *           type: String
 *           description: first name of user
 *         last_name:
 *           type: String
 *           description: last name of user
 *         cin:
 *           type: String
 *           description: cin of user
 *         email:
 *           type: String
 *           description: email of user
 *         password:
 *           type: String
 *           description: password of user
 *         role:
 *           type: String
 *           description: role of user
 *         image:
 *           type: String
 *           description: image of user
 *         phone_number:
 *           type: String
 *           description: phone number of user
 *         emailToken:
 *           type: String
 *           description: emailtoken of user account
 *         isVerified:
 *           type: String
 *           description: verification of user account
 *         code:
 *           type: String
 *           description: code of user account
 *       example:
 *         first_name: youssef
 *         last_name: zahar
 *         cin: 12345678
 *         email: exemple@domaine.com
 *         password: 12345678
 *         role: utilisateur
 *         image: image
 *         phone_number: 56330407
 *         emailToken: azea654Fzaer$$aze5sqd77
 *         isVerified: true
 *         code: 456
 *
 */


/**
 * @swagger
 *  tags:
 *    name: index
 *    description: list of users
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: the list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
 router.get('/' , UserController.index)



 router.get('/show',  UserController.show)
 
 
 
 
 
 /**
  * @swagger
  * /register:
  *   post:
  *     summary: Create a new user
  *     tags: [Users]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/User'
  *     responses:
  *       200:
  *         description: The user was successfully created
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/User'
  *       500:
  *         description: Some server error
  */
router.post('/register', UserController.register)//////////////////////
router.post('/update',UserController.update)///////////////////////////
router.post('/delete',UserController.destroy)
router.post('/login', UserController.login)//////////////////////////////
router.patch('/changePassword',UserController.changePassword)////////////
router.post('/verifyAccount', UserController.verifyAccount)
router.post('/forgotPassword', UserController.forgotPassword)////////////

module.exports = router
