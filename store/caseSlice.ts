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

interface Suspect {
  id: string;
  name: string;
  age?: string;
  caseId: string;
}

interface Victim {
  id: string;
  name: string;
  caseId: string;
}

interface Witness {
  id: string;
  name: string;
  caseId: string;
}

interface Officer {
  id: string;
  name: string;
  badge: string;
  caseId: string;
}

interface Case {
  id: string;
  createdAt: string;
  caseNumber: number;
  type: string;
  description: string;
  report?: string;
  evidence: Evidence[];
  suspects: Suspect[];
  victims: Victim[];
  witnesses: Witness[];
  officersInCharge: Officer[];
}

interface CaseState {
  update: boolean;
  cases: Case[];
  caseDetails: Case | null; // Update the type to allow null
  addCase: (newCase: Case) => void;
  setCases: (cases: Case[]) => void;
  setUpdate: (value: boolean) => void;
  setCaseDetails: (caseDetails: Case | null) => void; // Update the parameter type
}

export const useCaseStore = create<CaseState>((set) => ({
  update: false,
  cases: [],
  caseDetails: null, // Initialize caseDetails as null
  addCase: (newCase) => set((state) => ({ cases: [...state.cases, newCase] })),
  setCases: (cases) => set({ cases }),
  setCaseDetails: (caseDetails) => set({ caseDetails }),
  setUpdate: (value) => set({ update: value }),
}));
