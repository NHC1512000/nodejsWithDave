const usersDB = {
    users: require('../models/users.json'),
    setUsers: function (data) { this.users = data}
}
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async ( req, res) => {
    let user = req.body.username;
    let pass = req.body.password;
    console.log(user);
    console.log(pass);
    if(!user || !pass) {
        return res.status(400).json({
            "message" : 'User name and password are required',

        })
    }
    //check for duplicate username in the db
    const duplicate = usersDB.users.find(person => person.username === user);
    if(duplicate) return res.sendStatus(409);
    try{
        //encrypt password
        const hashPass = await bcrypt.hash(pass,10);
        //store the new user
        const newUser = {
            'username': user,
            'password': hashPass
        };

        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname,'..','models','users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({
            'success': `New user ${user} has created`
        })


    }catch(e) {
        res.status(500).json({
            'message': e.message
        })
    }
}

module.exports= { handleNewUser};