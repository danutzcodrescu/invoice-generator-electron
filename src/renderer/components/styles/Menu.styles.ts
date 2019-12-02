import { makeStyles, Paper, Popper, Theme } from '@material-ui/core';
import styled from 'styled-components';

interface Props {
  isOpen: boolean;
  theme: Theme;
}

const drawerWidth = 200;

export const useMenuStyles = makeStyles((theme: Theme) => ({
  toolbar: { ...theme.mixins.toolbar, minHeight: '1.3rem !important' },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    '&.MuiPaper-root': {
      padding: 0,
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  menuButton: {
    marginRight: 36,
  },

  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

export const Layout = styled.div<Props>`
  width: ${props =>
    props.isOpen
      ? `calc(100vw - ${drawerWidth})`
      : `calc(100vw - ${props.theme.spacing(7) + 1}px)`};
  padding-top: 48px;
`;

export const LayoutPaper = styled(Paper)`
  && {
    width: 100%;
    min-height: calc(100vh - 50px);
  }
`;

export const PopperSC = styled(Popper)`
  && {
    z-index: ${props => (props.theme as Theme).zIndex.drawer + 2};
  }
`;

export const PaperSC = styled(Paper)`
  && {
    padding: 0;
    & a {
      color: ${props => (props.theme as Theme).palette.text.primary};
      text-decoration: none;
    }

    & svg {
      margin-right: ${props => props.theme.spacing(1)}px;
    }
  }
`;

export const Container = styled.div`
  display: flex;
`;

export const ToolbarContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  & > *:last-child {
    margin-left: auto;
  }
`;
