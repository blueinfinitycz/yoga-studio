const express = require('express');
const router = express.Router();
const connection =  require('../../db')
const authorize = require('../../authorization')

router.post('/getContactsData', authorize.verifyCookie(), (req, res)=>{
    connection.db.promise().query(`select id, jmeno as name, prijmeni as surname, email, tel, gender from contacts where gender='male' and exist=1 order by jmeno`)
        .then(([rows]) => {
            return JSON.stringify(rows)
        })
        .then(males => {
            connection.db.promise().query(`select * from contacts where gender='female' and exist=1 order by jmeno`)
            .then(([rows]) => {
            const data = {male:males, female: JSON.stringify(rows)}
            // console.log('CONTACTS ADDED DATA: ', data)
            res.send(data)
            })
        })
    .catch( err =>  console.log(err))
    .then(() => connection.end())
})

router.post('/updateContactsData',authorize.verifyCookie(),(req, res) => {
    const data = JSON.parse(req.body.data)
    connection.db.promise().query(`update contacts set jmeno='${data.name}',prijmeni='${data.surname}', email='${data.email}', tel='${data.tel}' where id='${data.id}'`)
    .then(([rows]) => {
        res.send('ok')
    })
    .catch(err => console.log(err))
    .then(() => connection.end())
})

router.post('/addContactsData',authorize.verifyCookie(),(req, res) => {
    const data = JSON.parse(req.body.data)
    connection.db.promise()
    .query(`insert into contacts (jmeno, prijmeni, email, tel, exist, gender) values ('${data.name}', '${data.surname}', '${data.email}', '${data.tel}', '1', '${data.gender}')`)
    .then(([rows]) => {
        res.send('ok')
    })
    .catch(err => console.log(err))
    .then(() => connection.end())
})

router.post('/removeContactsData',authorize.verifyCookie(),(req, res) => {
    const data = JSON.parse(req.body.data)
    connection.db.promise().query(`update contacts set exist=0 where id='${data.id}'`)
    .then(([rows]) => {
        res.send('ok')
    })
    .catch(err => console.log(err))
    .then(() => connection.end())
})


module.exports=router;