

function select(event)
{
    color
    event.target.style.background = 'red';
}

for (element of document.getElementsByClassName("grid-item"))
{
    element.addEventListener('click', select);
}