import { Paper } from '@material-ui/core';
import styled from 'styled-components';
export const Container = styled.div`
  padding: ${props => props.theme.spacing(5)}px;
`;

export const MarginTop = styled.div`
  margin-top: ${props => props.theme.spacing(4)}px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(150px, 20%);
  grid-template-rows: 53px 1fr;
  & > * {
    box-sizing: border-box;
  }
  > *:nth-of-type(2n + 1) {
    border-right: 1px solid black;
  }
  > *:not(:nth-of-type(1)):not(:nth-of-type(2)) {
    padding: ${props => props.theme.spacing(2)}px;
  }
  min-height: 400px;
`;

export const PaperForTable = styled(Paper)`
  color: green;
  & .ReactVirtualized__Table__headerRow {
    flip: false;
    padding-right: none;
  }
`;

export const Heading = styled.div`
  font-weight: 600;
  background-color: aquamarine;
  text-align: center;
  text-transform: uppercase;
  padding: ${props => props.theme.spacing(2)}px 0;
  border-bottom: 1px solid black;
`;
