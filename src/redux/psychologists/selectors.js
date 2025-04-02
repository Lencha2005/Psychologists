export const selectItems = state => state.psychologists.items;
export const selectPage = state => state.psychologists.page;
export const selectHasMore = state => state.psychologists.hasMore;
export const selectSortBy = state => state.psychologists.sortBy;
export const selectLastKey = state => state.psychologists.lastKey;
export const selectPsychologistIsLoading = state =>
  state.psychologists.isLoading;
export const selectPsychologistError = state => state.psychologists.error;
