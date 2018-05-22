import React from 'react';
import { Link } from 'react-router-dom'
import DeleteButton from './DeleteButton'
import LoadPostFormButton from './LoadPostFormButton'
import Vote from './Vote'

export default function Post({ p, loadEditForm }) {
  return (
    <div className="post">
      <h3><Link to={`${p.category}/${p.id}`}>{`${p.title}`}</Link></h3>
      <p>{`by ${p.author} on ${p.timestamp}`}</p>
      <p>{`category: ${p.category}`}</p>
      <p>{`scores: ${p.voteScore}`}</p>
      <p>{`${p.commentCount} comments`}</p>
      <p><LoadPostFormButton isOpen={true} post={p} displayText="Edit"/> | <DeleteButton id={p.id} /></p>
      <Vote post={p}/>
      <hr/>
    </div>
  );
}
