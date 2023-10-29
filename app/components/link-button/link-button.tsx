import Link from "next/link";
import Button from "@mui/material/Button";

export interface LinkButtonProps {
    href: string;
    as: string;
    text: string;
    variant?: "text" | "outlined" | "contained";
}

const LinkButton = ({href, as, text, variant}: LinkButtonProps) => {
  return (
    <Link href={href} as={as} legacyBehavior>
      <Button variant={variant}>{text}</Button>
    </Link>
  );
};

export default LinkButton
