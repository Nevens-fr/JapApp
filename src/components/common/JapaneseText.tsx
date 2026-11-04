import React from 'react';

type JapaneseTextProps = {
  text: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
};

export const JapaneseText: React.FC<JapaneseTextProps> = ({
  text,
  size = 'medium',
  className = '',
}) => {
  return (
    <span className={`japanese-text japanese-${size} ${className}`}>
      {text}
    </span>
  );
};
