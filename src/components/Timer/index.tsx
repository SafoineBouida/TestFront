import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

interface Props {
  inProgress?: boolean;
  onFinished(): void;
}

const Timer = ({ onFinished, inProgress = false }: Props) => {
  const [progress, setProgress] = useState(0);
  const shouldProgressRef = useRef(inProgress);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (shouldProgressRef.current) {
          return Math.min(100, oldProgress + 100 / 120);
        }
        return oldProgress;
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      onFinished();
      setProgress(0);
    }
  }, [progress]);

  useEffect(() => {
    shouldProgressRef.current = inProgress;
    if (!inProgress) {
      setProgress(0);
    }
  }, [inProgress]);

  return (
    <LinearProgress
      style={{ height: 10 }}
      variant="determinate"
      value={progress}
    />
  );
};

export default Timer;
