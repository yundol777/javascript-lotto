import Purchase from "../../src/models/Purchase";

describe("구매할 로또의 개수를 구한다.", () => {
  test("기입된 금액만큼 구입할 로또 개수가 계산된다.", () => {
    const INPUT = 5000;
    const EXPECTED_LOTTO_COUNT = 5;

    const purchase = new Purchase(INPUT);
    const lottoCount = purchase.getLottoTicketCount();

    expect(lottoCount).toBe(EXPECTED_LOTTO_COUNT);
  });
});
