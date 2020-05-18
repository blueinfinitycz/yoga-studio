const express = require('express');
const router = express.Router();
const connection =  require('../../db')
const authorize = require('../../authorization')

router.post('/getEventsData', authorize.verifyCookie(), (req, res)=>{
    connection.db.promise().query(`select * from events where local=1 and exist=1 order by date`)
        .then(([rows]) => {
            console.log('GET EVENTS DATA: ', rows)
            return JSON.stringify(rows)
        })
        .then(localEvents => {
            connection.db.promise().query(`select * from events where global=1 and exist=1 order by date`)
            .then(([rows]) => {
            const data = {local:localEvents, global: JSON.stringify(rows)}
            res.send(data)
            })
        })
    .catch( err =>  console.log(err))
    .then(() => connection.end())
})

router.post('/updateEventsData',authorize.verifyCookie(),(req, res) => {
    const data = JSON.parse(req.body.data)
    connection.db.promise().query(`update events set event='${data.event}',description='${data.description}', date='${data.date}' where id='${data.id}'`)
    .then(([rows]) => {
        res.send('ok')
    })
    .catch(err => console.log(err))
    .then(() => connection.end())
})

router.post('/addEventsData',authorize.verifyCookie(),(req, res) => {
    const data = JSON.parse(req.body.data)
    connection.db.promise()
    .query(`insert into events (event, local, global, description, state, date, exist) values ('${data.event}', '${data.local}', '${data.global}', '${data.description}', '1', '${data.date}', '1')`)
    .then(([rows]) => {
        res.send('ok')
    })
    .catch(err => console.log(err))
    .then(() => connection.end())
})

router.post('/removeEventsData',authorize.verifyCookie(),(req, res) => {
    const data = JSON.parse(req.body.data)
    console.log('REMOVED DATA: ', data)
    connection.db.promise().query(`update events set exist=0 where id='${data.id}'`)
    .then(([rows]) => {
        res.send('ok')
    })
    .catch(err => console.log(err))
    .then(() => connection.end())
})


module.exports=router;