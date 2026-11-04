import React from 'react';

type EmptyStateProps = {
  icon?: string;
  title: string;
  text?: string;
  action?: React.ReactNode;
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📭',
  title,
  text,
  action,
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      {text && <p className="empty-state-text">{text}</p>}
      {action && <div className="mt-md">{action}</div>}
    </div>
  );
};
