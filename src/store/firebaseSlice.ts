import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firebaseApp } from '../firebase/config';
import { Adventure } from '../types/storyTypes';

const firestore = getFirestore(firebaseApp);

export interface FirebaseState {
  adventures: Adventure[];
  loading: boolean;
  error: string | null;
}

const initialState: FirebaseState = {
  adventures: [],
  loading: false,
  error: null,
};

export const fetchAdventures = createAsyncThunk(
  'firebase/fetchAdventures',
  async (_, { rejectWithValue }) => {
    try {
      const adventuresCollection = collection(firestore, 'adventures');
      const querySnapshot = await getDocs(adventuresCollection);
      const adventures: Adventure[] = [];
      querySnapshot.forEach((doc) => {
        adventures.push({ id: doc.id, ...doc.data() } as Adventure);
      });
      return adventures;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const firebaseSlice = createSlice({
  name: 'firebase',
  initialState,
  reducers: {
    // ...existing reducers if any...
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAdventures.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAdventures.fulfilled, (state, action: PayloadAction<Adventure[]>) => {
      state.loading = false;
      state.adventures = action.payload;
    });
    builder.addCase(fetchAdventures.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default firebaseSlice.reducer;
