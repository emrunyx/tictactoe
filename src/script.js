// DECLARATIONS
// boolean value indicating the current player
let player = false,
    items = document.getElementsByClassName('grid-item')



// SCRIPT
// Adds the ability to get selected to the grid-items
for (element of items)
{
    element.addEventListener('click', select) // makes these elements selectable
}
// Adds the logic to the two buttons
let refreshButton = document.getElementById('refresh'),
    switchButton = document.getElementById('switch')
refreshButton.addEventListener('click', refreshPage)
setButton(refreshButton, true)
switchButton.addEventListener('click', switchPlayer)
setButton(switchButton, true)



// FUNCTIONS
// Selects a button by adding the color from the player whose turn it is
function select(event)
{
    // if not selected yet
    let li = event.target.classList
    if (!li.toString().includes('player'))
    {
        color = nextColor() // player switched
        li.add(color) // grid-item occupied
        li.remove('selectable') // disable the hover animation indicating the item is not occupied
    }
    // as long as the game is running, the player shall not be switched
    setButton(document.getElementById('switch'), false)
}

// emulating a turn: switching the player and returning the requested color
function nextColor()
{
    togglePlayers()
    return player ? 'playerOne' : 'playerTwo'
}

// removes the colors from the grid-items
function refreshPage()
{
    for (element of items)
    {
        let li = element.classList
        if (!li.toString().includes('selectable'))
        {
            li.add('selectable')
            // if this grid-item is occupied
            if (li.toString().includes('playerOne'))
            {
                li.remove('playerOne')
            }
            else if (li.toString().includes('playerTwo'))
            {
                li.remove('playerTwo')
            }
        }
    }
    setButton(document.getElementById('switch'), true)
}

// toggles the player who's turn it is
function switchPlayer()
{
    // if enabled
    if (!(document.getElementById('switch').classList.toString().includes('disabled')))
    {
        togglePlayers()
    }
}

// En- or disables the switch player button
function setButton(button, able)
{
    if (able) // enable
    {
        if (!button.classList.toString().includes('eabled'))
            button.classList.add('enabled')
    }
    else // disable
    {
        if (button.classList.toString().includes('enabled'))
            button.classList.remove('enabled')
    }
}

// Toggles between the players and updates the UI accordingly
function togglePlayers()
{
    player = !player
    let numberSpan = document.getElementById('playerNumber');
    if (!player) // false, aka now it is player one's turn
    {
        numberSpan.innerHTML = 'one'
        // block one is getting bigger...
        let listOne = document.getElementsByClassName('blockOne')[0].classList
        listOne.add('grow')
        listOne.remove('shrink')
        // ...while block two is getting tinier
        let listTwo = document.getElementsByClassName('blockTwo')[0].classList
        listTwo.add('shrink')
        listTwo.remove('grow')
    }
    else // true, aka now it isplayer two's turn
    {
        numberSpan.innerHTML = 'two'
        // block one is getting bigger...
        let listTwo = document.getElementsByClassName('blockTwo')[0].classList
        listTwo.add('grow')
        listTwo.remove('shrink')
        // ...while block two is getting tinier
        let listOne = document.getElementsByClassName('blockOne')[0].classList
        listOne.add('shrink')
        listOne.remove('grow')
    }
}