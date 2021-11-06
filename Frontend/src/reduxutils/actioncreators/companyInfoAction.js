export const setName = (name) => {
  return (dispatch) => {
    dispatch({
      type: 'setName',
      payload: name,
    })
  }
}

export const setId = (id) => {
  return (dispatch) => {
    dispatch({
      type: 'setId',
      payload: id,
    })
  }
}
