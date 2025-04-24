import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./component/Login.jsx";
import Signup from "./component/Signup.jsx";

createRoot(document.getElementById("root")).render(
   <BrowserRouter>
      <Routes>
         <Route index element={<App />}></Route>
         <Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="signup" element={<Signup />}></Route>
         </Route>
      </Routes>
   </BrowserRouter>
);
