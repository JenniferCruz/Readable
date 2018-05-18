import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';

class Categories extends Component {

  render() {
    const categories = this.props.categories;

    return (
      <div>
        <ul>
          <li><NavLink to="/" activeClassName="selected-category" exact>all</NavLink></li>
          {
            categories.map(c =>
              (<li key={c.name}>
                <NavLink to={c.path} activeClassName="selected-category" exact>
                  {c.name}
                </NavLink>
              </li>)
          )}</ul>
      </div>
    )
  }
}

function mapStateToProps ({ categories }) {
  return { categories }
}

export default connect(mapStateToProps)(Categories);
