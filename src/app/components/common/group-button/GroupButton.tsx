import { useState } from "react";
import { GroupButtonProps } from "./group-button.types";

import Button from "../button";

export default function GroupButton({
  buttons,
  selectedButtonNumber,
  setSelectedButtonNumber,
}: GroupButtonProps) {
  const [selectedButton, setSelectedButton] = useState<number | null>(
    selectedButtonNumber ?? null
  );

  function handleSelectButton(index: number): void {
    setSelectedButton(index);
    setSelectedButtonNumber(index);
  }

  return (
    <div className="flex rounded-full border border-primary">
      {buttons.map((button, index) => (
        <Button
          key={index}
          {...button}
          variant={index === selectedButton ? "primary" : "ghost"}
          onClick={() => handleSelectButton(index)}
        />
      ))}
    </div>
  );
}
