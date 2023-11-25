import { createContext, useState, useEffect } from "react";
import { saveState, loadState } from "../../utils/LocalStorage";
import { useContext } from "react";
import dayjs from "dayjs";
import Cookies from "js-cookie";
export const AuthContext = createContext({});
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(loadState("authState"));
  const [academicYear, setAcademicYear] = useState(loadState("academicYear"));
  const [userInfo, setUserInfo] = useState(loadState("userInfo"));
  const fetchUserInfo = async () => {
    const response = await fetch(
      `/api/auth/user_info?school_id=${auth.school_id}&role=${auth.role}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.ok) {
      const json = await response.json();
      setUserInfo(json);
    } else {
      setAuth({});
      setAcademicYear({});
      setUserInfo({});
    }
  };
  useEffect(() => {
    // if (auth?.isAuthenticated) {
    //   console.log("fetch");
    //   fetchUserInfo();
    // }
    saveState(auth, "authState");
    saveState(academicYear, "academicYear");
    saveState(userInfo, "userInfo");
  }, [auth, academicYear, userInfo]);
  const login = async (credentials) => {
    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        school_id: credentials.school_id,
        password: credentials.password,
      }),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        return {
          isValid: false,
          error: "Something went wrong. Please try again later.",
        };
      }
    });

    if (response?.isValid) {
      const auth = {
        role: response.role,
        school_id: response.school_id,
        isAuthenticated: true,
      };
      const academicYear = {
        id: response.acad_year.id,
        semester: response.acad_year.semester,
        start_date: dayjs(response.acad_year.start_date).format("MM-DD-YYYY"),
        end_date: dayjs(response.acad_year.end_date).format("MM-DD-YYYY"),
        year: response.acad_year.year,
      };
      const userInfo = {
        user_id: response.user_id,
        student_id: response.student_id,
        faculty_id: response.faculty_id,
        name: response.name,
        email: response.email,
        course: response.course,
        year_level: response.year_level,
        college_id: response.college_id,
        dept_id: response.dept_id,
        college: response.college,
        department: response.department,
      };
      setAuth(auth);
      setAcademicYear(academicYear);
      setUserInfo(userInfo);
      // setAuth({
      //   name: response.name,
      //   department: response.department,
      //   dept_id: response.dept_id,
      //   email: response.email,
      //   role: response.role,
      //   school_id: response.school_id,
      //   user_id: response.user_id,
      //   student_id: response.student_id,
      //   isAuthenticated: true,
      // });
    }
    return response;
  };
  const logout = async () => {
    const response = await fetch(`api/auth/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": Cookies.get("csrf_access_token"),
      },
      credentials: "include",
    });
    setAuth({});
    setAcademicYear({});
    setUserInfo({});
  };
  const validateAuth = async () => {
    const response = await fetch(`/api/auth/validate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((resp) => resp.json());
    if (response.isValid) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        academicYear,
        setAcademicYear,
        userInfo,
        login,
        logout,
        validateAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
// export const useAuthContext = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuthContext must be used within an AuthProvider");
//   }
//   return context;
// };
