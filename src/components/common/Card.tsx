import React from 'react';

type CardProps = {
  title?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Card: React.FC<CardProps> = ({
  title,
  header,
  footer,
  children,
  className = '',
  onClick,
}) => {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      {(title || header) && (
        <div className="card-header">
          {header || <h3 className="card-title">{title}</h3>}
        </div>
      )}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};
