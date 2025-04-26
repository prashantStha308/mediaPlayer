import { RxHamburgerMenu } from "react-icons/rx";
import SearchBar from "./SearchBar"
import { useEffect, useRef, useState } from "react";
import useComponentStore from "../store/component.store";
import { Link } from "react-router-dom";

const Navbar = () => {

	const [isOpen, setIsOpen] = useState(false);
	const navbarRef = useRef();
	const { currentPage , setCurrentPage } = useComponentStore();
	const navlinks =
	<>
		<Link to={'/'} ><li className={`list-items ${ currentPage === "home" && "text-purple-300" }`} onClick={()=>setCurrentPage('home')} >Home</li></Link>
		<Link to={'/player'} ><li className={`list-items ${ currentPage === "player" && "text-purple-300" }`} onClick={()=>setCurrentPage('player')} >Player</li></Link>
		<Link to={'/upload'} ><li className={`list-items hidden lg:block ${ currentPage === "library" && "text-purple-300" }`} onClick={()=>setCurrentPage('upload')}  >Upload</li></Link>
	</>;

	const toggleNavbar = () => {
	setIsOpen(!isOpen);
	};

	const closeNavbar = (e) => {
	if (navbarRef.current && !navbarRef.current.contains(e.target)) {
		setIsOpen(false);
	}
	};

	useEffect(() => {
	if (isOpen) {
		document.addEventListener("mousedown", closeNavbar);
	} else {
		document.removeEventListener("mousedown", closeNavbar);
	}
	return () => {
		document.removeEventListener("mousedown", closeNavbar);
	};
	}, [isOpen]);

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-gray-900 border border-gray-700 rounded-md m-2 mt-1" >
		{/* Logo on left for larger devices only */}
		<Link to={'/'} className="hidden lg:block" >
			<img src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png" height={90} width={90} alt="logo" />
		</Link>
		{/* hamburger button */}
		<button className="lg:hidden p-3 rounded-full hover:bg-gray-700 transition-all duration-150 ease-in " onClick={toggleNavbar} >
			<RxHamburgerMenu size={25} />
		</button>
		{/* search bar */}
		<SearchBar />
		{/* nav links from larger screens */}
		<nav className="hidden lg:flex items-center gap-4" >
			<ul className=" flex gap-4 cursor-pointer px-8" >
				{navlinks}
			</ul>
			<div>
				<img className="rounded-full w-10 aspect-square" src="https://secure.gravatar.com/avatar/52168962f3d5dfc43a30c789f8fc03ef?s=96&d=mm&r=g" alt="placeholder_img" />
			</div>
		</nav>

		{/* navlinks for upto medium screens */}
		{isOpen &&
			<nav className="absolute left-0 top-0 grid gap-4 min-h-screen w-full bg-black/50 z-50">
				<div className=" absolute left-0 w-56 min-h-screen grid content-start gap-8 bg-gray-900" ref={navbarRef} >
					<div className="grid gap-4 border-b  border-white p-4" >
						<div className="grid gap-4 justify-center" >
							<h1 className="text-center text-xl p-4" > Music Player </h1>
							<ul className="grid gap-2" >
								{navlinks}
							</ul>
						</div>
						<Link to={"/upload"} className="bg-purple-600 py-1 px-2 rounded-md cursor-pointer hover:bg-purple-700 transition-all duration-150 ease-out text-center " >
							<button>
								Upload
							</button>
						</Link>
					</div>
				</div>
			</nav>
		}
		{/* profile pic  */}
		<div className="lg:hidden rounded-full" >
			<img className="rounded-full w-10 aspect-square" src="https://secure.gravatar.com/avatar/52168962f3d5dfc43a30c789f8fc03ef?s=96&d=mm&r=g" alt="placeholder_img" />
		</div>
      
    </header>
  )
}

export default Navbar