// DECLARATIONS
/*
 * boolean value indicating the current player:
 * false <=> Player One
 * true <=> Player Two
 */
let player = false;



// SCRIPT
// Adds the ability to get selected to the grid-items
for (element of document.getElementsByClassName('grid-item'))
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
    if (li.toString().includes('selectable'))
    {
        color = (player ? 'playerOne' : 'playerTwo') // getting the color
        li.add(color) // grid-item occupied by the player
        li.remove('selectable') // disable the hover animation
        togglePlayers()
        // as long as the round is on, the player may not be switched
        setButton(document.getElementById('switch'), false)
        // check if a player has won
        hasWon()
    }
}

// removes the colors from the grid-items
function refreshPage()
{
    // go through all elements
    for (element of document.getElementsByClassName('grid-item'))
    {
        let li = element.classList

        // remove blocked
        if (li.toString().includes('blocked'))
        {
            li.remove('blocked')
        }

        // recreate selectability
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

    // players are allowed to switch before the next round
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

// en- or disables the switch player button
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
    // 1) Toggle the model
    player = !player
    // 2) Toggle the view
    // the new block is getting bigger...
    let listOne = document.getElementsByClassName(player ? 'blockOne' : 'blockTwo')[0].classList
    listOne.add('grow')
    listOne.remove('shrink')
    // ...while the old block is getting tinier
    let listTwo = document.getElementsByClassName(player ? 'blockTwo' : 'blockOne')[0].classList
    listTwo.add('shrink')
    listTwo.remove('grow')
}

// Checks if a player has won and triggers the winning routine if necessary
function hasWon()
{
    // get all grid-items
    const gridItems = document.getElementsByClassName('grid-item')

    // check for the rows
    for (let i = 0; i < 7; i += 3)
    {
        if (gridItems[i].classList.toString().includes('playerOne') &&
            gridItems[i + 1].classList.toString().includes('playerOne') &&
            gridItems[i + 2].classList.toString().includes('playerOne'))
        {
            winningRoutine(false, [i, i + 1, i + 2])
            return;
        }
        else if (gridItems[i].classList.toString().includes('playerTwo') &&
            gridItems[i + 1].classList.toString().includes('playerTwo') &&
            gridItems[i + 2].classList.toString().includes('playerTwo'))
        {
            winningRoutine(true, [i, i + 1, i + 2])
            return;
        }
    }

    // check for the columns
    for (let i = 0; i < 3; i++)
    {
        if (gridItems[i].classList.toString().includes('playerOne') &&
            gridItems[i + 3].classList.toString().includes('playerOne') &&
            gridItems[i + 6].classList.toString().includes('playerOne'))
        {
            winningRoutine(false, [i, i + 3, i + 6])
            return;
        }
        else if (gridItems[i].classList.toString().includes('playerTwo') &&
            gridItems[i + 3].classList.toString().includes('playerTwo') &&
            gridItems[i + 6].classList.toString().includes('playerTwo'))
        {
            winningRoutine(true, [i, i + 3, i + 6])
            return;
        }
    }

    // first diagonal
    if (gridItems[0].classList.toString().includes('playerOne') &&
        gridItems[4].classList.toString().includes('playerOne') &&
        gridItems[8].classList.toString().includes('playerOne'))
    {
        winningRoutine(false, [0, 4, 8])
        return;
    }
    else if (gridItems[0].classList.toString().includes('playerTwo') &&
        gridItems[4].classList.toString().includes('playerTwo') &&
        gridItems[8].classList.toString().includes('playerTwo'))
    {
        winningRoutine(true, [0, 4, 8])
        return;
    }
    
    // second diagonal
    if (gridItems[2].classList.toString().includes('playerOne') &&
        gridItems[4].classList.toString().includes('playerOne') &&
        gridItems[6].classList.toString().includes('playerOne'))
    {
        winningRoutine(false, [2, 4, 6])
        return;
    }
    else if (gridItems[2].classList.toString().includes('playerTwo') &&
        gridItems[4].classList.toString().includes('playerTwo') &&
        gridItems[6].classList.toString().includes('playerTwo'))
    {
        winningRoutine(true, [2, 4, 6])
        return;
    }
}

// Displays that the winner has won
function winningRoutine(winner, gridItemsIndices)
{
    // increment the score label
    const id = 'score' + (winner ? 'Two' : 'One') // determine the label to update
    const scoreSpan = document.getElementById(id)
    scoreSpan.textContent = (parseInt(scoreSpan.textContent) + 1).toString() // increment

    // block all grid-items that are still selectable
    const gridItems = document.getElementsByClassName('grid-item')
    for (let x = 0; x < gridItems.length; x++)
    {
        let list = gridItems[x].classList;
        if (list.toString().includes('selectable'))
        {
            list.remove('selectable')
        }
        if (!gridItemsIndices.includes(x))
        {
            list.add('blocked')
        }
    }
}