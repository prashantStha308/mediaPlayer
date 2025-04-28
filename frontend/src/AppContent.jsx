import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import './index.css';
import AppRoutes from "./App.routes";
import MusicQueryProvider from "./lib/reactQuery.config.jsx";
import BottomPlayer from "./components/BottomPlayer.jsx";
import AudioElement from "./lib/AudioElement.jsx";

function AppContent() {
	const location = useLocation();
    const isPlayerPage = location.pathname.startsWith('/player');

	return(
        <MusicQueryProvider>
            <AudioElement />
            <div className="h-screen flex flex-col overflow-hidden">
                {/* Navbar sticky at top */}
                <div className="sticky top-0 z-50">
                    <Navbar />
                </div>

                <div className="flex-1 mx-2 my-1 rounded-lg bg-gray-900 border border-gray-700 p-3 flex flex-col overflow-hidden">
                    {/* Scrollable middle content */}
                    <div className="flex-1 overflow-y-auto rounded-md custom-scrollbar">
                        <AppRoutes />
                    </div>
                </div>
                {/* Bottom player sticky at bottom */}
                { !isPlayerPage &&
                    <div className="sticky bottom-0 z-50">
                        <BottomPlayer />
                    </div>
                }
            </div>
        </MusicQueryProvider>
	)
}

export default AppContent;