"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Loader from "@/components/loader/Loader";
import { useCaseStore } from "@/store/caseSlice";

import Row from "./Row";

import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import { StyledTableCell, StyledTableRow } from "@/muiStyles/mui";

import s from "./styles.module.css";
import { useSearchParams } from "next/navigation";
import CaseDetails from "./CaseDetails";

interface CaseData {
  caseType: string;
  caseNo: string;
  caseId: string;
  caseDateE: string | null;
  caseDateL: string | null;
}

interface Props {
  caseFilters: CaseData;
}

const ViewCases = ({ caseFilters }: Props) => {
  const cases = useCaseStore((state) => state.cases);
  const update = useCaseStore((state) => state.update);
  const setCases = useCaseStore((state) => state.setCases);
  const setUpdate = useCaseStore((state) => state.setUpdate);

  const searchParams = useSearchParams();
  const isCaseDetails = searchParams?.get("id");

  const validateCaseData = (caseData: CaseData): boolean => {
    for (const key in caseData) {
      if (Object.prototype.hasOwnProperty.call(caseData, key)) {
        if (
          caseData[key as keyof CaseData] !== null &&
          caseData[key as keyof CaseData] !== ""
        ) {
          return true; // If even one value is not null or empty string, return true
        }
      }
    }
    return false; // If all values are null or empty strings, return false
  };

  useEffect(() => {
    if (update) {
      if (validateCaseData(caseFilters)) {
        // FETCH FILTERED CASES
        const fetchSpecificCases = async () => {
          const formData = new FormData();
          formData.append("caseNo", caseFilters.caseNo);
          formData.append("caseId", caseFilters.caseId);
          formData.append("caseType", caseFilters.caseType);
          if (!caseFilters.caseDateE) {
            formData.append("caseEarliest", "");
          } else {
            const dateE = new Date(caseFilters.caseDateE);
            formData.append("caseEarliest", dateE.toISOString());
          }
          if (!caseFilters.caseDateL) {
            formData.append("caseLatest", "");
          } else {
            const dateL = new Date(caseFilters.caseDateL);
            formData.append("caseLatest", dateL.toISOString());
          }

          try {
            const res = await fetch("api/fetchSpecificCases", {
              method: "POST",
              body: formData,
            });

            if (res.ok) {
              const data = await res.json();
              setCases(data.populatedCases);

              setUpdate(false);
            } else {
              setUpdate(false);
            }
          } catch (error) {
            console.log(error);
            setUpdate(false);
          }
        };
        fetchSpecificCases();
        // --- END FETCH SPECIFIC CASES
      } else {
        // FETCH ALL CASES
        const fetchCases = async () => {
          try {
            const response = await fetch("/api/fetchCases");
            if (response.ok) {
              const data = await response.json();
              setCases(data.cases);

              setUpdate(false);
            } else {
              console.error("Failed to fetch Cases:", response.statusText);
            }
          } catch (error) {
            console.error("Error fetching Cases:", error);
          }
        };
        fetchCases();
        // --- END FETCH ALL CASES
      }
    }
  }, [cases, setCases, update, setUpdate, caseFilters]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  if (isCaseDetails) {
    return (
      <Suspense>
        <CaseDetails />
      </Suspense>
    );
  } else {
    return (
      <Suspense>
        <div className={`${s.viewCasesContainer} wrapper`}>
          {cases.length > 0 && !update ? (
            <div className={s.casesTable}>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell sx={{ minWidth: "50px" }} />
                      <StyledTableCell sx={{ minWidth: "90px" }}>
                        Case No
                      </StyledTableCell>
                      <StyledTableCell sx={{ minWidth: "100px" }}>
                        Case Unique ID
                      </StyledTableCell>
                      <StyledTableCell sx={{ minWidth: "150px" }}>
                        Case Type
                      </StyledTableCell>
                      <StyledTableCell />
                      <StyledTableCell align="right" sx={{ minWidth: "80px" }}>
                        Status
                      </StyledTableCell>
                      <StyledTableCell align="right" sx={{ minWidth: "200px" }}>
                        Title / Description
                      </StyledTableCell>
                      <StyledTableCell align="right" sx={{ minWidth: "120px" }}>
                        Created At
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {cases.map((item, index) => (
                      <Row
                        key={index}
                        row={item}
                        formatDate={formatDate}
                        cases={cases}
                        caseIndex={index}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : update ? (
            <Loader message={"Fetching Cases"} />
          ) : (
            !update &&
            cases.length === 0 && (
              <div className="noResultsGlobal">{/* <h2>NO RESULTS</h2> */}</div>
            )
          )}
        </div>
      </Suspense>
    );
  }
};

export default ViewCases;
