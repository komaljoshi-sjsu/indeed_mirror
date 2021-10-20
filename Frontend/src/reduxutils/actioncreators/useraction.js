//Actions will be written in beelow format

export const setEmail = (email) => {
    return (dispatch) => {
        dispatch({
            type:"setEmail",
            payload:email
        });
    } 
}

export const setName = (name) => {
    return (dispatch) => {
        dispatch({
            type:"setName",
            payload:name
        });
    } 
}

export const setToken = (token) => {
    return (dispatch) => {
        dispatch({
            type:"setToken",
            payload:token
        });
    } 
}

export const setId = (id) => {
    return (dispatch) => {
        dispatch({
            type:"setId",
            payload:id
        });
    } 
}

export const setAccountType = (accountType) => {
    return (dispatch) => {
        dispatch({
            type:"setAccountType",
            payload:accountType
        });
    } 
}