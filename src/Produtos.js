const express = require('express');
const cors = require('cors')
const routers = require('./api')
const { sequelize } = require('./models')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/', routers)

sequelize.sync().then(() => {
    console.log('conectado com o banco de dados.')
})

app.listen(9090, () => {
    console.log('App online!')
})


const router = express.Router()
const { produtos } = require('../models')
const ProdutosService = require('../services/produtos')
const { body, check, validationResult } = require('express-validator')

const produtosService = new produtosService(produtos)

router.get('/', async (req, res) => {
    const produtos = await produtosService.get()
    res.status(200).json(produtos)
})

router.post('/',
    body('nome').not().isEmpty().trim().escape(),
    check('preco')
        .not().isEmpty()
        .matches(/\d/)
        .withMessage('Deve ser um número válido.'),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { nome, preco } = req.body
        try {
            await cursoService.adicionar({ nome, preco })
            res.status(201).send('Produto adicionado com sucesso!')
        } catch (erro) {
            res.status(400).send(erro.message)
        }
    })