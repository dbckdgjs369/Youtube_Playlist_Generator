import { color, text, gradient, shadow } from "../../styles/theme";
import styled from "@emotion/styled";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: "small" | "large" | "line";
  colorType: "main-color" | "skyblue" | "aqua" | "gray";
  width?: string;
  height?: string;
}

const handleColor = (colorType: string) => {
  switch (colorType) {
    case "main-color":
    case "aqua":
      return `
        background: ${gradient.$red};
        color: #ffffff;
        box-shadow: ${shadow.$redGlow};
        &:hover { filter: brightness(1.05); }
      `;
    case "skyblue":
      return `
        background-color: ${color.$skyBlue};
        color: #ffffff;
        box-shadow: ${shadow.$soft};
        &:hover { background-color: ${color.$hoverSkyBlue}; }
      `;
    case "gray":
      return `
        background-color: ${color.$gray100};
        color: ${color.$ink};
        &:hover { background-color: ${color.$gray200}; }
      `;
    default:
      return ``;
  }
};

const handleSize = (buttonType: string) => {
  switch (buttonType) {
    case "small":
      return `width: 72px; height: 46px; font-size: 15px;`;
    case "large":
      return `width: 116px; height: 46px;`;
    case "line":
      return `width: 250px; height: 46px;`;
    default:
      return ``;
  }
};

const Button = ({
  buttonType,
  colorType,
  width,
  height,
  children,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      type="button"
      buttonType={buttonType}
      colorType={colorType}
      width={width}
      height={height}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: 12px;
  ${text.$subtitle1}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  ${(props) => handleSize(props.buttonType)}
  ${(props) => handleColor(props.colorType)};
  ${(props) => (props.width ? `width: ${props.width}px;` : "")}
  ${(props) => (props.height ? `height: ${props.height}px;` : "")}
  cursor: pointer;
  transition: transform 0.15s ease, filter 0.15s ease, box-shadow 0.15s ease,
    background-color 0.15s ease;

  &:hover {
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    filter: none;
  }
`;

export default Button;
