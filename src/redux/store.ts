import { combineReducers, configureStore } from '@reduxjs/toolkit'

import sliceAltentication from "./sliceAltentication"

import { persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    altentication: sliceAltentication,
    //   user:sliceUser,
})

const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    // reducer: {
    //   altentication: sliceAltentication
    // },
    reducer: persistedReducer,
    middleware: [thunk],
    // middleware: [saga],
})

export const persistor = persistStore(store)