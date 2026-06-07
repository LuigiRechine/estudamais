"use client";
import "../css/input.css";

type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

export default function Input({
  label,
  type = "text",
  placeholder,
  onChange,
  value,
}: InputProps) {
  return (
    <div className="inputContainer">
      <label className="label">{label}</label>

      <input type={type} placeholder={placeholder} className="input" onChange={onChange} value={value}/>
    </div>
  );
}
