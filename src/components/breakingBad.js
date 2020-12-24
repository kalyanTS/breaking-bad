import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";

import CharacterList from "./characterList";
import Searchbar from "./searchbar";

const useStyles = makeStyles({
  root: { width: "100vw", height: "100vh", backgroundColor: "#cfd3ce" },
});
export default function BreakingBad() {
  const classes = useStyles();

  const [search, setSearch] = useState({ name: null, category: null });

  return (
    <>
      <div className={classes.root}>
        <div style={{ marginLeft: "20%", position: "relative", top: "12px" }}>
          <Searchbar setSearch={setSearch} />
        </div>

        <div style={{ marginLeft: "20%", marginTop: "24px" }}>
          <CharacterList search={search} />
        </div>
      </div>
    </>
  );
}
