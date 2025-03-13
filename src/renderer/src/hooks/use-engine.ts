import { useCallback, useEffect, useState } from 'react';
import { useCountdown } from 'usehooks-ts';

import { countErrors } from '@renderer/helpers/results';
import { useTypings } from '@renderer/hooks/use-typings';
import { useWords } from '@renderer/hooks/use-words';

export type State = 'ready' | 'running' | 'end';

export const useEngine = ({
  wordsCount,
  countdownSeconds,
}: {
  wordsCount: number;
  countdownSeconds: number;
}) => {
  const [state, setState] = useState<State>('ready');
  const { words, updateWords } = useWords(wordsCount);
  const [timeLeft, { startCountdown, resetCountdown }] = useCountdown({
    countStart: countdownSeconds,
  });
  const { cursor, typed, totalTyped, restartTotalTyped, clearTyped } =
    useTypings(state !== 'end');
  const [errors, setErrors] = useState(0);

  const isStarting = state === 'ready' && cursor > 0;
  const areWordsFinished = cursor === words.length;

  const sumErrors = useCallback(() => {
    setErrors((prev) => prev + countErrors(typed, words.substring(0, cursor)));
  }, [typed, words, cursor]);

  // 用户键入第一个字符时变为 running 状态
  useEffect(() => {
    if (isStarting) {
      setState('running');
      startCountdown();
    }
  }, [isStarting, startCountdown, cursor]);

  // 倒计时结束后变为 end 状态
  useEffect(() => {
    if (!timeLeft) {
      setState('end');
      sumErrors();
    }
  }, [timeLeft, sumErrors]);

  useEffect(() => {
    if (areWordsFinished) {
      sumErrors();
      updateWords();
      clearTyped();
    }
  }, [
    cursor,
    words,
    clearTyped,
    typed,
    areWordsFinished,
    updateWords,
    sumErrors,
  ]);

  const restart = useCallback(() => {
    resetCountdown();
    restartTotalTyped();
    setState('ready');
    setErrors(0);
    updateWords();
    clearTyped();
  }, [clearTyped, updateWords, resetCountdown, restartTotalTyped]);

  return { state, words, timeLeft, typed, errors, totalTyped, restart };
};
