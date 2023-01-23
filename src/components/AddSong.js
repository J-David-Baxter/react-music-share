import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from "@material-ui/core";
import { AddBoxOutlined, Link } from "@material-ui/icons";
import React, { useState } from "react";

function AddSong() {
  const [dialog, setDialog] = useState(false);

  function handleCloseDialog() {
    setDialog(false);
  }
   
  return (
    <div>
      <Dialog 
        open={dialog}
        onClose={handleCloseDialog}
        >
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img />
          <TextField 
            margin="dense"
            name="title"
            label="Title"
            fullWidth
          />
          <TextField 
            margin="dense"
            name="artist"
            label="Artist"
            fullWidth
          />
          <TextField 
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button variant="outlined" color="primary">Add Song</Button>
        </DialogActions>
      </Dialog>
      <TextField 
        placeholder="Add Youtube or Soundcloud Url"
        fullWidth
        margin="normal"
        type="url"
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <Link />
            </InputAdornment>
          )
        }}
      />
      <Button
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
        onClick={() => setDialog(true)}
      >
        Add
      </Button>
    </div>
  )
}

export default AddSong;
