const User = require('../Database/models/user');
const bcrypt = require('bcrypt');
const Validator = require('validator');
const jwt = require('jsonwebtoken');
const responseM = require('./responseHandler');


class userController {
    constructor() {
        this.response = responseM;
        this.validator = new Validator();

        this.username = {
            type: 'string',
            required: true,
        }
        this.password = {
            type: 'string',
            required: true,
        }

        this.email = {
            type: 'string',
            required: true,
        }
    }

    //validate request
    validateRequest(req, res, next) {
        const body = req.body;
        let username, password = body;      //destructuring

        let validUsername = this.validator.validate(username, this.username);
        let validPassword = this.validator.validate(password, this.password);
        let validEmail = true;
        if (body.email) {                   //if email is provided with register
            email = body.email;
            validEmail = this.validator.validate(email, this.email);      
        }

        if (!validUsername || !validPassword) {
            return this.response.error(res, 'Invalid username or password');
        }
        else if (!validEmail) {
            return this.response.error(res, 'Invalid email');
        }

        else {
            next();
        }

    }

    

    //signup user
    async postSignup(req, res) {
        const body = req.body;
        const username = body.username;
        const password = body.password;
        const email = body.email;

        try {
        //check if user already exists
            await User.findOne({username: username})
                .then(user => {
                    if (user) {
                        return this.response.badRequest(res, 'User already exists');
                    }
                });
            
        //hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username: username,
                password: hashedPassword,
                email: email
            });

            await newUser.save()
                .then(user => {
                    return this.response.success(res, user, 'User created successfully');
                })
                .catch(err => {
                    return this.response.serverError(res, err);
                });
        } catch (err) {
            console.log(err);
            return this.response.serverError(res, err);
        }
    }

    //login user
    async postLogin(req, res, next) {
        const body = req.body;
        const username = body.username;
        const password = body.password;

        await User.findOne({username: username})
            .then(user => {
                if (!user) {
                    return this.response.notFound(res, 'User not found');
                }
                else {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (err) {
                            return this.response.serverError(res, err);
                        }
                        if (result) {
                            // const token = jwt.sign({
                            //     username: user.username,
                            //     userId: user._id
                            // }, process.env.JWT_SECRET, {
                            //     expiresIn: '1h'
                            // });
                            return this.response.success(res, {token: token}, 'Login successful');
                        }
                        else {
                            return this.response.unauthorized(res, 'Invalid password');
                        }
                    });
                }
            })
            .catch(err => {
                return this.response.serverError(res, err);
            });
    
    }
    //get user chatrooms
    getChatrooms(req, res, next) {
    
    }
    //get user info
    getUserInfo(req, res, next) {
    
    }
}

module.exports = userController;

