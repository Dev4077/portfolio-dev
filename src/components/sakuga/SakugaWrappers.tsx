"use client";

import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import type {
  SakugaButtonElement,
  SakugaToggleElement,
  SakugaSliderElement,
  SakugaCheckboxElement,
  SakugaRadioElement,
  SakugaInputElement,
  SakugaTabsElement,
  SakugaProgressElement,
  SakugaRatingElement,
  SakugaToastElement,
  SakugaTooltipElement,
} from "@/types/sakuga";

// --- SAKUGA BUTTON ---
export interface SakugaButtonProps {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const SakugaButton = forwardRef<SakugaButtonElement, SakugaButtonProps>(
  ({ children, variant = "primary", type = "button", disabled, onClick, className, style, id }, ref) => {
    const elRef = useRef<SakugaButtonElement | null>(null);
    useImperativeHandle(ref, () => elRef.current as SakugaButtonElement);

    useEffect(() => {
      const el = elRef.current;
      if (!el || !onClick) return;
      const handleClick = (e: MouseEvent) => onClick(e);
      el.addEventListener("click", handleClick);
      return () => el.removeEventListener("click", handleClick);
    }, [onClick]);

    return (
      <sakuga-button
        ref={elRef}
        id={id}
        variant={variant}
        type={type}
        disabled={disabled}
        className={className}
        style={style}
      >
        {children}
      </sakuga-button>
    );
  }
);
SakugaButton.displayName = "SakugaButton";

// --- SAKUGA TOGGLE ---
export interface SakugaToggleProps {
  label?: string;
  checked?: boolean;
  name?: string;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const SakugaToggle = forwardRef<SakugaToggleElement, SakugaToggleProps>(
  ({ label = "Toggle", checked, name, disabled, onChange, className, style }, ref) => {
    const elRef = useRef<SakugaToggleElement | null>(null);
    useImperativeHandle(ref, () => elRef.current as SakugaToggleElement);

    useEffect(() => {
      const el = elRef.current;
      if (!el) return;
      if (typeof checked === "boolean" && el.checked !== checked) {
        el.checked = checked;
      }
    }, [checked]);

    useEffect(() => {
      const el = elRef.current;
      if (!el || !onChange) return;
      const handleChange = () => onChange(el.checked);
      el.addEventListener("change", handleChange);
      return () => el.removeEventListener("change", handleChange);
    }, [onChange]);

    return (
      <sakuga-toggle
        ref={elRef}
        label={label}
        checked={checked}
        name={name}
        disabled={disabled}
        className={className}
        style={style}
      />
    );
  }
);
SakugaToggle.displayName = "SakugaToggle";

// --- SAKUGA SLIDER ---
export interface SakugaSliderProps {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  name?: string;
  disabled?: boolean;
  onInput?: (val: number) => void;
  onChange?: (val: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const SakugaSlider = forwardRef<SakugaSliderElement, SakugaSliderProps>(
  (
    {
      label = "Slider",
      value = 50,
      min = 0,
      max = 100,
      step = 1,
      unit = "%",
      name,
      disabled,
      onInput,
      onChange,
      className,
      style,
    },
    ref
  ) => {
    const elRef = useRef<SakugaSliderElement | null>(null);
    useImperativeHandle(ref, () => elRef.current as SakugaSliderElement);

    useEffect(() => {
      const el = elRef.current;
      if (!el) return;
      if (value !== undefined && el.value !== String(value)) {
        el.value = String(value);
      }
    }, [value]);

    useEffect(() => {
      const el = elRef.current;
      if (!el) return;
      const handleInput = () => onInput?.(el.valueAsNumber ?? Number(el.value));
      const handleChange = () => onChange?.(el.valueAsNumber ?? Number(el.value));
      el.addEventListener("input", handleInput);
      el.addEventListener("change", handleChange);
      return () => {
        el.removeEventListener("input", handleInput);
        el.removeEventListener("change", handleChange);
      };
    }, [onInput, onChange]);

    return (
      <sakuga-slider
        ref={elRef}
        label={label}
        value={value}
        min={min}
        max={max}
        step={step}
        unit={unit}
        name={name}
        disabled={disabled}
        className={className}
        style={style}
      />
    );
  }
);
SakugaSlider.displayName = "SakugaSlider";

// --- SAKUGA CHECKBOX ---
export interface SakugaCheckboxProps {
  children?: React.ReactNode;
  label?: string;
  checked?: boolean;
  name?: string;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const SakugaCheckbox = forwardRef<SakugaCheckboxElement, SakugaCheckboxProps>(
  ({ children, label, checked, name, disabled, onChange, className, style }, ref) => {
    const elRef = useRef<SakugaCheckboxElement | null>(null);
    useImperativeHandle(ref, () => elRef.current as SakugaCheckboxElement);

    useEffect(() => {
      const el = elRef.current;
      if (!el) return;
      if (typeof checked === "boolean" && el.checked !== checked) {
        el.checked = checked;
      }
    }, [checked]);

    useEffect(() => {
      const el = elRef.current;
      if (!el || !onChange) return;
      const handleChange = () => onChange(el.checked);
      el.addEventListener("change", handleChange);
      return () => el.removeEventListener("change", handleChange);
    }, [onChange]);

    return (
      <sakuga-checkbox
        ref={elRef}
        label={label}
        checked={checked}
        name={name}
        disabled={disabled}
        className={className}
        style={style}
      >
        {children}
      </sakuga-checkbox>
    );
  }
);
SakugaCheckbox.displayName = "SakugaCheckbox";

// --- SAKUGA RADIO ---
export interface SakugaRadioProps {
  children?: React.ReactNode;
  label?: string;
  value?: string;
  name?: string;
  disabled?: boolean;
  onChange?: (val: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const SakugaRadio = forwardRef<SakugaRadioElement, SakugaRadioProps>(
  ({ children, label = "Options", value, name, disabled, onChange, className, style }, ref) => {
    const elRef = useRef<SakugaRadioElement | null>(null);
    useImperativeHandle(ref, () => elRef.current as SakugaRadioElement);

    useEffect(() => {
      const el = elRef.current;
      if (!el) return;
      if (value !== undefined && el.value !== value) {
        el.value = value;
      }
    }, [value]);

    useEffect(() => {
      const el = elRef.current;
      if (!el || !onChange) return;
      const handleChange = () => onChange(el.value);
      el.addEventListener("change", handleChange);
      return () => el.removeEventListener("change", handleChange);
    }, [onChange]);

    return (
      <sakuga-radio
        ref={elRef}
        label={label}
        value={value}
        name={name}
        disabled={disabled}
        className={className}
        style={style}
      >
        {children}
      </sakuga-radio>
    );
  }
);
SakugaRadio.displayName = "SakugaRadio";

// --- SAKUGA TABS ---
export interface SakugaTabsProps {
  label?: string;
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (val: string, index: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const SakugaTabs = forwardRef<SakugaTabsElement, SakugaTabsProps>(
  ({ label = "Tabs", options, value, onChange, className, style }, ref) => {
    const elRef = useRef<SakugaTabsElement | null>(null);
    useImperativeHandle(ref, () => elRef.current as SakugaTabsElement);

    useEffect(() => {
      const el = elRef.current;
      if (!el || !onChange) return;
      const handleChange = (e: any) => {
        const detail = e.detail;
        if (detail) {
          onChange(detail.value ?? detail.label, detail.index);
        } else {
          onChange(el.value, 0);
        }
      };
      el.addEventListener("change", handleChange);
      return () => el.removeEventListener("change", handleChange);
    }, [onChange]);

    return (
      <sakuga-tabs ref={elRef} label={label} value={value} className={className} style={style}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} selected={opt.value === value}>
            {opt.label}
          </option>
        ))}
      </sakuga-tabs>
    );
  }
);
SakugaTabs.displayName = "SakugaTabs";

// --- SAKUGA PROGRESS ---
export interface SakugaProgressProps {
  label?: string;
  value?: number;
  doneLabel?: string;
  demo?: boolean;
  onDone?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const SakugaProgress = forwardRef<SakugaProgressElement, SakugaProgressProps>(
  ({ label = "Progress", value = 0, doneLabel, demo, onDone, className, style }, ref) => {
    const elRef = useRef<SakugaProgressElement | null>(null);
    useImperativeHandle(ref, () => elRef.current as SakugaProgressElement);

    useEffect(() => {
      const el = elRef.current;
      if (!el) return;
      if (typeof el.set === "function") {
        el.set(value);
      }
    }, [value]);

    useEffect(() => {
      const el = elRef.current;
      if (!el || !onDone) return;
      const handleDone = () => onDone();
      el.addEventListener("sakuga:done", handleDone);
      return () => el.removeEventListener("sakuga:done", handleDone);
    }, [onDone]);

    return (
      <sakuga-progress
        ref={elRef}
        label={label}
        done-label={doneLabel}
        demo={demo}
        className={className}
        style={style}
      />
    );
  }
);
SakugaProgress.displayName = "SakugaProgress";

// --- SAKUGA RATING ---
export interface SakugaRatingProps {
  label?: string;
  value?: number;
  name?: string;
  disabled?: boolean;
  onChange?: (val: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const SakugaRating = forwardRef<SakugaRatingElement, SakugaRatingProps>(
  ({ label = "Rating", value = 0, name, disabled, onChange, className, style }, ref) => {
    const elRef = useRef<SakugaRatingElement | null>(null);
    useImperativeHandle(ref, () => elRef.current as SakugaRatingElement);

    useEffect(() => {
      const el = elRef.current;
      if (!el) return;
      if (value !== undefined && el.value !== value) {
        el.value = value;
      }
    }, [value]);

    useEffect(() => {
      const el = elRef.current;
      if (!el || !onChange) return;
      const handleChange = () => onChange(el.value);
      el.addEventListener("change", handleChange);
      return () => el.removeEventListener("change", handleChange);
    }, [onChange]);

    return (
      <sakuga-rating
        ref={elRef}
        label={label}
        value={value}
        name={name}
        disabled={disabled}
        className={className}
        style={style}
      />
    );
  }
);
SakugaRating.displayName = "SakugaRating";

// --- SAKUGA TOOLTIP ---
export interface SakugaTooltipProps {
  children?: React.ReactNode;
  text: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const SakugaTooltip = forwardRef<SakugaTooltipElement, SakugaTooltipProps>(
  ({ children, text, label = "Help", className, style }, ref) => {
    const elRef = useRef<SakugaTooltipElement | null>(null);
    useImperativeHandle(ref, () => elRef.current as SakugaTooltipElement);

    return (
      <sakuga-tooltip ref={elRef} text={text} label={label} className={className} style={style}>
        {children}
      </sakuga-tooltip>
    );
  }
);
SakugaTooltip.displayName = "SakugaTooltip";

// --- SAKUGA TOAST ---
export interface SakugaToastProps {
  duration?: number;
  message?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const SakugaToast = forwardRef<SakugaToastElement, SakugaToastProps>(
  ({ duration = 3, message = "Saved!", className, style }, ref) => {
    const elRef = useRef<SakugaToastElement | null>(null);
    useImperativeHandle(ref, () => elRef.current as SakugaToastElement);

    return (
      <sakuga-toast
        ref={elRef}
        duration={duration}
        message={message}
        className={className}
        style={style}
      />
    );
  }
);
SakugaToast.displayName = "SakugaToast";

// --- SAKUGA INPUT ---
export interface SakugaInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  type?: string;
  disabled?: boolean;
  onInput?: (val: string) => void;
  onChange?: (val: string) => void;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const SakugaInput = forwardRef<SakugaInputElement, SakugaInputProps>(
  (
    {
      label,
      placeholder,
      value,
      name,
      type = "text",
      disabled,
      onInput,
      onChange,
      className,
      style,
      id,
    },
    ref
  ) => {
    const elRef = useRef<SakugaInputElement | null>(null);
    useImperativeHandle(ref, () => elRef.current as SakugaInputElement);

    useEffect(() => {
      const el = elRef.current;
      if (!el) return;
      if (value !== undefined && el.value !== value) {
        el.value = value;
      }
    }, [value]);

    useEffect(() => {
      const el = elRef.current;
      if (!el) return;
      const handleInput = () => onInput?.(el.value);
      const handleChange = () => onChange?.(el.value);
      el.addEventListener("input", handleInput);
      el.addEventListener("change", handleChange);
      return () => {
        el.removeEventListener("input", handleInput);
        el.removeEventListener("change", handleChange);
      };
    }, [onInput, onChange]);

    return (
      <sakuga-input
        ref={elRef}
        id={id}
        label={label}
        placeholder={placeholder}
        value={value}
        name={name}
        type={type}
        disabled={disabled}
        className={className}
        style={style}
      />
    );
  }
);
SakugaInput.displayName = "SakugaInput";
