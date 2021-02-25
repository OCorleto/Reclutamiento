const express = require('express')
const app = express()
const path =  require('path')
const connectMongo = require('./routes/dbMongo');


app.set('port',3000)
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))
app.engine('html',require('ejs').renderFile)


app.use(express.static(path.join(__dirname,'public')))





connectMongo.connectToServer( function( err, client ) {
    if (err) console.log(err)
    app.use(require('./routes/index'))
    app.use(require('./routes/info'))
    app.use(require('./routes/boletos'))
    app.listen(app.get('port'),()=>{
        console.log('Server on port', app.get('port'))
    })
} );
