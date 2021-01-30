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

const editListener = ({ id }) => {
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

  const weightItem = document.createElement('h3')
  weightItem.innerText = `Weight: ${weight}`
  weightItem.className = 'playlist-item-weight'

  const editButton = document.createElement('button')
  editButton.className = 'action-button warning-button'
  editButton.addEventListener('click', () => editListener({ id: index, name, link, weight }))

  const editIcon = document.createElement('i')
  editIcon.className = 'fa fa-edit'

  const deleteButton = document.createElement('button')
  deleteButton.className = 'action-button danger-button'
  deleteButton.addEventListener('click', () => deleteListener(playlistItem))

  const deleteIcon = document.createElement('i')
  deleteIcon.className = 'fa fa-trash-o'

  editButton.appendChild(editIcon)
  deleteButton.appendChild(deleteIcon)

  playlistItem.append(indexItem, nameItem, weightItem, editButton, deleteButton)
  playlistItems.appendChild(playlistItem)
}

const updatePlaylistItem = (playlistItem, newName, newLink, newWeight) => {
  // eslint-disable-next-line no-console
  console.log({ playlistItem, newName, newLink, newWeight })
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
      updatePlaylistItem(playlistItem, name, link, weight)
    }

    clearInputs()
    hideModal()
  }

  modalButton.addEventListener('click', handleClickedModalButton)
}

export { initPlaylist, createPlaylistItem, updatePlaylistItem }
