import React from 'react'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide'
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-container ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
