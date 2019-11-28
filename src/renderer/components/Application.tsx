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
  Toolbar,
  Typography,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  makeStyles,
  ThemeProvider as MaterialUIThemeProvider,
} from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import clsx from 'clsx';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { HashRouter, Link, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
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
  toolbar: { ...theme.mixins.toolbar, marginTop: theme.spacing(3) },
  appBar: { zIndex: theme.zIndex.drawer + 1 },
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

export const Application = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
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
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                      })}
                      classes={{
                        paper: clsx(classes.drawer, {
                          [classes.drawerOpen]: open,
                          [classes.drawerClose]: !open,
                        }),
                      }}
                    >
                      <div className={classes.toolbar} />
                      <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
                          (text, index) => (
                            <ListItem button key={text}>
                              <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                              </ListItemIcon>
                              <ListItemText primary={text} />
                            </ListItem>
                          ),
                        )}
                      </List>
                      <Divider />
                    </Drawer>
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
                      <Route>
                        <button>
                          <Link to="/invoiceForm">New invoice</Link>
                        </button>
                        <button>
                          <Link to="/profiles">Profiles</Link>
                        </button>
                        <button>
                          <Link to="/clients">Clients</Link>
                        </button>
                        <button>
                          <Link to="/invoices">Invoices</Link>
                        </button>
                        <button>
                          <Link to="/expenses">Expenses</Link>
                        </button>
                      </Route>
                    </Switch>
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
