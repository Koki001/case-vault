"use client";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useCaseStore } from "@/store/caseSlice";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

import s from "./styles.module.css";
import { useRouter } from "next/navigation";
import Loader from "../../loader/Loader";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useNotificationStore } from "../../../store/notificationSlice";
import formValidator from "../../../utils/formValidator";

interface FormData {
  description: string;
  report: string;
  type: string;
  status: string;
  suspects: string[];
  victims: string[];
  witnesses: string[];
  officerInCharge: string[];
}

interface Labels {
  suspects: string;
  victims: string;
  witnesses: string;
  officerInCharge: string;
}

const CreateCase = () => {
  const router = useRouter();
  const { isOpen, message } = useNotificationStore((state) => state);
  const [reportFile, setReportFile] = useState<File | null>(null);
  const setNotification = useNotificationStore(
    (state) => state.setNotification
  );

  const [formData, setFormData] = useState<FormData>({
    description: "",
    report: "",
    type: "",
    status: "Active",
    suspects: [],
    victims: [],
    witnesses: [],
    officerInCharge: [],
  });

  const caseLabels: Labels = {
    suspects: "Suspect",
    victims: "Victim",
    witnesses: "Witness",
    officerInCharge: "Officer In Charge",
  };

  const setUpdate = useCaseStore((state) => state.setUpdate);
  const update = useCaseStore((state) => state.update);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof FormData,
    index: number
  ) => {
    const newValue = e.target.value;
    if (
      field === "suspects" ||
      field === "witnesses" ||
      field === "victims" ||
      field === "officerInCharge"
    ) {
      setFormData((prevData) => ({
        ...prevData,
        [field]: prevData[field].map((value, i) =>
          i === index ? newValue : value
        ),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [field]: newValue,
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReportFile(file);
      e.target.value = "";
    }
  };

  const handleAddField = (field: keyof FormData) => {
    if (
      field === "suspects" ||
      field === "witnesses" ||
      field === "victims" ||
      field === "officerInCharge"
    ) {
      setFormData((prevData) => ({
        ...prevData,
        [field]: [...prevData[field], ""],
      }));
    }
  };

  const handleRemoveField = (field: keyof FormData, index: number) => {
    if (
      field === "suspects" ||
      field === "witnesses" ||
      field === "victims" ||
      field === "officerInCharge"
    ) {
      setFormData((prevData) => ({
        ...prevData,
        [field]: prevData[field].filter((_, i) => i !== index),
      }));
    }
  };

  const handleCreateCase = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    const [isValid, notificationMessage] = formValidator(formData, {
      reportFile,
    });
    setNotification(!isValid, notificationMessage);
    if (isValid) {
      try {
        setUpdate(true);
        const formDataWithReport = new FormData();
        formDataWithReport.append("case", formData.description);
        if (reportFile === null) {
          const reportContent = formData.report;
          const textFile = new File([reportContent], "report.txt", {
            type: "text/plain",
          });
          formDataWithReport.append("file", textFile);
        } else {
          formDataWithReport.append("file", reportFile);
        }
        const res = await fetch("api/createCase", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const reportCaseId = await res.json();
          formDataWithReport.append("caseId", reportCaseId.caseId);
          const fileRes = await fetch("api/uploadReport", {
            method: "POST",
            body: formDataWithReport,
          });
          if (fileRes.ok) {
            // setUpdate(true);
            setFormData({
              description: "",
              report: "",
              type: "",
              status: "Active",
              suspects: [],
              victims: [],
              witnesses: [],
              officerInCharge: [],
            });
            setUpdate(false);
            router.push(`?view=case`);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const isAnyFieldEmpty = (fieldName: keyof FormData): boolean => {
    if (
      fieldName === "suspects" ||
      fieldName === "witnesses" ||
      fieldName === "victims" ||
      fieldName === "officerInCharge"
    ) {
      return formData[fieldName].some((value) => value === "");
    }
    return false;
  };

  const renderFields = (field: keyof FormData) => {
    if (
      field === "suspects" ||
      field === "witnesses" ||
      field === "victims" ||
      field === "officerInCharge"
    ) {
      return formData[field].map((value, index) => (
        <div className={s.dynamicFields} key={`${field}-${index}`}>
          <TextField
            placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}`}
            sx={{
              padding: "0",
              margin: "0",
            }}
            variant="outlined"
            value={value}
            onChange={(e) => handleInputChange(e, field, index)}
            fullWidth
            margin="normal"
            autoFocus
          />
          <IconButton
            sx={{ margin: "0 5px" }}
            onClick={() => handleRemoveField(field, index)}
          >
            <ClearIcon />
          </IconButton>
        </div>
      ));
    }
  };

  return (
    <form
      className={`${s.createCaseContainer} wrapper`}
      onSubmit={handleCreateCase}
    >
      {update && <Loader message={"Creating Case"} />}
      <div className={s.createCaseHeadings}>
        <TextField
          placeholder="Case Title / Description"
          variant="outlined"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          fullWidth
          sx={{ width: "500px", marginRight: "20px" }}
          required
          inputProps={{ maxLength: 100 }}
        />
        <FormControl
          required
          variant="outlined"
          sx={{ minWidth: 170, marginRight: "20px" }}
        >
          <InputLabel id="case-type">Type</InputLabel>
          <Select
            labelId="case-type"
            id="case-type-id"
            label="Type"
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value,
              })
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Public Order Offence"}>Public Order</MenuItem>
            <MenuItem value={"Traffic Offence"}>Traffic</MenuItem>
            <MenuItem value={"Domestic Incident"}>Domestic Incidents</MenuItem>
            <MenuItem value={"Property Crime"}>Property</MenuItem>
            <MenuItem value={"Drug Offence"}>Drug Related</MenuItem>
            <MenuItem value={"Violent Crime"}>Violent Crime</MenuItem>
            <MenuItem value={"Environmental Crime"}>Environmental</MenuItem>
            <MenuItem value={"Financial Crime"}>Financial</MenuItem>
            <MenuItem value={"Cybercrime"}>Cybercrimes</MenuItem>
            <MenuItem value={"Special Victim"}>Special Victims</MenuItem>
            <MenuItem value={"Terrorism"}>Terrorism</MenuItem>
          </Select>
        </FormControl>
      </div>
      <TextField
        placeholder="Enter case report here, or upload report file"
        variant="outlined"
        value={formData.report}
        onChange={(e) => setFormData({ ...formData, report: e.target.value })}
        fullWidth
        margin="normal"
        multiline
        rows={12}
        disabled={reportFile !== null}
      />
      <div>
        <div className={s.caseReportUpload}>
          {reportFile ? (
            <p>
              <TaskAltIcon color="success" /> {reportFile.name} selected
            </p>
          ) : (
            <p>
              <HighlightOffIcon color="error" /> No File Selected
            </p>
          )}
          <Button
            disabled={formData.report !== ""}
            variant="outlined"
            component="label"
          >
            Upload Report
            <input
              type="file"
              hidden
              accept=".doc, .docx"
              onChange={handleFileUpload}
            />
          </Button>
        </div>

        {reportFile !== null && (
          <div>
            file uploaded{" "}
            <Button onClick={() => setReportFile(null)}>delete</Button>
          </div>
        )}
      </div>
      {/* Render dynamic fields */}
      <div className={s.dynamicFieldsContainerParent}>
        {Object.keys(formData).map((field) => {
          if (
            field !== "description" &&
            field !== "report" &&
            field !== "type" &&
            field !== "status"
          )
            return (
              <div className={s.dynamicFieldsContainer} key={field}>
                <div className={s.dynamicFieldsInputs}>
                  {renderFields(field as keyof FormData)}
                </div>
                <Button
                  variant="contained"
                  onClick={() => handleAddField(field as keyof FormData)}
                  disabled={isAnyFieldEmpty(field as keyof FormData)}
                >
                  Add {caseLabels[field as keyof Labels]}
                </Button>
              </div>
            );
        })}
      </div>

      <Button
        className={s.createCaseButton}
        variant="contained"
        color="success"
        type="submit"
        disabled={update}
      >
        Open new case
      </Button>
    </form>
  );
};

export default CreateCase;
