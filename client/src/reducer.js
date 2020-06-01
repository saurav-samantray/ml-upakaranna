import {combineReducers} from 'redux';
import headerReducer from "./components/header/headerReducer";
import authReducer from "./components/auth/authReducer";
import projectReducer from "./components/project/projectReducer";
import datasetReducer from "./components/dataset/datasetReducer";

const rootReducer = combineReducers({
    headerReducer,
    authReducer,
    projectReducer,
    datasetReducer


})

export default rootReducer