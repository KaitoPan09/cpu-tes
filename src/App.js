import React from 'react';  
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider} from "@mui/material";
import { Routes, Route } from "react-router-dom";
// import { useState } from "react";
import Topbar from "./pages/global/Topbar"
import Dashboard from "./pages/dashboard";
import Sidebar from "./pages/global/Sidebar";
// import Sidebar from "./pages/global/sidebar/Sidebar";
import AcademicYear from "./pages/academicyear";
import Users from "./pages/users";
import Departments from "./pages/department";
import Questionnaire from "./pages/questionnaire";
import Evaluation from "./pages/evaluation";
import ViewEvaluation from "./pages/evaluation/viewEval";
import Survey from "./pages/survey";
import StudentSurvey from "./pages/survey/studentSurvey";
import Reports from "./pages/reports";
import ReportDetails from "./pages/reports/reportDetails";

function App() {
  const [theme, colorMode] = useMode();

  // const isMediumBreakpoint = useMediaQuery(theme.breakpoints.down('md'));
  // const [toggled, setToggled] = React.useState(!isMediumBreakpoint);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
          <div className="app">
            {/* {isMediumBreakpoint ? null : <Sidebar />} */}
            <Sidebar />
            {/* {isMediumBreakpoint ? (
              <Sidebar
                onBackdropClick={() => setToggled(true)}
                toggled={toggled}
              />
            ) : (
              <Sidebar />
            )} */}
            <main className="content">
              <Topbar />
              {/* <Topbar onSidebarToggle={() => setToggled(!toggled)} /> */}
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/academicyear" element={<AcademicYear />} />
                <Route path="/users" element={<Users />} />
                <Route path="/department" element={<Departments />} />
                <Route path="/questionnaire" element={<Questionnaire />} />
                <Route path="/evaluation" element={<Evaluation />} />
                <Route path="/evaluation/viewEval" element={<ViewEvaluation />} />
                <Route path="/survey" element={<Survey />} />
                <Route path="/survey/studentSurvey" element={<StudentSurvey />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/reports/reportDetails" element={<ReportDetails />} />
              </Routes>
            </main>
            {/* <Sidebar /> */}
          </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
