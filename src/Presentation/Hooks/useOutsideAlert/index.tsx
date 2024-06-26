import { useEffect, MutableRefObject } from "react";

/**
 * Hook que executa uma ação quando clicado fora do compoente
 */
function useOutsideAlerter(ref: MutableRefObject<any>, action: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        if(action) action()
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [action, ref]);
}

export default useOutsideAlerter