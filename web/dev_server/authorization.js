const verifyCookie = () => {
    
    return (req, res, next) => {
        if(req.headers.cookie.includes('userID')){
            next()
            }else{
                console.log('NEPLATNA COOKIE')
                res.send({isLogged: 0, user: ''})
            }
        }
}

module.exports.verifyCookie = verifyCookie
