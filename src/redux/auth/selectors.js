export const selectUser = state => state.auth.user;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectFavorites = state => state.auth.favorites;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectUserIsLoading = state => state.auth.isLoading;
export const selectError = state => state.auth.error;
