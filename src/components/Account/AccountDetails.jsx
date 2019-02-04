import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import { isoLanguages } from '../../constants/languages/iso-639';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

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
    marginTop: theme.spacing.unit * 2,
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
    };
  }

  componentDidMount() {
    this.mounted = true;

    let previousLanguages = this.state.languages;

    if (this.mounted) {
      for (let key in isoLanguages) {
        let nativeName = isoLanguages[key].nativeName;
        let name = isoLanguages[key].name;

        previousLanguages.push(
          <div key={key}>
            <ListItem className="language-item" button onClick={(e) => { this.selectLanguage(e, isoLanguages[key]['639-1']) }}>
              <ListItemText primary={nativeName} secondary={name} />
            </ListItem>
            <Divider />
          </div>
        )
      }

      this.setState({
        languages: previousLanguages
      });
    }
  }

  /**
   * Sets 'mounted' property to false to ignore warning 
   */
  componentWillUnmount() {
    this.mounted = false;
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
  handleChangeLanguage = event => {
    this.props.handleChangeLanguageProp(event);
  }

  /**
   * Change dropdown value
   * 
   * @param {Object} event
   */
  handleChangeFilterBy = event => {
    this.props.handleChangeFilterByProp(event);
  }

  /**
   * Save new data
   * 
   * @param {Object} event
   */
  handleSaveAccount = (event) => {
    if (this.props.dataProp.accountName === '' || this.props.dataProp.accountEmail === '' || this.props.dataProp.accountLanguage === '') {
      // TODO
      this.toastr('Warning! Fill the required fields...', '#ffc107');
    } else {
      this.props.handleSaveNewAccountDataProp(this.props.dataProp.accountName,
        this.props.dataProp.accountLanguage,
        this.props.dataProp.accountAbout,
        this.props.dataProp.accountFilterRecipes
      );
      this.props.setLanguageProp(this.props.dataProp.accountLanguage);
    }
  }

  handleCloseLanguageList = () => {
    this.setState({ open: false });
  };

  handleOpenLanguageList = () => {
    this.setState({ open: true });
  }

  selectLanguage = (e, language) => {
    console.log(e.target, language);
  }

  /**
   * Render function
   */
  render() {
    const { classes, languageObjectProp } = this.props;

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
            <div className="language-container">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="account-langu-dropdown-label">{languageObjectProp.data.Account.language}</InputLabel>
                <Select
                  value={this.props.dataProp.accountLanguage ? this.props.dataProp.accountLanguage : ''}
                  onChange={this.handleChangeLanguage}
                  inputProps={{
                    name: 'accountLanguage',
                    id: 'language-dropdown',
                  }}
                >
                  <MenuItem value={'eng'}>English</MenuItem>
                  <MenuItem value={'hun'}>Magyar</MenuItem>
                </Select>
              </FormControl>
            </div>

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
                  Add language
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
              <Button
                variant="contained"
                className={classes.button + ' control-btn save-btn'}
                onClick={this.handleSaveAccount}
              >
                {languageObjectProp.data.Account.save}
              </Button>
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
                Select one or more languages
              </Typography>
              <Button color="inherit" onClick={this.handleCloseLanguageList}>
                done
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            {
              this.state.languages.map(l => {
                return l;
              })
            }
          </List>
        </Dialog>
      </div>
    );
  }
}

AccountDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountDetails);