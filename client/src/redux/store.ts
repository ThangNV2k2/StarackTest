import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './auth-api'
import { userApi } from './user-api'
import { invalidTokenMiddleware } from './invalid-token-middleware'
import { logsUserApi } from './logs-user'


export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [logsUserApi.reducerPath]: logsUserApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, logsUserApi.middleware),
})

setupListeners(store.dispatch)