export const currency = (value) => `₹${Number(value || 0).toFixed(2)}`;

export const formatDate = (date = new Date()) =>
  new Date(date).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
