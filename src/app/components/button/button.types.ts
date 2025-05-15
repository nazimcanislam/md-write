import { IconName } from "lucide-react/dynamic";

export interface ButtonProps {
  title: string;
  variant?: "primary" | "secondary" | "ghost";
  text?: string;
  iconName?: IconName;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  large?: boolean;
}
