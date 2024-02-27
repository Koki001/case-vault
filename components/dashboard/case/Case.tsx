import { useRouter, useSearchParams } from "next/navigation";
import ViewCases from "./ViewCases";
import CreateCase from "./CreateCase";
import { sidebarStyleObj } from "@/muiStyles/mui";

import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Button,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Select from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import s from "./styles.module.css";
import { Suspense, useState } from "react";
import { DateField } from "@mui/x-date-pickers";
import { useCaseStore } from "@/store/caseSlice";
import CaseDetails from "./CaseDetails";

const Case = () => {
  const [caseData, setCaseData] = useState({
    caseType: "",
    caseNo: "",
    caseId: "",
    caseDateE: null,
    caseDateL: null,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const setUpdate = useCaseStore((state) => state.setUpdate);
  const currentView = searchParams?.get("caseOptions") || "viewCases";
  const isCaseDetails = searchParams?.get("id");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: string
  ) => {
    if (newView !== null) {
      router.push(`?view=case&caseOptions=${newView}`);
    }
  };

  const handleSearchCase = (e: any) => {
    e.preventDefault();
    setUpdate(true);
  };
  return (
    <Suspense>
      <div className={s.caseContainer}>
        <div className={s.caseOptionsNav}>
          {currentView === "viewCases" && !isCaseDetails && (
            <>
              <p className={s.filtersNotice}>
                Use filters below or leave empty to retrieve all records
              </p>
              <form className={s.caseSearchForm} onSubmit={handleSearchCase}>
                <TextField
                  id="caseNum"
                  label="Case No"
                  variant="standard"
                  sx={{ width: 80, marginRight: "20px" }}
                  value={caseData.caseNo}
                  onChange={(e) =>
                    setCaseData({ ...caseData, caseNo: e.target.value })
                  }
                />
                <TextField
                  id="caseId"
                  label="Case ID (Unique - 24 characters)"
                  variant="standard"
                  sx={{ minWidth: 240, marginRight: "20px" }}
                  value={caseData.caseId}
                  onChange={(e) =>
                    setCaseData({
                      ...caseData,
                      caseId: e.target.value.toLowerCase(),
                    })
                  }
                  inputProps={{ maxLength: 24 }}
                />
                <FormControl
                  variant="standard"
                  sx={{ minWidth: 170, marginRight: "20px" }}
                >
                  <InputLabel id="case-type">Type</InputLabel>
                  <Select
                    labelId="case-type"
                    id="case-type-id"
                    label="Type"
                    value={caseData.caseType}
                    onChange={(e) =>
                      setCaseData({ ...caseData, caseType: e.target.value })
                    }
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Public Order Offence"}>
                      Public Order
                    </MenuItem>
                    <MenuItem value={"Traffic Offence"}>Traffic</MenuItem>
                    <MenuItem value={"Domestic Incident"}>
                      Domestic Incidents
                    </MenuItem>
                    <MenuItem value={"Property Crime"}>Property</MenuItem>
                    <MenuItem value={"Drug Offence"}>Drug Related</MenuItem>
                    <MenuItem value={"Violent Crime"}>Violent Crimes</MenuItem>
                    <MenuItem value={"Environmental Crime"}>
                      Environmental
                    </MenuItem>
                    <MenuItem value={"Financial Crime"}>Financial</MenuItem>
                    <MenuItem value={"Cybercrime"}>Cybercrimes</MenuItem>
                    <MenuItem value={"Special Victim"}>
                      Special Victims
                    </MenuItem>
                    <MenuItem value={"Terrorism"}>Terrorism</MenuItem>
                  </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                    sx={{ width: 130 }}
                    variant="standard"
                    label="Earliest Date"
                    value={caseData.caseDateE}
                    onChange={(e: any) =>
                      setCaseData({ ...caseData, caseDateE: e })
                    }
                  />
                  <IconButton
                    sx={{ marginRight: "20px" }}
                    onClick={(e: any) =>
                      setCaseData({ ...caseData, caseDateE: null })
                    }
                  >
                    <ClearIcon />
                  </IconButton>
                  <DateField
                    sx={{ width: 130 }}
                    variant="standard"
                    label="Before Date"
                    value={caseData.caseDateL}
                    onChange={(e: any) =>
                      setCaseData({ ...caseData, caseDateL: e })
                    }
                  />
                  <IconButton
                    sx={{ marginRight: "20px" }}
                    onClick={(e: any) =>
                      setCaseData({ ...caseData, caseDateL: null })
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
        {currentView === "createCase" && <CreateCase />}
        {currentView === "viewCases" && <ViewCases caseFilters={caseData} />}
      </div>
    </Suspense>
  );
};

export default Case;
