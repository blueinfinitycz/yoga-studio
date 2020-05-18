const express = require('express');
const router = express.Router();
const connection =  require('../../db')
const config = require('../../config')


router.post('/login',(req, res, next)=>{

    connection.db.promise().query(`select name from users where login = '${req.body.login}' && password = '${req.body.pass}'`)
    .then(([rows]) => {
        if(rows.length > 0) {
        res.header('Set-Cookie', `userID=${config.JWT_TOKEN}, userName=${rows[0].name}; max-age=3600`)
        res.send({isLogged: 1, user: rows[0].name}) 
    }else{
        res.send({isLogged: 0, user: ''})}
    })
    .catch(err => console.log("CHYBA: ",err))
    .then(() => connection.end())
})

router.post('/logout',(req, res)=>{
    console.log('LOGOUT')
    res.header('Set-Cookie', `userID=${config.JWT_TOKEN}; max-age=0`)
    res.send({isLogged: 0, user: ''})
})


module.exports=router;