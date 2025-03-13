import { Caret } from '@renderer/components/caret';
import type { State } from '@renderer/hooks/use-engine';
import { cn } from '@renderer/lib/utils';

function Character(props: { actual: string; expected: string }) {
  const isCorrect = props.actual === props.expected;
  const isWhitespace = props.expected === ' ';

  return (
    <span
      className={cn({
        'text-red-500': !isCorrect && !isWhitespace,
        'text-primary': isCorrect && !isWhitespace,
        'bg-red-500/50': !isCorrect && isWhitespace,
      })}
    >
      {props.actual === ' ' ? <>&nbsp;</> : props.actual}
    </span>
  );
}

function UserTypings(props: {
  state: State;
  userInput: string;
  words: string;
  className?: string;
}) {
  return (
    <div className={props.className}>
      {props.userInput.split('').map((char, index) => (
        <Character key={index} actual={char} expected={props.words[index]} />
      ))}
      {props.state !== 'end' && <Caret />}
    </div>
  );
}

export { UserTypings };
