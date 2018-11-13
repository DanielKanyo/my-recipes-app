import React, { Component } from 'react';
import '../App/index.css';
// import { auth, db } from '../../firebase';
import withAuthorization from '../Session/withAuthorization';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

class Categories extends Component {

  /**
    * Constructor
    * 
    * @param {Object} props 
    */
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.mounted = true;
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
            <Paper className={classes.paper + ' paper-title paper-title-categories'}>
              <div className="paper-title-icon">
                <DashboardIcon />
              </div>
              <div className="paper-title-text">
                {languageObjectProp.data.menuItems[3]}
              </div>
            </Paper>

            <Grid container spacing={16} className="category-items-container">

              <Grid item xs={4} className="category-item">
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={"https://firebasestorage.googleapis.com/v0/b/my-recipes-app-f8c1b.appspot.com/o/recipe_images%2Fcloud.itextreme.hu5a9fa9eeae23b8.32934778.jpg?alt=media&token=21557bbe-720d-4d7c-995f-ed10231f2f67"}
                    title="Contemplative Reptile"
                  />
                  <CardContent className="category-item-title">
                    <Typography gutterBottom>
                      Pizzák
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4} className="category-item">
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={"https://firebasestorage.googleapis.com/v0/b/my-recipes-app-f8c1b.appspot.com/o/recipe_images%2Fcloud.itextreme.hu5a9fa9eeae23b8.32934778.jpg?alt=media&token=21557bbe-720d-4d7c-995f-ed10231f2f67"}
                    title="Contemplative Reptile"
                  />
                  <CardContent className="category-item-title">
                    <Typography gutterBottom>
                      Pizzák
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4} className="category-item">
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={"https://firebasestorage.googleapis.com/v0/b/my-recipes-app-f8c1b.appspot.com/o/recipe_images%2Fcloud.itextreme.hu5a9fa9eeae23b8.32934778.jpg?alt=media&token=21557bbe-720d-4d7c-995f-ed10231f2f67"}
                    title="Contemplative Reptile"
                  />
                  <CardContent className="category-item-title">
                    <Typography gutterBottom>
                      Pizzák
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser;

Categories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withAuthorization(authCondition), withStyles(styles))(Categories);