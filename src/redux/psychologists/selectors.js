import { createSelector } from '@reduxjs/toolkit';

export const selectPsychologists = state => state.psychologists.items;
export const selectFilteredItems = state => state.psychologists.filteredItems;
export const selectFilterType = state => state.psychologists.filterType;
export const selectPage = state => state.psychologists.page;
export const selectPerPage = state => state.psychologists.perPage;
export const selectPsychologistIsLoading = state => state.psychologists.isLoading;
export const selectError = state => state.psychologists.error;

export const selectTotalPage = createSelector(
  [selectFilteredItems, selectPerPage],
  (filteredItems, perPage) => {
    return Math.ceil(filteredItems.length / perPage);
  }
);
