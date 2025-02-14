import { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [dataUser, setDataUser] = useState({ name: "", Token: "" });

  return (
    <DataContext.Provider value={{ dataUser, setDataUser }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
