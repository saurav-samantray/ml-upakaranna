import {combineReducers} from 'redux';
import headerReducer from "./components/header/headerReducer";
import loginReducer from "./components/login/loginReducer";
import projectReducer from "./components/project-list/projectReducer";
import datasetReducer from "./components/dataset/datasetReducer";

const rootReducer = combineReducers({
    headerReducer,
    loginReducer,
    projectReducer,
    datasetReducer


})

export default rootReducer