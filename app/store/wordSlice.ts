import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebaseService from "../services/firebaseService";
import WordDocument from "../models/WordDocument";

interface WordState {
  words: WordDocument[];
  loading: boolean;
  error: string | null;
}

const initialState: WordState = {
  words: [],
  loading: false,
  error: null,
};

// Async thunk for fetching words from Firestore. This creates three actions: pending, fulfilled and rejected
export const fetchWords = createAsyncThunk("words/fetchWords", async () => {
  const documents = await firebaseService.getDocuments("words");
  return documents;
});

// create slice automatically handles mutating into non mutating code
// automagic...
const wordSlice = createSlice({
  name: "words",
  initialState,
  reducers: {},
  // these reducers are for handling async functions
  extraReducers: (builder) => {
    builder
      .addCase(fetchWords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.loading = false;
        state.words = action.payload;
      })
      .addCase(fetchWords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch words";
      });
  },
});

export default wordSlice.reducer;
