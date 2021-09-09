import { createSlice } from '@reduxjs/toolkit';

const initialState: { token: string, id: number | null } = { token: '', id: null };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authSession: (state, action) => {
            state.token = action.payload;
        },
        setId: (state, action) => {
            state.id = action.payload;
        },
    }
});

export const { authSession, setId } = authSlice.actions;
export const authReducer = authSlice.reducer;