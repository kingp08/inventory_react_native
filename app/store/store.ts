import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import {reduxStorage} from './storage';

// Slices
import tasksSlice from './tasksSlice';
import userSlice from './userSlice';
import dummyNetwokSlice from './dummyNetwork';
import currencySlice from './currencySlice';
import unitSlice from './unitSlice';
import entitySlice from './entitySlice';
import statusSlice from './statusSlice';
import itemSlice from './itemSlice';
import locationSlice from './locationSlice';
import loaderSlice  from './loaderSlice';
import printSlice from './printSlice';
import positionSlice from './positionSlice';
import typeSlice from './typeSlice';

const rootReducer = combineReducers({
  todos: tasksSlice,
  user: userSlice,
  dummyNetwork: dummyNetwokSlice,
  currency: currencySlice,
  unit: unitSlice,
  entity: entitySlice,
  status: statusSlice,
  item: itemSlice,
  location: locationSlice,
  loader: loaderSlice,
  print: printSlice,
  position: positionSlice,
  type: typeSlice,
});

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
