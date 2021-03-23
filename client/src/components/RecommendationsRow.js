import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RecommendationsRow extends React.Component {
	/* ---- Q2 (Recommendations) ---- */
	render() {
		return (
			<div className="movieResults">
				<div className="title">{this.props.title}</div>
				<div className="id">{this.props.movie_id}</div>
				<div className="rating">{this.props.rating}</div>
				<div className="votes">{this.props.num_ratings}</div>
			</div>
		);
	};
};
