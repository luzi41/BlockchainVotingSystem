"use client";

import { useEffect, useReducer } from "react";
import { fetchStatus } from "../utils/fetchStatus";

interface ElectionState {
  title: string;
  status: string;
  error: Error | null;
  loading: boolean;
  provider: any;
  address: string | null;
  electionId: number | null;
}

// 🎛️ Actions für den Reducer
type Action =
  | { type: "LOADING" }
  | { type: "SUCCESS"; payload: Omit<ElectionState, "loading" | "error"> }
  | { type: "ERROR"; error: Error };

function reducer(state: ElectionState, action: Action): ElectionState {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "SUCCESS":
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null,
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        status: "⚠️ Verbindung zum RPC-Server fehlgeschlagen!",
        provider: null,
        address: null,
        electionId: null,
      };
    default:
      return state;
  }
}

const initialState: ElectionState = {
  title: "Blockchain Voting System",
  status: "",
  error: null,
  loading: true,
  provider: null,
  address: null,
  electionId: null,
};

export function useElectionStatus() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let mounted = true;

    async function loadStatus() {
      dispatch({ type: "LOADING" });

      try {
        const result = await fetchStatus();
        if (!mounted) return;

        dispatch({
          type: "SUCCESS",
          payload: {
            title: result.title,
            status: result.status,
            provider: result.provider,
            address: result.contractAddress,
            electionId: result.electionId,
          },
        });
      } catch (err) {
        if (!mounted) return;
        dispatch({
          type: "ERROR",
          error: err instanceof Error ? err : new Error("Unbekannter Fehler"),
        });
      }
    }

    loadStatus();

    return () => {
      mounted = false;
    };
  }, []);

  return state;
}
