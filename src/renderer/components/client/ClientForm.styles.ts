import { Card, Grid, Theme } from '@material-ui/core';
import styled from 'styled-components';

export const PaddingGrid = styled(Grid)`
  ${({ theme }: { theme: Theme }) => `padding: ${theme.spacing(3)}px`}
`;

export const PaddingCard = styled(Card)`
  ${({ theme }: { theme: Theme }) =>
    `padding: ${theme.spacing(2)}px; margin: ${theme.spacing(2)}px`}
`;
