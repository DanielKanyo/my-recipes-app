import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase';
import * as ROUTES from '../../constants/routes';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({});

const PasswordForgetPage = () => (
  <div className="forget-form">
    <Paper className="forget-paper" elevation={1}>
      <div className="forget-title">Reset password</div>
      <PasswordForgetForm />
    </Paper>
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    let languageObjectProp;

    if (this.props.languageObjectProp) {
      languageObjectProp = this.props.languageObjectProp;
    }

    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          name="email"
          id="forget-page-email"
          label={"E-mail"}
          className="password-forget-input"
          value={this.state.email}
          onChange={this.onChange}
          margin="normal"
          type="text"
          placeholder={languageObjectProp ? languageObjectProp.data.PasswordResetAndForget.emailPlaceholder : "Your e-mail address..."}
        />
        <Button disabled={isInvalid} color="primary" variant="contained" type="submit" className="reset-passwd-btn">
          {languageObjectProp ? languageObjectProp.data.PasswordResetAndForget.resetBtn : "Reset password"}
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <div className="forgot-password-container">
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </div>
);

PasswordForgetPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PasswordForgetPage);

export { PasswordForgetForm, PasswordForgetLink };
