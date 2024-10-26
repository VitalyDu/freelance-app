import { useContext } from "react";

export const useStore = (context) => {
  const store = useContext(context);

  if (!store) {
    throw new Error("useStore must be used within a Store Context.");
  }

  return store;
};
