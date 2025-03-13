export const isKeyboardCodeAllowed = (code: string) =>
  code.startsWith('Key') ||
  code.startsWith('Digit') ||
  code.startsWith('Bracket') ||
  code.startsWith('Semicolon') ||
  code.startsWith('Quote') ||
  code.startsWith('Comma') ||
  code.startsWith('Period') ||
  code.startsWith('Slash') ||
  code.startsWith('Minus') ||
  code.startsWith('Equal') ||
  code === 'Backspace' ||
  code === 'Space';
