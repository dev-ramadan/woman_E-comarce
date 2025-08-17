import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    session: null,
    profile : null,
    isLogin : false
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.session = action.payload.session;
            state.profile = action.payload.profile;
            state.isLogin = true

            localStorage.setItem('auth', JSON.stringify({
                user : action.payload.user ,
                session : action.payload.session,
                profile : action.payload.profile,
                isLogin : true
            }));
        },
        loadUserFromStorage: (state) => {
            const savedData = localStorage.getItem('auth');
            if (savedData) {
                const parsed = JSON.parse(savedData);
                state.user = parsed.user;
                state.session = parsed.session;
                state.profile = parsed.profile,
                state.isLogin = parsed.isLogin 
            }
        },
        logout: (state) => {
            state.user = null;
            state.session = null;
            state.profile = null
            state.isLogin = false
            localStorage.removeItem('auth');
        }
    }
});

export const { setUser, loadUserFromStorage, logout } = authSlice.actions;
export default authSlice.reducer;
