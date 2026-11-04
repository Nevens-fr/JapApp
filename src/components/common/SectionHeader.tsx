import React from 'react';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  action,
}) => {
  return (
    <div className="section-header">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
        {action}
      </div>
    </div>
  );
};
