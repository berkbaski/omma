const modal = document.querySelector('.modal')
const modalButton = document.querySelector('.modal-button')
const addNewItemButton = document.querySelector('.add-new-button')
const playlistItemId = document.querySelector("span[name='playlistItemId']")

const nameInput = document.querySelector("input[name='playlist-item-name']")
const linkInput = document.querySelector("input[name='playlist-item-link']")
const weightInput = document.weightSlider

const showModal = id => {
  // eslint-disable-next-line no-console
  console.log(id)
  modal.classList.add('show-modal')
}

const hideModal = () => {
  modal.classList.remove('show-modal')
}

const clearInputs = () => {
  nameInput.value = ''
  linkInput.value = ''
  weightInput.setValue(1)
}

const initModal = () => {
  const handleAddPlaylistItem = () => {
    showModal(null)
  }

  const handleClickedModalBackground = e => {
    if (e.srcElement.classList.contains('modal')) {
      hideModal()
    }
  }

  modal.addEventListener('click', handleClickedModalBackground)
  addNewItemButton.addEventListener('click', handleAddPlaylistItem)
}

export {
  initModal,
  showModal,
  hideModal,
  modal,
  modalButton,
  playlistItemId,
  nameInput,
  linkInput,
  weightInput,
  clearInputs,
}
