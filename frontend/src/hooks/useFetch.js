import { useCallback, useEffect, useState } from "react";
import { api } from "../api";


export function useFetch(path) {
  const [state, setState] = useState({ data: null, error: "", loading: !!path });
  const reload = useCallback(() => {
    if (!path) return;
    setState((s) => ({ ...s, loading: true }));
    api(path)
      .then((data) => setState({ data, error: "", loading: false }))
      .catch((e) => setState({ data: null, error: e.message, loading: false }));
  }, [path]);
  useEffect(reload, [reload]);
  return { ...state, reload };
}
