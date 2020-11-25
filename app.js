const express = require('express')
const morgan = require ('morgan')
const {db, Page, User} = require('./models')

const app = express()
const PORT = 1337

app.use(express.static('./public'))

express.urlencoded({extended: false})
app.use(express.json())

app.get('/', (req,res)=>{
    res.send('HELLO WORKING')
})

db.authenticate().then(() =>{
    console.log('connected to the database')
})

const init = async () =>{
    await Page.sync()
    await User.sync()

    
    app.listen(PORT, ()=>{
        console.log(`listening on port ${PORT}`)
    })
}

init()