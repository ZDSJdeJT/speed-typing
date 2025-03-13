import { useCallback, useEffect, useRef, useState } from 'react';

import { isKeyboardCodeAllowed } from '@renderer/helpers/typings';

export const useTypings = (enabled: boolean) => {
  const [cursor, setCursor] = useState(0);
  const [typed, setTyped] = useState('');
  const totalTyped = useRef(0);

  const keyboardHandler = useCallback(
    ({ key, code }: KeyboardEvent) => {
      if (!enabled || !isKeyboardCodeAllowed(code)) {
        return;
      }
      switch (key) {
        case 'Backspace':
          setCursor(cursor - 1);
          setTyped(typed.slice(0, -1));
          totalTyped.current -= 1;
          break;
        default:
          setCursor(cursor + 1);
          setTyped(typed + key);
          totalTyped.current += 1;
      }
    },
    [cursor, typed, enabled],
  );

  useEffect(() => {
    window.addEventListener('keydown', keyboardHandler);

    return () => {
      window.removeEventListener('keydown', keyboardHandler);
    };
  }, [keyboardHandler]);

  const restartTotalTyped = useCallback(() => {
    totalTyped.current = 0;
  }, []);

  const clearTyped = useCallback(() => {
    setCursor(0);
    setTyped('');
  }, []);

  return {
    cursor,
    typed,
    totalTyped: totalTyped.current,
    restartTotalTyped,
    clearTyped,
  };
};
