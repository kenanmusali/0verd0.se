import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
	return (
		<div >
			<h1>404 — Page not found</h1>
			<p>The page you are looking for doesnt exist or has been moved.</p>
			<p>
				<Link to="/">Go back home</Link>
			</p>
		</div>
	)
}

export default Error
