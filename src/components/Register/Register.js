// resources:
// tachyons signin div: http://tachyons.io/components/divs/sign-in/index.html
// tachyons card: http://tachyons.io/components/cards/product-card/index.html
import React from 'react'

// signIn receives the onRouteChange props from the onRouteChange function inside App.js
export default function Register({ onRouteChange }) {
	return (
		// Tachyons is like bootstrap 4 in that it has boilerplate components to use in your react stuff
		// in JSX you have to make sure the that input tags are closed off "/>"

		// To get things centered, we want to remove the className "center" from the div tag
		// Also htmlFor JSX, we have to make sure the "className" is changed to "classNameName"
		<div>
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
					<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f2 fw6 ph0 mh0 center">Register</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6 " htmlFor="name">Name</label>
								<input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
							</div>
							<div className="mt3">
								<label className="db fw6 lh-copy f6 " htmlFor="email-address">Email</label>
								<input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
								<input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
							</div>
						</fieldset>
						<div className="center">
							<input 
								// onClick={onRouteChange('home')} the function is run automatically when things are rendered when written like this
								// written as an arrow function, it is only called when clicked
								onClick={() => onRouteChange('home')}
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
