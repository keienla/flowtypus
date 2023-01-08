;(() => {
    const divToAdd = document.createElement('div')

    divToAdd.innerHTML =
        'This div is created each time this file is reloaded, now in url <i>"' +
        window.location.href +
        '"</i>'

    document.querySelector('.modales').append(divToAdd)

    setTimeout(() => {
        divToAdd.remove()
    }, 5000)
})()
