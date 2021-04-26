import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Home from './Home'
import NavBar from './helpers/NavBar'
import ForDish from './ForDish'
import ForLazyCooking from './ForLazyCooking'
import ForRestrictionsNeeds from './ForRestrictionsNeeds'

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<NavBar />
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => <Home />}
						/>
						<Route
							path="/home"
							render={() => <Home />}
						/>
						<Route
							path="/for-a-dish"
							render={() => <ForDish />}
						/>
						<Route
							path="/for-lazy-cooking"
							render={() => <ForLazyCooking />}
						/>
						<Route
							path="/for-restrictions-and-needs"
							render={() => <ForRestrictionsNeeds />}
						/>
					</Switch>
				</Router>
			</div>
		);
	};
};