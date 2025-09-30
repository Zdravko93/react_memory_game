import { useReducer } from "react";
import { gameReducer, initialState } from "../reducers/memoryGameReducer";

export function useMemoryGameReducer() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return [state, dispatch];
}
