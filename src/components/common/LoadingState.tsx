import React from 'react';

type LoadingStateProps = {
  text?: string;
};

export const LoadingState: React.FC<LoadingStateProps> = ({
  text = 'Chargement...',
}) => {
  return (
    <div className="loading">
      <div className="loading-spinner" />
      {text && <span className="mt-sm">{text}</span>}
    </div>
  );
};
