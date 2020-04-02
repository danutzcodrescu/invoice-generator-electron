import {
  AppBar,
  Button,
  ClickAwayListener,
  Container,
  Divider,
  Drawer,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  AccountCircle,
  AddShoppingCart,
  ArrowDropDown,
  Contacts,
  LocalOffer,
  Menu as MenuIcon,
  MonetizationOn,
  MoneyOff,
  Receipt,
} from '@material-ui/icons';
import clsx from 'clsx';
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  AppTitle,
  PaperSC,
  PopperSC,
  ToolbarContainer,
  useMenuStyles,
} from '../styles/Menu.styles';

const sidebarLinks = [
  { text: 'Profiles', icon: <AccountCircle /> },
  { text: 'Invoices', icon: <Receipt /> },
  { text: 'Offers', icon: <LocalOffer /> },
  { text: 'Expenses', icon: <MoneyOff /> },
  { text: 'Clients', icon: <Contacts /> },
  { text: 'VAT rules', icon: <MonetizationOn /> },
  { text: 'Services', icon: <AddShoppingCart /> },
];

const createItems = [
  { text: 'Create invoice', link: '/invoiceForm', icon: <Receipt /> },
  { text: 'Create offer', link: '/newOffer', icon: <LocalOffer /> },
  { text: 'Create profile', link: '/newProfile', icon: <AccountCircle /> },
  { text: 'Create client', link: '/newClient', icon: <Contacts /> },
  { text: 'Create expense', link: '/newExpense', icon: <MoneyOff /> },
  { text: 'Create VAT rule', link: '/newVat', icon: <MonetizationOn /> },
  {
    text: 'Create service/item',
    link: '/newService',
    icon: <AddShoppingCart />,
  },
];

export function Menu(props: { children: React.ReactNode }) {
  const classes = useMenuStyles();
  const [isOpen, setStatus] = React.useState(false);
  const [isPopoverOpen, setPopoverStatus] = React.useState(false);
  const buttonRef = React.useRef();
  return (
    <Container>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar variant="dense">
          <ToolbarContainer>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setStatus((prev) => !prev)}
              edge="start"
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              <AppTitle to="/">InvoiceR</AppTitle>
            </Typography>
            <Button
              color="secondary"
              size="small"
              aria-controls={open ? 'split-button-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-label="create"
              aria-haspopup="menu"
              onClick={() => setPopoverStatus(true)}
              ref={buttonRef as any}
            >
              Create
              <ArrowDropDown />
            </Button>
          </ToolbarContainer>
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
          {sidebarLinks.map((item) => (
            <ListItem
              button
              key={item.text}
              disableGutters
              {...{
                component: Link,
                to: `/${item.text.toLowerCase().replace(' ', '')}`,
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <div className={clsx(classes.layout, { [classes.isOpen]: isOpen })}>
        {props.children}
      </div>

      <PopperSC
        open={isPopoverOpen}
        anchorEl={buttonRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-end"
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <PaperSC>
              <ClickAwayListener onClickAway={() => setPopoverStatus(false)}>
                <MenuList id="split-button-menu">
                  {createItems.map((option) => (
                    <MenuItem
                      key={option.text}
                      onClick={() => setPopoverStatus(false)}
                    >
                      {option.icon}
                      <Link to={option.link}>{option.text}</Link>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </PaperSC>
          </Grow>
        )}
      </PopperSC>
    </Container>
  );
}
