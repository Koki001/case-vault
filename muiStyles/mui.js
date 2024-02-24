import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { tableCellClasses } from "@mui/material/TableCell";

export const sidebarStyleObj = {
  "&.MuiButtonBase-root": {
    color: "black",
    border: "1px solid black",
    borderRadius: "2px",
  },
  "&:hover": {
    color: "white",
    backgroundColor: "#0288d1",
  },
  "&:active": {
    color: "white",
    backgroundColor: "#0277bd",
  },
  "&.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#0277bd",
  },
  "&.Mui-selected": {
    color: "white",
    backgroundColor: "#01579b",
  },
};
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
export const StyledTableCellSecondary = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#bdbdbd",
    color: "black",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export const StyledTableRowEvidence = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#e3f2fd",
  },
}));
