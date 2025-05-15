import classNames from "classnames";
import { ButtonProps } from "./button.types";
import { DynamicIcon } from "lucide-react/dynamic";

import "./button.css";

export default function Button({
  title,
  variant,
  text,
  iconName,
  onClick,
  large,
}: ButtonProps) {
  function functionNotImplemented() {
    throw new Error("Function not implemented!");
  }

  return (
    <button
      title={title}
      className={classNames(
        "button",
        variant ? `button-${variant}` : "button-primary",
        {
          "with-icon": iconName !== undefined,
          "only-icon": iconName !== undefined && text === undefined,
          large: large,
        }
      )}
      onClick={onClick ? onClick : functionNotImplemented}
    >
      {iconName && <DynamicIcon name={iconName} size={large ? 22 : 16} />}
      {text !== "" || text !== undefined ? <span>{text}</span> : null}
    </button>
  );
}
