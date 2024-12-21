"use client";
import { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
const markers = Array.from({ length: 83 }, (_, i) => i);

function Ruler() {
  const [leftMarker, setLeftMarker] = useState(56);
  const [rightMarker, setRightMarker] = useState(56);

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const rulerRef = useRef<HTMLDivElement>(null);
  const handleLeftMarkerMouseDown = () => {
    setIsDraggingLeft(true);
  };
  const handleRighrMarkerMouseDown = () => {
    setIsDraggingRight(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const PAGE_WIDTH = 816;
    const MINIMUM_SPACE = 100;
    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector("#ruler-container");
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const x = e.clientX - containerRect.left;
        const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, x));
        if (isDraggingLeft) {
          const maxLeftPosition = PAGE_WIDTH - rightMarker - MINIMUM_SPACE;
          const newLeft = Math.min(rawPosition, maxLeftPosition);
          setLeftMarker(newLeft);
        } else if (isDraggingRight) {
          const maxRightPosition = PAGE_WIDTH - (leftMarker + MINIMUM_SPACE);
          const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0);
          const constrainrdRightPosition = Math.min(
            newRightPosition,
            maxRightPosition
          );
          setRightMarker(constrainrdRightPosition);
        }
      }
    }
    if (isDraggingRight) {
      console.log("right dragging");
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const handleLeftDoubleClick = () => {
    setLeftMarker(56);
  };
  const handleRightDoubleClick = () => {
    setRightMarker(56);
  };

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="h-6 border-b border-gray-300 flex items-end relative select-none print:hidden"
    >
      <div
        id="ruler-container"
        className="max-w-[816px] mx-auto w-full h-full relative"
      >
        <Marker
          position={leftMarker}
          isDragging={isDraggingLeft}
          isLeft={true}
          onMouseDown={handleLeftMarkerMouseDown}
          onDoubleClick={handleLeftDoubleClick}
        />
        <Marker
          position={rightMarker}
          isDragging={isDraggingRight}
          isLeft={false}
          onMouseDown={handleRighrMarkerMouseDown}
          onDoubleClick={handleRightDoubleClick}
        />
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-[816px]">
            {markers.map((marker) => {
              const positoion = (marker * 816) / 82;
              return (
                <div
                  key={marker}
                  className="absolute bottom-0"
                  style={{ left: `${positoion}px` }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-500" />
                      <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] h-1.5 bg-neutral-500" />
                  )}
                  {marker % 5 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] h-1 bg-neutral-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ruler;
interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

function Marker({
  position,
  isDragging,
  isLeft,
  onDoubleClick,
  onMouseDown,
}: MarkerProps) {
  console.log(isLeft, position);
  return (
    <div
      className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
      style={{ [isLeft ? "left" : "right"]: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className="absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2" />
      <div
        className="absolute left-1/2 top-4 transform -translate-x-1/2"
        style={{
          height: "100vh",
          width: "2px",
          transform: "scaleX(0.5)",
          backgroundColor: "#3B82F6",
          display: isDragging ? "block" : "none",
        }}
      />
    </div>
  );
}
