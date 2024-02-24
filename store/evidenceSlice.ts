import { create } from "zustand";

interface Evidence {
  id: string;
  caseId: string;
  addedOn: string;
  custodyEntries: CustodyEntry[];
  description: string;
  locationFound: string;
  status: string;
  analysis?: string;
  type: string;
  photo?: string;
}

interface CustodyEntry {
  id: string;
  custodyId: string;
  evidenceId: string;
  accessedOn: string;
  returnedOn: string;
}

interface EvidenceState {
  update: boolean;
  evidence: Evidence[];
  addEvidence: (evidence: Evidence) => void;
  setEvidence: (evidence: Evidence[]) => void;
  setUpdate: (value: boolean) => void;
}

export const useEvidenceStore = create<EvidenceState>((set) => ({
  update: false,
  evidence: [],
  addEvidence: (newEvidence) =>
    set((state) => ({ evidence: [...state.evidence, newEvidence] })),
  setEvidence: (newEvidence) => set({ evidence: newEvidence }),
  setUpdate: (value) => set({ update: value }),
}));
