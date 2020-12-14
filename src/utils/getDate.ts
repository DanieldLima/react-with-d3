export const getDate = (date: string) => {
  const dateString = date.split('-');
  return new Date(Number(dateString[2]), Number(dateString[0]) - 1, Number(dateString[1]))
}