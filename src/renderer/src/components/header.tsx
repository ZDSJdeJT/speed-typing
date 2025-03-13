import { Scores } from '~/src/renderer/src/components/scores';
import { ModeToggle } from '@renderer/components/mode-toggle';

function Header() {
  return (
    <header className="flex justify-between items-center">
      <h1 className="font-bold">Speed Typing</h1>
      <div className="flex items-center gap-x-2">
        <Scores />
        <ModeToggle />
      </div>
    </header>
  );
}

export { Header };
