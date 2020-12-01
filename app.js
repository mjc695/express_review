const express = require('express')
const morgan = require ('morgan')
const {db, Page, User} = require('./models')

const app = express()
const PORT = 1337

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static('./public'))

// app.get('/', (req,res)=>{
//     res.send('HELLO WORKING')
// })

app.use('/wiki', require('./routes/wiki'))
app.use('/user', require('./routes/users'))

app.use('/',(req,res,next)=>{
    res.redirect('/wiki')
})

db.authenticate().then(() =>{
    console.log('connected to the database')
})

const init = async () =>{
    await Page.sync()
    await User.sync()
    await db.sync()

    
    app.listen(PORT, ()=>{
        console.log(`listening on port ${PORT}`)
    })
}

init()