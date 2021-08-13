import React from "react";
import "./App.css";
import Routes from "./routes/index.route";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SocketContext, socket } from "./context/SocketContext";
import { PeerContext, peer } from "./context/PeerContext";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      
        <SocketContext.Provider value={socket}>
          <div className="app">
            <Routes />
          </div>
        </SocketContext.Provider>
      
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
