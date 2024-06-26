import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material";
import { palette } from "@mui/system";

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#cccce6",
          200: "#9999cc",
          300: "#6666b3",
          400: "#333399",
          500: "#000080",
          600: "#000066",
          700: "#00004d",
          800: "#000033",
          900: "#00001a",
        },
        darkBlue: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#1F2A40",
          500: "#141b2d",
          600: "#f2f0f0",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
        yellowAccent: {
          100: "#fff7cc",
          200: "#ffef99",
          300: "#ffe766",
          400: "#ffdf33",
          500: "#ffd700",
          600: "#ccac00",
          700: "#998100",
          800: "#665600",
          900: "#332b00",
        },
        orangeAccent: {
          100: "#ffedcc",
          200: "#ffdb99",
          300: "#ffc966",
          400: "#ffb733",
          500: "#ffa500",
          600: "#cc8400",
          700: "#996300",
          800: "#664200",
          900: "#332100",
        },
        pinkAccent: {
          100: "#fff0f3",
          200: "#ffe2e6",
          300: "#ffd3da",
          400: "#ffc5cd",
          500: "#ffb6c1",
          600: "#cc929a",
          700: "#996d74",
          800: "#66494d",
          900: "#332427",
        },
        purpleAccent: {
          100: "#fafafe",
          200: "#f5f5fd",
          300: "#f0f0fc",
          400: "#ebebfb",
          500: "#e6e6fa",
          600: "#b8b8c8",
          700: "#8a8a96",
          800: "#5c5c64",
          900: "#2e2e32"
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#00001a",
          200: "#000033",
          300: "#00004d",
          400: "#000066",
          500: "#000080",
          600: "#333399",
          700: "#6666b3",
          800: "#9999cc",
          900: "#cccce6",
        },
        darkBlue: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#f2f0f0",
          500: "#141b2d",
          600: "#434957",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#db4f4a",
          // 700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
        yellowAccent: {
          100: "#332b00",
          200: "#868dfb",
          // 200: "#665600",
          300: "#998100",
          400: "#6870fa",
          // 400: "#ccac00",
          500: "#3da2bd",
          // 500: "#ffd700",
          600: "#ffdf33",
          700: "#ffe766",
          800: "#ffef99",
          900: "#fff7cc",
        },
        orangeAccent: {
          100: "#332100",
          // 200: "#664200",
          200: "#ffdb99",
          300: "#996300",
          400: "#cc8400",
          500: "#ffa500",
          600: "#ffb733",
          700: "#ffc966",
          800: "#ffdb99",
          900: "#ffedcc",
        },
        pinkAccent: {
          100: "#332427",
          200: "#66494d",
          300: "#996d74",
          400: "#cc929a",
          500: "#ffb6c1",
          600: "#ffc5cd",
          700: "#ffd3da",
          800: "#ffe2e6",
          900: "#fff0f3",
        },
        purpleAccent: {
          100: "#2e2e32",
          200: "#5c5c64",
          300: "#8a8a96",
          400: "#b8b8c8",
          500: "#e6e6fa",
          600: "#ebebfb",
          700: "#f0f0fc",
          800: "#f5f5fd",
          900: "#fafafe",
        }
      }),
});

//mui theme settings
export const themeSetting = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              // main: colors.primary[500],
              main: colors.yellowAccent[500],
              sub: colors.darkBlue[400],
            },
            secondary: {
              main: colors.yellowAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[900],
          },
          pdf: {
            main: colors.grey[100],
            sub: colors.grey[200]
            }
          }
        : {
            primary: {
              main: colors.primary[100],
              sub: colors.darkBlue[400],
            },
            secondary: {
              main: colors.yellowAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[900],
              // default: "#fcfcfc"
            },
            pdf: {
              main: colors.grey[900],
              sub: colors.grey[800]
            }
          }),
    },
    typography: {
      fontFamily: ["Source Sans 3", "sans-serif"].join(","),
      fontSize: "1rem",
      h1: {
        fontFamily: ["Source Sans 3", "sans-serif"].join(","),
        fontSize: 32,
      },
      h2: {
        fontFamily: ["Source Sans 3", "sans-serif"].join(","),
        fontSize: 28,
      },
      h3: {
        fontFamily: ["Source Sans 3", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans 3", "sans-serif"].join(","),
        fontSize: 22,
      },
      h5: {
        fontFamily: ["Source Sans 3", "sans-serif"].join(","),
        fontSize: 18,
      },
      h6: {
        fontFamily: ["Source Sans 3", "sans-serif"].join(","),
        fontSize: 16,
      },
    },
    // MuiTableCell: {
    //   styleOverrides: {
    //     root: {
    //       padding: "15px 16px",
    //     },
    //   },
    // },
    // MuiTableHead: {
    //   styleOverrides: {
    //     root: {
    //       borderBottom: "none",
    //       [`& .${tableCellClasses.root}`]: {
    //         borderBottom: "none",
    //         //backgroundColor: palette.neutral[50],
    //         //color: palette.neutral[700],
    //         fontSize: 12,
    //         fontWeight: 600,
    //         lineHeight: 1,
    //         letterSpacing: 0.5,
    //         textTransform: "uppercase",
    //       },
    //       [`& .${tableCellClasses.paddingCheckbox}`]: {
    //         paddingTop: 4,
    //         paddingBottom: 4,
    //       },
    //     },
    //   },
    // },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSetting(mode)), [mode]);

  return [theme, colorMode];
};
