/* eslint camelcase: 0, no-underscore-dangle: 0 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import * as actionCreators from '../actions/auth';
import { validateEmail } from '../utils/misc';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

function mapStateToProps(state) {
    return {
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


const style = {
    marginTop: 50,
    paddingBottom: 50,
    paddingTop: 25,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
};

class LoginView extends React.Component {

    constructor(props) {
        super(props);
        const redirectRoute = '/login';
        this.state = {
            email: '',
            password: '',
            email_error_text: null,
            password_error_text: null,
            redirectTo: redirectRoute,
            disabled: true,
        };
    }

    isDisabled() {
        let email_is_valid = false;
        let password_is_valid = false;

        if (this.state.email === '') {
            this.setState({
                email_error_text: null,
            });
        } else if (validateEmail(this.state.email)) {
            email_is_valid = true;
            this.setState({
                email_error_text: null,
            });

        } else {
            this.setState({
                email_error_text: 'Sorry, this is not a valid email',
            });
        }

        if (this.state.password === '' || !this.state.password) {
            this.setState({
                password_error_text: null,
            });
        } else if (this.state.password.length >= 6) {
            password_is_valid = true;
            this.setState({
                password_error_text: null,
            });
        } else {
            this.setState({
                password_error_text: 'Your password must be at least 6 characters',
            });

        }

        if (email_is_valid && password_is_valid) {
            this.setState({
                disabled: false,
            });
        }

    }

    changeValue(e, type) {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state, () => {
            this.isDisabled();
        });
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (!this.state.disabled) {
                this.login(e);
            }
        }
    }

    login(e) {
        e.preventDefault();
        this.props.loginUser(this.state.email, this.state.password, this.state.redirectTo);
    }

    render() {
        return (
            <div className="col-md-6 d-block mx-auto" onKeyPress={(e) => this._handleKeyPress(e)}>
                <Paper style={style}>
                    <form role="form">
                        <div className="text-center">
                            <h2>Login to view protected content!</h2>
                            {
                                this.props.statusText &&
                                    <div className="alert alert-info">
                                        {this.props.statusText}
                                    </div>
                            }

                            <div className="col-md-12">
                                <TextField
                                  style={{width: 200}}
                                  label="Email"
                                  placeHolder="Email"
                                  type="email"
                                  error={!!this.state.email_error_text}
                                  helperText={this.state.email_error_text}
                                  onChange={(e) => this.changeValue(e, 'email')}
                                  margin="normal"
                                />
                            </div>
                            <div className="col-md-12">
                                <TextField
                                  style={{width: 200}}
                                  label="Password"
                                  placeHolder="Password"
                                  type="password"
                                  error={!!this.state.password_error_text}
                                  helperText={this.state.password_error_text}
                                  onChange={(e) => this.changeValue(e, 'password')}
                                  margin="normal"
                                />
                            </div>

                            <Button variant="raised" style={{ marginTop: 50 }} 
                                onClick={(e) => this.login(e)}
                                disabled={this.state.disabled}
                            >
                                Submit
                            </Button>

                        </div>
                    </form>
                </Paper>

            </div>
        );

    }
}

LoginView.propTypes = {
    loginUser: PropTypes.func,
    statusText: PropTypes.string,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginView))

