"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const CurrencyInput = React.forwardRef(
  ({ className, value, onChange, onValueChange, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState("");

    const formatCurrency = (amount) => {
      if (amount === null || amount === undefined) return "";
      if (amount === 0) return "0";
      return new Intl.NumberFormat("id-ID").format(amount);
    };

    const parseCurrency = (value) => {
      const numericValue = value.replace(/[^\d]/g, "");
      return Number.parseInt(numericValue);
    };

    React.useEffect(() => {
      if (value === null || value === undefined) {
        setDisplayValue("");
      } else {
        setDisplayValue(formatCurrency(value));
      }
    }, [value]);

    const handleInputChange = (e) => {
      const inputValue = e.target.value;
      console.log({ inputValue });

      if (!inputValue) {
        setDisplayValue("");
        onValueChange?.(null);
        onChange?.(null);
        return;
      }

      const numericValue = parseCurrency(inputValue);

      const formatted = formatCurrency(numericValue);
      setDisplayValue(formatted);

      onChange?.(numericValue);
      onValueChange?.(numericValue);
    };

    const handleFocus = (e) => {
      e.target.select();
      props.onFocus?.(e);
    };

    return (
      <Input
        {...props}
        ref={ref}
        type="text"
        value={displayValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        className={cn(className)}
        placeholder={props.placeholder || "0"}
      />
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
