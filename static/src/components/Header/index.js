import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/auth';

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...actionCreators, changePage: path => push(path)
    }, dispatch);
}
const drawerWidth = 240;
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    drawerPaper: {
        //position: 'relative',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
});

class Header extends React.Component {
    state = {
        anchorEl: null,

        dr_open: false,
        dr_anchor: 'left',
    };

    handleMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    dispatchNewRoute(route) {
        this.setState({
            dr_open: false,
            anchorEl: null
        });
        this.props.changePage(route)
    }


    logout(e) {
        e.preventDefault();
        this.setState({
            dr_open: false,
            anchorEl: null
        });
        this.props.logoutAndRedirect();
    }

    handleDrawerOpen = () => {
        this.setState({ dr_open: true });
    };

    handleDrawerClose = () => {
        this.setState({ dr_open: false });
    };

    render() {
        const { classes, theme } = this.props;
        const { dr_anchor, dr_open, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        const sideList = (
            <div className={classes.list}>
                <Divider />
                <List>{
                    !this.props.isAuthenticated ?
                        <div>
                            <MenuItem onClick={() => this.dispatchNewRoute('/login')}>
                                Login
                            </MenuItem>
                            <MenuItem onClick={() => this.dispatchNewRoute('/register')}>
                                Register
                            </MenuItem>
                        </div>
                        :
                        <div>
                            <MenuItem onClick={() => this.dispatchNewRoute('/analytics')}>
                                Analytics
                            </MenuItem>
                            <Divider />

                            <MenuItem onClick={(e) => this.logout(e)}>
                                Logout
                            </MenuItem>
                        </div>
                }</List>
            </div>
        )

        const drawer = (
            <Drawer
                variant="persistent"
                anchor={dr_anchor}
                open={dr_open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                {sideList}
            </Drawer>
        )
        let before = null;

        if (dr_anchor === 'left') {
            before = drawer;
        }
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton onClick={this.handleDrawerOpen} className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            React-Redux-Flask V2
                        </Typography>
                        {this.props.isAuthenticated && (
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleMenuClose}
                                >
                                    <MenuItem onClick={() => this.dispatchNewRoute('/main')}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
                {before}
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

Header.propTypes = {
    logoutAndRedirect: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withRouter(compose(
    withStyles(styles, { withTheme: true }),
    //withWidth(),
    connect(mapStateToProps, mapDispatchToProps),
)(Header));