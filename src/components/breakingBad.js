import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";

import CharacterList from "./characterList";
import Searchbar from "./searchbar";

const useStyles = makeStyles({
  root: { width: "100vw", height: "100vh", backgroundColor: "#cfd3ce" },
  topbar: { marginLeft: "20%", position: "relative", top: "12px" },
  table: { marginLeft: "20%", marginTop: "24px" },
});
export default function BreakingBad() {
  const classes = useStyles();

  const [search, setSearch] = useState({ name: null, category: null });

  return (
    <>
      <div className={classes.root}>
        <div className={classes.topbar}>
          <Searchbar setSearch={setSearch} />
        </div>

        <div className={classes.table}>
          <CharacterList search={search} />
        </div>
      </div>
    </>
  );
}
