import { Link } from "react-router-dom";

const ListTile = ({ track={} }) => {

	return (
		<Link to={`/player/${track._id}`} >
			<section className=" relative flex items-center justify-start gap-4 border border-gray-700 rounded-md px-4 py-2 max-w-xs overflow-hidden group" >
				<div className="bg-white rounded-xs p-2 z-30 " >
					<img src={ track.imageUrl || "/defaultImg.svg"} alt="musicImg" width={40} height={40} />
				</div>
				<div className="grid content-evenly gap-0 z-30" >
					<span className="text-left text-sm" > { track.title || "Unknown Title"} </span>
					<span className="text-xs text-left" > { track.artist || "Unknown Artist"} </span>
				</div>

				{/* decorations */}
				<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-purple-950 to-purple-300 z-20 rounded-md blur-2xl opacity-0 group-hover:opacity-80 transition-all duration-100 ease-in-out" ></div>

			</section>
		</Link>
  )
}

export default ListTile