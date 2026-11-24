declare module '@cred/neopop-web/lib/components' {
  import React from 'react';

  export interface TypographyProps {
    fontType?: string;
    children?: React.ReactNode;
    color?: string;
    fontWeight?: number;
    fontSize?: number;
    style?: React.CSSProperties;
    overflow?: 'ellipsis' | 'clip';
    lineClamp?: number;
    as?: 'p' | 'span' | 'div';
    className?: string;
  }

  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    kind?: 'elevated' | 'flat' | 'link';
    size?: 'big' | 'medium' | 'small';
    colorMode?: 'dark' | 'light';
    colorConfig?: any;
    disabled?: boolean;
    showArrow?: boolean;
    fullWidth?: boolean;
    onClick?: (e?: any) => void;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
  }

  export const Typography: React.FC<TypographyProps>;
  export const Button: React.FC<ButtonProps>;
  export const ElevatedCard: React.FC<any>;
}

declare module '@cred/neopop-web/lib/primitives' {
  export interface FontNameSpaceItem {
    fontType: string;
    fontSize: number;
    fontWeight: number;
  }

  export const fontNameSpaces: Record<string, FontNameSpaceItem>;
  export const colorGuide: Record<string, any>;
  export const colorPalette: Record<string, any>;
}
