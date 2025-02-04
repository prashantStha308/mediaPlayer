import { BrowserRouter } from "react-router-dom";
import { Theme } from "@radix-ui/themes";
import Navbar from "./components/Navbar";

function App() {

  return(
    <>
      <BrowserRouter>
        <Theme>
          <div>
            <Navbar />
          </div>
        </Theme>
      </BrowserRouter>
    </>
  )
}

export default App;