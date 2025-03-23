export const selectPsychologists = state => state.psychologists.items;
export const selectFavorites = state => state.psychologists.favorites;
export const selectPage = state => state.psychologists.page;
export const selectTotalPages = state => state.psychologists.totalPages;
export const selectPsychologistIsLoading = state => state.psychologists.isLoading;
export const selectError = state => state.psychologists.error;