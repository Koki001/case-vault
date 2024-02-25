// Import necessary dependencies
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/loader/Loader";
import { useEvidenceStore } from "@/store/evidenceSlice"; // Assuming you have an evidence store
import s from "./styles.module.css";
import { Button } from "@mui/material";
import Image from "next/image";

// Define the interface for the evidence details state

interface CaseDescription {
  description: string;
}

interface EvidenceDetailsState {
  id: string;
  caseId: string;
  case: CaseDescription;
  addedOn: string;
  description: string;
  caseTitle: string;
  locationFound: string;
  status: string;
  type: string;
  photo?: string; // Optional property for photo
}

// Define the EvidenceDetails component
const EvidenceDetails = () => {
  // Get necessary data from the store and search params
  const setUpdate = useEvidenceStore((state) => state.setUpdate);
  const update = useEvidenceStore((state) => state.update);
  const searchParams = useSearchParams();
  const evidenceIdParams = searchParams?.get("evidenceId");
  const router = useRouter();

  // State to hold evidence details
  const [evidenceDetails, setEvidenceDetails] =
    useState<EvidenceDetailsState | null>(null);

  // Function to format date
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

  // Effect to fetch evidence details
  useEffect(() => {
    const handleEvidenceDetails = async (selectedEvidence: any) => {
      try {
        const response = await fetch("/api/fetchEvidenceDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ evidenceId: selectedEvidence }),
        });

        if (response.ok) {
          const data = await response.json();
          setEvidenceDetails(data.evidence);
          setUpdate(false);
        } else {
          console.error(
            "Failed to fetch evidence details:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching evidence details:", error);
      }
    };

    if (!evidenceDetails) {
      setUpdate(true);
      handleEvidenceDetails(evidenceIdParams);
    }
  }, [evidenceDetails, evidenceIdParams, setUpdate]);

  // Render the component
  return (
    <div className={s.evidenceDetailsContainer}>
      <Button variant="contained" color="error" onClick={() => router.back()}>
        Back
      </Button>
      {evidenceDetails ? (
        <ul>
          <li>Evidence ID: {evidenceDetails.id}</li>
          <li>
            Case Name - ID: {evidenceDetails.case.description} -{" "}
            {evidenceDetails.caseId}
          </li>
          <li>Added On: {formatDate(evidenceDetails.addedOn)}</li>
          <li>Description: {evidenceDetails.description}</li>
          <li>Location Found: {evidenceDetails.locationFound}</li>
          <li>Status: {evidenceDetails.status}</li>
          <li>Type: {evidenceDetails.type}</li>
          {evidenceDetails.photo && (
            <Image
              src={evidenceDetails.photo}
              alt="evidence"
              width={500}
              height={500}
              style={{margin: "auto"}}
            />
          )}
        </ul>
      ) : (
        update && <Loader />
      )}
    </div>
  );
};

// Export the component
export default EvidenceDetails;
