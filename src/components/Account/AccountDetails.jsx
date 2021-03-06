import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Snackbar from '../Snackbar/MySnackbar';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
  textField: {
    width: '100%',
    marginTop: 12,
    marginBottom: 6
  },
  appBar: {
    position: 'relative',
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: '14px'
  },
  formControl: {
    margin: '8px 0px',
    minWidth: 120,
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    width: '100%',
    color: 'white',
    marginTop: 12
  },
  languageButton: {
    width: '100%',
    background: '#3f51b5',
    color: 'white',
    marginTop: 5
  },
  flex: {
    flex: 1,
  },
});

class AccountDetails extends Component {

  /**
   * 
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      languages: [],
      checkboxes: [],
      open: false,
      snackbarMessage: '',
      snackbarType: '',
      snackbarOpen: false,
    };
  }

  /**
	 * Hide snackbar after x seconds
	 */
  hideSnackbar = () => {
    this.setState({
      snackbarOpen: false
    });
  }

  /**
   * Change input value
   * 
   * @param {string} name
   * @param {Object} event
   */
  handleInputChange = name => event => {
    this.props.handleInputChangeProp(name, event);
  }

  /**
   * Change dropdown value
   * 
   * @param {Object} event
   */
  handleChangeFilterBy = event => {
    this.props.handleChangeFilterByProp(event);
  }

  handleCloseLanguageList = () => {
    this.setState({ open: false });

    this.props.handleSaveLanguagesProp(this.props.dataProp.accountFilterRecipes);
  };

  handleOpenLanguageList = () => {
    this.setState({ open: true });
  }

  /**
   * Render function
   */
  render() {
    const { classes, languageObjectProp } = this.props;
    const nameDisabled = this.props.dataProp.method === 'google' || this.props.dataProp.method === 'facebook';

    return (
      <div>
        <Paper>
          <div className="account-details-container">
            <TextField
              id="account-name"
              label={languageObjectProp.data.Account.name}
              onChange={this.handleInputChange('accountName')}
              className={classes.textField}
              value={this.props.dataProp.accountName}
              margin="normal"
              placeholder="Your name..."
              disabled={nameDisabled}
            />
            <TextField
              id="account-email"
              label="E-mail"
              onChange={this.handleInputChange('email')}
              className={classes.textField}
              value={this.props.dataProp.accountEmail}
              margin="normal"
              disabled
            />

            <div className="selected-languages-for-filtering-container">
              <div className="selected-languages-for-filtering-title">{languageObjectProp.data.Account.filteringByLanguage}</div>
              <div className="selected-languages-chips">
                {
                  this.props.dataProp.accountFilterRecipes ?
                    this.props.dataProp.accountFilterRecipes.map(lang => {
                      return lang;
                    }) : ''
                }
              </div>
              <div className="add-new-language-btn-container">
                <Button
                  variant="contained"
                  className={classes.languageButton + ' add-language-btn-to-filter'}
                  onClick={this.handleOpenLanguageList}
                >
                  {languageObjectProp.data.Account.addLanguage}
                </Button>
              </div>
            </div>

            <TextField
              id="account-about"
              label={languageObjectProp.data.Account.about}
              multiline
              rows="5"
              onChange={this.handleInputChange('accountAbout')}
              className={classes.textField}
              value={this.props.dataProp.accountAbout}
              margin="normal"
              placeholder={languageObjectProp.data.Account.aboutYouPlaceholder}
            />

            <div className="account-save-container">
              {languageObjectProp.data.Account.automaticSaving}
            </div>
          </div>
        </Paper>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleCloseLanguageList}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleCloseLanguageList} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                {languageObjectProp.data.Account.modal.selectOneOrMore}
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            {
              this.props.defaultLanguagesProp.map(listItem => {
                if (listItem.props.dataProp.checked) {
                }
                return listItem;
              })
            }
          </List>
        </Dialog>

        <Snackbar
          messageProp={this.state.snackbarMessage}
          typeProp={this.state.snackbarType}
          openProp={this.state.snackbarOpen}
          hideSnackbarProp={this.hideSnackbar}
        />
      </div>
    );
  }
}

AccountDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountDetails);