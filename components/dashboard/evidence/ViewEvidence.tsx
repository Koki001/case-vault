"use client"

import { useEffect } from "react";
import { useEvidenceStore } from "@/store/evidenceSlice";

import s from "./styles.module.css";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Loader from "@/components/loader/Loader";
import Image from "next/image";
import { StyledTableCell, StyledTableRowEvidence } from "@/muiStyles/mui";
import { useRouter, useSearchParams } from "next/navigation";
import EvidenceDetails from "./EvidenceDetails";

interface EvidenceData {
  caseId: string;
  evidenceType: string;
  evidenceStatus: string;
  evidenceDateE: string | null;
  evidenceDateL: string | null;
}

interface Props {
  evidenceFilters: EvidenceData;
}

const ViewEvidence = ({ evidenceFilters }: Props) => {
  const evidence = useEvidenceStore((state) => state.evidence);
  const setEvidence = useEvidenceStore((state) => state.setEvidence);
  const addEvidence = useEvidenceStore((state) => state.addEvidence);
  const update = useEvidenceStore((state) => state.update);
  const setUpdate = useEvidenceStore((state) => state.setUpdate);

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentView = searchParams?.get("view");
  const isEvidenceDetails = searchParams?.get("evidenceId");

  const validateEvidenceData = (evidenceData: EvidenceData): boolean => {
    for (const key in evidenceData) {
      if (Object.prototype.hasOwnProperty.call(evidenceData, key)) {
        if (
          evidenceData[key as keyof EvidenceData] !== null &&
          evidenceData[key as keyof EvidenceData] !== ""
        ) {
          return true; // If even one value is not null or empty string, return true
        }
      }
    }
    return false; // If all values are null or empty strings, return false
  };

  useEffect(() => {
    if (update) {
      if (validateEvidenceData(evidenceFilters)) {
        // FETCH SPECIFIC EVIDENCE
        const fetchSpecificEvidence = async () => {
          const formData = new FormData();
          formData.append("caseId", evidenceFilters.caseId);
          formData.append("evidenceType", evidenceFilters.evidenceType);
          formData.append("evidenceStatus", evidenceFilters.evidenceStatus);
          if (!evidenceFilters.evidenceDateE) {
            formData.append("evidenceEarliest", "");
          } else {
            const dateE = new Date(evidenceFilters.evidenceDateE);
            formData.append("evidenceEarliest", dateE.toISOString());
          }
          if (!evidenceFilters.evidenceDateL) {
            formData.append("evidenceLatest", "");
          } else {
            const dateL = new Date(evidenceFilters.evidenceDateL);
            formData.append("evidenceLatest", dateL.toISOString());
          }

          try {
            const res = await fetch("api/fetchSpecificEvidence", {
              method: "POST",
              body: formData,
            });

            if (res.ok) {
              const data = await res.json();
              setEvidence(data.evidence);

              setUpdate(false);
            } else {
              setUpdate(false);
            }
          } catch (error) {
            console.log(error);
            setUpdate(false);
          }
        };
        fetchSpecificEvidence();
        // --- END OF FETCH SPECIFIC EVIDENCE
      } else {
        const fetchEvidence = async () => {
          try {
            const response = await fetch("/api/fetchEvidence");
            if (response.ok) {
              const data = await response.json();
              setEvidence(data.evidence);
              setUpdate(false);
            } else {
              console.error("Failed to fetch evidence:", response.statusText);
            }
          } catch (error) {
            console.error("Error fetching evidence:", error);
          }
        };

        fetchEvidence();
      }
    }
  }, [evidence, setEvidence, update, setUpdate, evidenceFilters]);

  const handleEvidenceDetails = (evidence: any) => {
    router.push(`?view=${currentView}&evidenceId=${evidence.id}`);
  };
  if (isEvidenceDetails) {
    return <EvidenceDetails />;
  } else {
    return (
      <div className={s.evidenceViewContainer}>
        {evidence.length > 0 && !update ? (
          <div className={s.evidenceTable}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Case ID</StyledTableCell>
                    {/* <StyledTableCell align="right">Description</StyledTableCell> */}
                    <StyledTableCell align="right">
                      Location Found
                    </StyledTableCell>
                    <StyledTableCell align="right">Type</StyledTableCell>
                    <StyledTableCell align="right">Status</StyledTableCell>
                    <StyledTableCell align="right">Photo</StyledTableCell>
                    <StyledTableCell align="right">Date Found</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {evidence.length > 0 &&
                    evidence.map((item, index) => {
                      let imageURL;
                      if (item.photo !== "IMAGE HERE") {
                        imageURL = item.photo;
                      }
                      const addedOnDate = new Date(item.addedOn);
                      const formattedAddedOn = `${addedOnDate.getFullYear()}-${(
                        "0" +
                        (addedOnDate.getMonth() + 1)
                      ).slice(-2)}-${("0" + addedOnDate.getDate()).slice(-2)}`;
                      return (
                        <StyledTableRowEvidence
                          key={index}
                          onClick={() => handleEvidenceDetails(evidence[index])}
                        >
                          <StyledTableCell component="th" scope="row">
                            {item.caseId}
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{
                              maxWidth: "300px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                            align="right"
                          >
                            {item.locationFound}
                          </StyledTableCell>
                          {/* <StyledTableCell align="right">
                            {item.description}
                          </StyledTableCell> */}
                          <StyledTableCell
                            sx={{ minWidth: "130px" }}
                            align="right"
                          >
                            {item.type}
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{ minWidth: "130px" }}
                            align="right"
                          >
                            {item.status}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {imageURL && (
                              <Image
                                src={imageURL}
                                alt="evidence photo"
                                height={50}
                                width={50}
                              />
                            )}
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{ minWidth: "130px" }}
                            align="right"
                          >
                            {formattedAddedOn}
                          </StyledTableCell>
                        </StyledTableRowEvidence>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : update ? (
          <Loader />
        ) : (
          !update &&
          evidence.length === 0 && (
            <div className="noResultsGlobal">{/* <h2>NO RESULTS</h2> */}</div>
          )
        )}
      </div>
    );
  }
};

export default ViewEvidence;
