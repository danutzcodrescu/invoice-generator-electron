import { Modal } from '@material-ui/core';
import * as React from 'react';
import {
  LoadinggSpinnerContainer,
  LoadingSpinner,
} from './LoadingModal.styles';

interface Props {
  isOpen: boolean;
  text: string;
}

export function LoadingModal({ isOpen, text }: Props) {
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={isOpen}
    >
      <LoadinggSpinnerContainer>
        <LoadingSpinner /> {text}
      </LoadinggSpinnerContainer>
    </Modal>
  );
}
