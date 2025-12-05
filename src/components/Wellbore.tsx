import { useEffect, useRef } from "react";
import { intersection } from "./Layer";

export const Wellbore = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const dimensions = {
        width: containerRef.current.getBoundingClientRect().width,
        height: containerRef.current.getBoundingClientRect().height,
      }
      const element = intersection(dimensions);
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(element);
    }
  }, [containerRef]);

  return <div style={{
    width: "100%",
    height: "100%",
  }} ref={containerRef} />;
};