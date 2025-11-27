import { ReactNode, useState } from "react";
import { clsx } from "clsx";

import ArrowIcon from "@assets/icons/arrow.svg?react";

import styles from "./Select.module.css";

import { ISelectOptions } from "@appTypes/select.types";

interface ISelectProps<O extends ISelectOptions> {
  value?: O;
  options: O[];
  placeholder?: string;
  className?: string;
  onChange?: (value: O) => void;
}

const Select = <O extends ISelectOptions>({
  options,
  placeholder,
  value,
  className,
  onChange,
}: ISelectProps<O>): ReactNode => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = (): void => setIsOpen((prev) => !prev);

  const handleChange = (value: O) => (): void => {
    onChange?.(value);
    setIsOpen(false);
  };

  return (
    <div className={clsx(styles.Select, className)}>
      <div className={styles.SelectInput} onClick={handleToggle}>
        <p>{value?.label || placeholder}</p>
        <ArrowIcon />
      </div>
      <div className={clsx(styles.SelectDropdown, { [styles.IsOpen]: isOpen })}>
        {options.map((o) => (
          <div
            key={o.label}
            className={styles.SelectItem}
            onClick={handleChange(o)}
          >
            <p>{o.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
