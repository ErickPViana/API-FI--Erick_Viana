const express = require('express')

const cursosRouter = require('./produtos')
//const estudantesRouter = require('./estudantes')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('App online!')
})

router.use('/produtos', cursosRouter)
//router.use('/estudantes', estudantesRouter)

module.exports = router