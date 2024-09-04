import React, { useState } from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import logger from "redux-logger";
import rootReducer from './store/reducers';
import AppNavigator from './navigation/AppNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons'


// export default function App() {
//   Icon.loadFont();
//   return (
//     <Provider store={store}>
//       <AppNavigator />
//     </Provider>
//   );
// }

export default class App extends React.Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.getData()
  }

  getData = ()=>{
  }

  render() {

    let composeEnhancers = compose;
    const middlewares = [];
    middlewares.push(ReduxThunk);

    if (process.env.NODE_ENV === "development") {
      middlewares.push(logger);
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    }

    const store = createStore(rootReducer, (applyMiddleware(...middlewares)));

    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}