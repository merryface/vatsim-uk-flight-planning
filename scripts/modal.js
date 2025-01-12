((d) => {
    let isOpen = false
    const closeButton = d.getElementById("close-modal")
    const showButton = d.getElementById("toggle-info-button")
    const modal = d.getElementById("modal")

    const toggleViewModal = () => {
        if (isOpen) modal.classList.add('hidden')
        if (!isOpen) modal.classList.remove('hidden')
        isOpen = !isOpen
    }

    closeButton.addEventListener("click", toggleViewModal)
    showButton.addEventListener("click", toggleViewModal)
})(document)