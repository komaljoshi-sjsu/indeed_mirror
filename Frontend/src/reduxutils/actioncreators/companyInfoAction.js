export const setName = (name) => {
  return (dispatch) => {
    dispatch({
      type: 'setName',
      payload: name,
    })
  }
}

export const setCompId = (compid) => {
  return (dispatch) => {
    dispatch({
      type: 'setCompId',
      payload: compid,
    })
  }
}
