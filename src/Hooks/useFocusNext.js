import { useRef, useCallback } from "react";

const useFocusNext = () => {
  const controls = useRef([]);

  const handler = (event) => {
    if (event.keyCode === 13) {
      // Required if the controls can be reordered
      controls.current = controls.current
        .filter((control) => document.body.contains(control))
        .sort((a, b) =>
          a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
            ? -1
            : 1
        );

      const index = controls.current.indexOf(event.target);
      const next = controls.current[index + 1];
      if (!next) {
        const element = document.getElementById("append-btn");
        if (element) {
          element.click()
        }
      }
      next && next.focus();

      // IE 9, 10
      event.preventDefault();
    }
  };

  return useCallback((element) => {
    if (element && !controls.current.includes(element)) {
      controls.current.push(element);
      element.addEventListener("keydown", handler);
    }
  }, []);
};

export default useFocusNext;
