import { createContext } from "react";
import { AuthStore } from "./store";

export const AuthStoreContext = createContext(new AuthStore());
