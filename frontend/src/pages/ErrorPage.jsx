import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"


const ErrorPage = () => {

	const { status } = useParams();
	const [ title , setTitle ] = useState();
	const [ message , setMessage ] = useState();

	useEffect(() => {
		// Set details based on the status
		switch (status) {

			case "404":
				setTitle("Page Not Found");
				setMessage("This is not the page you're looking for.");
				break;
			case "500":
				setTitle("Server Error");
				setMessage("Something went wrong on our end.");
				break;
			default:
				setTitle("Unknown Error");
				setMessage("An unexpected error occurred.");
		}
	}, [status]); // Runs only when the status changes

	return (
		<main>
			{/* header */}
			<header>
				<h1> {status} </h1>
			</header>
			{/* body section */}
			<section>
				<h2> {title} </h2>
				<h4> {message} </h4>
			</section>
		</main>
	)
}

export default ErrorPage