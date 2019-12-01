import { ApolloProvider } from '@apollo/react-hooks';
import DateFnsUtils from '@date-io/date-fns';
import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  NoSsr,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  makeStyles,
  Theme,
  ThemeProvider as MaterialUIThemeProvider,
} from '@material-ui/core/styles';
import { AccountCircle, Contacts, MoneyOff, Receipt } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import clsx from 'clsx';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { HashRouter, Link, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import 'typeface-roboto';
import { ClientDataContainer } from '../containers/ClientData.container';
import { ClientTableContainer } from '../containers/ClientTable.container';
import { ExpenseTableContainer } from '../containers/ExpenseTable.container';
import { InvoiceContainer } from '../containers/Invoice.container';
import { InvoiceTableContainer } from '../containers/InvoiceTable.container';
import { ProfileDataContainer } from '../containers/ProfileData.container';
import { ProfileTableContainer } from '../containers/ProfileTable.container';
import { client } from '../graphql/client';
import { theme } from '../theme/theme';
import { InvoiceForm } from './invoices/InvoiceForm.component';

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
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
interface Props {
  isOpen: boolean;
  theme: Theme;
}

const Layout = styled.div<Props>`
  width: ${props =>
    props.isOpen
      ? `calc(100vw - ${drawerWidth})`
      : `calc(100vw - ${props.theme.spacing(7) + 1}px)`};
  padding-top: 48px;
`;

const LayoutPaper = styled(Paper)`
  && {
    width: 100%;
    min-height: calc(100vh - 50px);
  }
`;

export const Application = () => {
  const classes = useStyles();
  const [isOpen, setOpen] = React.useState(false);
  return (
    <>
      <CssBaseline />
      <NoSsr>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <MaterialUIThemeProvider theme={theme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <HashRouter>
                  <div style={{ display: 'flex' }}>
                    <AppBar position="fixed" className={classes.appBar}>
                      <Toolbar variant="dense">
                        <IconButton
                          color="inherit"
                          aria-label="open drawer"
                          onClick={() => setOpen(prev => !prev)}
                          edge="start"
                          className={classes.menuButton}
                        >
                          <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                          InvoiceR
                        </Typography>
                      </Toolbar>
                    </AppBar>

                    <Drawer
                      variant="permanent"
                      className={clsx(classes.drawer, {
                        [classes.drawerOpen]: isOpen,
                        [classes.drawerClose]: !isOpen,
                      })}
                      classes={{
                        paper: clsx(classes.drawer, {
                          [classes.drawerOpen]: isOpen,
                          [classes.drawerClose]: !isOpen,
                        }),
                      }}
                    >
                      <div className={classes.toolbar} />
                      <List>
                        {[
                          { text: 'Profiles', icon: <AccountCircle /> },
                          { text: 'Invoices', icon: <Receipt /> },
                          { text: 'Expenses', icon: <MoneyOff /> },
                          { text: 'Clients', icon: <Contacts /> },
                        ].map(item => (
                          <ListItem
                            button
                            key={item.text}
                            disableGutters
                            {...{
                              component: Link,
                              to: `/${item.text.toLowerCase()}`,
                            }}
                          >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                          </ListItem>
                        ))}
                      </List>
                      <Divider />
                    </Drawer>
                    <Layout isOpen={isOpen}>
                      <LayoutPaper>
                        <Switch>
                          <Route exact path="/invoiceForm">
                            <InvoiceForm />
                          </Route>
                          <Route exact path="/invoice">
                            <InvoiceContainer />
                          </Route>
                          <Route exact path="/invoices">
                            <InvoiceTableContainer />
                          </Route>
                          <Route exact path="/clients">
                            <ClientTableContainer />
                          </Route>
                          <Route
                            exact
                            path="/clients/:clientId"
                            component={ClientDataContainer}
                          ></Route>
                          <Route
                            exact
                            path="/profiles/:profileId"
                            component={ProfileDataContainer}
                          ></Route>
                          <Route
                            exact
                            path="/profiles"
                            component={ProfileTableContainer}
                          />
                          <Route
                            exact
                            path="/expenses"
                            component={ExpenseTableContainer}
                          ></Route>
                        </Switch>
                      </LayoutPaper>
                    </Layout>
                  </div>
                </HashRouter>
              </MuiPickersUtilsProvider>
            </MaterialUIThemeProvider>
          </ThemeProvider>
        </ApolloProvider>
      </NoSsr>
    </>
  );
};

export default hot(Application);
