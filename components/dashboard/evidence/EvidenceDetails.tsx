"use client";

// Import necessary dependencies
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
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
    <Suspense>
      <div className={`${s.evidenceDetailsContainer} wrapper`}>
        <Button variant="contained" color="error" onClick={() => router.back()}>
          Back
        </Button>
        <div className={s.evidenceDetailsHolder}>
          {evidenceDetails ? (
            <div className={s.evidenceHolder}>
              <div className={s.evidenceHolderTop}>
                <div>
                  <p>Evidence ID: {evidenceDetails.id}</p>
                  <p>Date Added: {formatDate(evidenceDetails.addedOn)}</p>
                </div>
                <div>
                  <p>Type: {evidenceDetails.type} </p>
                  <p>Status: {evidenceDetails.status}</p>
                </div>
              </div>
              <div className={s.evidenceHolderImage}>
                {evidenceDetails.photo && (
                  <Image
                    src={evidenceDetails.photo}
                    alt={evidenceDetails.description}
                    height={600}
                    width={700}
                  />
                )}
                <div>
                  <p>Found At: {evidenceDetails.locationFound}</p>
                  <p className={s.evidenceHolderDescription}>
                    {evidenceDetails.description}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            update && <Loader />
          )}
        </div>
      </div>
    </Suspense>
  );
};

// Export the component
export default EvidenceDetails;
