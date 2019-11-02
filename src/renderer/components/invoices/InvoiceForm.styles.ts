import { Button, Divider, Theme } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import styled from 'styled-components';

export const ButtonIcon = styled(AddBox)`
  margin-right: ${props => (props.theme as Theme).spacing(1)}px;
`;

export const ButtonMargin = styled(Button)`
  && {
    margin-top: ${props => (props.theme as Theme).spacing(1)}px;
  }
`;

export const DividerMargin = styled(Divider)`
  && {
    margin: ${props => (props.theme as Theme).spacing(2)}px 0;
  }
`;
