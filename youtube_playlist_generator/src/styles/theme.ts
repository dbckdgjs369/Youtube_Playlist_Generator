const size = {
  desktop: "1440px",
  laptop: "1024px",
  tablet: "640px",
  mobile: "320px",
};

export const color = {
  $mainColor: "#ff0033",
  $skyBlue: "#3e4ca2",
  $aqua: "#ff0033",
  $hoverMaincolor: "#d60029",
  $hoverSkyBlue: "#303B7D",
  $hoverAqua: "#d60029",
  $success: "#22c55e",
  $warning: "#ef4444",
  $ink: "#0f1115",
  $muted: "#6b7280",
  $border: "#e6e8ee",
  $card: "#ffffff",
  $gray50: "#F5F5F5",
  $gray100: "#E8E8E8",
  $gray200: "#D8D9D9",
  $gray400: "#B0B0B0",
  $gray600: "#808080",
  $gray800: "#505050",
  $gray900: "#333333",
};

export const gradient = {
  $red: "linear-gradient(135deg, #ff2d55 0%, #ff0033 55%, #d60029 100%)",
};

export const shadow = {
  $card: "0 18px 40px -18px rgba(15, 17, 21, 0.25)",
  $soft: "0 8px 24px -12px rgba(15, 17, 21, 0.2)",
  $redGlow: "0 12px 26px -10px rgba(255, 0, 51, 0.5)",
};

export const text = {
  $headline2: `font-family: 'Pretendard'; 
      font-weight: 700; 
      font-size: 60px; 
      line-height: 72px; 
      letter-spacing: -0.005em;`,
  $headline3: `font-family: 'Pretendard';
      font-weight: 700;
      font-size: 48px;
      line-height: 57px;`,
  $headline4: `font-family: 'Pretendard';
      font-weight: 700;
      font-size: 34px;
      line-height: 41px;`,
  $headline5: `font-family: 'Pretendard';
      font-weight: 700;
      font-size: 24px;
      line-height: 29px;`,
  $subtitle1: `font-family: 'Pretendard';
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;`,
  $subtitle2: `font-family: 'Pretendard';
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;`,
  $body1: `font-family: 'Pretendard';
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;`,
  $body2: `font-family: 'Pretendard';
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;`,
  $body1_light: `font-family: 'Pretendard';
      font-weight: 200;
      font-size: 16px;
      line-height: 150%;`,
  $body2_light: `font-family: 'Pretendard';
      font-weight: 200;
      font-size: 14px;
      line-height: 150%;`,
  $caption: `font-family: 'Pretendard';
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;`,
  $overline: `font-family: 'Pretendard';
      font-weight: 400;
      font-size: 10px;
      line-height: 12px;`,
};

export const shortenOneLine = `
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  `;

export const media = {
  desktop: `@media only screen and (max-width: ${size.desktop})`,
  laptop: `@media only screen and (max-width: ${size.laptop})`,
  tablet: `@media only screen and (max-width: ${size.tablet})`,
  mobile: `@media only screen and (max-width: ${size.mobile})`,
};
