import { Badge } from '@renderer/components/ui/badge';

function CountdownTimer(props: { timeLeft: number }) {
  return <Badge className="font-bold">Time: {props.timeLeft}s</Badge>;
}

export { CountdownTimer };
