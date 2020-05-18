const express = require('express');
const router = express.Router();
const connection =  require('../../db')
const authorize = require('../../authorization')

router.post('/getDashboardData', authorize.verifyCookie(), (req, res)=>{

      connection.db.promise().query(`select item, id from menu order by id`)
    .then(([rows]) => {
        return JSON.stringify(rows)
    })
    .catch( err =>  console.log(err))
    .then(menuData => {
        connection.db.promise().query('select downloads from statistics')
        .then(([rows]) => {
            const data = {active:1,menu:menuData, statistics:JSON.stringify(rows)}
            res.send(data)
        })
    })
    .then(() => connection.end())
})
module.exports=router;