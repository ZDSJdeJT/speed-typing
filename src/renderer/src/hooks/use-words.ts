import { useCallback, useState } from 'react';

import { getRandomWords } from '@renderer/lib/utils';

export const useWords = (count: number) => {
  const [words, setWords] = useState(getRandomWords(count));

  const updateWords = useCallback(() => {
    setWords(getRandomWords(count));
  }, [count]);

  return { words, updateWords };
};
