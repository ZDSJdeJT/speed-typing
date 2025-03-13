import { RefreshCcw } from 'lucide-react';

import { Button } from '@renderer/components/ui/button';

function RestartButton(props: { onClick: () => void }) {
  return (
    <Button
      tabIndex={-1}
      variant="outline"
      size="icon"
      className="mx-auto"
      onClick={props.onClick}
    >
      <RefreshCcw />
    </Button>
  );
}

export { RestartButton };
