export interface BaseInputProps {
  label: string;
  optional?: boolean;
  helperText?: string;
  type?: string;
  placeholder?: string;
}

export interface Option {
  label: string;
  value: string;
}
