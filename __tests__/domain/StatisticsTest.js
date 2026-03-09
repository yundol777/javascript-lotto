import { calculateProfitRate } from "../../src/services/CalculateProfitRate";

describe("수익률을 계산한다.", () => {
  test("로또 결과 데이터와 구매 금액을 입력하면 수익률이 계산된다.", () => {
    const resultData = [
      { matchCount: 3, money: 5000, requireBonus: false, count: 1 },
      { matchCount: 4, money: 50000, requireBonus: false, count: 0 },
      { matchCount: 5, money: 1500000, requireBonus: false, count: 0 },
      { matchCount: 5, money: 30000000, requireBonus: true, count: 0 },
      { matchCount: 6, money: 2000000000, requireBonus: false, count: 0 },
    ];

    const purchaseAmount = 8000;

    expect(calculateProfitRate(resultData, purchaseAmount)).toBe(62.5);
  });
});
