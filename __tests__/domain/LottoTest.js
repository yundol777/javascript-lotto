import Lotto from "../../src/models/Lotto.js";

describe("로또와 당첨 번호를 비교한다.", () => {
  test("6개 번호 일치 1등", () => {});
  test("5개 번호 + 보너스 번호 일치 2등", () => {});
  test("5개 번호 일치 3등", () => {});

  test("4개 번호 일치 4등", () => {});

  test("3개 번호 일치 5등", () => {});
  test("2개 이하 번호 일치 낙첨", () => {});
});

describe("로또 번호가 오름차순으로 정렬된다.", () => {
  test("로또 번호가 오름차순으로 정렬된다.", () => {
    //출력: 오름차순으로 정렬된 로또 번호 6개
    const UNSORTED_ARRAY = [8, 3, 5, 1, 6, 2];
    const SORTED_ARRAY = [1, 2, 3, 5, 6, 8];
    expect(new Lotto(UNSORTED_ARRAY).getNumbers()).toEqual(SORTED_ARRAY);
  });
});
