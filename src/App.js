import React from "react";
import "./App.css";
import Routes from "./routes/index.route";
import setTokenInHeader from "./utils/jwt";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/user.slice";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SocketContext, socket } from "./context/socket";
import Child from "components/Child";
const queryClient = new QueryClient();

function App() {
  var dispatch = useDispatch();

  if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setTokenInHeader(token);

    const decoded = jwt_decode(token);
    dispatch(setUser(decoded));
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      //logout dispatch will be called
      window.location.href = "./login";
    }
  }

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
