import { BrowserRouter } from "react-router-dom";
import './index.css';
import AppContent from "./AppContent.jsx";

function App() {

	return(
		<BrowserRouter>
			<AppContent />
		</BrowserRouter>
	)
}

export default App;