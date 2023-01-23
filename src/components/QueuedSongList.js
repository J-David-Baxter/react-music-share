import { Avatar, IconButton, makeStyles, Typography, useMediaQuery } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";

function QueuedSongList() {
  const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));
  
  const song = {
    title: 'Digital Love',
    artist: 'Daft Punk',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273b33d46dfa2635a47eebf63b2'
  }
  
  return greaterThanMd && (
    <div style={{margin: '10px 0'}}>
      <Typography color="textSecondary" variant="button">
        QUEUE (5)
      </Typography>
    {Array.from({ length: 5 }, () => song).map((song, i) => (
      <QueuedSong key={i} song={song}/>
    ))}
    </div>
  )
}

const useStyles = makeStyles({
  avatar: {
    width: 44,
    height: 44
  },
  text: {
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  container: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '50px auto 50px',
    gridGap: 12,
    alignItems: 'center',
    marginTop: 10
  },
  songInfoContainer: {
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
})

function QueuedSong({ song }) {
  const { title, artist, thumbnail } = song;
  const classes = useStyles();
  
  return (
    <div className={classes.container}>
      <Avatar className={classes.avatar} src={thumbnail} alt="Song thumbnail"/>
      <div className={classes.songInfoContainer}>
        <Typography className={classes.text} variant="subtitle2" >
          {title}
        </Typography>
        <Typography className={classes.text} variant="body2" color="textSecondary">
          {artist}
        </Typography>
      </div>
      <IconButton>
        <Delete color="error"/>
      </IconButton>
    </div>
  )
}

export default QueuedSongList;
