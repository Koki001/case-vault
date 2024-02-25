import { useState } from "react";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import Collapse from "@mui/material/Collapse";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import {
  StyledTableCell,
  StyledTableCellSecondary,
  StyledTableRow,
} from "@/muiStyles/mui";

import s from "./styles.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const Row = ({ row, formatDate, cases, caseIndex }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentView = searchParams?.get("view");
  const isCaseDetails = searchParams?.get("id");

  const [open, setOpen] = useState(false);
  const maxLength = Math.max(
    row.victims.length,
    row.suspects.length,
    row.witnesses.length,
    row.officersInCharge.length,
    // row.evidence.length
  );

  const handleCaseDetails = async (selectedCase: any) => {
    router.push(`?view=${currentView}&id=${selectedCase.id}`);
  };

  return (
    <>
      <StyledTableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        onClick={() => setOpen(!open)}
        className={
          open ? `${s.styledRow} ${s.styledRowOpen}` : `${s.styledRow}`
        }
      >
        <StyledTableCell>
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell sx={{ fontWeight: "bold" }} component="th" scope="row">
          {row.caseNumber}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {row.id}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {row.type}
        </StyledTableCell>
        <StyledTableCell align="right"></StyledTableCell>
        <StyledTableCell align="right">{row.status}</StyledTableCell>
        <StyledTableCell sx={{ fontWeight: "bold" }} align="right">
          {row.description}
        </StyledTableCell>
        <StyledTableCell align="right">
          {formatDate(row.createdAt)}
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
          }}
          colSpan={8}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Button
              variant="contained"
              onClick={() => handleCaseDetails(cases[caseIndex])}
              sx={{ width: "100%", marginTop: "15px" }}
            >
              VIEW AND EDIT CASE DETAILS HERE
            </Button>
            <Box
              sx={{
                margin: "30px 0",
                border: "2px solid black",
                zIndex: 10,
                width: "100%",
              }}
            >
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCellSecondary
                      sx={{ fontWeight: "bold" }}
                      align="center"
                    >
                      Victims
                    </StyledTableCellSecondary>
                    <StyledTableCellSecondary
                      sx={{ fontWeight: "bold" }}
                      align="center"
                    >
                      Suspects
                    </StyledTableCellSecondary>
                    <StyledTableCellSecondary
                      sx={{ fontWeight: "bold" }}
                      align="center"
                    >
                      Witnesses
                    </StyledTableCellSecondary>
                    <StyledTableCellSecondary
                      sx={{ fontWeight: "bold" }}
                      align="center"
                    >
                      Officer In Charge
                    </StyledTableCellSecondary>
                    {/* <StyledTableCellSecondary align="center">
                      Evidence
                    </StyledTableCellSecondary> */}
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {[...Array(maxLength)].map((_, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        {row.victims[index]?.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.suspects[index]?.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.witnesses[index]?.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.officersInCharge[index]?.name}
                      </StyledTableCell>
                      {/* <StyledTableCell align="center">
                        {row.evidence[index]?.type}
                      </StyledTableCell> */}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};
export default Row;
