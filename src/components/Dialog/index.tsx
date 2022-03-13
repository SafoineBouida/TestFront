import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  open?: boolean;
  onClose(): void;
  won?: boolean;
}

const GameDialog = ({ open = false, onClose, won = false }: Props) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Merci d'avoir joué!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {won
            ? "Félicitations, vous avez gagné le jeu, bon souvenir. Tu veux rejouer et prouver que ce n'était pas un coup de chance ? "
            : "C'était vraiment médiocre, des mauvaises performances quel dommage. Réessayez peut-être gagnerez-vous cette fois ? "}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Rejouer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameDialog;
