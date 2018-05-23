import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import LoadPostFormButton from './LoadPostFormButton'

class Header extends Component {

  render() {
    const isOpenPostForm = this.props.activeOptions.isOpenPostForm;

    return (
      <header>
        <div>
          <h1><Link to="/">Readable</Link></h1>
          <p>Another React Application</p>
        </div>
        <div>
            <LoadPostFormButton isOpen={isOpenPostForm} />
        </div>
      </header>
    );
  }
}


function mapStateToProps ({ activeOptions }) {
  return { activeOptions }
}

export default connect(mapStateToProps)(Header);
