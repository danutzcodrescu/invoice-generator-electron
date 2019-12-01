import { CircularProgress } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: calc(100vh - 50px);
  align-items: center;
  justify-content: center;
`;

export function Loading() {
  return (
    <Container>
      <CircularProgress variant="determinate" />
    </Container>
  );
}
