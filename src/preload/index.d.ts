import { ElectronAPI } from '@electron-toolkit/preload';

import type { Score, ScoreCreationAttributes } from '~/src/main/models/score';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      createScore: (score: ScoreCreationAttributes) => Promise<Score>;
      findScores: (pagination?: Pagination) => Promise<PaginationResult<Score>>;
    };
  }
}
