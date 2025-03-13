import { motion } from 'framer-motion';

import { formatPercentage, formatSpeed } from '@renderer/helpers/results';

const initial = { opacity: 0 };
const animate = { opacity: 1 };
const duration = { duration: 0.3 };

function Results(props: {
  errors: number;
  accuracyPercentage: number;
  total: number;
  speed: number;
}) {
  return (
    <motion.ul className="flex flex-col items-center space-y-3">
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 0 }}
        className="text-xl font-bold"
      >
        Results
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 0.5 }}
        className="text-xl font-bold"
      >
        Accuracy: {formatPercentage(props.accuracyPercentage)}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 1 }}
        className="text-red-500"
      >
        Errors: {props.errors}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 1.5 }}
      >
        Typed: {props.total}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 2 }}
      >
        Speed: {formatSpeed(props.speed)}
      </motion.li>
    </motion.ul>
  );
}

export { Results };
