/*

1. Think about the components that need to be built for your app, list them out
2. Keep things SIMPLE, build them one at a time

resources:
Andrei's Github page of the app: https://github.com/aneagoie/face-recognition-brain/blob/master/src/App.js
Tilt react animation for logo: https://github.com/jonathandion/react-tilt
Clarifai client installation instructions: https://docs.clarifai.com/api-guide/api-overview/api-clients
Clarifai face detection model request: https://www.clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detection
API Images information: https://docs.clarifai.com/api-guide/predict/images
Clarifai portal login: https://portal.clarifai.com/apps/e14675fae1a64944a9d60d8191dec255
model exports: https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js

*/

import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
// const Clarifai = require('clarifai'); better way of writing this is below:
import Clarifai from 'clarifai';
import './App.css'

const app = new Clarifai.App({
	apiKey: '92c94abb70c3409f9125b334bbc742a4'
});

const initialState = {
	// the input is what the user will type, property on the left, empty string on the right
	input: '',
	// imageUrl should be displayed when we click on submit
	imageUrl: '',
	// we need a new state for the blue bounding box:
	// it will just be an empty object that will contain the values that we receive
	box: {},
	// route state keeps track of where the user is on the page, it starts in the "signin" position
	route: 'signin',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	}
}

// We definitely need to create a state so that our app knows what the value is that the user enters, remembers it, and updates it anytime it gets changed.
// In order to do that, we will define a constructor
class App extends Component {
// function App() {
	constructor() {
		// call super to be able to use "this" variable
		super();
		this.state = initialState;
	}

	loadUser = (data) => {
		// update the state with the user we recieve from child "register"
		this.setState({user: {
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined
		}})
	}

	// in order for our React App to communicate with our server that we've created, we do this to check:
	// componentDidMount() {
	// 	// url and portnumber for server we've created
	// 	fetch('http://localhost:3000')
	// 		.then(response => response.json())
	// 		.then(console.log);
	// }

// 	all these functions are properties of the App class and must be dereferenced as part of an object when sending props to your components

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);
		// console.log(width, height);
		// we want to return an object that will fill up the box state
		return {
			// this left column is the percentage of the width of the image and when you multiply that percentage by the width of the image, it'll show where the left column should be
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)
			//the value's after clarifaiFace are coming from the bounding box json data so the underscore spelling is important
		}
	}

	displayFaceBox = (box) => {
		console.log(box);
		this.setState({box});
	}

	// anytime there's some sort of event listener on a webpage, we receive an event
	// this function's results are passed as a property to ImageLinkForm Component
	onInputChange = (event) => {
		// the way to get the value from the input is 'target'.'value'.'input'
		// console.log(event.target.value);
		this.setState({input: event.target.value});
	}

	onPictureSubmit = () => {
		// console.log('click');
		// set the imageUrl with whatever the input is
		this.setState({imageUrl: this.state.input});
		// "app(dot)" is the API key variable we created above
		app.models
			.predict(
				Clarifai.FACE_DETECT_MODEL,
				// URL
				this.state.input)
			// calculatefacelocation takes the response and returns the object to displayFaceBox
			.then(response => {
				if (response) {
				fetch('http://localhost:3000/image', {
					method: 'put',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						// this is the state the user has when they sign in 
						id: this.state.user.id
						})
					})
					.then(response => response.json())
					.then(count => {
						// since we're just changing the user object
						this.setState(Object.assign(this.state.user, { entries: count }))
					})
				}
			this.displayFaceBox(this.calculateFaceLocation(response))
			})
			.catch(err => console.log(err));
	}

	// we need to dynamically change the route
	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState(initialState)
		}
		// if we are at the home page, past the login, we want to set "signedIn" as true
		else if (route === 'home') {
			this.setState({isSignedIn: true})
		}
		this.setState({route: route});
	}

	render() {
		const { isSignedIn, route, box, imageUrl } = this.state;
		return (
			<div>
				<Particles className='particles'/>
				{/* <Particles params={particleOptions} /> */}
				<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
				{route === 'home'
					? <div>
						<Logo />
						{/* username and rank compared to other users who have submitted pictures */}
						<Rank name={this.state.user.name} entries={this.state.user.entries}/>
						{/* OnInputChange is a property of the app component, so it needs to have "this." attached */}
						<ImageLinkForm 
							onInputChange={this.onInputChange} 
							onPictureSubmit={this.onPictureSubmit}
						/>
						{/* to display the photo that is being put through the site */}
						<FaceRecognition box={box} imageUrl={imageUrl}/>
						</div>
					:  (
						// both routes are needed in case you signout to bring the user back to the start
						route === 'signin' || route === 'signout'
						? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
						// pass functions to children components
						: <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
					)
				}
			</div>
		);
	}
}

export default App;