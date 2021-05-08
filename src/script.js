// DECLARATIONS

// boolean value indicating the current player
let player = false,
    items = document.getElementsByClassName('grid-item')

// SCRIPT
// Adds the ability to get selected to the grid-items
for (element of items)
{
    element.addEventListener('click', select)
}
document.getElementById('customButton').addEventListener('click', refreshPage)

// FUNCTIONS
// Selects a button by adding the color from the player whose turn it is
function select(event)
{
    // if not selected yet
    let li = event.target.classList;
    console.log(li)
    console.log(li.toString())
    if (!li.toString().includes('player'))
    {
        color = nextColor() // player switched
        li.add(color) // grid-item occupied
        li.remove('selectable') // 
    }
}
// emulating a turn: switching the player and returning the requested color
function nextColor()
{
    let temp = player
    player = !player // new player
    return player ? 'playerOne' : 'playerTwo'
}
// removes the colors from the grid-items
function refreshPage()
{
    for (element of items)
    {
        let li = element.classList;
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
    
}