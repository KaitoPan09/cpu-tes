import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./pages/global/Topbar"
import Dashboard from "./pages/dashboard";
import Sidebar from "./pages/global/Sidebar";
import AcademicYear from "./pages/academicyear";
import Users from "./pages/users";
import Departments from "./pages/department";
import Questionnaire from "./pages/questionnaire";
import Evaluation from "./pages/evaluation";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <div className="app">
            <Sidebar />
            <main className="content">
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/academicyear" element={<AcademicYear />} />
                <Route path="/users" element={<Users />} />
                <Route path="/department" element={<Departments />} />
                <Route path="/questionnaire" element={<Questionnaire />} />
                <Route path="/evaluation" element={<Evaluation />} />
              </Routes>
            </main>
            {/* <Sidebar /> */}
          </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
