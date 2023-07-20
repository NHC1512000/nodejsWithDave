const usersDB = {
    users: require('../models/users.json'),
    setUsers: function (data) { this.users = data}
}

const bcrypt = require('bcrypt');
const { json } = require('express');
const { writeFile } = require('fs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
   let user = req.body.username;
    let pass = req.body.password;
    if(!user || !pass) {
        return res.status(400).json({
            'message': 'username and password are required'
        });
    }
    const foundUser = usersDB.users.find(person => person.username === user);
    if(!foundUser) res.sendStatus(401);//Unauthorized

    const match = await bcrypt.compare(pass, foundUser.password);
    if(match) {
        //create JWTs
        const accessToken = jwt.sign(
            {"username" : foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s' },

        );

        const refreshToken = jwt.sign(
            {"username" : foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d' },

        );
        //saving refreshtoken with current user
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        const currentUsers = {...foundUser, refreshToken};
        usersDB.setUsers([...otherUsers, currentUsers]);
        await fsPromises.writeFile(
            path.join(__dirname,'..','model','users.json'),
            JSON.stringify(usersDB.users)
        )
        res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        res.json({
            accessToken
        });
    }else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin};