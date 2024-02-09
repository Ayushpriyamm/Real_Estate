import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import  { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

//combine multiple reducer into one 
const rootReducer = combineReducers({ user: userReducer })

const persistConfig = {
    key: 'root',
    storage, //stores data in localstorage by default
    version:1,
}
//persistReducer-> is a function that  enhace our reducer by taking config for enhanced reducer and combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({

    reducer: persistedReducer,
    
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck:false,
        }),
        
})

export const persistor = persistStore(store);