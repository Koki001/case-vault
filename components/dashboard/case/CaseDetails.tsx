"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/loader/Loader";
import { useCaseStore } from "@/store/caseSlice";

import s from "./styles.module.css";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import Image from "next/image";
import UploadEvidence from "../evidence/UploadEvidence";
import { useEvidenceStore } from "../../../store/evidenceSlice";

interface CaseDetailsState {
  id: string;
  caseNumber: number;
  createdAt: string;
  description: string;
  type: string;
  report: string;
  evidence: any[];
  notes: any[];
  officersInCharge: any[];
  suspects: any[];
  victims: any[];
  witnesses: any[];
}

const CaseDetails = () => {
  const setUpdate = useEvidenceStore((state) => state.setUpdate);
  const setCaseDetails = useCaseStore((state) => state.setCaseDetails);
  const caseDetails = useCaseStore((state) => state.caseDetails);
  const update = useEvidenceStore((state) => state.update);
  const searchParams = useSearchParams();
  const caseIdParams = searchParams.get("id");
  const router = useRouter();

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  // const [caseDetails, setCaseDetails] = useState<CaseDetailsState | null>(null);
  const [viewReport, setViewReport] = useState(false);
  const [fullReport, setFullReport] = useState("");
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  useEffect(() => {
    const handleCaseDetails = async (selectedCase: any) => {
      try {
        const response = await fetch("/api/fetchCaseDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ caseId: selectedCase }),
        });

        if (response.ok) {
          const data = await response.json();
          // setCaseDetails(data.case);
          setCaseDetails(data.case);
          setOpen(false);
          setUpdate(false);
        } else {
          console.error("Failed to fetch case details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching case details:", error);
      }
    };

    if (!caseDetails || caseDetails.id !== caseIdParams || update) {

      handleCaseDetails(caseIdParams);
    }
  }, [caseDetails, caseIdParams, update, setUpdate, setCaseDetails]);

  const handleReadFullReport = async () => {
    if (caseIdParams) {
      setViewReport(true);
      const formData = new FormData();
      formData.append("id", caseIdParams.toString());
      try {
        const response = await fetch("/api/readTxt", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error("Failed to load file");
        }
        const text = await response.json();
        const data = text.fileContents;
        setFullReport(data);
      } catch (error) {
        console.error("Error loading file:", error);
      }
    }
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const styleUpload = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "800px",
    height: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    zIndex: "100",
  };

  if (caseDetails && caseIdParams === caseDetails.id) {
    return (
      <div className={s.caseDetailsContainer}>
        <div className={s.caseDetailsHeading}>
          <Button
            variant="contained"
            color="error"
            onClick={() => router.back()}
          >
            Back
          </Button>
          <h2>{caseDetails.description}</h2>
          <p>Case No: {caseDetails.caseNumber}</p>
        </div>
        <ul>
          <li>Case ID: {caseDetails.id}</li>
          <li>{formatDate(caseDetails.createdAt)}</li>
          <li>{caseDetails.type}</li>
          <li className={s.leadInvestigatorListItem}>
            Lead Investigator(s):{" "}
            {caseDetails.officersInCharge.map((item, index) => {
              return <p key={"officerA" + index}>{item.name}</p>;
            })}{" "}
          </li>
        </ul>
        <Button
          sx={{ marginTop: "10px", paddingLeft: "0" }}
          disabled={fullReport !== ""}
          onClick={handleReadFullReport}
        >
          Read full report
        </Button>
        {viewReport && fullReport && (
          <p className={s.caseDetailsReportParagraph}>{fullReport}</p>
        )}
        <ul className={s.extraInfoUl}>
          {caseDetails.victims.length > 0 && (
            <li className={s.victimsListItem}>
              Victims:{" "}
              <div className={s.victimsInternal}>
                {caseDetails.victims.map((item, index) => {
                  return (
                    <TextField
                      defaultValue={item.name}
                      key={"victimA" + index}
                      id={"victim" + index}
                      placeholder={item.name}
                      variant="standard"
                      sx={{ margin: "10px 20px 20px 0", width: "160px" }}
                      disabled
                    />
                  );
                })}
              </div>
            </li>
          )}
          {caseDetails.suspects.length > 0 && (
            <li className={s.suspectsListItem}>
              Suspects:{" "}
              <div className={s.suspectsInternal}>
                {caseDetails.suspects.map((item, index) => {
                  return (
                    <TextField
                      defaultValue={item.name}
                      key={"suspectA" + index}
                      id={"suspect" + index}
                      placeholder={item.name}
                      variant="standard"
                      sx={{ margin: "10px 20px 20px 0", width: "160px" }}
                      disabled
                    />
                  );
                })}
              </div>
            </li>
          )}
          {caseDetails.witnesses.length > 0 && (
            <li className={s.witnessesListItem}>
              Witnesses:{" "}
              <div className={s.witnessesInternal}>
                {caseDetails.witnesses.map((item, index) => {
                  return (
                    <TextField
                      defaultValue={item.name}
                      key={"witnessA" + index}
                      id={"witness" + index}
                      placeholder={item.name}
                      variant="standard"
                      sx={{ margin: "10px 20px 20px 0", width: "160px" }}
                      disabled
                    />
                  );
                })}
              </div>
            </li>
          )}
        </ul>
        <Button variant="contained" onClick={() => setOpen(true)}>Add Evidence</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleUpload}>
            <UploadEvidence propId={caseDetails.id} />
          </Box>
        </Modal>
        {caseDetails.evidence.length > 0 && (
          <div className={s.evidenceListItem}>
            <h3>Case Evidence Below</h3>
            <div className={s.evidenceInternal}>
              {caseDetails.evidence.map((item, index) => {
                return (
                  <div className={s.evidenceHolder} key={"evidence" + index}>
                    <div className={s.evidenceHolderTop}>
                      <div>
                        <p>Evidence ID: {item.id}</p>
                        <p>Date Added: {formatDate(item.addedOn)}</p>
                      </div>
                      <div>
                        <p>Type: {item.type} </p>
                        <p>Status: {item.status}</p>
                      </div>
                    </div>
                    <div className={s.evidenceHolderImage}>
                      {item.photo && (
                        <Image
                          src={item.photo}
                          alt={item.description}
                          height={400}
                          width={400}
                          onClick={() => setOpenIndex(index)}
                        />
                      )}
                      <div>
                        <p>Found At: {item.locationFound}</p>
                        <p className={s.evidenceHolderDescription}>
                          Description: {item.description}{" "}
                        </p>
                      </div>
                    </div>
                    <Modal
                      open={openIndex === index}
                      onClose={() => setOpenIndex(null)}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Button
                          variant="contained"
                          color="error"
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            zIndex: 100,
                          }}
                          onClick={() => setOpenIndex(null)}
                        >
                          EXIT
                        </Button>
                        {item.photo && (
                          <Image
                            src={item.photo}
                            alt={item.description}
                            layout="fill"
                            objectFit="contain"
                          />
                        )}
                      </Box>
                    </Modal>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return <Loader />;
  }
};
export default CaseDetails;
