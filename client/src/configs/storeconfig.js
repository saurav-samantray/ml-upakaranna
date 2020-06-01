// import {createStore, applyMiddleware} from 'redux';
// import rootReducer from  '../reducer'
// import { composeWithDevTools  } from 'redux-devtools-extension'
// import thunk from "redux-thunk";
// const middlewares = [thunk]
// const middlewareEnhancer = applyMiddleware(...middlewares)

// const enhancers = [middlewareEnhancer]
// const composedEnhancers = composeWithDevTools(...enhancers)
// const Store = createStore(rootReducer,composedEnhancers);

// export default Store;

import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from  '../reducer'
import thunk from "redux-thunk";
console.log("process.env.NODE_ENV", process.env.NODE_ENV)


const middlewares = [thunk]
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null ;
const Store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(...middlewares)
));

export default Store;


// import { createStore, applyMiddleware } from "redux";
// import rootReducer from  '../reducer'
// // import reduxLogger from "redux-logger";
// import reduxThunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// let middlewares = [reduxThunk];

// //   if (process.env.NODE_ENV !== "production") {
// //     middlewares.push(reduxLogger);
// //   }
//   const middlewareEnhancer = applyMiddleware(...middlewares);
//   const enhancers = [middlewareEnhancer];
//   const composedEnhancers = composeWithDevTools(...enhancers);
//   const Store = createStore(
//     rootReducer,
//     {},
//     composedEnhancers);
//   export default Store

