import React from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import Topbar from "./pages/global/Topbar";
import Dashboard from "./pages/dashboard";
// import Sidebar from "./pages/global/Sidebar";
// import Sidebar from "./pages/global/sidebar/Sidebar";
import AcademicYear from "./pages/academicyear";
import Users from "./pages/users";
import Departments from "./pages/department";
import Questionnaire from "./pages/questionnaire";
import ManageQuestionnaire from "./pages/questionnaire/manageQuestionnaire"
import Evaluation from "./pages/evaluation";
import ViewEvaluation from "./pages/evaluation/viewEval";
import Survey from "./pages/survey";
import Reports from "./pages/reports";
import ReportDetails from "./pages/reports/reportDetails";
import Login from "./pages/login";
import Layout from "./components/Layout";
import RequireAuth from "./wrappers/requireAuth";
import SurveyForm from "./pages/survey/surveyForm";
import { MyProSidebarProvider } from "./pages/global/sideBarContext";
import FAQ from "./pages/faq";

import { AppContextProvider } from "./context/AppContext";
import ManageDepartment from "./pages/department/manageDepartment";
import { Colleges } from "./pages/colleges";
import ManageCollege from "./pages/colleges/manageCollege";
import { Profile } from "./pages/profile";

function App() {
  const [theme, colorMode] = useMode();

  // const isMediumBreakpoint = useMediaQuery(theme.breakpoints.down('md'));
  // const [toggled, setToggled] = React.useState(!isMediumBreakpoint);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <AppContextProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              {/* <div className="app"> */}
              {/* {isMediumBreakpoint ? null : <Sidebar />} */}
              {/* <Sidebar /> */}
              {/* {isMediumBreakpoint ? (
              <Sidebar
                onBackdropClick={() => setToggled(true)}
                toggled={toggled}
              />
            ) : (
              <Sidebar />
            )} */}
              {/* <main className="content"> */}
              {/* <Topbar /> */}
              {/* <Topbar onSidebarToggle={() => setToggled(!toggled)} /> */}
              <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
                <Route path="/acad_years" element={<AcademicYear />} />
                <Route path="/users" element={<Users />} />
                <Route path="/questionnaire" element={<Questionnaire />} />
                <Route path="/questionnaire/manage" element={<ManageQuestionnaire />} />
                <Route path="/evaluations" element={<Evaluation />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={["Admin", "Dean"]} />}>
                <Route path="/colleges" element={<Colleges />} />
                <Route
                  path="/colleges/:collegeId/manage"
                  element={<ManageCollege />}
                />
                <Route
                  path="/colleges/:collegeId/departments"
                  element={<Departments />}
                />
              </Route>
              <Route
                element={
                  <RequireAuth
                    allowedRoles={["Admin", "Dean", "Department Head"]}
                  />
                }
              >
                <Route
                  path="/departments/:deptId/manage"
                  element={<ManageDepartment />}
                />
              </Route>
              <Route
                element={
                  <RequireAuth
                    allowedRoles={["Admin", "Dean", "Department Head", "Secretary"]}
                  />
                }
              >
                <Route
                  path="/evaluations/:collegeId/view"
                  element={<ViewEvaluation />}
                />
                <Route path="/reports" element={<Reports />} />
                <Route
                  path="/reports/:evalId/reportDetails"
                  element={<ReportDetails />}
                />
              </Route>
              <Route
                element={
                  <RequireAuth
                    allowedRoles={[
                      "Admin",
                      "Dean",
                      "Department Head",
                      "Secretary",
                    ]}
                  />
                }
              >
                <Route
                  path="/evaluations/:collegeId/view"
                  element={<ViewEvaluation />}
                />
                <Route path="/faq" element={<FAQ />} />
              </Route>
              <Route
                element={
                  <RequireAuth
                    allowedRoles={[
                      "Admin",
                      "Dean",
                      "Department Head",
                      "Teacher",
                      "Student",
                      "Secretary",
                    ]}
                  />
                }
              >
                <Route path="/" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route
                element={
                  <RequireAuth
                    allowedRoles={[
                      "Admin",
                      "Dean",
                      "Department Head",
                      "Teacher",
                      "Student",
                    ]}
                  />
                }
              >
                <Route path="/survey" element={<Survey />} />
                <Route path="/survey/surveyForm" element={<SurveyForm />} />
              </Route>

              {/* </main> */}
              {/* <Sidebar /> */}
              {/* </div> */}
            </Route>
          </Routes>
        </AppContextProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
