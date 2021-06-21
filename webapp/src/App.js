import "@firebase/auth";
import "@firebase/firestore";
import Body from "./components/Body";
import "./styles.css";
import { AuthProvider } from "./contexts/AuthContext";

import React from "react";

export default function App() {
  return (
    <AuthProvider>
      <Body />
    </AuthProvider>
  );
}
