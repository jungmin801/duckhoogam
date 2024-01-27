export function formateDate(dateString: string): string {
  const createdDate = new Date(dateString);
  const year = createdDate.getFullYear();
  const month = (createdDate.getMonth() + 1).toString().padStart(2, "0");
  const date = createdDate.getDate().toString().padStart(2, "0");

  return `${year}.${month}.${date}`;
}
