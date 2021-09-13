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
        logout: (state) => {
            state.token = initialState.token;
            state.id = initialState.id;
        },
    }
});

export const { authSession, setId, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;