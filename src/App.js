// 1. Think about the components that need to be built for your app, list them out
// 2. Keep things SIMPLE, build them one at a time

// resources:
// Tilt react animation for logo: https://github.com/jonathandion/react-tilt
// Clarifai client installation instructions: https://docs.clarifai.com/api-guide/api-overview/api-clients
// Clarifai face detection model request: https://www.clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detection
// API Images information: https://docs.clarifai.com/api-guide/predict/images
// Clarifai portal login: https://portal.clarifai.com/apps/e14675fae1a64944a9d60d8191dec255
// model exports: https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js

import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
// const Clarifai = require('clarifai'); better way of writing this is below:
import Clarifai from 'clarifai';
import './App.css'

const app = new Clarifai.App({
	apiKey: '92c94abb70c3409f9125b334bbc742a4'
});

// const particleOptions = {
// 	polygon: {
// 		enable: true,
// 		type: 'inside',
// 		move: {
// 			radius: 10
// 		},
// 		url: 'path/to/svg.svg'
// 	}
// }

// We definitely need to create a state so that our app knows what the value is that the user enters, remembers it, and updates it anytime it gets changed.
// In order to do that, we will define a constructor

class App extends Component {
// function App() {
	constructor() {
		// call super to be able to use "this" variable
		super();
		this.state = {
			// the input is what the user will type, property on the left, empty string on the right
			input: '',
			// imageUrl should be displayed when we click on submit
			imageUrl: '',
			// we need a new state for the blue bounding box:
			// it will just be an empty object that will contain the values that we receive
			box: {},
		}
	}

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

	onButtonSubmit = () => {
		// console.log('click');
		// set the imageUrl with whatever the input is
		this.setState({imageUrl: this.state.input})

		// "app(dot)" is the API key variable we created above
		app.models.predict(
			Clarifai.FACE_DETECT_MODEL,
			// URL
			this.state.input
			)
			// calculatefacelocation takes the response and returns the object to displayFaceBox
			.then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
			.catch(err => console.log(err));
			// function(response) {
			//   // do something with response
			// //   console.log(response);
			// //  using this format below, you are "walking" through the JSON data that is returned from the API to PRINT the data we want
			// //   console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
			// 	// we want to call calculatefacelocation with the response data and since we're using classes, we'll have use "this(dot)"
			// 	this.calculateFaceLocation(response);
			// },
	}

	render() {
		return (
			<div>
				<Particles className='particles'/>
				{/* <Particles params={particleOptions} /> */}
				<Navigation />
				<Logo />
				{/* username and rank compared to other users who have submitted pictures */}
				<Rank />
				{/* OnInputChange is a property of the app component, so it needs to have "this." attached */}
				<ImageLinkForm 
					onInputChange={this.onInputChange} 
					onButtonSubmit={this.onButtonSubmit}
				/>
				{/* to display the photo that is being put through the site */}
				<FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
			</div>
		);
	}
}

export default App;