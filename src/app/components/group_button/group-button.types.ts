import { Dispatch, SetStateAction } from "react";
import { ButtonProps } from "../button/button.types";

export interface GroupButtonProps {
  buttons: ButtonProps[];
  selectedButtonNumber: number;
  setSelectedButtonNumber: Dispatch<SetStateAction<number>>;
}
