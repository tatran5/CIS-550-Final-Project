import React from 'react';
import PageNavbar from './PageNavbar';
import BestMoviesRow from './BestMoviesRow';
import '../style/BestMovies.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestMovies extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedDecade: "",
			selectedGenre: "",
			decades: [],
			genres: [],
			movies: []
		};

		this.submitDecadeGenre = this.submitDecadeGenre.bind(this);
		this.handleDecadeChange = this.handleDecadeChange.bind(this);
		this.handleGenreChange = this.handleGenreChange.bind(this);
	};

	/* ---- Q3a (Best Movies) ---- */
	componentDidMount() {
		// Send an HTTP request to the server.
		fetch("http://localhost:8081/genres",
		{
		  method: 'GET' // The type of HTTP request.
		}).then(res => {
		  // Convert the response data to a JSON.
		  return res.json();
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		}).then(list => {
		  if (!list) return;
	
		  const genres = list.map((obj, i) =>
		  	<option className='genresOption' value={obj.name}>{obj.name}</option>
		  );
	
		  this.setState({genres: genres});		  
		  this.setState({selectedGenre: list[0].name});	
		  console.log(`eh ${list[0].name}`)
		}, err => {	
		  // Print the error if there is one.
		  console.log(err);
		});
		
		// Send an HTTP request to the server.
		fetch("http://localhost:8081/decades",
		{
		  method: 'GET' // The type of HTTP request.
		}).then(res => {
		  // Convert the response data to a JSON.
		  return res.json();
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		}).then(list => {
		  if (!list) return;
	
		  const decades = list.map((obj, i) =>
		  	<option className='decadesOption' value={obj.decade}>{obj.decade}</option>
		  );
	
		  this.setState({decades: decades});
		  this.setState({selectedDecade: list[0].decade});	  
		}, err => {	
		  // Print the error if there is one.
		  console.log(err);
		});
	};
	

	/* ---- Q3a (Best Movies) ---- */
	handleDecadeChange(e) {
		this.setState({
			selectedDecade: e.target.value
		})
	};

	handleGenreChange(e) {
		this.setState({
			selectedGenre: e.target.value
		})
	};

	/* ---- Q3b (Best Movies) ---- */
	submitDecadeGenre() {		
		// Send an HTTP request to the server.
		const url = `http://localhost:8081/bestmovies/${this.state.selectedDecade}/${this.state.selectedGenre}`
		fetch(url,
		{
		  method: 'GET' // The type of HTTP request.
		}).then(res => {
		  // Convert the response data to a JSON.
		  return res.json();
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		}).then(list => {
		  if (!list) return;
	
		  const best_movies = list.map((obj, i) =>
			<BestMoviesRow 
				title={obj.title}
				movie_id={obj.movie_id}
				rating={obj.rating}
			/>
		  );

		  this.setState({movies: best_movies})
		}, err => {	
		  // Print the error if there is one.
		  console.log(err);
		});
	};

	render() {
		return (
			<div className="BestMovies">
				
				<PageNavbar active="bestgenres" />

				<div className="container bestmovies-container">
					<div className="jumbotron">
						<div className="h5">Best Movies</div>
						<div className="dropdown-container">
							<select value={this.state.selectedDecade} onChange={this.handleDecadeChange} className="dropdown" id="decadesDropdown">
								{this.state.decades}
							</select>
							<select value={this.state.selectedGenre} onChange={this.handleGenreChange} className="dropdown" id="genresDropdown">
								{this.state.genres}
							</select>
							<button className="submit-btn" id="submitBtn" onClick={this.submitDecadeGenre}>Submit</button>
						</div>
					</div>
					<div className="jumbotron">
						<div className="movies-container">
							<div className="movie">
			          <div className="header"><strong>Title</strong></div>
			          <div className="header"><strong>Movie ID</strong></div>
								<div className="header"><strong>Rating</strong></div>
			        </div>
			        <div className="movies-container" id="results">
			          {this.state.movies}
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
		);
	};
};
