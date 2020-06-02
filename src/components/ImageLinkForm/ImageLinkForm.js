import React from 'react'
import './ImageLinkForm.css'

// instead of props.onInputChange, we just destructure it as:
export default function ImageLinkForm({ onInputChange, onButtonSubmit }) {
	return (
		<div>
			<p className='f3 tc'>
				{'This magic Brain will detect faces in your pictures. Give it a try.'}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type="tex" onChange={onInputChange}/>
						<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
						// onclick event that listens for the onbuttonsubmit
						onClick={onButtonSubmit}
						>Detect</button>
				</div>
			</div>
		</div>
	)
}