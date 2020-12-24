import React, { useState, useEffect } from "react";
import {
  makeStyles,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    width: "75%",
    backgroundColor: "white",
    padding: "10px",
    height: "48px",
  },
  textField: {
    marginTop: "5px",
  },
  button: {
    marginTop: "5px",
    opacity: "0.9",
  },
  dropdown: {
    width: "180px",
    marginTop: "5px",
  },
});
export default function Searchbar({ setSearch }) {
  const classes = useStyles();
  const [filterOpen, setFilterOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    axios.get("https://www.breakingbadapi.com/api/characters").then((res) => {
      let temp = [];
      res.data.forEach((u) => {
        if (temp.indexOf(u.category) === -1) temp.push(u.category);
      });
      setCategoryList(temp);
    });
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Character name"
              className={classes.textField}
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                endAdornment: name ? (
                  <CloseIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setName("");
                      setSearch((e) => ({ ...e, name: null }));
                    }}
                  />
                ) : null,
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                setSearch((e) => ({ ...e, name: name }));
              }}
            >
              Search
            </Button>
          </Grid>
          <Grid item style={{ marginLeft: "40px" }}>
            <Button
              variant="outlined"
              style={{ marginTop: "5px" }}
              onClick={() => {
                if (filterOpen) setCategory("");
                setFilterOpen(!filterOpen);
              }}
            >
              <FilterListIcon /> Filter{" "}
              {category ? (
                <CloseIcon
                  style={{ marginLeft: "4px" }}
                  onClick={() => setSearch((e) => ({ ...e, category: null }))}
                />
              ) : null}
            </Button>
          </Grid>
          {filterOpen ? (
            <Grid item>
              <FormControl
                variant="outlined"
                size="small"
                className={classes.dropdown}
              >
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);

                    setSearch((u) => ({ ...u, category: e.target.value }));
                  }}
                >
                  {categoryList.map((u, j) => (
                    <MenuItem key={j} value={u}>
                      {u}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ) : null}
        </Grid>
      </div>
    </>
  );
}
