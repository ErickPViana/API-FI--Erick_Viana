const divCursos = document.querySelector('#cursos')

async function consultaProdutos() {
  const retorno = await fetch('http://localhost:9090/EP')
  const produtos = await retorno.json()
  preencheTela(produtos)
}

function preencheTela(produtos) {
  cursos.forEach(produtos => {
    const novoProdutoHTML = `
    <div class="Produtos">
    <h3>${produtos.nome}</h3>
    <p>Preço: ${produtos.preco} preço</p>
  </div>
    `
    divCursos.innerHTML = divCursos.innerHTML + novoCursoHTML
  })
}

consultaCursos()
const express = require('express')
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

app.listen(3000, () => {
  console.log('App online!')
})