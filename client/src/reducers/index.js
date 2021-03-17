import {combineReducers} from 'redux'
import categories from './categoties'
import user from './user'
import contacts from './contacts'


const reducer = combineReducers({
    user,
    categories,
    contacts,
})

export default reducer