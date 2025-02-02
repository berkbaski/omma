/* eslint-disable no-shadow */
import {
  showModal,
  hideModal,
  modalButton,
  playlistItemId,
  nameInput,
  linkInput,
  weightInput,
  clearInputs,
  checkModalInputsValidation,
} from './modal'
import validate from './validation'
import execPlaylistProcess from './playlist-process'

const generatePlaylistScreen = document.querySelector('.generate-screen')
const playlistItems = document.querySelector('.playlist-items')

const playlistNameInput = document.querySelector('.playlist-name-input')
const loopCountInput = document.querySelector('.loop-count-input')
const generateButton = document.querySelector('.generate-button')

const generatedPlaylistScreen = document.querySelector('.g-playlist-table-screen')
const generatedPlaylistItems = document.querySelector('.g-playlist-items')
const generatedPlaylistTitle = document.querySelector('.g-playlist-title')
const generatedPlaylistNavigateSliderButton = document.querySelector('.navigate-slider-button')

const generatedPlaylistSliderScreen = document.querySelector('.g-playlist-slider-screen')
const generatedPlaylistSliderScreenItems = document.querySelector('.g-playlist-slider')
const generatedPlaylistSliderTitle = document.querySelector('.g-playlist-slider-title')
const generatedPlaylistSliderNavigateTableButton = document.querySelector('.navigate-table-button')

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

const checkInputsValidation = () => {
  let isValid = true

  if (validate(playlistNameInput.value)) {
    playlistNameInput.classList.remove('error-input')
  } else {
    playlistNameInput.classList.add('error-input')
    isValid = false
  }

  const loopCountValue = parseInt(loopCountInput.value, 10) || 0
  if (validate(loopCountValue) && loopCountValue > 0) {
    loopCountInput.classList.remove('error-input')
  } else {
    loopCountInput.classList.add('error-input')
    isValid = false
  }

  return isValid
}

const generateTableData = playlistItems => {
  playlistItems.forEach((playlist, index) => {
    const playlistItem = document.createElement('div')
    playlistItem.className = 'g-playlist-item'
    playlistItem.innerHTML = `
         <h3 class="g-playlist-item-index">${index + 1}.</h3>
         <h3 class="g-playlist-item-name">${playlist}</h3>`
    generatedPlaylistItems.appendChild(playlistItem)
  })
}

const generateSliderData = playlistItems => {
  playlistItems.forEach((playlist, index) => {
    const playlistItem = document.createElement('div')
    playlistItem.className = 'g-playlist-slider-item'
    playlistItem.innerHTML = `<h1>${index + 1}. ${playlist}</h1>`
    generatedPlaylistSliderScreenItems.appendChild(playlistItem)
  })
  const event = new Event('sliderDataChanged')
  document.dispatchEvent(event)
}

const initPlaylist = () => {
  const handleClickedModalButton = () => {
    const isValid = checkModalInputsValidation()
    if (isValid) {
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
  }

  const handleClickedGenerateButton = () => {
    const isValid = checkInputsValidation()
    if (isValid) {
      const playlistItems = []

      const playlistElements = document.querySelectorAll('.playlist-item')
      if (!playlistElements || playlistElements.length == 0) {
        alert('You must add at least a playlist item.')
      } else {
        playlistElements.forEach(playlistElement => {
          const nameElement = playlistElement.querySelector('.playlist-item-name')
          const linkElement = playlistElement.querySelector('.playlist-item-link')
          const weightElement = playlistElement.querySelector('.playlist-item-weight')

          playlistItems.push({
            label: nameElement.innerText,
            link: linkElement.innerText,
            value: parseInt(weightElement.innerText.toString().split(' ')[1], 10),
          })
        })

        const playlistName = playlistNameInput.value
        const generateCount = loopCountInput.value

        const result = execPlaylistProcess(playlistItems, generateCount)
        if (result) {
          const tableData = result.playlistDetails.map(playlist => ({
            playlistItemName: playlist.label,
            weight: playlist.value,
            rate: playlist.rate,
            percentage: `%${playlist.ratePercent}`,
          }))
          // eslint-disable-next-line no-console
          console.table({ playlistName, generateCount })
          // eslint-disable-next-line no-console
          console.table(tableData)

          generatePlaylistScreen.classList.add('hide')
          generatedPlaylistScreen.classList.remove('hide')
          generatedPlaylistTitle.innerText = `${playlistName} Playlist!`
          generatedPlaylistSliderTitle.innerText = `${playlistName} Playlist!`
          generateTableData(result.resultArray)
          generateSliderData(result.resultArray)
        } else {
          alert('Something went wrong. Check your inputs.')
        }
      }
    }
  }

  const handleClickedNavigateSliderButton = () => {
    generatedPlaylistSliderScreen.classList.remove('hide')
    generatedPlaylistScreen.classList.add('hide')
  }

  const handleClickedNavigateTableButton = () => {
    generatedPlaylistScreen.classList.remove('hide')
    generatedPlaylistSliderScreen.classList.add('hide')
  }

  generatedPlaylistNavigateSliderButton.addEventListener('click', handleClickedNavigateSliderButton)
  generatedPlaylistSliderNavigateTableButton.addEventListener('click', handleClickedNavigateTableButton)
  generateButton.addEventListener('click', handleClickedGenerateButton)
  modalButton.addEventListener('click', handleClickedModalButton)
}

export { initPlaylist, createPlaylistItem, updatePlaylistItem }
