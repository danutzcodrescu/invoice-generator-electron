import { Paper } from '@material-ui/core';
import styled, { css } from 'styled-components';
export const Container = styled.div`
  padding: ${(props) => props.theme.spacing(5)}px;
`;

export const MarginTop = styled.div`
  margin-top: ${(props) => props.theme.spacing(4)}px;
`;

interface GridProps {
  discount: boolean;
}

export const GridContainer = styled.div<GridProps>`
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
    padding: ${(props) => props.theme.spacing(2)}px;
  }
  ${(props) =>
    props.discount
      ? css`
          > *:nth-of-type(5) {
            padding: 0 ${(props) => props.theme.spacing(2)}px !important;
          }
          > *:nth-of-type(6) {
            padding: 0 ${(props) => props.theme.spacing(2)}px !important;
          }
        `
      : null}
  min-height: 400px;
`;

export const PaperForTable = styled(Paper)`
  color: green;
  & .ReactVirtualized__Table__headerRow {
    flip: false;
    padding-right: none;
  }
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
  & > * {
    min-width: 90px;
    text-align: right;
  }
  & > *:first-child {
    flex: 1;
    margin-right: auto;
    text-align: left;
  }
`;

export const Heading = styled(Item)`
  font-weight: 600;
  background-color: lightgrey;
  text-align: center;
  text-transform: uppercase;
  padding: ${(props) => props.theme.spacing(2)}px 0;
  border-bottom: 1px solid black;
  & > * {
    text-align: center;
  }
  & > *:first-child {
    text-align: center;
  }
`;
