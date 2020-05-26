const express = require('express');
const router = express.Router();
const connection =  require('../../db')
const authorize = require('../../authorization')
// const importExcel = require('convert-excel-to-json')

router.post('/loadExcelPrashadData', authorize.verifyCookie(), (req, res)=> {

    // let file = req.files.filename
    // let fileName = file.name

    // file.mv('../../analyze/'+fileName, (err) => {
    //     if(err) {
    //         res.send('problem loading excel')
    //     }else{
    //         let result = importExcel({sourceFile: '/excel/'+fileName})
    //     }
        console.log('EXCEL:', req.files)
    // })

    // connection.db.promise()
    // .query(`
    // //
    // `)
    // .then()

})


module.exports=router;