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
            prashad.datum,
            concat(contacts.jmeno,' ', contacts.prijmeni) as jmeno,
            Skupiny.id as idZak
            from eventsdb.prashad
            inner join eventsdb.groupes as Skupiny on (prashad.skupina=Skupiny.eventId)
            inner join eventsdb.contacts on (Skupiny.userId=eventsdb.contacts.id)

        `)
        .then(([rows]) => {
            // console.log('PRASHAD ROWS:', rows)
            const createGroups = arrUtils.createFinalArrData(arrUtils.createGroups(arrUtils.getNumberOfGroupes, arrUtils.fillArrToCountFor,rows));
            console.log('GROUPS: ', createGroups)
           return JSON.stringify(createGroups)
        })
        .then(groupes => {
            connection.db.promise().query(`select id, concat(jmeno, ' ' ,prijmeni) as jmeno from contacts where gender='male'`)
            .then(([rows]) => {
                return {groupes:groupes, contacts:{mans:JSON.stringify(rows)}}
            })
            .then(data => {
                connection.db.promise().query(`select id, concat(jmeno, ' ' ,prijmeni) as jmeno from contacts where gender='female'`)
                .then(([rows]) => {
                    const finalData = {...data,contacts:{mans:data.contacts.mans,females:JSON.stringify(rows)}}
                    res.send(finalData)
                })
            })
        })

    .catch( err => console.log(err))
    .then(() => connection.end())
})

router.post('/updatePrashadData',(req, res) => {
    const data = JSON.parse(req.body.data)
    let counter = 0
    const idsContainer = getIds(data)
    console.log('PRASHAD UPDATE: ', data, 'IDS: ',getIds(data)) //  [ { oldId: 8, newId: 3 }, { oldId: 9, newId: 5 } ]
    // connection.db.promise().query(`update groupes set userId='${data[counter].newId}' where (id='${data[counter].oldId} and eventI )'`)
    // .then(([rows]) =>{

    //     // let idArr = rows;
    //     // let userIdArr=getIds(data.newData)
    //     // console.log('userIdArr: ',userIdArr,'ID ARR: ',idArr)

    // })
    // .catch(err => console.log(err))
    // .then(() => connection.end())
})

const getIds = (data) => {
    const numbers = /^[0-9]+$/;
    const arr = []
      for(let i=1;i<=4;i++){
        if(data['jmeno_'+i].jmeno.match(numbers)) {
            arr.push({oldId:+data['jmeno_'+i].jmeno, newId: data['jmeno_'+i].idZak})
        }
      }
      return arr
  }

  const updatePrashadData  = (data) => {

  }

module.exports=router;