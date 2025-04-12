import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { REST_API_URL } from '../config';

export interface ScriptState {
    commonScript: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: ScriptState = {
    commonScript: null,
    loading: false,
    error: null,
};

export const fetchCommonScript = createAsyncThunk(
    's3/fetchCommonScript',
    async (params: {storyId?: string}, {rejectWithValue})=>{
        try {
            const {storyId} = params;
            if (!storyId){
                return rejectWithValue("Story ID is required")
            }
            const urlResponse = await fetch(`${REST_API_URL}/s3/${storyId}/common`);

            if (!urlResponse.ok) {
                throw new Error(`Failed to get signed URL. Status: ${urlResponse.status}`);
            }

            const { url } = await urlResponse.json();
            if (!url) throw new Error('Signed URL is missing in the response');

            // Step 2: Fetch the actual content from S3 using the signed URL
            const scriptResponse = await fetch(url);
            if (!scriptResponse.ok) {
                throw new Error(`Failed to fetch S3 content. Status: ${scriptResponse.status}`);
            }

            const content = await scriptResponse.text(); // Assuming it's Markdown
            return content;
            

        }catch(err: any){
            return rejectWithValue(err.message)
        }
    }
);

const scriptSlice = createSlice({
    name: 'scripts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommonScript.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCommonScript.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.commonScript = action.payload;
            })
            .addCase(fetchCommonScript.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch common script';
            });
    }
})


export default scriptSlice.reducer;