import "./App.css";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";

// register page | dashboard page

function App() {
  return (
    <div className="flex flex-col justify-center place-items-center mt-2 w-full">
      <div className="flex w-1/4">
        <Login />
      </div>
      <div className="flex w-1/4">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
