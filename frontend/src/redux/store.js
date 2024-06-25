import { configureStore } from '@reduxjs/toolkit'

/* ------- Auth ------- */
import AuthSlice from './Slices/AuthSlice'

/* ------- Blog ------- */
import BlogSlice from './Slices/BlogSlice'

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        blog: BlogSlice
    },
})

export default store