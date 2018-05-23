import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';

class Categories extends Component {

  render() {
    const categories = this.props.categories;

    return (
      <div className="categories">
        <div className="section-header">
          <h2>Categories</h2>
        </div>
        <div className="section-content">
          <ul className="category-list">
            <li><NavLink to="/" activeClassName="selected-category" exact>all</NavLink></li>
            {
              categories.map(c =>
                (<li key={c.name}>
                  <NavLink to={`/${c.path}`} activeClassName="selected-category">
                    {c.name}
                  </NavLink>
                </li>)
            )}</ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ categories }) {
  return { categories }
}

export default connect(mapStateToProps)(Categories);
