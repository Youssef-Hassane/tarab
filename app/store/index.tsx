import React, { createContext, useContext, useReducer, ReactNode } from "react";

export interface Profile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  listOfSongs?: string[];
}

// Define the state structure
export type AppState = {
  profile: Profile | null;
};

// Define action types
export type AppAction =
  | { type: "SET_USER"; payload: AppState["profile"] }
  | { type: "ADD_SONG"; payload: string }
  | { type: "REMOVE_SONG"; payload: string };

// Reducer function to manage state transitions
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, profile: action.payload };
    case "ADD_SONG":
      return {
        ...state,
        profile: {
          ...state.profile!,
          listOfSongs: [...state.profile!.listOfSongs!, action.payload],
        },
      };
    case "REMOVE_SONG":
      return {
        ...state,
        profile: {
          ...state.profile!,
          listOfSongs: state.profile!.listOfSongs!.filter(
            (song) => song !== action.payload
          ),
        },
      };
  }
};

// Create a context for the store
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Context provider to wrap the application
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, {
    profile: null,
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = (): {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} => {
  const context = useContext(AppContext)!;
  if (!context) {
    throw new Error("useAppStore must be used within an AppProvider");
  }
  return context;
};
