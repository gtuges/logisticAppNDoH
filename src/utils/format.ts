export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-PG', {
    style: 'currency',
    currency: 'PGK'
  }).format(amount);
};