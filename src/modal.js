const modal = document.querySelector('.modal')
const addNewItemButton = document.querySelector('.add-new-button')

const showModal = () => {
  modal.classList.add('show-modal')
}

const hideModal = () => {
  modal.classList.remove('show-modal')
}

const initModal = () => {
  const handleAddPlaylistItem = () => {
    showModal()
  }

  const handleClickedModalBackground = e => {
    if (e.srcElement.classList.contains('modal')) {
      hideModal()
    }
  }

  modal.addEventListener('click', handleClickedModalBackground)
  addNewItemButton.addEventListener('click', handleAddPlaylistItem)
}

export { initModal, showModal, hideModal }
