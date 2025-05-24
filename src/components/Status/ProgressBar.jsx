import React, { useEffect, useState } from 'react';
import "./ProgessBar.css";

function ProgressBar({ index, activeIndex, duration}) {
  const isActive = index === activeIndex;
  const [progress, setProgress] = useState();  // Initialize with 0

  useEffect(() => {

      const intervalId = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) {
            return prev + 1;  // Increment progress by 1
          }
          clearInterval(intervalId);  // Clear interval when progress reaches 100%
          return prev;
        });
      }, duration / 100);  // Set interval according to duration
    

    
  }, [duration, activeIndex]);

  useEffect(() => {
   
      setProgress(0);  // Reset progress when activeIndex changes
    
  }, [activeIndex]);

  return (
    <div className={`progress-bar-container ${isActive ? "active" : ""}`}>
      <div className={`${isActive ? "progress-bar" : ""}`} style={{ width: `${progress}%` }}>
       
      </div>
    </div>
  );
}

export default ProgressBar;
