import NameReducer  from "./NameReducer.js";
import {createStore} from 'redux'

export const  store = createStore(NameReducer);