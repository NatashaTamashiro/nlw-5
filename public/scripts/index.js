const buttonSearch = document.querySelector("#page-home main a")
const model = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")


buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")              // Para remover a classe HIDE do botão
})

    close.addEventListener("click", () => {
        modal.classList.add("hide")             // Para adicionar o HIDE
    })