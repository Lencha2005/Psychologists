export const selectUser = state => state.auth.user;
export const selectToken = state => state.auth.token;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectCurrentTheme = state => state.auth.currentTheme;
export const selectUserIsLoading = state => state.auth.isLoading;
export const selectUserError = state => state.auth.error;
