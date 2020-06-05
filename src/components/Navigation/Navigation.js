import React from 'react'

export default function Navigation({ onRouteChange, isSignedIn }) {
		// if the user is signed in then display the 'sign out' link
		if (isSignedIn) {
			return (
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					{/* issue is here, if its set to signin, its goes to correct state but still shows signout button */}
					<p onClick={() => onRouteChange('signout')} className='f3 link din black underline pa3 pointer'>Sign Out</p>
				</nav>
			);
		} 
		else {
			return (
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					<p onClick={() => onRouteChange('signin')} className='f3 link din black underline pa3 pointer'>Sign In</p>
					<p onClick={() => onRouteChange('register')} className='f3 link din black underline pa3 pointer'>Register</p>
				</nav>
			);
		}
}