import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import useComponentStore from "../store/component.store";

const SearchBar = ({ customWord , customSetter }) => {
  
  const { searchKey , setSearchKey } = useComponentStore();
  const handleSearch = (e)=>{
    const data = e.target.value;
    if( setSearchKey ){
      setSearchKey(data);
    }else{
      customSetter(data);
    }
  }
  
  return (
    // searchbar
    <section className="relative flex items-center  border border-gray-400 hover:border-gray-300 focus-within:border-gray-50 rounded-lg transition-all duration-150 ease-in group z-20" >
        <input className="outline-none text-sm px-3 py-1 " type="text" name="searchWord" id="searchWord" placeholder="Search Songs,Artists,Albums..." value={searchKey ?? customWord} onChange={handleSearch} />

        <button className="border-l border-gray-400 group-hover:border-gray-300 group-focus-within:border-gray-50  p-2 transition-all duration-150 ease-in " >
            <HiOutlineMagnifyingGlass />
        </button>
        
        {/* Decoration */}
        <div className="opacity-0 group-focus-within:opacity-100 transition-all duration-150 ease-in absolute w-full h-full border-2 rounded-lg border-white blur-xs -z-10 " ></div>
    </section>
  )
}

export default SearchBar