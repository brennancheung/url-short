const initialState = {
  links: []
}

export default function reducer (state=initialState, action) {
  const { type, payload } = action

  switch (type) {
    case 'SET_LINKS': {
      return {
        ...state,
        links: payload.links
      }
    }

    case 'SET_ADD_LINK_VISIBILITY': {
      return {
        ...state,
        ...payload
      }
    }

    default:
      return state
  }
}
