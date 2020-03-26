import styled, { keyframes } from 'styled-components';

const animation = keyframes`
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
`;

export const LoadingSpinner = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-left: 10px;

  &:after {
    content: ' ';
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 8px;
    box-sizing: border-box;
    border: 32px solid ${(props) => props.theme.palette.primary.main};
    border-color: #fff transparent #fff transparent;
    animation: ${animation} 1.2s infinite;
  }
`;

export const LoadinggSpinnerContainer = styled.div`
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.palette.primary.main};
  padding: ${(props) => props.theme.spacing(2)}px;
  color: white;
  border-radius: 7px;
  display: flex;
  align-items: center;
  border: 1px solid white;
  font-size: 1.2rem;
  font-weight: bold;
`;
