const router = require('express').Router()
const {Page} = require('../models')
const {addPage, wikiPage} = require('../views')

router.get('/', (req,res,next)=>{
    res.send('got to GET /wiki/')
})
router.post('/', async (req,res,next)=>{
    try{   
        console.log(req.body)
        
        const page = await Page.create({
            title: req.body.title,
            content: req.body.textArea
        })
        res.redirect(`/wiki/${page.slug}`)

    } catch(err){
        console.error(err)
    }
    // res.send('got to POST /wiki/')
})
router.get('/add', (req,res,next)=>{
    res.send(addPage())
})

router.get('/:slug', async (req,res,next)=>{
    // res.send(`hit dynamic route at ${req.params.slug}`)
    try{
        const singlePage = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        })
        console.log(singlePage)
        res.send(wikiPage(singlePage))
    } catch(err){next(err)}

})

module.exports = router