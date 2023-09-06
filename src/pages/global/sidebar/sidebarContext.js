// import React, { useState, createContext, useContext } from "react";
// import { ProSidebar } from "react-pro-sidebar";
// import Sidebar from "./Sidebar";

// const SidebarContext = createContext({});

// export const MyProSidebarProvider = ({ children }) => {
//   const [sidebarRTL, setSidebarRTL] = useState(false);
//   const [sidebarBackgroundColor, setSidebarBackgroundColor] =
//     useState(undefined);
//   const [sidebarImage, setSidebarImage] = useState(undefined);
//   return (
//     <ProSidebar>
//       <SidebarContext.Provider
//         value={{
//           sidebarBackgroundColor,
//           setSidebarBackgroundColor,

//           sidebarImage,
//           setSidebarImage,

//           sidebarRTL,
//           setSidebarRTL,
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             flexDirection: sidebarRTL ? "row-reverse" : "row",
//           }}
//         >
//           <Sidebar />
//           {children}
//         </div>
//       </SidebarContext.Provider>
//     </ProSidebar>
//   );
// };

// export const useSidebarContext = () => useContext(SidebarContext);
