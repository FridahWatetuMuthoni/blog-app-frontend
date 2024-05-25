import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

function useGlobalContext() {
  return useContext(GlobalContext);
}

export default useGlobalContext;
