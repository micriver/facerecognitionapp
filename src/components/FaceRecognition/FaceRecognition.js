import React from 'react'
import './FaceRecognition.css'

// to display the image for facial recognition
export default function FaceRecognition({ imageUrl, box }) {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputImage' alt='' src={ imageUrl } width='500px' height='auto'/>
				{/* second div for the box prop that will be empty since we're using css to display the box */}
				<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
			</div>
		</div>
	)
}