import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

import NoteIcon from '@mui/icons-material/Note';

interface Note {
  setSavedNote: (note: string | undefined) => void;
}

const Note: React.FC<Note> = ({setSavedNote}) => {
  const [note, setNote] = useState("");

  const handleSave = () => {
    setSavedNote(note);
  };

  return (
    <Box sx={{ my: 2 }}>
        <TextField
          multiline
          minRows={3}
          fullWidth
          variant="outlined"
          value={note}
          label="Note"
          onChange={(e) => setNote(e.target.value)}
          placeholder="Type your note here..."
        />
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleSave} startIcon={<NoteIcon />} color="primary" style={{width: "100%"}}>
            Add Note
          </Button>
        </Box>
    </Box>
  );
};
export default Note;