"use client";

import { Button, Paper } from "@mui/material";
import Link from "next/link";

import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import s from "./page.module.css";
import { useState } from "react";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const Home = () => {
  return (
    <main className={`${s.mainContainerTag} wrapper`}>
      <h1>Case Vault</h1>
      <Link href={"/login"}>
        <Button sx={{ borderBottom: "1px solid", borderRadius: 0 }}>
          Get started
        </Button>
      </Link>
      <Paper className={s.mainWelcome} elevation={8}>
        <p>
          Thanks for visiting! Read the notes below to find out more about the
          project&apos;s main focus, its current features, and future goals. At
          any time, feel free to pres the &apos;get started&apos; button to
          enter the site!
        </p>
        <p>
          You can get back to this page by clicking on the police logo in the
          top left corner of the page or follow the Landing Page link found in
          the &apos;support&apos; tab of the navigation bar.
        </p>

        <p>
          Below you will find a list of completed and planned features. At any
          time, feel free to go to the login screen and explore the site!
        </p>
      </Paper>
      <Paper className={s.behindTheProject} elevation={8}>
        <h2>Behind Case Vault</h2>
        <p>
          The idea behind this project was to create a secure and practical
          space where users can manage all sorts of criminal cases and evidence
          associated with them.
        </p>
        <p>
          It was orignally meant to only be an evidence manager, but I wanted to
          create a more robust application as time went on and kept adding more
          features. Currently, the core functionality of the evidence and case
          management is complete, although there are still more features
          I&apos;d like to implement.
        </p>
      </Paper>
      <Paper className={s.currentFeatures} elevation={8}>
        <h2>Current Features</h2>
        <Accordion sx={{ backgroundColor: "transparent" }}>
          <AccordionSummary aria-controls="panel0d-content" id="panel0d-header">
            <Typography>Authentication</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <span>*</span> Registering is currently disabled as it made more
              sense that the users would be provided with login information by
              their organization and would not need to go through the account
              creation process.
              <br />
              <br />
              <span>Authentication Process</span> - NextAuth&apos;s custom
              credentials provider hashes and compares the user&apos;s password
              with the one stored in the database, ensuring access is restricted
              for users without login information.
              <br />
              <br />
              <span>Middleware and Authorization</span> - The middleware is set
              up so that it runs authorization checks every time any route
              associated with the project is loaded, and every time it is
              focused again (if the user opens another tab on their browser and
              returns to the app). These checks run on both client and server
              side routes.
              <br />
              <br />
              <span>Session Management</span> - User session and authentication
              tokens are securely stored and managed through NextAuth. This
              prevents vulnerabilities like session fixation and session
              hijacking.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: "transparent" }}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Overview</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The overview tab currently holds static information. This is where
              the user can easily view their daily tasks, calendar, and access
              relevant crime statistics for their jurisdiction.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: "transparent" }}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Cases</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <span>Create Case</span> - Selecting &apos;Add&apos; from the
              Cases tab allows users to create a new case and add it to the
              MongoDB database. The case report can either be typed or a file
              can be uploaded. Only .txt, .doc, and .docx file extensions are
              allowed. If the case is typed, a txt file is created and all files
              get uploaded using Amazon&apos;s S3 storage.
              <br /> <br />
              <span>View Cases</span> - Selecting &apos;View&apos; allows users
              to view any case from the database. There are several optional
              filters that can be used like case number, ID, type of case, and a
              date range. The displayed cases highlight important information
              and can be clicked to view further details about the case.
              <br /> <br />
              <span>Case Details</span> - Opening an individual case shows a
              more detailed view of it and allows the user to read the report,
              view victims, suspects, witnesses, and the ability to see and add
              new evidence associated with that case.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: "transparent" }}>
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>Evidence</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <span>Upload Evidence</span> - Similar to cases, selecting
              &apos;Add&apos; within the Evidence tab allows the user to add
              evidence to an already existing case. The case IDs are
              pre-populated with a list of all open cases for ease of use.
              Images are stored in Amazon&apos;s S3 cloud storage.
              <br /> <br />
              <span>View Evidence</span> - Selecting &apos;View&apos; brings the
              user to a page where all evidence can be interacted with. There
              are several filters in place to narrow down your search, or the
              filters can be left empty to fetch all pieces of evidence in the
              database.
              <br /> <br />
              <span>Evidence Details</span> - Clicking on any piece of evidence
              takes the user to a more detailed eview with a larger image.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: "transparent" }}>
          <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
            <Typography>Storage</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Not implemented - see Future Plans for more info.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: "transparent" }}>
          <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
            <Typography>Tracking</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Not implemented - see Future Plans for more info.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: "transparent" }}>
          <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
            <Typography>Support</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Not implemented - see Future Plans for more info.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
      <Paper className={s.futurePlans} elevation={8}>
        <h2>Future Plans</h2>
        <p>future plans here</p>
      </Paper>
      <Paper className={s.notice} elevation={8}>
        <h2>* Notice</h2>
        <p>
          The tables used to view cases and evidence are not responsive on
          smaller screen sizes and I am in the process of replacing them.
        </p>
      </Paper>
      <Button
        variant="outlined"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        sx={{ marginTop: "100px" }}
      >
        Scroll To Top
      </Button>
    </main>
  );
};

export default Home;
