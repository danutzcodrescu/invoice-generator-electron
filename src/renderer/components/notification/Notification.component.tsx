import {
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Snackbar,
  Theme,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { shell } from 'electron';
import * as React from 'react';
import { useNotification } from '../../context/notification.context';

const useNotificationStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
    },
  }),
);

export function Notification() {
  const classes = useNotificationStyles();
  const { text, path, clearNotification } = useNotification();
  function close() {
    clearNotification();
  }

  function openInvoice() {
    if (path) {
      shell.openItem(path!);
    }
  }
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={Boolean(text)}
      ContentProps={{
        classes: { root: classes.root },
      }}
      onClose={close}
      action={
        <React.Fragment>
          {path ? (
            <Button color="secondary" size="small" onClick={openInvoice}>
              Open
            </Button>
          ) : null}
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={close}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
      message={text}
    />
  );
}
