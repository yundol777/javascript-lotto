import Lotto from "../../src/models/Lotto.js";
import { resultAggregator } from "../../src/services/ResultAggregator.js";

describe("로또와 당첨 번호를 비교한다.", () => {
  test("6개 번호 일치 1등", () => {
    const RESULT = { matchCount: 6, hasBonus: false };
    const data = resultAggregator([RESULT]);

    expect(data[4].count).toBe(1);
  });
  test("5개 번호 + 보너스 번호 일치 2등", () => {
    const RESULT = { matchCount: 5, hasBonus: true };
    const data = resultAggregator([RESULT]);

    expect(data[3].count).toBe(1);
  });
  test("5개 번호 일치 3등", () => {
    const RESULT = { matchCount: 5, hasBonus: false };
    const data = resultAggregator([RESULT]);

    expect(data[2].count).toBe(1);
  });
  test("4개 번호 일치 4등", () => {
    const RESULT = { matchCount: 4, hasBonus: false };
    const data = resultAggregator([RESULT]);

    expect(data[1].count).toBe(1);
  });
  test("3개 번호 일치 5등", () => {
    const RESULT = { matchCount: 3, hasBonus: false };
    const data = resultAggregator([RESULT]);

    expect(data[0].count).toBe(1);
  });
  test("2개 이하 번호 일치 낙첨", () => {
    const RESULT = { matchCount: 2, hasBonus: false };
    const data = resultAggregator([RESULT]);

    expect(data.every((r) => r.count === 0)).toBe(true);
  });
});

describe("로또 번호가 오름차순으로 정렬된다.", () => {
  test("로또 번호가 오름차순으로 정렬된다.", () => {
    //출력: 오름차순으로 정렬된 로또 번호 6개
    const UNSORTED_ARRAY = [8, 3, 5, 1, 6, 2];
    const SORTED_ARRAY = [1, 2, 3, 5, 6, 8];
    expect(new Lotto(UNSORTED_ARRAY).getNumbers()).toEqual(SORTED_ARRAY);
  });
});
