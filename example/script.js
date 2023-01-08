import flowtypus from './flowtypus.mjs'

const Flowtypus = flowtypus()

// For tests
window.Flowtypus = Flowtypus

const loader = document.querySelector('.loader')

window.addEventListener('flow:transition:out', (event) => {
    loader?.style.setProperty('opacity', 1)
})

window.addEventListener('flow:loading:progress', (event) => {
    loader?.style.setProperty('opacity', 1)
    loader?.style.setProperty('--progress', event.detail.progress)

    if (event.detail.done) {
        loader?.style.setProperty('--progress', 1)
        setTimeout(() => {
            loader?.style.setProperty('--progress', 0)
            loader.style.setProperty('opacity', 0)
        }, 200)
    }
})
