import React from 'react';

type ProgressBarProps = {
  progress: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  color?: string;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  size = 'md',
  color,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div className={`progress-bar progress-bar-${size}`}>
      <div
        className="progress-bar-fill"
        style={{ width: `${clampedProgress}%`, backgroundColor: color }}
      />
    </div>
  );
};
