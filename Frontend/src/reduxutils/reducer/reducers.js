import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { userReducer } from './userReducer.js'
import { companyReducer } from './companyReducer.js'
import { jobPrefReducer } from './jobPrefReducer.js'
import { accessCompanyInfoReducer } from './accessCompanyInfoReducer.js'

const persistConfig = {
  key: 'root',
  storage,
}

const appReducers = combineReducers({
  //Write you individual reducer here like below
  userInfo: userReducer,
  company: companyReducer,
  jobPref: jobPrefReducer,
  companyInfo: accessCompanyInfoReducer,
})

const reducer = (state, action) => {
  //Upon logout, everything will be set to initial state
  if (action.type === 'logout') {
    return appReducers(undefined, action)
  }
  return appReducers(state, action)
}

const reducers = persistReducer(persistConfig, reducer)

export default reducers
