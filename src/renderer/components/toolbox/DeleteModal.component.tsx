import { Button, Grid, Modal, Theme, Typography } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';
import { LoadinggSpinnerContainer } from '../invoices/LoadingModal.styles';

const Container = styled(LoadinggSpinnerContainer)`
  display: block;
`;

const DeleteButton = styled(Button)`
  background-color: ${(props) => (props.theme as Theme).palette.error.main};
  color: ${(props) => (props.theme as Theme).palette.error.contrastText};
  &:hover {
    background-color: ${(props) => (props.theme as Theme).palette.error.dark};
  }
`;

export interface DeleteObj {
  id: string;
  name: string;
}

interface Props {
  isOpen: boolean;
  obj?: DeleteObj;
  close: () => void;
  onPrimary: (id: string) => void;
}

export function DeleteModal({ isOpen, obj, close, onPrimary }: Props) {
  return (
    <Modal open={isOpen} onClose={close}>
      <Container>
        <Typography gutterBottom>
          Are you sure you want to delete {obj?.name}?
        </Typography>
        <Grid container justify="flex-end" spacing={2}>
          <Grid item>
            <Button color="secondary" onClick={close}>
              No, close
            </Button>
          </Grid>
          <Grid item>
            <DeleteButton
              variant="contained"
              onClick={() => {
                onPrimary(obj?.id ?? '');
                close();
              }}
            >
              Yes, delete
            </DeleteButton>
          </Grid>
        </Grid>
      </Container>
    </Modal>
  );
}
