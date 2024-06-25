import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import baseURL from '../../Api/Api';

// Initial state
const initialState = {
    blog: [],
    loading: false,
    error: null,
};


export const getAllBlog = createAsyncThunk(
    'blog/getAllBlog',
    async (pageNum) => {
        try {
            const response = await baseURL.get(`/posts`);
            return response.data;

        } catch (error) {
            console.log(error);
            return error.response.data
        }
    }
);

export const getBlog = createAsyncThunk(
    'blog/getBlog',
    async (id) => {
        try {
            const response = await baseURL.get(`/posts/${id}`);
            return response.data;

        } catch (error) {
            console.log(error);
            return error.response.data
        }
    }
);



export const createBlog = createAsyncThunk(
    'blog/createBlog',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await baseURL.post(`/posts`, formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const editBlog = createAsyncThunk(
    'blog/editBlog',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await baseURL.put(`/posts/${id}`, formData);
            return response.data;

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteBlog = createAsyncThunk(
    'blog/deleteBlog',
    async (id, { rejectWithValue }) => {
        try {

            const response = await baseURL.delete(`/posts/${id}`);
            return response.data;

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


// Slice
const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setBlogData: (state, action) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder

            //Get All User
            .addCase(getAllBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.blog = action.payload;
                // Handle any state updates needed after successful API call
            })
            .addCase(getAllBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'Failed to post blog data';
            })

            //Get All User
            .addCase(getBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.blog = action.payload;
                // Handle any state updates needed after successful API call
            })
            .addCase(getBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'Failed to post blog data';
            })


            // Create User 
            .addCase(createBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Handle any state updates needed after successful API call
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'Failed to post blog data';
            })

            // Edit User 
            .addCase(editBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Handle any state updates needed after successful API call
            })
            .addCase(editBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'Failed to post blog data';
            })


            //Delete WorkingDays 
            .addCase(deleteBlog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Handle any state updates needed after successful API call
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'Failed to post blog data';
            })

    },
});



export const { setBlogData } = blogSlice.actions;
export default blogSlice.reducer;