import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const DatePickersContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  visibility: ${(props) => (props.hidden ? 'hidden' : 'visible')};
  padding: 0 ${(props) => props.theme.spacing(2)}px;

  && > * {
    margin-right: ${(props) => props.theme.spacing(2)}px;
  }
`;
