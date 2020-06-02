import React from 'react'
// we have the "tilt" component now
import Tilt from 'react-tilt'
import './Logo.css';
import brain from './brain.png'

export default function Logo() {
	return (
		<div className='ma4 nt0'>
			<Tilt className="Tilt br2 shadow-2 tc" options={{ max : 45 }} style={{ height: 150, width: 150 }} >
				<div id='logo' className="Tilt-inner pa3">
					<img style={{paddingTop: '5px'}} alt='logo'src={brain}/>
				</div>
			</Tilt>
		</div>
	)
}