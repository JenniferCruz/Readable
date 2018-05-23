import React from 'react';
import { Link } from 'react-router-dom'
import FaPencil from 'react-icons/lib/fa/pencil';
import DeleteButton from './DeleteButton'
import LoadPostFormButton from './LoadPostFormButton'
import Vote from './Vote'
import { getDate } from '../utils/helpers'

export default function Post({ p, loadEditForm }) {
  return (
    <div className="post-snippet">
      <div className="post-snippet-score">
        <Vote item={p}/>
      </div>
      <div className="post-snippet-details">
        <h3><Link to={`${p.category}/${p.id}`}>{`${p.title}`}</Link></h3>
        <p>{`by ${p.author} on ${getDate(p.timestamp)}`}</p>
        <p>{`category: ${p.category}`}</p>
        <p>{`${p.commentCount} comments`}</p>

        <div className="post-controls">
          <LoadPostFormButton isOpen={true} post={p} />
          <DeleteButton item={p} cssClass="control-icon"/>
        </div>
      </div>
    </div>
  );
}
