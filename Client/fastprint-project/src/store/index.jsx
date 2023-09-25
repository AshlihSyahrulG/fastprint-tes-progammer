import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
import combine from './reducers/root-redducer'


let store = createStore(combine,applyMiddleware(thunk))

export default store