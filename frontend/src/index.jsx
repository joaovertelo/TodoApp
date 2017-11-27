import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

//aguarda uma requisição assicrona obter a resposta para fazer o 'payload'.
import promise from 'redux-promise'
//multi serve para retornar um array de varias actions(dentro de um action creator).
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import App from './main/app'
import reducers from './main/reducers'

// ferramenda de debug redux
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__()
// Middleaware faz com que a promise seja resolvida para que o reducer
// não seja chamado e os dados ainda não estiverem prontos.
const store = applyMiddleware(thunk,multi, promise)(createStore)(reducers, devTools)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('app'));