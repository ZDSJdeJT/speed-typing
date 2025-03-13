import { useEffect } from 'react';
import { toast } from 'sonner';

import type { ScoreCreationAttributes } from '~/src/main/models/score';
import { CountdownTimer } from '@renderer/components/countdown-timer';
import { GeneratedWords } from '@renderer/components/generated-words';
import { RestartButton } from '@renderer/components/restart-button';
import { Results } from '@renderer/components/results';
import { UserTypings } from '@renderer/components/user-typings';
import { WordContainer } from '@renderer/components/words-container';
import { COUNTDOWN_SECONDS, WORDS_COUNT } from '@renderer/constants';
import {
  calculateAccuracyPercentage,
  calculateSpeed,
} from '@renderer/helpers/results';
import { useEngine } from '@renderer/hooks/use-engine';

const createScore = async (score: ScoreCreationAttributes) => {
  try {
    await window.api.createScore(score);
    toast.success('Score has been saved.');
  } catch {
    toast.error('Score save failed.');
  }
};

const App = () => {
  const { state, words, timeLeft, typed, errors, totalTyped, restart } =
    useEngine({
      wordsCount: WORDS_COUNT,
      countdownSeconds: COUNTDOWN_SECONDS,
    });

  useEffect(() => {
    if (state === 'end') {
      createScore({ errors, typed: totalTyped });
    }
  }, [state, errors, totalTyped]);

  return (
    <main className="flex flex-col gap-y-6 grow justify-center">
      <CountdownTimer timeLeft={timeLeft} />
      <WordContainer>
        <GeneratedWords words={words} />
        <UserTypings
          state={state}
          className="absolute inset-0"
          userInput={typed}
          words={words}
        />
      </WordContainer>
      <RestartButton onClick={restart} />
      {state === 'end' && (
        <Results
          errors={errors}
          accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
          total={totalTyped}
          speed={calculateSpeed(totalTyped, COUNTDOWN_SECONDS)}
        />
      )}
    </main>
  );
};

export default App;
