import { Suspense, useState } from "react";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import Collapse from "@mui/material/Collapse";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

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
    row.officersInCharge.length
    // row.evidence.length
  );

  const handleCaseDetails = async (selectedCase: any) => {
    router.push(`/dashboard?view=${currentView}&id=${selectedCase.id}`);
  };

  return (
    <Suspense>
      <>
        <StyledTableRow
          sx={{ "& > *": { borderBottom: "unset" } }}
          onClick={() => setOpen(!open)}
          className={
            open ? `${s.styledRow} ${s.styledRowOpen}` : `${s.styledRow}`
          }
        >
          <StyledTableCell
            onClick={(e) => e.stopPropagation()}
            sx={{ width: "60px" }}
          >
            <IconButton
              onClick={() => handleCaseDetails(cases[caseIndex])}
              aria-label="edit case"
              size="small"
            >
              {<ModeEditIcon />}
            </IconButton>
          </StyledTableCell>
          <StyledTableCell
            align="center"
            sx={{ fontWeight: "bold", width: "100px" }}
          >
            {row.caseNumber}
          </StyledTableCell>
          <StyledTableCell
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100px",
            }}
          >
            {row.id}
          </StyledTableCell>
          <StyledTableCell
          align="right"
            sx={{ maxWidth: "100px" }}
            component="th"
            scope="row"
          >
            {row.type}
          </StyledTableCell>
          <StyledTableCell align="right"></StyledTableCell>
          <StyledTableCell align="right">{row.status}</StyledTableCell>
          <StyledTableCell
            sx={{
              fontWeight: "bold",
            }}
            align="right"
            component="th"
            scope="row"
          >
            {row.description}
          </StyledTableCell>
          <StyledTableCell align="right">
            {formatDate(row.createdAt)}
          </StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell
            sx={{
              paddingBottom: 0,
              paddingTop: 0,
            }}
            colSpan={8}
          >
            <Collapse
              sx={{
                borderTop: "none",
                borderRadius: "3px",
                marginBottom: "10px",
              }}
              in={open}
              timeout="auto"
              unmountOnExit
            >
              <Box
                sx={{
                  margin: "10px 0",
                  zIndex: 10,
                  width: "100%",
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "center",
                  alignIems: "stretch",
                  border: "1px solid #8bc34a",
                }}
              >
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => handleCaseDetails(cases[caseIndex])}
                  sx={{
                    width: "120px",
                    fontWeight: "bolder",
                    margin: "0",
                    border: "none",
                    backgroundColor: "#dcedc8",
                  }}
                >
                  VIEW AND EDIT CASE
                </Button>
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
    </Suspense>
  );
};
export default Row;
