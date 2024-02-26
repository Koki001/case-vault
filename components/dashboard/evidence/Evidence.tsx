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
      router.push(`?view=evidence&evidenceOptions=${newView}`);
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
          <ToggleButtonGroup
            color="primary"
            orientation="horizontal"
            value={currentView}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <li>
              <ToggleButton
                disableRipple
                sx={sidebarStyleObj}
                value="uploadEvidence"
              >
                Add Evidence
              </ToggleButton>
            </li>
            <li>
              <ToggleButton
                disableRipple
                sx={sidebarStyleObj}
                value="viewEvidence"
                onClick={() => router.push(`?view=evidence`)}
              >
                View Evidence
              </ToggleButton>
            </li>
          </ToggleButtonGroup>

          {currentView === "viewEvidence" && !isEvidenceDetails && (
            <>
              <p className={s.filtersNotice}>
                Use evidence filters below, or leave empty to retrieve all
                evidence.
              </p>
              <form
                className={s.evidenceSearchForm}
                onSubmit={handleSearchEvidence}
              >
                <TextField
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
                      setEvidenceData({ ...evidenceData, evidenceDateE: null })
                    }
                  >
                    <ClearIcon />
                  </IconButton>
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
                      setEvidenceData({ ...evidenceData, evidenceDateL: null })
                    }
                  >
                    <ClearIcon />
                  </IconButton>
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
