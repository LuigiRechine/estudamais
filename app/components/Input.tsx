"use client";
import "../css/input.css";

type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
};

export default function Input({
  label,
  type = "text",
  placeholder,
}: InputProps) {
  return (
    <div className="inputContainer">
      <label className="label">{label}</label>

      <input type={type} placeholder={placeholder} className="input" />
    </div>
  );
}
