import { FC, ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

import styles from "./Button.module.css";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...rest
}) => <button className={clsx(styles.Button, className)} {...rest} />;

export default Button;
