import { QueryClient, QueryClientProvider  } from '@tanstack/react-query';

const queryClient = new QueryClient();

function MusicQueryProvider({children}){
    return(
        <QueryClientProvider client={queryClient} >
            {children}
        </QueryClientProvider>
    );
}

export default MusicQueryProvider;