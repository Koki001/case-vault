import { useRouter, useSearchParams } from "next/navigation";
import s from "./styles.module.css";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ViewEvidence from "./ViewEvidence";
import UploadEvidence from "./UploadEvidence";
import { sidebarStyleObj } from "@/muiStyles/mui";
import {
  ClearIcon,
  DateField,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Suspense, useState } from "react";
import { useEvidenceStore } from "@/store/evidenceSlice";

const Evidence = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentView = searchParams?.get("evidenceOptions") || "viewEvidence";
  const isEvidenceDetails = searchParams?.get("evidenceId");

  const setUpdate = useEvidenceStore((state) => state.setUpdate);

  const [evidenceData, setEvidenceData] = useState({
    caseId: "",
    evidenceType: "",
    evidenceStatus: "",
    evidenceDateE: null,
    evidenceDateL: null,
  });

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: string
  ) => {
    if (newView !== null) {
      router.push(`/dashboard?view=evidence&evidenceOptions=${newView}`);
    }
  };

  const handleSearchEvidence = (e: any) => {
    e.preventDefault();
    setUpdate(true);
  };
  return (
    <Suspense>
      <div className={s.evidenceContainer}>
        <div className={s.evidenceOptionsNav}>
          {currentView === "viewEvidence" ? (
            <h2>Evidence Lookup</h2>
          ) : (
            currentView === "uploadEvidence" && <h2>Add Evidence</h2>
          )}

          {currentView === "viewEvidence" && !isEvidenceDetails && (
            <>
              <p className={s.filtersNotice}>
                Use filters below, or leave empty to retrieve all records
              </p>
              <form
                className={`${s.evidenceSearchForm} wrapper`}
                onSubmit={handleSearchEvidence}
              >
                <TextField
                  className={s.evidenceFormId}
                  id="caseId"
                  label="Case ID (Unique - 24 characters)"
                  variant="standard"
                  sx={{ minWidth: 240, marginRight: "20px" }}
                  value={evidenceData.caseId}
                  onChange={(e) =>
                    setEvidenceData({
                      ...evidenceData,
                      caseId: e.target.value.toLowerCase(),
                    })
                  }
                  inputProps={{ maxLength: 24 }}
                />
                <FormControl
                  className={s.evidenceFormType}
                  variant="standard"
                  sx={{ minWidth: 170, marginRight: "20px" }}
                >
                  <InputLabel id="evidence-type">Type</InputLabel>
                  <Select
                    labelId="evidence-type"
                    id="evidence-type-id"
                    label="Type"
                    value={evidenceData.evidenceType}
                    onChange={(e) =>
                      setEvidenceData({
                        ...evidenceData,
                        evidenceType: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Physical"}>Physical</MenuItem>
                    <MenuItem value={"Digital"}>Digital</MenuItem>
                    <MenuItem value={"Forensic"}>Forensic</MenuItem>
                    <MenuItem value={"Testimonial"}>Testimonial</MenuItem>
                    <MenuItem value={"Surveillance"}>Surveillance</MenuItem>
                    <MenuItem value={"Financial"}>Financial</MenuItem>
                    <MenuItem value={"Biological"}>Biological</MenuItem>
                    <MenuItem value={"Audio"}>Audio</MenuItem>
                    <MenuItem value={"Video"}>Video</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className={s.evidenceFormE}>
                    <DateField
                      sx={{ width: 130 }}
                      variant="standard"
                      label="Earliest Date"
                      value={evidenceData.evidenceDateE}
                      onChange={(e: any) =>
                        setEvidenceData({ ...evidenceData, evidenceDateE: e })
                      }
                    />
                    <IconButton
                      sx={{ marginRight: "20px" }}
                      onClick={(e: any) =>
                        setEvidenceData({
                          ...evidenceData,
                          evidenceDateE: null,
                        })
                      }
                    >
                      <ClearIcon />
                    </IconButton>
                  </div>
                  <div className={s.evidenceFormB}>
                    <DateField
                      sx={{ width: 130 }}
                      variant="standard"
                      label="Before Date"
                      value={evidenceData.evidenceDateL}
                      onChange={(e: any) =>
                        setEvidenceData({ ...evidenceData, evidenceDateL: e })
                      }
                    />
                    <IconButton
                      sx={{ marginRight: "20px" }}
                      onClick={(e: any) =>
                        setEvidenceData({
                          ...evidenceData,
                          evidenceDateL: null,
                        })
                      }
                    >
                      <ClearIcon />
                    </IconButton>
                  </div>
                </LocalizationProvider>
                <Button type="submit" variant="contained">
                  Search
                </Button>
              </form>
            </>
          )}
        </div>
        {currentView === "viewEvidence" && (
          <ViewEvidence evidenceFilters={evidenceData} />
        )}
        {currentView === "uploadEvidence" && <UploadEvidence />}
      </div>
    </Suspense>
  );
};

export default Evidence;
