const modal = document.querySelector('.modal')
const modalButton = document.querySelector('.modal-button')
const modalTitle = document.querySelector('.modal-title')
const addNewItemButton = document.querySelector('.add-new-button')
const playlistItemId = document.querySelector("span[name='playlistItemId']")

const nameInput = document.querySelector("input[name='playlist-item-name']")
const linkInput = document.querySelector("input[name='playlist-item-link']")
const weightInput = document.weightSlider

const clearInputs = () => {
  nameInput.value = ''
  linkInput.value = ''
  weightInput.setValue(1)
}

const showModal = id => {
  playlistItemId.setAttribute('data-id', id)
  modal.classList.add('show-modal')
  modalButton.innerHTML = id ? 'Update' : 'Create'
  modalTitle.innerHTML = id ? 'Update playlist item' : 'Create a playlist item'
}

const hideModal = () => {
  clearInputs()
  modal.classList.remove('show-modal')
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
