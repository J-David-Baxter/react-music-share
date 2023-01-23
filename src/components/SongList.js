import { Card, CardActions, CardContent, CardMedia, CircularProgress, IconButton, Typography } from "@material-ui/core";
import { PlayArrow, Save } from "@material-ui/icons";
import React from "react";

function SongList() {
  let loading = false;

  const song = {
    title: 'Digital Love',
    artist: 'Daft Punk',
    thumbnail: 'https://i.scdn.co/image/ab67616d0000b273b33d46dfa2635a47eebf63b2'
  }
  
  if(loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 50 
      }}>
        <CircularProgress />
      </div>
    )
  }

  return <div>{Array.from({ length: 10 }, () => song).map((song, i) => (
    <Song key={i} song={song} />
  ))}</div>;
}

function Song({ song }) {
  const { thumbnail, title, artist } = song;
  
  return <Card>
    <div>
      <CardMedia image={thumbnail}/>
      <div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body1" component="p" color="textSecondary">
            {artist}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton size="small" color="primary">
            <PlayArrow />
          </IconButton>
          <IconButton size="small" color="secondary">
            <Save />
          </IconButton>
        </CardActions>
      </div>
    </div>
  </Card>
}

export default SongList;
