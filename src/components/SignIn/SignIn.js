// resources:
// tachyons signin div: http://tachyons.io/components/divs/sign-in/index.html
// tachyons card: http://tachyons.io/components/cards/product-card/index.html

// Tachyons is like bootstrap 4 in that it has boilerplate components to use in your react stuff
// in JSX you have to make sure the that input tags are closed off "/>"

import React from 'react'

// old declaration
// export default function SignIn({ onRouteChange }) {
class SignIn extends React.Component {
	// create the state, in order to use props, we want to PASS props
	constructor(props) {
		super(props);
		this.state = {
			// when state initializes, both properties will be empty strings
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}
	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

	// when the submit button is pressed
	onSubmitSignIn = () => {
		// console.log(this.state);
		// you have to make a connection to your SERVER's address!
		fetch('http://localhost:3000/signin', {
			// second parameter of fetch desribes what the request will be
			method: 'post',
			// header's accepts an object and we want our content type to be json
			headers: {'Content-Type': 'application/json'},
			// the body will contain what we have in the state
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})

		})
		// if there is an error and we want to stop people from signing in:
		.then(response => response.json())
		.then(user => {
			if(user.id){
				this.props.loadUser(user);
				this.props.onRouteChange('home');
        }
		
		// old code 6.6.20
		// .then(data => {
		// 	// if data is equal to 'success', which is what we receive
		// 	if (data === 'success')
		// 		// then we'll do a route change to the home page of the app
		// 		this.props.onRouteChange('home')
		})
	}

	render () {
		// signIn receives the onRouteChange props from the onRouteChange function inside App.js
		const { onRouteChange } = this.props;
		return (
			// To get things centered, we want to remove the className "center" from the div tag
			// Also htmlFor JSX, we have to make sure the "className" is changed to "classNameName"
			<div>
				<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
					<main className="pa4 black-80">
						<div className="measure">
							<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
								<legend className="f2 fw6 ph0 mh0 center">Sign In</legend>
								<div className="mt3">
									<label className="db fw6 lh-copy f6 " htmlFor="email-address">Email</label>
									<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="email" 
									name="email-address"  
									id="email-address"
									// change the state property values to whatever is entered using the functions
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
									// change the state property values to whatever is entered using the functions
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
									value="Submit"
								/>
							</div>
							<div className="lh-copy mt3 center">
								<p onClick={() => onRouteChange( 'register' )} className="f6 link dim black db pointer">Register
								</p>
							</div>
						</div>
					</main>
				</article>
			</div>
		)
	}
}

export default SignIn;