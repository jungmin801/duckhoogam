// 동일한 파일명의 파일을 업로드 하기 위해 파일명 뒤에 현재시각을 붙여 새로운 파일명을 만들어준다.

export const generateNewFileName = (fileName: string) => {
  const date = new Date();
  const uniqueString = date.toISOString().replace(/[^0-9]/g, "");

  const fileExtension = fileName.split(".").pop();
  const newFileName = `${fileName
    .split(".")
    .slice(0, -1)
    .join(".")}_${uniqueString}.${fileExtension}`;

  return newFileName;
};
