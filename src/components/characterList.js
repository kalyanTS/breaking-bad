import React, { useState, useEffect } from "react";
import {
  makeStyles,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import CharacterDetails from "./characterDetails";

const useStyles = makeStyles({
  root: {
    width: "75%",
    backgroundColor: "white",
    padding: "10px",
  },
  tableContainer: {
    width: "100%",
  },
  paginationContainer: {
    width: "100%",
    display: "flex",
    marginTop: "20px",
    paddingBottom: "20px",
  },
  dialogPaper: {
    width: "80%",
    height: "500px",
  },
  pagination: { margin: "auto" },
});

const columnHeadingList = ["Name", "Occupation", "Date of Birth", "Status"];
const pageSize = 10;

export default function CharacterList({ search }) {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [openIndex, setOpenIndex] = useState(-1);

  useEffect(() => {
    axios.get("https://www.breakingbadapi.com/api/characters").then((res) => {
      console.log(res.data);
      let refactored = res.data.map((u) => ({
        ...u,
        occupation: getString(u.occupation),
        appearance: getString(u.appearance),
      }));

      console.log(search);

      if (search && search.name) {
        refactored = refactored.filter(
          (u) => u.name.toLowerCase().search(search.name.toLowerCase()) !== -1
        );
      }

      if (search && search.category) {
        refactored = refactored.filter((u) => u.category === search.category);
      }

      setList(refactored);
    });
  }, [search]);

  const getString = (occupationList) => {
    let output = "";
    if (occupationList) {
      for (let i = 0; i < occupationList.length; i++) {
        output += occupationList[i];
        if (i != occupationList.length - 1) output += ", ";
      }
    }
    return output;
  };

  return list.length === 0 ? (
    search.name || search.category ? (
      <div className={classes.root}>
        <Typography>No results found</Typography>
      </div>
    ) : null
  ) : (
    <>
      <Dialog open={openIndex !== -1} classes={{ paper: classes.dialogPaper }}>
        <CharacterDetails data={list[openIndex]} setOpenIndex={setOpenIndex} />
      </Dialog>
      <div className={classes.root}>
        <TableContainer className={classes.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                {columnHeadingList.map((u, i) => (
                  <>
                    <TableCell key={i}>
                      <Typography key={i}>{u}</Typography>
                    </TableCell>
                  </>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list
                .slice((pageNo - 1) * pageSize, pageNo * pageSize)
                .map((u, i) => (
                  <>
                    <TableRow
                      key={i}
                      style={{ cursor: "pointer" }}
                      onClick={() => setOpenIndex(i)}
                    >
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.occupation}</TableCell>
                      <TableCell>{u.birthday}</TableCell>
                      <TableCell>{u.status}</TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.paginationContainer}>
          <Pagination
            count={
              list.length % pageSize === 0
                ? Math.floor(list.length / pageSize)
                : Math.floor(list.length / pageSize) + 1
            }
            variant="outlined"
            color="primary"
            page={pageNo}
            className={classes.pagination}
            onChange={(e, value) => setPageNo(value)}
          />
        </div>
      </div>
    </>
  );
}
