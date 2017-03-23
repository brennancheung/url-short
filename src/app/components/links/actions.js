import axios from 'axios'

export const fetchLinks = () => async (dispatch) => {
  try {
    const response = await axios.get('/links')
    const data = response.data

    dispatch({
      type: 'SET_LINKS',
      payload: { links: data.links }
    })
  } catch (err) {
    console.log(err)
  }
}

export const deleteLink = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/links/${id}`)
    if (response.status !== 200) {
      alert('TODO: implement better error handling')
    }
    const data = response.data

    dispatch({
      type: 'SET_LINKS',
      payload: { links: data.links }
    })
  } catch (err) {
    console.log(err)
  }
}

export const setAddLinkVisibility = (isVisible) => ({
  type: 'SET_ADD_LINK_VISIBILITY',
  payload: { addLinkFormVisible: isVisible }
})
