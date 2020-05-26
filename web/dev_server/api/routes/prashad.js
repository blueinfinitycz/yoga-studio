const express = require('express');
const router = express.Router();
const connection =  require('../../db')
const authorize = require('../../authorization')
const arrUtils = require('../../utils/arrUtil')


router.post('/getPrashadData', authorize.verifyCookie(), (req, res)=>{
        connection.db.promise()
            .query(
            `
            select 
            prashad.id  as skupina,
            prashad.datum as datum,
            concat(contacts.jmeno,' ', contacts.prijmeni) as jmeno,
            Skupiny.id as idZak
            from eventsdb.prashad
            inner join eventsdb.groupes as Skupiny on (prashad.skupina=Skupiny.eventId and Skupiny.exist=1)
            inner join eventsdb.contacts on (Skupiny.userId=eventsdb.contacts.id)
            order by datum

        `)
        .then(([rows]) => {
            const createGroups = arrUtils.createFinalArrData(arrUtils.createGroups(arrUtils.getNumberOfGroupes, arrUtils.fillArrToCountFor,rows));
            // console.log('GROUPS: ', createGroups)
           return JSON.stringify(createGroups)
        })
        .then(groupes => {
            connection.db.promise().query(`select id, concat(jmeno, ' ' ,prijmeni) as jmeno from contacts where gender='male' or gender='notset' order by jmeno`)
            .then(([rows]) => {
                return {groupes:groupes, contacts:{mans:JSON.stringify(rows)}}
            })
            .then(data => {
                connection.db.promise().query(`select id, concat(jmeno, ' ' ,prijmeni) as jmeno from contacts where gender='female' or gender='notset' order by jmeno`)
                .then(([rows]) => {
                    return {...data,contacts:{mans:data.contacts.mans,females:JSON.stringify(rows)}}
                })
                .then(data => {
                    connection.db.promise().query(`select count(skupina) as countGroups from prashad`)
                    .then(([rows]) => {
                        const finalData = {...data,maxGroupCount: JSON.stringify(rows[0].countGroups)}
                        // console.log('PRAHAD DATA: ',finalData)
                          res.send(finalData)
                    })
                })
            })
        })

    .catch( err => console.log(err))
    .then(() => connection.end())
})

router.post('/updatePrashadData', authorize.verifyCookie(),(req, res) => {
    const data = JSON.parse(req.body.data)
    const arr = getIds(data)
    console.log('PRASHAD UPDATE: ', data, 'IDS: ', arr)

     connection.db.promise().query(`update groupes set userId = case ${arr.map( item => 'when id = '+item.id.toString()+' then '+item.newUserId)} else userId end `.replace( /,/g, " ")+`where id in(${arr.map(item => item.id)})`)
     .then(([rows]) => {
        res.send('ok')
     })
     .catch(err => console.log(err))
     .then(() => connection.end())
})

router.post('/removePrashadData', authorize.verifyCookie(), (req, res) => {
    const data = JSON.parse(req.body.data)
    console.log('REMOVE: ',data)
    connection.db.promise().query(`update groupes set exist=0 where eventId=${data}`)
    .then(([rows]) => {
        res.send('ok')
    })
    .catch(err => console.log(err))
    .then(() => connection.end())
})

router.post('/addPrashadData', authorize.verifyCookie(), (req, res) => {
    const data = JSON.parse(req.body.data)
    console.log('ADD PRASHAD: ', data)

    connection.db.promise().query(`insert into prashad (datum, skupina) values ('${data.datum}', '${data.maxGroupCount+1}')`)
    .then(([rows]) => {
        connection.db.promise().query(`insert into groupes (eventId, userId, exist) 
        values('${data.maxGroupCount+1}','${data.jmeno_1 ? data.jmeno_1.jmeno : 0}','1'),
        ('${data.maxGroupCount+1}','${data.jmeno_2 ? data.jmeno_2.jmeno : 0}','1'),
        ('${data.maxGroupCount+1}','${data.jmeno_3 ? data.jmeno_3.jmeno : 0}','1'),
        ('${data.maxGroupCount+1}','${data.jmeno_4 ? data.jmeno_4.jmeno : 0}','1')`)
        .then(([rows]) => {
            res.send('ok')
        })
        .catch(err => console.log(err))
        .then(() => connection.end())
    })
    .catch(err => console.log(err))
    .then(() => connection.end())
})

const getIds = (data) => {
    const numbers = /^[0-9]+$/;
    const arr = []
      for(let i=1;i<=4;i++){
         if(data['jmeno_'+i].jmeno.match(numbers)) {
           arr.push({newUserId:+data['jmeno_'+i].jmeno, id: data['jmeno_'+i].idZak})
        }
      }
      return arr
  }

module.exports=router;