import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, TextField, TextareaField, SubmitField } from 'react-components-form';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import * as Actions from '../actions'

class CommentForm extends Component {

  toggleForm( e, isOpen ) {
    e.preventDefault();
    this.props.dispatch(Actions.toggleCommentForm(isOpen));
  }

  render() {
    const isClose = !this.props.activeOptions.isOpenCommentForm;
    return isClose ? (
      <div>
        <hr/>
        Add new comment <em onClick={e => this.toggleForm(e, !isClose)}><FaPlusCircle/></em>
        <hr/>
      </div>
    ) :
    (<div>
        <hr/>
        <em onClick={e => this.toggleForm(e, !isClose)}>X</em>
        <Form onSubmit={model => console.log(model)}
          onError={(errors, data) => console.log('error', errors, data)} >
            <TextField name="username" label="username" type="text" />
            <TextareaField name="body" label="comment" type="textarea" />
            <SubmitField value="save comment" />
        </Form>
        <hr/>
      </div>)
  }
}


function mapStateToProps ({ activeOptions }) {
  return { activeOptions }
}

export default connect(mapStateToProps)(CommentForm);
