const initState = {
  name: '',
  id: '',
}

export const accessCompanyInfoReducer = (state = initState, action) => {
  let type = action.type
  switch (type) {
    case 'setName':
      let namestate = {
        ...state,
        name: action.payload,
      }
      return namestate
    case 'setId':
      let idstate = {
        ...state,
        id: action.payload,
      }
      return idstate
    default:
      return state
  }
}
