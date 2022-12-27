import { makeList } from "./removeTime";

describe("계산 테스트", () => {
  test("숫자.  인 경우", () => {
    expect(makeList(["1. 사랑, 하자 - 수호", "2. 예뻤어 - 데이식스"])).toEqual([
      "1. 사랑, 하자 - 수호",
      "2. 예뻤어 - 데이식스",
    ]);
  });
  test("숫자. 시: 분:초 인 경우", () => {
    expect(makeList(["26. 01:43:05 Yesterday", "27. 01:47:45 원(願)"])).toEqual(
      ["26. Yesterday", "27. 원(願)"]
    );
  });
  test("시:분:초 인 경우", () => {
    expect(
      makeList([
        "01:01:59 Don't Know What To Do - 블랙핑크",
        "01:05:14 ANL - 엔시티드림",
      ])
    ).toEqual(["Don't Know What To Do - 블랙핑크", "ANL - 엔시티드림"]);
  });
  test("분:초 인 경우", () => {
    expect(
      makeList(["46:34 사랑, 하자 - 수호", "50:19 예뻤어 - 데이식스"])
    ).toEqual(["사랑, 하자 - 수호", "예뻤어 - 데이식스"]);
  });

  test("노래제목이 시간형태인 경우", () => {
    expect(makeList(["태연 11:11", "11:11"])).toEqual(["태연 11:11", "11:11"]);
  });
});
