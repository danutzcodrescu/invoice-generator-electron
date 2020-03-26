import { Modal } from '@material-ui/core';
import * as React from 'react';
import {
  LoadinggSpinnerContainer,
  LoadingSpinner,
} from './LoadingModal.styles';

interface Props {
  isOpen: boolean;
}

export function LoadingModal({ isOpen }: Props) {
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={isOpen}
    >
      <LoadinggSpinnerContainer>
        <LoadingSpinner /> Creating invoice
      </LoadinggSpinnerContainer>
    </Modal>
  );
}
