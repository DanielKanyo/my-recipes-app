import React, { Component } from 'react';
import { auth, db } from '../../firebase';
import withAuthorization from '../Session/withAuthorization';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import FavRecipeItem from './FavRecipeItem';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = theme => ({});

class Favourites extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedInUserId: '',
    }
  }

  componentDidMount() {
    this.mounted = true;

    let loggedInUserId = auth.getCurrentUserId();

    this.setState({
      loggedInUserId
    });


    db.getUsersRecipes().then(resRecipes => {
      if (this.mounted) {
        let recipes = resRecipes;

        for (var key in recipes) {
          if (recipes.hasOwnProperty(key)) {

            let favouritesObject = recipes[key].favourites;

            if (favouritesObject) {
              if (favouritesObject.hasOwnProperty(loggedInUserId)) {

                console.log(recipes[key]);
                
              }
            }
          }
        }
      }
    });
  }

  /**
   * Sets 'mounted' property to false to ignore warning 
   */
  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { classes } = this.props;
    const { languageObjectProp } = this.props;
    return (
      <div className="ComponentContent">
        <Grid className="main-grid" container spacing={16}>
          <Grid item className="grid-component" xs={12}>
            <Paper className={classes.paper + ' paper-title paper-title-favourites'}>
              <div className="paper-title-icon">
                <FavoriteIcon />
              </div>
              <div className="paper-title-text">
                {languageObjectProp.data.menuItems[2]}
              </div>
            </Paper>

            <Grid item className="grid-component" xs={12}>
              <Grid className="sub-grid fav-recipes-grid" container spacing={16}>

                <FavRecipeItem />

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

Favourites.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withAuthorization(authCondition), withStyles(styles))(Favourites);