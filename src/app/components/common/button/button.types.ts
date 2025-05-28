import { IconName } from "lucide-react/dynamic";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  title: string;
  text?: string;
  iconName?: IconName;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  large?: boolean;
}
