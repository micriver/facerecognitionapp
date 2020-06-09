/*
resources:

--------------------------------------------------------------------------------
Tachyons
--------------------------------------------------------------------------------
Tachyons is like bootstrap 4 in that it has boilerplate components to use inside what renders your react components
tachyons signin div: http://tachyons.io/components/divs/sign-in/index.html
tachyons card: http://tachyons.io/components/cards/product-card/index.html

To get things centered, we want to remove the className "center" from the div tag

Also htmlFor JSX, we have to make sure the "class" is changed to "classNameName"

*/

import React from 'react'

// export default function Register({ onRouteChange }) {
class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// when state initializes, both properties will be empty strings
			email: '',
			password: '',
			name: ''
		}
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value})
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value})
	}
	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}



	// when the submit button is pressed
	onSubmitSignIn = () => {
		// console.log(this.state);
		// you have to make a connection to your SERVER's address!
		fetch('http://localhost:3000/register', {
			// second parameter of fetch desribes what the request will be
			method: 'post',
			// header's accepts an object and we want our content type to be json
			headers: {'Content-Type': 'application/json'},
			// the body will contain what we have in the state
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name
			})

		})
		// if there is an error and we want to stop people from signing in:
		.then(response => response.json())
		.then(user => {
			// if we get a user back, we take them to the homepage
			if (user.id) {
				// loading the user
				this.props.loadUser(user)
				// then changing the route to the home page of the app
				this.props.onRouteChange('home')
			}
		})
	}


	render () {
		// destructure to get onRouteChange method property from parent App.js
		// const {onRouteChange} = this.props

		return (
			<div>
				<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
					<main className="pa4 black-80">
						<div className="measure">
							<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
								<legend className="f2 fw6 ph0 mh0 center">Register</legend>
								<div className="mt3">
									<label className="db fw6 lh-copy f6 " htmlFor="name">Name</label>
									{/* in JSX you have to make sure the that input tags are closed off "/>" */}
									<input 
										className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
										type="text" 
										name="name"  
										id="name"
										onChange={this.onNameChange}
									/>
								</div>
								<div className="mt3">
									<label className="db fw6 lh-copy f6 " htmlFor="email-address">Email</label>
									<input 
										className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
										type="email" 
										name="email-address"  
										id="email-address"
										onChange={this.onEmailChange}
									/>
								</div>
								<div className="mv3">
									<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
									<input 
										className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
										type="password" 
										name="password"  
										id="password"
										onChange={this.onPasswordChange}
									/>
								</div>
							</fieldset>
							<div className="center">
								<input 
									// onClick={onRouteChange('home')} the function is run automatically when things are rendered when written like this
									// written as an arrow function, it is only called when clicked
									onClick={this.onSubmitSignIn}
									className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" 
									value="Register"
								/>
							</div>
						</div>
					</main>
				</article>
			</div>
		)
	}
}

export default Register;