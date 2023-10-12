import React, { useState, createContext, useContext } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import ProSidebar from "./ProSidebar";
const SidebarContext = createContext({});

export const MyProSidebarProvider = ({ children }) => {
  const [selected, setSelected] = useState("Dashboard");
  return (
    <ProSidebarProvider>
      <SidebarContext.Provider value={{ selected, setSelected }}>
        <div
          style={{
            display: "flex",
          }}
        >
          <ProSidebar />
          {children}
        </div>
      </SidebarContext.Provider>
    </ProSidebarProvider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
