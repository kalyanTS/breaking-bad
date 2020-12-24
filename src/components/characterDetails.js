import React, { useState, useEffect } from "react";
import { makeStyles, Card, Grid, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import ScrollBar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const useStyles = makeStyles({
  header: { display: "flex", backgroundColor: "#5362bd" },
  closeIcon: {
    marginLeft: "auto",
    marginRight: "10px",
    marginTop: "8px",
    cursor: "pointer",
    color: "white",
  },
  heading: {
    fontSize: "25px",
    marginLeft: "15px",
    marginTop: "5px",
    color: "white",
  },
  img: {
    width: "16em",
    marginLeft: "16px",
    marginTop: "10px",
  },
  nameText: {
    marginTop: "5px",
    fontSize: "24px",
    textAlign: "center",
    fontWeight: "bold",
  },
  smallText: {
    fontSize: "12px",
    marginTop: "5px",
    marginRight: "5px",
  },
  quote: {
    textAlign: "center",
    marginTop: "10px",
    marginBottom: "10px",
  },
  top10: {
    marginTop: "10px",
  },
  top5: {
    marginTop: "5px",
  },
});

const sideHeadings = {
  birthday: "Date of Birth",
  occupation: "Occupation",
  status: "Status",
  nickname: "Nickname",
  portrayed: "Actor",
  appearance: "Appearance",
};

export default function CharacterDetails({ setOpenIndex, data }) {
  const classes = useStyles();
  const [quoteList, setQuoteList] = useState([]);
  useEffect(() => {
    if (data) {
      axios
        .get(
          `https://www.breakingbadapi.com/api/quote?author=${data.name.replace(
            " ",
            "+"
          )}`
        )
        .then((res) => {
          setQuoteList(res.data.map((u) => u.quote));
        });
    }
  }, [data]);

  return !data ? null : (
    <>
      <ScrollBar component="div">
        <div>
          <div className={classes.header}>
            <Typography className={classes.heading}>
              Character Details
            </Typography>
            <CloseIcon
              className={classes.closeIcon}
              onClick={() => setOpenIndex(-1)}
            />
          </div>
          <Grid container className={classes.top10}>
            <Grid item xs={6}>
              <img src={data.img} className={classes.img} />
              <Typography className={classes.nameText}>{data.name}</Typography>
            </Grid>
            <Grid item container xs={6} className={classes.top5}>
              {Object.keys(sideHeadings).map((u) => (
                <>
                  <Grid item xs={5}>
                    <Typography>{sideHeadings[u]} :</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography className={classes.smallText}>
                      {data[u]}
                    </Typography>
                  </Grid>
                </>
              ))}
            </Grid>
          </Grid>
        </div>
        {quoteList.length === 0 ? null : (
          <Grid container direction="column">
            {quoteList.map((u) => (
              <Typography className={classes.quote}>{`"${u}"`}</Typography>
            ))}
          </Grid>
        )}
      </ScrollBar>
    </>
  );
}
