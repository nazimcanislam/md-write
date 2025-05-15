import Button from "../button";
import { GroupButtonProps } from "./group-button.types";

import "./group-button.css";
import { useState } from "react";

export default function GroupButton({
  buttons,
  selectedButtonNumber,
  setSelectedButtonNumber,
}: GroupButtonProps) {
  const [selectedButton, setSelectedButton] = useState<number | null>(
    selectedButtonNumber || null
  );

  function handleSelectButton(index: number): void {
    setSelectedButton(index);
    setSelectedButtonNumber(index);
  }

  return (
    <div className="group-button">
      {buttons.map((button, index) => (
        <Button
          key={index}
          {...button}
          variant={index === selectedButton ? "primary" : "ghost"}
          onClick={() => {
            handleSelectButton(index);
          }}
        />
      ))}
    </div>
  );
}
