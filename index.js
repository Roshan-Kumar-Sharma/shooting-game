let player1TotalHealth, player2TotalHealth
let player1TotalWin = player2TotalWin = 0
let totalGame = 5, isGameEnd = false, playerTurn = 1

const mainContainer1 = document.getElementById('main-container-1')
const mainContainer2 = document.getElementById('main-container-2')

const player1Health = document.querySelector('[data-player1-health]')
const player2Health = document.querySelector('[data-player2-health]')

const player1DamageHist = document.querySelector('[data-player1-damage]')
const player2DamageHist = document.querySelector('[data-player2-damage]')

const player1TotalWinSpan = document.querySelector('[data-player1-win]')
const player2TotalWinSpan = document.querySelector('[data-player2-win]')

const buttons = document.querySelectorAll('.btn')

function startGame(){
    buttons[1].disabled = false

    player1TotalHealth  = player2TotalHealth  = 100

    player1Health.innerText = `Total Health:${player1TotalHealth}`

    player2Health.innerText = `Total Health:${player2TotalHealth}`

    mainContainer1.classList.toggle('d-none')
    mainContainer2.classList.toggle('d-none')
    document.querySelector('[data-player1-damage]').innerHTML = ''
    document.querySelector('[data-player2-damage]').innerHTML = ''
}

function shoot(elem){
    const damageDetails = calculateDamage()

    const shotDetails = {
        ...damageDetails,
        player: parseInt(elem.id)
    }

    updatePlayersHealth(shotDetails)
    
    checkPlayerTurn(parseInt(elem.id))

    checkValidity()

}

function checkPlayerTurn(player){
    if(player % 2 === 0){
        buttons[2].disabled = true
        buttons[1].disabled = false
    }
    else{
        buttons[1].disabled = true
        buttons[2].disabled = false
    }
}

function calculateDamage(){
    const damage = Math.floor(Math.random() * 11);
    
    damageSpan = createHTMLDom(`<span class="text-center mt-3"></span>`)
    
    if(damage){
        damageSpan.classList.add('text-danger') 
        damageSpan.innerText = `${- damage}`
    }
    else{
        damageSpan.classList.add('text-success')
        damageSpan.innerText = damage
    }
    return {damage, damageSpan}
}

function updatePlayersHealth({player, damage, damageSpan}){
    if(player === 1){
        player2TotalHealth -= damage
        player2TotalHealth = player2TotalHealth < 0 ? 0 : player2TotalHealth
        player2Health.innerText = `Remaining Health:${player2TotalHealth}`
    
        player2DamageHist.append(damageSpan)
    }
    else{
        player1TotalHealth -= damage
        player1TotalHealth = player1TotalHealth < 0 ? 0 : player1TotalHealth
        player1Health.innerText = `Remaining Health: ${player1TotalHealth}`
    
        player1DamageHist.append(damageSpan)
    }
}

function checkValidity(){
    if(player1TotalHealth <= 0){
        player2TotalWin += 1
        buttons[1].disabled = buttons[2].disabled = true
        endGame(2)
    }
    else if(player2TotalHealth <= 0){
        player1TotalWin += 1
        buttons[1].disabled = buttons[2].disabled = true
        endGame(1)
    }
}

async function endGame(winner){
    let wholeGameOver = false

    if(winner === 1) player1TotalWinSpan.innerText = `Won: ${player1TotalWin}`
    else player2TotalWinSpan.innerText = `Won: ${player2TotalWin}`

    let maxMatchWinToWinGame = Math.ceil(totalGame / 2)

    if(player1TotalWin >= maxMatchWinToWinGame){
        document.querySelector('[data-player-result]').innerText = 'Player1 won the match!'
        wholeGameOver = true
    }
    else if(player2TotalWin >= maxMatchWinToWinGame){
        document.querySelector('[data-player-result]').innerText = 'Player2 won the match!'
        wholeGameOver = true
    }

    await new Promise((resolve) => {
        setTimeout(() => {
            mainContainer2.classList.toggle('d-none')
            mainContainer1.classList.toggle('d-none')
            resolve()
        }, 2000)
    })

    if(wholeGameOver) restartGame()
}

function restartGame(){
    player1TotalWin = player2TotalWin = 0
    setTimeout(() => {
        document.querySelector('[data-player-result]').innerText = ''
        player1TotalWinSpan.innerText = 'Won: 0'
        player2TotalWinSpan.innerText = 'Won: 0'
    }, 3000)
}

function createHTMLDom(elem){
    const template = document.createElement('template')
    template.innerHTML = elem
    return template.content.firstElementChild
}

