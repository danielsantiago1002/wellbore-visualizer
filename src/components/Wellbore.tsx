import { useEffect, useRef } from "react";
import { intersection } from "./Layer";
import "./wellbore.css"

export const Wellbore = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const dimensions = {
        width: containerRef.current.getBoundingClientRect().width - 10, // Adjust for padding/margin
        height: containerRef.current.offsetHeight - 7, // There is a bug related with the axis rendering adding some extra height
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