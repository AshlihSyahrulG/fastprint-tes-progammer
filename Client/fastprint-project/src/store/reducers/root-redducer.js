import { combineReducers } from 'redux'
import { counterReducerCategory } from './reducer-category'
import { counterReducerProduct } from './reducer-product'

const combine = combineReducers({counterReducerCategory, counterReducerProduct})



export default combine
  