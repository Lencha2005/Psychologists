export const paginate = (data, page = 1, perPage = 3) => {
  const startIndex = (page - 1) * perPage;
  const paginated = data.slice(startIndex, startIndex + perPage);
  const hasMore = startIndex + perPage < data.length;

  return {
    paginated,
    hasMore,
    lastKey: paginated.length ? paginated[paginated.length - 1].id : null,
  };
};
