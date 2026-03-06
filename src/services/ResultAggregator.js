import { LOTTO_RANK } from "../constants/config.js";

// 파일 위치 고민... util? service?
export function resultAggregator(results) {
  const resultData = Object.values(LOTTO_RANK).map((rank) => ({
    ...rank,
    count: 0,
  }));

  results.forEach(({ matchCount, hasBonus }) => {
    if (matchCount === 6) resultData[4].count++;
    if (matchCount === 5 && hasBonus) resultData[3].count++;
    if (matchCount === 5 && !hasBonus) resultData[2].count++;
    if (matchCount === 4) resultData[1].count++;
    if (matchCount === 3) resultData[0].count++;
  });

  return resultData;
}
