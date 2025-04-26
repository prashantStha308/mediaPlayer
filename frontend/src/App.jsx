import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import './index.css';
import AppRoutes from "./App.routes";
import MusicPlayer from "./components/MusicPlayer";
import MusicQueryProvider from "./lib/reactQuery.config.jsx";

function App() {

	return(
		<>
			<BrowserRouter>
				<MusicQueryProvider>
					<div>
						<Navbar />
					</div>
					<div>
						<AppRoutes />
						<MusicPlayer />
					</div>
				</MusicQueryProvider>
			</BrowserRouter>
		</>
	)
}

export default App;