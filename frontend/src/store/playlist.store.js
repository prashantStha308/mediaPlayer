import { create } from 'zustand';
import { getMusicById } from '../services/music.services';

const PlaylistStore = create( set => ({
    playlist: [],
    setPlaylist: (playlist)=>{set({playlist})},
    loadPlaylist: ( tracks = [] ) => {
        set( state =>{
            const uniqueTracks = tracks.filter( item => !state.playlist.some( playlistItem => playlistItem._id === item._id ) );
            return { playlist: [...state.playlist , ...uniqueTracks] };
        } );
    },
    addMusicToPlaylist: async (id)=>{
        try {
            const res = await getMusicById(id);
            if( res.success ){
                const data = res.data;
                set(state => {
                    // Check if the item is already in the playlist, add only if not present
                    if (state.playlist.some(item => item._id === data._id)) {
                        return { playlist: state.playlist };
                    } else {
                        return { playlist: [...state.playlist, data] };
                    }
                });
                return res;
            }else{
                throw new Error(res);
            }
        } catch (error) {
            return error;
        }
    },
    removeFromPlaylist: (id)=>{
        set( state=>({ playlist: state.playlist.filter( item => item._id !== id ) }) );
    },
    getCurrentIndex: (id)=>{
        const {playlist} = PlaylistStore.getState();
        return playlist.findIndex( item => item._id === id );
    }
}) )

const usePlaylistStore = ()=> PlaylistStore();
export default usePlaylistStore;