export const applySorting = (data, sortBy = 'Show all') => {
  const sortFieldMap = {
    'A to Z': 'name',
    'Z to A': 'name',
    'Lower price': 'price_per_hour',
    'Higher price': 'price_per_hour',
    'Not popular': 'rating',
    'Popular': 'rating',
  };

  const field = sortFieldMap[sortBy];
  const isDescending = ['Z to A', 'Higher price', 'Popular'].includes(sortBy);

  if (!field) return data;

  return [...data].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (typeof aValue === 'string') {
      return isDescending
        ? bValue.localeCompare(aValue)
        : aValue.localeCompare(bValue);
    }

    return isDescending ? bValue - aValue : aValue - bValue;
  });
};
