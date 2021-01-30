import {
  showModal,
  hideModal,
  modalButton,
  playlistItemId,
  nameInput,
  linkInput,
  weightInput,
  clearInputs,
} from './modal'

const playlistItems = document.querySelector('.playlist-items')

let index = 0

const editListener = id => {
  const playlistItem = document.querySelector(`div[data-item-id='${id.toString()}']`)

  const nameColumn = playlistItem.querySelector('.playlist-item-name')
  const linkColumn = playlistItem.querySelector('.playlist-item-link')
  const weightColumn = playlistItem.querySelector('.playlist-item-weight')
  const weightValue = parseInt(weightColumn.innerText.split(' ')[1], 10)

  nameInput.value = nameColumn.innerText
  linkInput.value = linkColumn.innerText
  weightInput.setValue(weightValue)

  showModal(id)
}

const deleteListener = playlistItem => {
  if (window.confirm('Are you sure you want to delete?')) {
    playlistItem.remove()
  }
}

const createPlaylistItem = (name, link, weight) => {
  index += 1

  const playlistItem = document.createElement('div')
  playlistItem.className = 'playlist-item'
  playlistItem.setAttribute('data-item-id', index.toString())

  const indexItem = document.createElement('h3')
  indexItem.innerText = `${index}.`
  indexItem.className = 'playlist-item-index'

  const nameItem = document.createElement('h3')
  nameItem.innerText = name
  nameItem.className = 'playlist-item-name'

  const linkItem = document.createElement('h3')
  linkItem.innerText = link
  linkItem.className = 'playlist-item-link'

  const weightItem = document.createElement('h3')
  weightItem.innerText = `Weight: ${weight}`
  weightItem.className = 'playlist-item-weight'

  const editButton = document.createElement('button')
  editButton.className = 'action-button edit-button'
  editButton.addEventListener('click', () => editListener(index))

  const editIcon = document.createElement('i')
  editIcon.className = 'fa fa-edit'

  const deleteButton = document.createElement('button')
  deleteButton.className = 'action-button delete-button'
  deleteButton.addEventListener('click', () => deleteListener(playlistItem))

  const deleteIcon = document.createElement('i')
  deleteIcon.className = 'fa fa-trash-o'

  editButton.appendChild(editIcon)
  deleteButton.appendChild(deleteIcon)

  playlistItem.append(indexItem, nameItem, linkItem, weightItem, editButton, deleteButton)
  playlistItems.appendChild(playlistItem)
}

const updatePlaylistItem = (playlistItem, id, newName, newLink, newWeight) => {
  const nameColumn = playlistItem.querySelector('.playlist-item-name')
  const linkColumn = playlistItem.querySelector('.playlist-item-link')
  const weightColumn = playlistItem.querySelector('.playlist-item-weight')

  nameColumn.innerText = newName
  linkColumn.innerText = newLink
  weightColumn.innerText = `Weight: ${newWeight}`
}

const initPlaylist = () => {
  const handleClickedModalButton = () => {
    const id = parseInt(playlistItemId.getAttribute('data-id'), 10) || 0
    const playlistItem = document.querySelector(`div[data-item-id='${id}']`)

    const name = nameInput.value
    const link = linkInput.value
    const weight = weightInput.value

    if (id == 0) {
      createPlaylistItem(name, link, weight)
    } else {
      updatePlaylistItem(playlistItem, id, name, link, weight)
    }

    clearInputs()
    hideModal()
  }

  modalButton.addEventListener('click', handleClickedModalButton)
}

export { initPlaylist, createPlaylistItem, updatePlaylistItem }
