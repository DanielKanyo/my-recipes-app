import React, { Component } from 'react';
import AuthUserContext from '../Session/AuthUserContext';

import NavigationAuth from './NavigationAuth';
import NavigationNonAuth from './NavigationNonAuth';

class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => authUser
          ? <NavigationAuth languageObjectProp={this.props.languageObjectProp} setLanguageProp={this.props.setLanguageProp} />
          : <NavigationNonAuth />
        }
      </AuthUserContext.Consumer>
    )
  }
}

export default Navigation
