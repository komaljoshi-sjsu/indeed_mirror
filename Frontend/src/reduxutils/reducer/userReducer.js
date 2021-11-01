const initState = {
    name:"",
    id:null,
    accountType:"",
    email:"",
    token: "",
    phone:''
}

export const userReducer = (state=initState,action) => {
    let type = action.type;
    switch(type) {
        case "setEmail":
            let emailstate = {
                ...state,'email':action.payload
            }
            return emailstate
        case "setName":
            let nameState = {
                ...state,'name':action.payload
            }
            return nameState;
        case "setToken":
            // let clm = {
            //     'custLoginModal':action.payload
            // };
            let newstate = {
                ...state,'token':action.payload
            }
            return newstate;
        case "setId":
            let idState = {
                ...state,'id':action.payload
            }
            return idState;     
        case "setAccountType":
            let accountType = {
                ...state,'accountType':action.payload
            }
            return accountType;   
        case "setPhone"  :   
            let phoneState = {
                ...state,'phone':action.payload
            }
            return phoneState;
        
    }
    return state;
}


