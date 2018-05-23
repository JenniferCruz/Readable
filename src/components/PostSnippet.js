import React from 'react';
import { Link } from 'react-router-dom'
import FaPencil from 'react-icons/lib/fa/pencil';
import DeleteButton from './DeleteButton'
import LoadPostFormButton from './LoadPostFormButton'
import Vote from './Vote'

export default function Post({ p, loadEditForm }) {
  return (
    <div className="post-snippet">
      <Vote item={p}/>
      <div className="post-snippet-details">
        <h3><Link to={`${p.category}/${p.id}`}>{`${p.title}`}</Link></h3>
        <p>{`by ${p.author} on ${p.timestamp}`}</p>
        <p>{`category: ${p.category}`}</p>
        <p>{`scores: ${p.voteScore}`}</p>
        <p>{`${p.commentCount} comments`}</p>

        <div className="post-snippet-controls">
          <LoadPostFormButton isOpen={true} post={p}
            displayText={<FaPencil/>} cssClass="snippet-control-icon"/>
          <DeleteButton item={p} cssClass="snippet-control-icon"/>
        </div>
      </div>
    </div>
  );
}
