export const selectUser = state => state.auth.user;
export const selectFavorites = state => state.auth.favorites;
export const selectPaginatedFavorites = state => state.auth.paginatedFavorites;
export const selectFavoritesLastKey = state => state.auth.lastKey;
export const selectFavoritesHasMore = state => state.auth.hasMore;
export const selectFavoritesSortBy = state => state.auth.sortBy;
export const selectFavoritesPage = state => state.auth.page;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectUserIsLoading = state => state.auth.isLoading;
export const selectUserError = state => state.auth.error;

