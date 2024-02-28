interface FormData {
  caseId: string;
  description: string;
  location: string;
  status: string;
  type: string;
}
interface FileData {
  photo?: File | null;
}
const evidenceValidator = (
  formData: FormData,
  fileData: FileData
): [boolean, string] => {
  const validId = /^.{24}$/.test(formData.caseId);

  if (!validId) {
    return [false, "Invalid Case ID"];
  }

  if (fileData.photo instanceof File) {
    const allowedExtensions = [".jpg", ".jpeg", ".png"];
    const fileName = fileData.photo.name;
    const fileExtension = fileName
      .slice(fileName.lastIndexOf("."))
      .toLowerCase();
    console.log(fileExtension);
    if (!allowedExtensions.includes(fileExtension)) {
      return [
        false,
        "Invalid file format. Only .jpg, .jpeg, or .png files are allowed.",
      ];
    }
  }

  return [true, ""];
};
export default evidenceValidator;
