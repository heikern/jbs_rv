import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firebaseApp } from '../firebase/config';
import { Story } from '../types/storyTypes';

const firestore = getFirestore(firebaseApp);

export interface FirebaseState {
  stories: Story[];
  selectedStory: Story | null;
  loading: boolean;
  error: string | null;
}

const initialState: FirebaseState = {
  stories: [],
  selectedStory: null,
  loading: false,
  error: null,
};

export const fetchStories = createAsyncThunk(
  'firebase/fetchStories',
  async (_, { rejectWithValue }) => {
    try {
      const storiesCollection = collection(firestore, 'stories');
      const querySnapshot = await getDocs(storiesCollection);
      const stories: Story[] = [];
      querySnapshot.forEach((doc) => {
        stories.push({ id: doc.id, ...doc.data() } as Story);
      });
      return stories;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const firebaseSlice = createSlice({
  name: 'firebase',
  initialState,
  reducers: {
    setSelectedStory: (state, action: PayloadAction<string | null>) => {
      state.stories.map((story)=>{
        if (story.id === String(action.payload)){
          state.selectedStory = story;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchStories.fulfilled, (state, action: PayloadAction<Story[]>) => {
      state.loading = false;
      state.stories = action.payload;
    });
    builder.addCase(fetchStories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {setSelectedStory} = firebaseSlice.actions;
export default firebaseSlice.reducer;
