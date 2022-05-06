import getTimeFormat from "../../utils/time-ago";

describe("testing the expectation of a x time ago", () => {
  function withoutNumberValue(date) {
    const time = getTimeFormat(date);
    const expected = time.substring(2, time.length);
    return expected.trim();
  }

  test("testing seconds", () => {
    const date = new Date();
    date.setSeconds(date.getSeconds() - 59);
    expect(withoutNumberValue(date)).toBe("seconds ago");
  });

  test("testing minutes", () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 59);
    expect(withoutNumberValue(date)).toBe("minutes ago");
  });

  test("testing hours", () => {
    const date = new Date();
    date.setHours(date.getHours() - 23);
    expect(withoutNumberValue(date)).toBe("hours ago");
  });

  test("testing days", () => {
    const date = new Date();
    date.setDate(date.getDate() - 29);
    expect(withoutNumberValue(date)).toBe("days ago");
  });

  test("testing default", () => {
    const date = new Date("August 19, 1975 23:15:30");
    expect(getTimeFormat(date)).toBe("on Aug 19, 1975");
  });

  test("testing null/undefined/blank", () => {
    expect(getTimeFormat()).toBe("Invalid time value");
    expect(getTimeFormat("")).toBe("Invalid time value");
    expect(getTimeFormat(null)).toBe("Invalid time value");
  });
});
