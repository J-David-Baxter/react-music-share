import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, makeStyles, TextField } from "@material-ui/core";
import { AddBoxOutlined, Link } from "@material-ui/icons";
import ReactPlayer from "react-player";
import SoundCloudPlayer from "react-player/soundcloud";
import YouTubePlayer from "react-player/youtube";
import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_SONG } from "../graphql/mutations";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  urlInput: {
    margin: theme.spacing(1)
  },
  addSongButton: {
    margin: theme.spacing(1)
  },
  dialog: {
    textAlign: 'center'
  },
  thumbnail: {
    width: '90%'
  }
}))

const DEFAULT_SONG = {
  duration: 0,
  title: '',
  artist: '',
  thumbnail: '',
};

function AddSong() {
  const [addSong, { error }] = useMutation(ADD_SONG);
  const classes = useStyles();
  const [dialog, setDialog] = useState(false);
  const [url, setUrl] = useState('');
  const [playable, setPlayable] = useState(false);
  const [song, setSong] = useState(DEFAULT_SONG);

  useEffect(() => {
    const isPlayable = SoundCloudPlayer.canPlay(url) || YouTubePlayer.canPlay(url);
    setPlayable(isPlayable);
  }, [url])

  function handleChangeSong(e) {
    const { name, value } = e.target;
    setSong(prevSong => ({
      ...prevSong,
      [name]: value
    }))
  }

  async function handleAddSong() {
  try {
    const { duration, title, artist, thumbnail, url } = song;
    await addSong({
      variables: {
        duration: duration > 0 ? duration : null,
        title: title.length > 0 ? title : null,
        artist: artist.length > 0 ? artist : null,
        thumbnail: thumbnail.length > 0 ? thumbnail : null,
        url: url.length > 0 ? url : null,
      }
    })
    handleCloseDialog();
    setSong(DEFAULT_SONG);
    setUrl('');
  } catch (error) {
    console.error("Error adding song", error);
  } 
}

  function handleCloseDialog() {
    setDialog(false);
  }

  async function handleEditSong({ player }) {
    const nestedPlayer = player.player.player;
    let songData;
    if (nestedPlayer.getVideoData) {
      songData = getYoutubeInfo(nestedPlayer);
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundcloudInfo(nestedPlayer);
    }
    setSong({ ...songData, url });
  }

  function getYoutubeInfo(player) {
    const duration = player.getDuration();
    const { title, video_id, author } = player.getVideoData();
    const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;
    return {
      duration,
      title,
      artist: author,
      thumbnail
    }
  }

  function getSoundcloudInfo(player) {
    return new Promise(resolve => {
      player.getCurrentSound(songData => {
        if (songData) {
          resolve({
            duration: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace('-large', '-t500x500')
          })
        }
      })
    })
  }

  function handleError(field) {
    return error?.graphQLErrors[0]?.extensions?.path.includes(field);
  }
  
  const { thumbnail, title, artist } = song;
  return (
    <div className={classes.container}>
      <Dialog 
        className={classes.dialog}
        open={dialog}
        onClose={handleCloseDialog}
        >
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img 
            src={thumbnail}
            alt="Song thumbnail"
            className={classes.thumbnail}
          />
          <TextField 
            onChange={handleChangeSong}
            value={title}
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            error={handleError('title')}
            helperText={handleError('title') && 'Fill out field'}
          />
          <TextField 
            onChange={handleChangeSong}
            value={artist}
            margin="dense"
            name="artist"
            label="Artist"
            fullWidth
            error={handleError('artist')}
            helperText={handleError('artist') && 'Fill out field'}
          />
          <TextField 
            onChange={handleChangeSong}
            value={thumbnail}
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
            error={handleError('thumbnail')}
            helperText={handleError('thumbnail') && 'Fill out field'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button onClick={handleAddSong} variant="outlined" color="primary">Add Song</Button>
        </DialogActions>
      </Dialog>
      <TextField 
        className={classes.urlInput}
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        placeholder="Add Youtube or Soundcloud Url"
        fullWidth
        margin="normal"
        type="url"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link />
            </InputAdornment>
          )
        }}
      />
      <Button
        className={classes.addSongButton}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
        onClick={() => setDialog(true)}
        disabled={!playable}
      >
        Add
      </Button>
      <ReactPlayer url={url} hidden onReady={handleEditSong} />
    </div>
  )
}

export default AddSong;
