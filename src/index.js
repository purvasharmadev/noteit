import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";

// AuthProvider
import { AuthProvider } from "./Auth/auth-context";
// NotesProvider
import {NotesProvider} from "./Context/notes-context"
// Call make Server

import {ArchiveProvider} from "./Context/archive-context"
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NotesProvider>
          <ArchiveProvider>
          <App />
          </ArchiveProvider>
        </NotesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
