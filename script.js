// Utilizando a API https://blockchain.info/ticker
// retorne no DOM o valor de compra da bitcoin and reais.
// atualize este valor a cada 30s

const confirmar = document.querySelector('#confirmar')

confirmar.addEventListener('click', statusConsulta)

function statusConsulta() {
  if(!confirmar.classList.contains('consulta-ativa')) {
    confirmar.classList.add('consulta-ativa')
    atualizacao()
    console.log('ativo')
  } else {
    confirmar.classList.remove('consulta-ativa')
    console.log('inativo')
  }
}

function atualizacao() {
  const contagemH6 = document.querySelector('h6')
  let i = 0
  let tempo = 0

  const contagem = setInterval(() => {
    tempo += 10
    if(tempo === 1000) {
      i -= 1
      tempo = 0
    }

    if(confirmar.classList.contains('consulta-ativa')) {
      if(i > 0) {
        contagemH6.innerHTML = `Valor da compra será atualidado em: ${i} segundos`
      } else {
        i = 5
        consultarBitcoin()
      }  
    } else {
      clearInterval(contagem)
      statusConsulta()
    }
  }, 10)
}

function consultarBitcoin() {
  const moeda = document.querySelector('#moeda').value
  const resultado = document.querySelector('p')
  const lista = document.querySelector('#listaValores')
  const valores = document.createElement('option')

  fetch('https://blockchain.info/ticker')
  .then(response => response.json())
  .then(bitcoin => {
    let bitcoinChave = Object.keys(bitcoin).findIndex((chave) => {
      return chave === moeda
    })
    let compra = Object.values(bitcoin)[bitcoinChave].buy
    let simbolo = Object.values(bitcoin)[bitcoinChave].symbol
    resultado.innerHTML = `${simbolo} ${compra}`
    const valoresAdd = document.querySelectorAll('.lista option')
    valores.text = `${simbolo} ${compra}`
    lista.appendChild(valores)

    valoresAdd.forEach((item) => {
      console.log(valores.text)
    })
  })
}