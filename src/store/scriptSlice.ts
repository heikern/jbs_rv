import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { REST_API_URL } from '../config';

export interface PlayerScripts {
    [playerRoleId: string]: string;
}

export interface ScriptState {
    commonScript: string | null;
    playerScripts: PlayerScripts | null;
    loading: boolean;
    error: string | null;
}

const initialState: ScriptState = {
    commonScript: null,
    playerScripts: null,
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

export const fetchPlayerScript = createAsyncThunk(
    's3/fetchPlayerScript',
    async (params: {storyId?: string, playerRoleId?: string}, {rejectWithValue})=>{
        try {

            const {storyId, playerRoleId} = params;
            if (!storyId || !playerRoleId){
                return rejectWithValue("Story ID and Player Role ID are required")
            }
            const urlResponse = await fetch(`${REST_API_URL}/s3/${storyId}/${playerRoleId}/script`);

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


            return {playerRoleId: playerRoleId, content};

        } catch (err: any){
            return rejectWithValue(err.message)
        }
    }
)

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
            })

            .addCase(fetchPlayerScript.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPlayerScript.fulfilled, (state, action: PayloadAction<{playerRoleId: string, content: string}>) => {
                state.loading = false;
                if (!state.playerScripts) {
                    state.playerScripts = {};
                }
                state.playerScripts[action.payload.playerRoleId] = action.payload.content;
            })
            .addCase(fetchPlayerScript.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch player script';
            });
    }
})


export default scriptSlice.reducer;