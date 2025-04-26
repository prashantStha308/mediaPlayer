import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import './index.css';
import AppRoutes from "./App.routes";
import MusicQueryProvider from "./lib/reactQuery.config.jsx";
import BottomPlayer from "./components/BottomPlayer.jsx";

function App() {

	return(
		<>
			<BrowserRouter>
				<MusicQueryProvider>
					<div className="h-screen flex flex-col overflow-hidden">
						{/* Navbar sticky at top */}
						<div className="sticky top-0 z-50">
							<Navbar />
						</div>

						{/* Scrollable middle content */}
						<div className="flex-1 mx-2 my-1 rounded-lg bg-gray-900 border border-gray-700 p-3 flex flex-col overflow-hidden">
						{/* Now, a scrolling content div */}
						<div className="flex-1 overflow-y-auto rounded-md custom-scrollbar">
							<AppRoutes />
						</div>
					</div>

						{/* Bottom player sticky at bottom */}
						<div className="sticky bottom-0 z-50">
							<BottomPlayer />
						</div>
					</div>
				</MusicQueryProvider>
			</BrowserRouter>
		</>
	)
}

export default App;