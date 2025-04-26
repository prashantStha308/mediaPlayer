import { create } from 'zustand';

const ComponentStore = create( (set) =>({
    currentPage: 'home',
    searchKey: "",
    setCurrentPage: (page)=>{set({ currentPage: page })},
    setSearchKey: (key)=>{set({ searchKey: key })},
}) );

const useComponentStore = ()=>  ComponentStore();
export default useComponentStore;