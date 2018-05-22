import React from 'react';
import { Link } from 'react-router-dom'
import DeleteButton from './DeleteButton'

export default function Post({ p, loadEditForm, deletePost }) {
  return (
    <div className="post">
      <h3><Link to={`${p.category}/${p.id}`}>{`${p.title}`}</Link></h3>
      <p>{`by ${p.author} on ${p.timestamp}`}</p>
      <p>{`category: ${p.category}`}</p>
      <p>{`scores: ${p.voteScore}`}</p>
      <p>{`${p.commentCount} comments`}</p>
      <p><em onClick={() => loadEditForm(true, p)}>Edit</em> | <DeleteButton id={p.id} /></p>
      <hr/>
    </div>
  );
}
