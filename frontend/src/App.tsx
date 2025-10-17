import { BrowserRouter } from "react-router";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
