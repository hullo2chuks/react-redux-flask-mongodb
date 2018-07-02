import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as actionCreators from '../actions/auth';
import { validate_token } from "../utils/http_functions"

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


export function DetermineAuth(Component) {

    class AuthenticatedComponent extends React.Component {

        state = {
            loaded_if_needed: false
        }

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps);
        }

        checkAuth(props = this.props) {
            if (!props.isAuthenticated) {
                const token = localStorage.getItem('token');
                if (token) {
                    validate_token(token)
                        .then(res => {
                            if (res.status === 200) {
                                this.props.loginUserSuccess(token);
                                this.setState({
                                    loaded_if_needed: true,
                                });

                            }
                        }).catch(error => {
                        });
                }

            } else {
                this.setState({
                    loaded_if_needed: true,
                });
            }
        }

        render() {
            return (
                <div>
                    {this.state.loaded_if_needed
                        ? <Component {...this.props} />
                        : null
                    }
                </div>
            );

        }
    }

    AuthenticatedComponent.propTypes = {
        loginUserSuccess: PropTypes.func,
    };

    return withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent));

}
