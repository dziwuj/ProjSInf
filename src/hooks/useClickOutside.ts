import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  exceptionRef?: RefObject<HTMLElement | null>,
): [RefObject<T>, boolean, () => void] {
  const ref = useRef<T>(null!);
  const [clickedOutside, setClickedOutside] = useState(false);

  const resetClickedOutside = useCallback(() => {
    setClickedOutside(false);
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      // Check if click is inside the main element
      const isInsideMain = ref.current && ref.current.contains(target);

      // Check if click is inside the exception element (button)
      const isInsideException =
        exceptionRef?.current && exceptionRef.current.contains(target);

      if (!isInsideMain && !isInsideException) {
        setClickedOutside(true);
      } else {
        setClickedOutside(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [exceptionRef]);

  return [ref, clickedOutside, resetClickedOutside];
}
