import React, { Component } from 'react';
import '../App/index.css';
import { db, storage } from '../../firebase';
import withAuthorization from '../Session/withAuthorization';
import compose from 'recompose/compose';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SaveIcon from '@material-ui/icons/Save';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Print from '@material-ui/icons/Print';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Chip from '@material-ui/core/Chip';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOutlined from '@material-ui/icons/VisibilityOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Face from '@material-ui/icons/Face';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import OpenInNew from '@material-ui/icons/OpenInNew';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { isoCurrencies } from '../../constants/iso-4217';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: '14px'
  },
  card: {},
  actions: {
    display: 'flex',
    padding: '16px 12px 8px 12px',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    textTransform: 'uppercase'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    marginBottom: '4px',
    backgroundRepeat: 'unset'
  },
  chip: {
    margin: theme.spacing.unit,
  },
  uploadButton: {
    position: 'absolute',
    right: '3px',
    bottom: '3px',
    color: '#03c457'
  },
  progress: {
    margin: theme.spacing.unit * 2,
    color: '#F8B000',
  },
  menuItem: {},
  primary: {},
  icon: {},
});

const difficultyColors = ['#008E3D', '#F8B000', '#ff1414']

class Recipe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.dataProp.userId,
      username: this.props.dataProp.username,
      loggedInUserId: this.props.dataProp.loggedInUserId,
      expanded: this.props.dataProp.showMore,
      dialogOpen: false,
      visibility: this.props.dataProp.publicChecked,
      isFavourite: this.props.dataProp.isFavourite,
      favouriteCounter: this.props.dataProp.favouriteCounter,
      recipeDeletable: this.props.dataProp.recipeDeletable,
      recipeEditable: this.props.dataProp.recipeEditable,
      visibilityEditable: this.props.dataProp.visibilityEditable,
      displayUserInfo: this.props.dataProp.displayUserInfo,
      uploadReady: false,
      file: '',
      imageUrl: this.props.dataProp.imageUrl,
      imageName: this.props.dataProp.imageName,
      uploading: false,
      isMine: this.props.dataProp.isMine,
      profilePicUrl: this.props.dataProp.profilePicUrl,
      withPhoto: this.props.dataProp.withPhoto,
      anchorEl: null,
    };
  }

  /**
   * Open or close recipe details
   */
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  /**
   * Delete recipe prop function
   * 
   * @param {string} id
   */
  handleDeleteRecipe = (id, image) => {
    if (this.props.dataProp.recipeDeletable) {
      this.props.deleteRecipeProp(id, image);
    }
  }

  /**
   * Open delete dialog
   */
  handleClickOpenDeleteDialog = () => {
    this.setState({ dialogOpen: true });
  };

  handleClickEditRecipe = () => {
    console.log('edit recipe');
  }

  /**
   * Close delete dialog
   */
  handleCloseDeleteDialog = () => {
    this.setState({ dialogOpen: false });
  };

  handleRecipeMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleRecipeMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  /**
   * Change recipe vibility
   * 
   * @param {string} recipeId 
   * @param {boolean} isPublic 
   */
  handleChangeVisibility(recipeId, isPublic) {
    db.updateRecipeVisibility(recipeId, !isPublic);

    this.setState({
      visibility: !isPublic
    });

    if (isPublic) {
      toast.success(this.props.languageObjectProp.data.myRecipes.toaster.removedFromPublic);
    } else {
      toast.success(this.props.languageObjectProp.data.myRecipes.toaster.addedToPublic);
    }
  }

  /**
   * User can add or remove recipe from favourites
   * 
   * @param {strin} recipeId 
   * @param {string} userId 
   */
  handleToggleFavourite(recipeId, userId) {
    let isFav = this.state.isFavourite;
    let newValue = !isFav;

    this.setState({
      isFavourite: newValue
    });

    db.toggleFavourite(userId, recipeId).then(recipe => {
      let recipeNew = recipe.snapshot.val();

      this.setState({
        favouriteCounter: recipeNew.favouriteCounter
      });
    });

    if (newValue) {
      toast.success(this.props.languageObjectProp.data.myRecipes.toaster.addedToFav);
    } else {
      toast.success(this.props.languageObjectProp.data.myRecipes.toaster.removedFromFav);
    }
  }

  fileAdded = (e) => {
    // max 10 MB
    const maxFileSize = 10485760;

    if (e.target.files.length) {
      let file = e.target.files[0];
      let fileType = file.type;

      if (fileType.includes("image") && file.size < maxFileSize) {
        this.setState({
          file,
          uploadReady: true
        });
      } else {

        if (file.size > maxFileSize) {
          toast.warn(this.props.languageObjectProp.data.myRecipes.toaster.fileTooBig);
        } else {
          toast.warn(this.props.languageObjectProp.data.myRecipes.toaster.chooseAnImage);
        }

        this.setState({
          file: '',
          uploadReady: false
        });

      }
    } else {
      this.setState({
        file: '',
        uploadReady: false
      });
    }
  }

  saveImage = () => {
    this.setState({
      uploading: true
    });

    storage.uploadImage(this.state.file).then(fileObject => {
      let fullPath = fileObject.metadata.fullPath;
      let name = fileObject.metadata.name;

      storage.getImageDownloadUrl(fullPath).then(url => {
        this.setState({
          imageUrl: url,
          imageName: name,
          uploading: false
        });

        this.setState({
          imageUrl: url,
          imageName: name
        });

        db.updateRecipeImageUrlAndName(this.props.dataProp.recipeId, url, name);
      });
    });
  }

  numberFormatter(number) {
    if (number > 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else if (number > 1000) {
      return (number / 1000).toFixed(1) + 'k';
    } else {
      return number;
    }
  }

  generatePdf = (print) => {
    let { dataProp, languageObjectProp } = this.props;

    let year = new Date(dataProp.creationTime).getFullYear();
    let month = languageObjectProp.data.months[new Date(dataProp.creationTime).getMonth()];
    let day = new Date(dataProp.creationTime).getDate();
    let creationTime = `${month} ${day}, ${year}`;

    let hour = dataProp.hour;
    let minute = dataProp.minute;

    let fileName = dataProp.title.split(" ").join("_");

    var docDefinition = {
      content: [
        { text: dataProp.title, fontSize: 18, style: 'header', margin: [0, 0, 0, 6] },
        { text: `${this.state.username}${languageObjectProp.data.Favourites.usersRecipe}`, margin: [0, 0, 0, 6] },
        { text: creationTime, color: 'grey', margin: [0, 0, 0, 6] },
        { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1 }], margin: [0, 0, 0, 15] },
        {
          text: [
            {
              text: `${languageObjectProp.data.myRecipes.newRecipe.form.category}: `, bold: true
            },
            `${languageObjectProp.data.myRecipes.newRecipe.categoryItems[dataProp.category]}`
          ],
          margin: [0, 0, 0, 15]
        },
        {
          text: [
            {
              text: `${languageObjectProp.data.myRecipes.newRecipe.form.story}: `, bold: true
            },
            `\n\n${dataProp.story}`
          ],
          margin: [0, 0, 0, 15]
        },
        {
          text: [
            {
              text: `${languageObjectProp.data.myRecipes.newRecipe.form.ingredients}: `, bold: true
            },
            `\n\n${dataProp.ingredients}`
          ],
          margin: [0, 0, 0, 15]
        },
        {
          text: [
            {
              text: `${languageObjectProp.data.myRecipes.newRecipe.form.longDes}: `, bold: true
            },
            `\n\n${dataProp.longDes}`
          ],
          margin: [0, 0, 0, 15]
        },
        {
          text: [
            {
              text: `${languageObjectProp.data.myRecipes.newRecipe.form.prepTimeShort}: `, bold: true
            },
            `${hour === '0' ?
              `${minute} ${languageObjectProp.data.myRecipes.myRecipes.minuteText}` :
              `${hour} ${languageObjectProp.data.myRecipes.myRecipes.hourText} ${minute} ${languageObjectProp.data.myRecipes.myRecipes.minuteText}`}`
          ],
          margin: [0, 0, 0, 6]
        },
        {
          text: [
            {
              text: `${languageObjectProp.data.myRecipes.newRecipe.form.dose}: `, bold: true
            },
            `${dataProp.dose}`
          ],
          margin: [0, 0, 0, 6]
        },
        {
          text: [
            {
              text: `${languageObjectProp.data.myRecipes.newRecipe.form.cost}: `, bold: true
            },
            `${dataProp.cost} ${dataProp.currency}`
          ],
          margin: [0, 0, 0, 6]
        },
      ]
    };

    setTimeout(() => {
      if (print) {
        pdfMake.createPdf(docDefinition).print();
      } else {
        pdfMake.createPdf(docDefinition).download(`${fileName}.pdf`);
      }

    }, 1000);
  }

  /**
   * Render function
   */
  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    const { languageObjectProp } = this.props;
    const data = this.props.dataProp;

    let year = new Date(data.creationTime).getFullYear();
    let month = languageObjectProp.data.months[new Date(data.creationTime).getMonth()];
    let day = new Date(data.creationTime).getDate();
    let creationTime = `${month} ${day}, ${year}`;

    let titleCharacters = data.title.split('');

    let hour = data.hour;
    let minute = data.minute;

    let urlToRecipe = `${data.url}/recipe/${data.recipeId}`;
    let urlToUser = `/user/${data.userId}`;
    let urlToEdit = `/edit/${data.recipeId}`;

    return (
      <div className="recipe-content">
        <Card className={classes.card + ' card-recipe'}>
          <CardHeader className="recipe-card-header"
            avatar={
              <Tooltip title={languageObjectProp.data.myRecipes.tooltips.recipeDifficulty[data.sliderValue]}>
                <Avatar aria-label="Recipe" className={classes.avatar} style={{ backgroundColor: difficultyColors[data.sliderValue] }}>
                  {titleCharacters[0]}
                </Avatar>
              </Tooltip>
            }
            action={
              <IconButton
                aria-owns={anchorEl ? 'recipe-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleRecipeMenuClick}
              >
                <MoreVertIcon />
              </IconButton>
            }
            title={data.title}
            subheader={creationTime}
          />
          {this.state.imageUrl !== "" ?
            <CardMedia
              className={`${classes.media} card-media-recipe ${data.fullSizeRecipe ? data.fullSizeRecipe : ''}`}
              image={this.state.imageUrl}
              title={languageObjectProp.data.myRecipes.myRecipes.recipeImage}
            />
            :
            this.state.withPhoto ?
              <div className="file-upload-container">
                <div className="file-upload-overlap">
                  <div>
                    {this.state.uploading ? <CircularProgress className={classes.progress} /> : <AddPhotoAlternateIcon />}
                  </div>
                </div>
                {this.state.uploadReady ?
                  <Tooltip title={languageObjectProp.data.myRecipes.tooltips.saveImage}>
                    <IconButton className={classes.uploadButton} aria-label="Delete">
                      <SaveIcon onClick={this.saveImage} />
                    </IconButton>
                  </Tooltip> : ''}
                <input type="file" onChange={(e) => { this.fileAdded(e) }} className="file-upload-input" />
              </div>
              :
              <div className="if-no-image-placeholder"></div>
          }

          {
            this.state.displayUserInfo ?
              <div className="user-container">
                <span>
                  {this.state.isMine ? languageObjectProp.data.Favourites.yourRecipe :
                    `${this.state.username}${languageObjectProp.data.Favourites.usersRecipe}`
                  }
                </span>

                <div
                  className="user-picture"
                  style={{ backgroundImage: `url(${this.state.profilePicUrl})` }}
                >
                  <Fab className="user-btn" size="small" aria-label="User" component={Link} to={urlToUser}>
                    {this.state.profilePicUrl ? '' : <div className="if-no-profile-image"><Face /></div>}
                  </Fab>
                </div>
              </div> : ''
          }

          <CardContent className="recipe-story-card-content">
            <Typography component="p">
              {data.story}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>

            <Tooltip title={this.state.isFavourite ? languageObjectProp.data.myRecipes.tooltips.removeFromFav : languageObjectProp.data.myRecipes.tooltips.addToFav}>
              <div className="fav-icon-and-counter">
                <IconButton
                  aria-label="heart"
                  onClick={() => { this.handleToggleFavourite(data.recipeId, this.state.loggedInUserId) }}
                  color="secondary"
                >
                  {this.state.isFavourite ? <FavoriteIcon className="fav-icon" /> : <FavoriteBorderIcon className="icon-outlined" />}
                </IconButton>
                {this.state.favouriteCounter ? <div className="fav-counter"><div>{this.numberFormatter(this.state.favouriteCounter)}</div></div> : ''}
              </div>
            </Tooltip>

            {this.state.visibilityEditable ?
              <Tooltip title={this.state.visibility ? languageObjectProp.data.myRecipes.tooltips.publicRecipe : languageObjectProp.data.myRecipes.tooltips.privateRecipe}>
                <IconButton
                  aria-label="eye"
                  onClick={() => { this.handleChangeVisibility(data.recipeId, this.state.visibility) }}
                >
                  {this.state.visibility ? <Visibility className="visibility-icon" /> : <VisibilityOutlined className="icon-outlined" />}
                </IconButton>
              </Tooltip> : ''
            }

            <Chip label={languageObjectProp.data.myRecipes.newRecipe.categoryItems[data.category]} className={classes.chip} />

            <Tooltip title={languageObjectProp.data.myRecipes.tooltips.more}>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded,
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </Tooltip>

          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent className="recipe-card-content">
              <Typography paragraph variant="body2">
                {languageObjectProp.data.myRecipes.myRecipes.ingredients + ':'}
              </Typography>
              <div className="recipe-ingredients-container">
                {data.ingredients.map((item, index) => {
                  return <Paper className="recipe-ingredients" key={index}>{item}</Paper>
                })}
              </div>
              <Typography paragraph variant="body2">
                {languageObjectProp.data.myRecipes.myRecipes.method + ':'}
              </Typography>
              <Typography paragraph className="long-description-container">
                {data.longDes}
              </Typography>
              <Chip label={`${data.dose} ${languageObjectProp.data.myRecipes.myRecipes.numDose}`} className="chip-card-content" />
              <Chip
                label={hour === '0' ?
                  `${minute} ${languageObjectProp.data.myRecipes.myRecipes.minuteText}` :
                  `${hour} ${languageObjectProp.data.myRecipes.myRecipes.hourText} ${minute} ${languageObjectProp.data.myRecipes.myRecipes.minuteText}`}
                className="chip-card-content"
              />
              <Chip label={`${data.cost} ${isoCurrencies[data.currency].symbol_native}`} className="chip-card-content" />
            </CardContent>
          </Collapse>
        </Card>

        <Menu
          id="recipe-menu"
          className="recipe-more-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleRecipeMenuClose}
        >
          {
            this.state.recipeEditable ?
              <MenuItem className={classes.menuItem} component={Link} to={urlToEdit}>
                <ListItemIcon
                  className={classes.icon + ' edit-recipe-btn'}
                >
                  <EditIcon />
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.primary }} inset primary={languageObjectProp.data.myRecipes.tooltips.editRecipe} />
              </MenuItem> : ''
          }
          {
            data.fullSizeRecipe === 'fullSizeRecipe' ? '' :
              <MenuItem className={classes.menuItem} component={Link} to={urlToRecipe}>
                <ListItemIcon
                  className={classes.icon}
                >
                  <OpenInNew />
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.primary }} inset primary={languageObjectProp.data.myRecipes.tooltips.openRecipeFullSize} />
              </MenuItem>
          }
          <MenuItem
            className={classes.menuItem}
            onClick={() => { this.generatePdf(false); this.handleRecipeMenuClose() }}
          >
            <ListItemIcon
              className={classes.icon}
            >
              <SaveAltIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary={languageObjectProp.data.myRecipes.tooltips.downloadRecipe} />
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            onClick={() => { this.generatePdf(true); this.handleRecipeMenuClose() }}
          >
            <ListItemIcon
              className={classes.icon}
            >
              <Print />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary={languageObjectProp.data.myRecipes.tooltips.printRecipe} />
          </MenuItem>
          {
            this.state.recipeDeletable ?
              <MenuItem className={classes.menuItem}
                onClick={() => { this.handleClickOpenDeleteDialog(); this.handleRecipeMenuClose() }}
              >
                <ListItemIcon
                  className={classes.icon + ' delete-recipe-btn'}
                >
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText className="delete-recipe-text" classes={{ primary: classes.primary }} inset primary={languageObjectProp.data.myRecipes.tooltips.deleteRecipe} />
              </MenuItem> : ''
          }

        </Menu>

        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleCloseDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          id='delete-recipe-dialog'
        >
          <DialogTitle id="alert-dialog-title">{languageObjectProp.data.myRecipes.myRecipes.modal.title}</DialogTitle>
          <DialogContent id="alert-dialog-content">
            <DialogContentText id="alert-dialog-description">
              {languageObjectProp.data.myRecipes.myRecipes.modal.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDeleteDialog} color="primary">
              {languageObjectProp.data.myRecipes.myRecipes.modal.cancel}
            </Button>
            <Button 
              onClick={() => { this.handleCloseDeleteDialog(); this.handleDeleteRecipe(data.recipeId, data.imageName ? data.imageName : this.state.imageName) }} 
              color="primary" 
              autoFocus
            >
              {languageObjectProp.data.myRecipes.myRecipes.modal.do}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

Recipe.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withAuthorization(authCondition), withStyles(styles))(Recipe);