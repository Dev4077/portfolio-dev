import * as React from "react";

export interface SakugaButtonElement extends HTMLElement {
  primary: boolean;
  disabled: boolean;
  done(stayMs?: number): void;
  impact(): void;
}

export interface SakugaToggleElement extends HTMLElement {
  checked: boolean;
  disabled: boolean;
  flip(): void;
}

export interface SakugaSliderElement extends HTMLElement {
  value: string;
  valueAsNumber: number;
  disabled: boolean;
}

export interface SakugaCheckboxElement extends HTMLElement {
  checked: boolean;
  disabled: boolean;
}

export interface SakugaRadioElement extends HTMLElement {
  value: string;
  disabled: boolean;
}

export interface SakugaInputElement extends HTMLElement {
  value: string;
  disabled: boolean;
}

export interface SakugaTabsElement extends HTMLElement {
  value: string;
}

export interface SakugaProgressElement extends HTMLElement {
  value: number;
  done: boolean;
  set(progress: number, immediate?: boolean): void;
  reset(): void;
}

export interface SakugaRatingElement extends HTMLElement {
  value: number;
  disabled: boolean;
}

export interface SakugaToastElement extends HTMLElement {
  open: boolean;
  show(message?: string): void;
  hide(): void;
}

export interface SakugaTooltipElement extends HTMLElement {
  open: boolean;
  show(): void;
  hide(): void;
}

type SakugaCustomElements = {
  'sakuga-button': React.DetailedHTMLProps<React.HTMLAttributes<SakugaButtonElement>, SakugaButtonElement> & {
    variant?: 'primary' | 'secondary';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    part?: string;
    children?: React.ReactNode;
  };
  'sakuga-toggle': React.DetailedHTMLProps<React.HTMLAttributes<SakugaToggleElement>, SakugaToggleElement> & {
    label?: string;
    checked?: boolean;
    name?: string;
    value?: string;
    disabled?: boolean;
  };
  'sakuga-slider': React.DetailedHTMLProps<React.HTMLAttributes<SakugaSliderElement>, SakugaSliderElement> & {
    label?: string;
    value?: number | string;
    min?: number | string;
    max?: number | string;
    step?: number | string;
    unit?: string;
    name?: string;
    disabled?: boolean;
  };
  'sakuga-checkbox': React.DetailedHTMLProps<React.HTMLAttributes<SakugaCheckboxElement>, SakugaCheckboxElement> & {
    label?: string;
    checked?: boolean;
    name?: string;
    value?: string;
    disabled?: boolean;
    children?: React.ReactNode;
  };
  'sakuga-radio': React.DetailedHTMLProps<React.HTMLAttributes<SakugaRadioElement>, SakugaRadioElement> & {
    label?: string;
    value?: string;
    name?: string;
    disabled?: boolean;
    children?: React.ReactNode;
  };
  'sakuga-input': React.DetailedHTMLProps<React.HTMLAttributes<SakugaInputElement>, SakugaInputElement> & {
    label?: string;
    placeholder?: string;
    value?: string;
    name?: string;
    type?: string;
    disabled?: boolean;
  };
  'sakuga-tabs': React.DetailedHTMLProps<React.HTMLAttributes<SakugaTabsElement>, SakugaTabsElement> & {
    label?: string;
    value?: string;
    children?: React.ReactNode;
  };
  'sakuga-progress': React.DetailedHTMLProps<React.HTMLAttributes<SakugaProgressElement>, SakugaProgressElement> & {
    label?: string;
    value?: number;
    'done-label'?: string;
    demo?: boolean;
  };
  'sakuga-rating': React.DetailedHTMLProps<React.HTMLAttributes<SakugaRatingElement>, SakugaRatingElement> & {
    label?: string;
    value?: number;
    name?: string;
    disabled?: boolean;
  };
  'sakuga-toast': React.DetailedHTMLProps<React.HTMLAttributes<SakugaToastElement>, SakugaToastElement> & {
    duration?: number | string;
    message?: string;
  };
  'sakuga-tooltip': React.DetailedHTMLProps<React.HTMLAttributes<SakugaTooltipElement>, SakugaTooltipElement> & {
    text?: string;
    label?: string;
    children?: React.ReactNode;
  };
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends SakugaCustomElements {}
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends SakugaCustomElements {}
  }

  interface Window {
    SakugaFX?: any;
    showSakugaToast?: (msg: string) => void;
  }
}
