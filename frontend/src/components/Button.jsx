import React from 'react';

const Button = ({ variant = 'primary', size = 'md', children, onClick, type = 'button', ...rest }) => {
  const variantClass = variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : 'btn-tertiary';
  const sizeClass = size === 'sm' ? 'btn-small' : '';
  const className = `btn ${variantClass} ${sizeClass}`.trim();

  return (
    <button type={type} className={className} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
