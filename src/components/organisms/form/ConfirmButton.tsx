import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';

interface IConfirmButtonButton {
  onClick: () => any;
  onCancel?: () => any;
  dialogMessage?: string;
  dialogTitle?: string;
  children: any;
  label?: string;
  color?: any;
  fullWidth?: boolean;
}

export default function ConfirmButton({
  children,
  label,
  color = 'primary',
  onClick,
  fullWidth,
  onCancel,
  dialogMessage,
  dialogTitle,
}: IConfirmButtonButton) {
  const [open, setOpen] = useState<boolean>(false);

  function clickButton() {
    if (onCancel) setOpen(true);
    else if (onClick) onClick();
  }

  function confirmModal() {
    if (onClick) onClick();
    setOpen(false);
  }

  function cancelModal() {
    if (onCancel) onCancel();
    setOpen(false);
  }

  return (
    <>
      <Button
        fullWidth={fullWidth}
        variant="contained"
        color={color}
        onClick={clickButton}
      >
        {children || label}
      </Button>

      {!!onCancel && (
        <Dialog
          maxWidth="xs"
          aria-labelledby="confirmation-dialog-title"
          open={open}
        >
          <DialogTitle id="confirmation-dialog-title">
            {dialogTitle}
          </DialogTitle>
          <DialogContent dividers>{dialogMessage}</DialogContent>
          <DialogActions>
            <Button
              autoFocus
              variant="contained"
              onClick={confirmModal}
              color="primary"
            >
              Sim
            </Button>
            <Button variant="contained" onClick={cancelModal} color="inherit">
              Não
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
