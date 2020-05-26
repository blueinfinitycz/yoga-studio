const express = require('express');
const router = express.Router();
const connection =  require('../../db')
const authorize = require('../../authorization')

router.post('/getMainMenuData', authorize.verifyCookie(), (req, res)=>{
    console.log('main menu')
      connection.db.promise().query(`select * from menu order by id`)
    .then(([rows]) => {
        res.send(JSON.stringify(rows))
    })
    .catch( err =>  console.log(err))
    .then(() => connection.end())
})

module.exports=router;