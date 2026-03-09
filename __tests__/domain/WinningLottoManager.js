import WinningLottoManager from "../../src/models/winningLottoManager";

describe("입력된 당첨번호와 로또를 비교한다.", () => {
  const WINNING_NUMBERS = "1,2,3,4,5,6";
  const BONUS_NUMBER = 7;
  const winningLottoManager = new WinningLottoManager(WINNING_NUMBERS);
  winningLottoManager.setBonusNumber(BONUS_NUMBER);

  test.each([
    {
      lottoTicket: [1, 2, 3, 4, 5, 6],
      expected: { matchCount: 6, hasBonus: false },
    },
    {
      lottoTicket: [1, 2, 3, 4, 5, 7],
      expected: { matchCount: 5, hasBonus: true },
    },
    {
      lottoTicket: [1, 2, 3, 4, 5, 8],
      expected: { matchCount: 5, hasBonus: false },
    },
    {
      lottoTicket: [1, 2, 3, 4, 8, 9],
      expected: { matchCount: 4, hasBonus: false },
    },
    {
      lottoTicket: [1, 2, 3, 8, 9, 10],
      expected: { matchCount: 3, hasBonus: false },
    },
    {
      lottoTicket: [8, 9, 10, 11, 12, 13],
      expected: { matchCount: 0, hasBonus: false },
    },
  ])("로또 번호 $lottoTicket 를 비교하면 $expected 를 반환한다.", ({ lottoTicket, expected }) => {
    const result = winningLottoManager.compareWithWinningLotto(lottoTicket);

    expect(result).toEqual(expected);
  });
});
