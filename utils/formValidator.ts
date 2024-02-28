interface FormData {
  description: string;
  type: string;
  report: string;
  suspects: string[];
  victims: string[];
  witnesses: string[];
  officerInCharge: string[];
}
interface FileData {
  reportFile?: File | null;
}

const formValidator = (
  formData: FormData,
  fileData: FileData
): [boolean, string] => {
  // const validId = /^.{24}$/.test(formData.description);

  // if (!validId) {
  //   return [false, "Invalid Case ID"];
  // }

  if (formData.suspects) {
    for (const suspect of formData.suspects) {
      if (!/^[^\d]*$/.test(suspect)) {
        return [false, "Invalid suspect: contains numbers"];
      }
    }
  }

  // Check victim
  if (formData.victims) {
    for (const victim of formData.victims) {
      if (!/^[^\d]*$/.test(victim)) {
        return [false, "Invalid victim: contains numbers"];
      }
    }
  }

  // Check witness
  if (formData.witnesses) {
    for (const witness of formData.witnesses) {
      if (!/^[^\d]*$/.test(witness)) {
        return [false, "Invalid witness: contains numbers"];
      }
    }
  }

  // Check officer
  if (formData.officerInCharge) {
    for (const officer of formData.officerInCharge) {
      if (!/^[^\d]*$/.test(officer)) {
        return [false, "Invalid officer: contains numbers"];
      }
    }
  }

  if (fileData.reportFile instanceof File) {
    const allowedExtensions = [".txt", ".doc", ".docx"];
    const fileName = fileData.reportFile.name;
    const fileExtension = fileName.slice(fileName.lastIndexOf("."));
    console.log(fileExtension);
    if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
      return [
        false,
        "Invalid file format. Only .txt, .doc, or .docx files are allowed.",
      ];
    }
  }

  return [true, ""];
};
export default formValidator;
