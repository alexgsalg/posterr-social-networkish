import { ReactElement, useEffect, useState } from 'react';
import './button.styles.scss';

interface IButton {
  variant?:
    | 'primary'
    | 'secondary'
    | 'clear'
    | 'light'
    | 'white'
    | 'success'
    | 'danger'
    | 'warning';
  addClass?: string;
  outline?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

function Button({
  variant,
  addClass,
  outline,
  disabled,
  children,
  onClick,
}: IButton): ReactElement {
  const [variantClasses, setVariantClasses] = useState<string>('primary');

  useEffect(() => {
    let classToAdd = '';
    switch (variant) {
      case 'primary':
        classToAdd = 'primary';
        break;
      case 'secondary':
        classToAdd = 'secondary';
        break;
      case 'clear':
        classToAdd = 'clear';
        break;
      case 'light':
        classToAdd = 'light';
        break;
      default:
        classToAdd = variant ? `btn-${variant}` : '';
    }

    if (outline) classToAdd = classToAdd + '-outline';
    setVariantClasses(classToAdd);
  }, [variant, outline]);

  return (
    <button
      type="button"
      className={`${variantClasses} btn ${addClass}`}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
