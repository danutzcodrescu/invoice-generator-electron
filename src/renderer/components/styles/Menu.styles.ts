import { makeStyles, Paper, Popper, Theme } from '@material-ui/core';
import styled from 'styled-components';

interface Props {
  isOpen: boolean;
  theme: Theme;
  wide: boolean;
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
  layout: {
    marginTop: '60px',
    minHeight: `calc(100vh - ${theme.spacing(3) + 60}px)`,
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(3),
    width: `calc(100vw - ${theme.spacing(7) + theme.spacing(5)}px)`,
    '&$isOpen': {
      width: `calc(100vw - ${drawerWidth + theme.spacing(7)}px)`,
      marginLeft: `${drawerWidth - 40}px`,
    },
    [theme.breakpoints.up('sm')]: {
      width: `calc(100vw - ${theme.spacing(9) + +theme.spacing(5)}px)`,
    },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  isOpen: {},
}));

export const LayoutPaper = styled(Paper)`
  && {
    width: 100%;
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
