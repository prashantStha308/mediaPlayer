
const MusicPlayer = () => {

	const test={
		title: "Test123",
		artist: "Test",
		url: "/test.mp3",
		imgUrl: "/vite.svg"
	}

	return (
		<section className="fixed px-2 py-4 bg-gray-900 rounded-md border border-gray-600 bottom-2 left-2 right-2
		box-border flex justify-between items-center ">
			<div className="flex gap-2" >
				<div className="border border-white p-2" >
					<img src={test.imgUrl} alt="musicImg" />
				</div>
				<div className="grid content-evenly gap-0" >
					<span className=" p-0 m-0 text-left text-sm" > {test.title} </span>
					<span className=" p-0 m-0 text-xs text-left" > {test.artist} </span>
				</div>
			</div>

			<div>
				{/* player  */}
				Player
			</div>

			<div>
				{/* player controls */}
				controllers
			</div>
		</section>
	)
}

export default MusicPlayer