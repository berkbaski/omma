import validate from './validation'

const modal = document.querySelector('.modal')
const modalButton = document.querySelector('.modal-button')
const modalTitle = document.querySelector('.modal-title')
const addNewItemButton = document.querySelector('.add-new-button')
const playlistItemId = document.querySelector("span[name='playlistItemId']")

const nameInput = document.querySelector("input[name='playlist-item-name']")
const linkInput = document.querySelector("input[name='playlist-item-link']")
const weightInput = document.weightSlider

const nameLabel = document.querySelector("label[name='playlist-item-name-label']")
const linkLabel = document.querySelector("label[name='playlist-item-link-label']")
const weightLabel = document.querySelector("label[name='playlist-item-weight-label']")

const clearInputs = () => {
  nameInput.value = ''
  linkInput.value = ''
  weightInput.setValue(1)

  nameInput.classList.remove('error-input')
  nameLabel.classList.remove('error-label')

  linkInput.classList.remove('error-input')
  linkLabel.classList.remove('error-label')

  weightLabel.classList.remove('error-label')
}

const checkModalInputsValidation = () => {
  let isValid = true

  if (validate(nameInput.value)) {
    nameInput.classList.remove('error-input')
    nameLabel.classList.remove('error-label')
  } else {
    nameInput.classList.add('error-input')
    nameLabel.classList.add('error-label')
    isValid = false
  }

  if (validate(linkInput.value)) {
    linkInput.classList.remove('error-input')
    linkLabel.classList.remove('error-label')
  } else {
    linkInput.classList.add('error-input')
    linkLabel.classList.add('error-label')
    isValid = false
  }

  if (validate(weightInput.value) && weightInput.value > 0) {
    weightLabel.classList.remove('error-label')
  } else {
    weightLabel.classList.add('error-label')
    isValid = false
  }

  return isValid
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
  checkModalInputsValidation,
}
