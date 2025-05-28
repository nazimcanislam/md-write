import { DynamicIcon } from "lucide-react/dynamic";
import { ButtonProps } from "./button.types";

import classNames from "classnames";

import "./button.css";

export default function Button({
  title,
  variant = "primary",
  text,
  iconName,
  onClick,
  large = false,
}: ButtonProps) {
  function functionNotImplemented() {
    throw new Error("Function not implemented!");
  }

  return (
    <button
      title={title}
      className={classNames("button", variant, {
        large: large,
        "only-icon": iconName && !text,
      })}
      onClick={onClick ?? functionNotImplemented}
    >
      {iconName && <DynamicIcon name={iconName} size={large ? 22 : 16} />}
      {text && <span>{text}</span>}
    </button>
  );
}
