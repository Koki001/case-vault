export const publicRoutes = ["/"];

// routes used for authentication
// these will redirect logged in users to /dashboard
export const authRoutes = ["/login", "/register"];

// the prefix for API authentication routes
// used for API authentication purposes
export const apiAuthPrefix = "/api/auth";

export const apiRoutes = [
  "/api/register",
  "/api/getUser",
  "/api/getUserBadge",
  "/api/fetchEvidence",
  "/api/fetchEvidenceDetails",
  "/api/fetchSpecificEvidence",
  "/api/addEvidence",
  "/api/createCase",
  "/api/fetchCases",
  "/api/fetchCaseIds",
  "/api/fetchCaseDetails",
  "/api/fetchSpecificCases",
  "/api/uploadFiles",
  "/api/uploadReport",
];

// default redirect path after logging in / already logged in
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
