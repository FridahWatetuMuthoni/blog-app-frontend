import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./dist/output.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalContextProvider } from "./context/GlobalContext.jsx";

const queryClient = new QueryClient({
  defaultOptions:{queries:{retry:5, reteyDelay:1000}}
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
