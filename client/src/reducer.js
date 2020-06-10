import {combineReducers} from 'redux';
import headerReducer from "./components/header/headerReducer";
import authReducer from "./components/auth/authReducer";
import projectReducer from "./components/project/projectReducer";
import datasetReducer from "./components/dataset/datasetReducer";
import labelReducer from "./components/labels/labelsReducer";
import { notificationReducer } from "./components/utils/notificationbox/notificationReducer";

const rootReducer = combineReducers({
    headerReducer,
    authReducer,
    projectReducer,
    datasetReducer,
    labelReducer,
    notificationReducer


})

export default rootReducer