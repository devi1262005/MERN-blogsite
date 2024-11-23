export const convertToDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB');  // You can choose any locale you want
};