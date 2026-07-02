import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 0 auto 28px;
  flex-wrap: wrap;
`;

const Step = styled.div<{ state: "done" | "active" | "todo" }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  transition: all 0.2s ease;

  ${({ state }) =>
    state === "active"
      ? `background: linear-gradient(135deg, #ff2d55, #d60029);
         color: #fff;
         box-shadow: 0 10px 22px -12px rgba(255,0,51,0.6);`
      : state === "done"
      ? `background: var(--ypg-red-soft);
         color: var(--ypg-red-dark);`
      : `background: var(--ypg-chip);
         color: var(--ypg-faint);`}
`;

const Dot = styled.span<{ state: "done" | "active" | "todo" }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  background: ${({ state }) =>
    state === "active"
      ? "rgba(255,255,255,0.25)"
      : state === "done"
      ? "var(--ypg-red)"
      : "var(--ypg-border)"};
  color: ${({ state }) => (state === "done" ? "#fff" : "inherit")};
`;

const Line = styled.span`
  width: 20px;
  height: 2px;
  background: var(--ypg-border);
  border-radius: 2px;
`;

const STEPS = ["타임라인 입력", "곡 선택", "확인", "완료"];

export default function Stepper({ current }: { current: number }) {
  return (
    <Wrapper>
      {STEPS.map((label, i) => {
        const state = i < current ? "done" : i === current ? "active" : "todo";
        return (
          <div
            key={label}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <Step state={state}>
              <Dot state={state}>{state === "done" ? "✓" : i + 1}</Dot>
              {label}
            </Step>
            {i < STEPS.length - 1 ? <Line /> : null}
          </div>
        );
      })}
    </Wrapper>
  );
}
