import {
  Dialog,
  Grid,
  DialogTitle,
  Box,
  IconButton,
  DialogContent,
  DialogActions,
  Breakpoint,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { ReactNode } from 'react';

interface IDialogModal {
  title?: string;
  open?: boolean;
  onClose?: (value: any) => void;
  actions?: ReactNode;
  maxWidth?: Breakpoint;
  children: ReactNode;
}

export default function DialogModal({
  title,
  open = false,
  onClose,
  actions,
  maxWidth = 'xl',
  children,
}: IDialogModal) {
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
    >
      <Grid container>
        <Grid item xs={11}>
          <DialogTitle id="simple-dialog-title"> {title} </DialogTitle>
        </Grid>
        <Grid item xs={1}>
          <Box display="flex" alignItems="center" justifyContent="flex-end">
            <IconButton aria-label="close" onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <DialogContent dividers>{children}</DialogContent>
      {!!actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
}
