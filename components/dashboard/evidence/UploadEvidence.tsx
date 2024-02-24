import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import s from "./styles.module.css";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useEvidenceStore } from "../../../store/evidenceSlice";

interface CaseId {
  id: string;
}

const statusOptions = [
  "Collected",
  "In Storage",
  "In Lab",
  "On Hold",
  "Processed",
  "Released",
  "Awaiting Disposal",
];

const typeOptions = [
  "Physical",
  "Digital",
  "Forensic",
  "Testimonial",
  "Surveillance",
  "Financial",
  "Biological",
  "Audio",
  "Video",
  "Other",
];

const initialEvidenceState = {
  caseId: "",
  description: "",
  location: "",
  status: "",
  type: "",
};

const UploadEvidence = ({ propId }: any) => {
  const [evidence, setEvidence] = useState(initialEvidenceState);
  const setUpdate = useEvidenceStore((state) => state.setUpdate);

  const [caseIdCollection, setCaseIdCollection] = useState<CaseId[]>([]);
  const [photo, setPhoto] = useState<File | null>(null);

  const handlePhotoUpload = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedFile = e.target.files[0];
      setPhoto(uploadedFile);
    }
  };

  useEffect(() => {
    const fetchCaseIds = async () => {
      try {
        const res = await fetch("/api/fetchCaseIds", {
          method: "GET",
        });
        // Handle response
        if (res.ok) {
          if (propId) {
            const data = await res.json();
            setCaseIdCollection(data.cases);
            
          } else {
            const data = await res.json();
            setCaseIdCollection(data.cases);
          }
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (caseIdCollection.length === 0 && !propId) {
      fetchCaseIds();
    } else if (propId) {
      setEvidence((prev) => ({ ...prev, caseId: propId }));
    }
  }, [caseIdCollection, propId]);

  const handleCreateEvidence = async (e: any) => {
    e.preventDefault();
    if (!photo) {
      console.log("Please upload a photo");
      return;
    }

    const formData = new FormData();
    formData.append("file", photo);
    formData.append("caseId", evidence.caseId);
    formData.append("description", evidence.description);
    formData.append("location", evidence.location);
    formData.append("status", evidence.status);
    formData.append("type", evidence.type);
    // formData.append("custodyChain", JSON.stringify(custodyChain));

    try {
      const res = await fetch("api/addEvidence", {
        method: "POST",
        body: formData,
      });
      // Handle response
      if (res.ok) {
        setEvidence(initialEvidenceState);
        setPhoto(null);
        setUpdate(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={s.createEvidenceContainer}>
      <div className={s.topHalf}>
        <div>
          {propId ? (
            <TextField
              label="CASE ID"
              variant="outlined"
              value={propId}
              disabled
              sx={{ minWidth: 300, marginRight: "20px", marginBottom: "5px" }}
            />
          ) : (
            <Autocomplete
              sx={{ minWidth: 300, marginRight: "20px", marginBottom: "5px" }}
              id="case-id-choices"
              freeSolo
              options={caseIdCollection.map((option) => option.id)}
              renderInput={(params) => (
                <TextField {...params} label="Case ID" />
              )}
              onChange={(e: any, val: any) => {
                setEvidence((prev) => ({ ...prev, caseId: val }));
              }}
            />
          )}
          <TextField
            label="Discovery Site Address"
            variant="outlined"
            value={evidence.location}
            onChange={(e) =>
              setEvidence((prev) => ({ ...prev, location: e.target.value }))
            }
            // multiline
            rows={1}
            sx={{ minWidth: 300, marginBottom: "5px" }}
          />
        </div>
        <div>
          <FormControl
            variant="outlined"
            sx={{ minWidth: 300, marginRight: "20px", marginBottom: "5px" }}
          >
            <InputLabel id="evidence-status">Status</InputLabel>
            <Select
              labelId="evidence-status"
              id="evidence-status-id"
              label="Status"
              value={evidence.status}
              onChange={(e) =>
                setEvidence((prev) => ({ ...prev, status: e.target.value }))
              }
            >
              {statusOptions &&
                statusOptions.map((item, index) => {
                  return (
                    <MenuItem key={"status" + index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            sx={{ minWidth: 300, marginBottom: "5px" }}
          >
            <InputLabel id="evidence-type">Type</InputLabel>
            <Select
              labelId="evidence-type"
              id="evidence-type-id"
              label="Type"
              value={evidence.type}
              onChange={(e) =>
                setEvidence((prev) => ({ ...prev, type: e.target.value }))
              }
            >
              {typeOptions &&
                typeOptions.map((item, index) => {
                  return (
                    <MenuItem key={"status" + index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={s.bottomHalf}>
        <div className={s.evidencePhotoUpload}>
          {photo ? (
            <p>
              <TaskAltIcon color="success" /> {photo.name} selected
            </p>
          ) : (
            <p>
              <HighlightOffIcon color="error" /> No Photo Selected
            </p>
          )}
          <Button variant="contained" component="label">
            Upload Evidence Photo
            <input onChange={handlePhotoUpload} type="file" hidden />
          </Button>
        </div>
        <TextField
          label="Description"
          variant="outlined"
          value={evidence.description}
          onChange={(e) =>
            setEvidence((prev) => ({ ...prev, description: e.target.value }))
          }
          sx={{ width: "620px" }}
          multiline
          minRows={4}
        />
      </div>
      <Button variant="outlined" onClick={handleCreateEvidence}>
        Add Evidence
      </Button>
    </div>
  );
};

export default UploadEvidence;
