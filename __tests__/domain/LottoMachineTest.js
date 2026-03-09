import LottoMachine from "../../src/services/LottoMachine";

describe("구매한 로또를 발행한다.", () => {
  test("구매한 로또 개수만큼 로또 번호가 발행된다.", () => {
    const LOTTO_COUNT = 5;

    const lottoMachine = new LottoMachine(LOTTO_COUNT);
    const lottoNumbers = lottoMachine.getLottoTickets();

    expect(lottoNumbers.length).toBe(LOTTO_COUNT);
  });
});
