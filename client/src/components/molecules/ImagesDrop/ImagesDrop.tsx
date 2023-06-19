import { useEffect, useRef } from "react";

interface ImagesDropProps {
  onChange: () => void;
}

export const ImagesDrop = ({ onChange }: ImagesDropProps) => {
  const titleRef = useRef("Drop files");
  const containerRef = useRef(n);

  useEffect(() => {
    if (titleRef && containerRef) {
      window.ondragover = function (e) {
        document.getElementById("title").innerText =
          "zdjecie nad dokumentem html";
        e.preventDefault(); // usuwa domyślne zachowanie strony po wykonaniu zdarzenia, warto zakomentować i sprawdzić
        e.stopPropagation(); // zatrzymuje dalszą propagację zdarzenia, warto zakomentować i sprawdzić
      };
      document.querySelector("html").ondragleave = function (e) {
        document.getElementById("title").innerText =
          "zdjecie poza dokumentem html";
        e.preventDefault();
        e.stopPropagation();
      };
      containerRef.current.ondragover = function (e) {
        titleRef.current = "upusc zdjecie";
        e.preventDefault();
        e.stopPropagation();
      };
    }
  }, []);

  return (
    <div ref={containerRef}>
      <p ref={titleRef}>Drop files</p>
      <div id="imagesInContainer"></div>
    </div>
  );
};
