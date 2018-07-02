import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

/* application components */
import Header from '../../components/Header';
import { Footer } from '../../components/Footer';

import { HomeContainer } from '../../containers/HomeContainer';
import LoginView from '../../components/LoginView';
import RegisterView from '../../components/RegisterView';
import ProtectedView from '../../components/ProtectedView';
import Analytics from '../../components/Analytics';
import NotFound from '../../components/NotFound';

import { DetermineAuth } from '../../components/DetermineAuth';
import { requireAuthentication } from '../../components/AuthenticatedComponent';
import { requireNoAuthentication } from '../../components/notAuthenticatedComponent';


/* global styles for app */
import './styles/app.scss';
const theme = createMuiTheme();
class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        children: PropTypes.node,
    };

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <section>
                    <Header />
                    <div
                        className="container"
                        style={{ marginTop: 10, paddingBottom: 250 }}
                    >
                        <Switch>
                            <Route exact path="/" component={requireNoAuthentication(HomeContainer)} />
                            <Route path="/main" component={requireAuthentication(ProtectedView)} />
                            <Route path="/login" component={requireNoAuthentication(LoginView)} />
                            <Route path="/register" component={requireNoAuthentication(RegisterView)} />
                            <Route path="/home" component={requireNoAuthentication(HomeContainer)} />
                            <Route path="/analytics" component={requireAuthentication(Analytics)} />
                            <Route component={DetermineAuth(NotFound)} />
                        </Switch>

                    </div>
                    <div>
                        <Footer />
                    </div>
                </section>
            </MuiThemeProvider>
        );
    }
}

export { App };
