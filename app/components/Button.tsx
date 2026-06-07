import "../css/button.css";

type ButtonProps = {
  text: string;
  variant?: "type1" | "type2" | "type3";
  link?: string;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
};

export default function Button({
  text,
  link,
  onClick,
  type = "button",
  variant = "type1",
}: ButtonProps) {
  return (
    <button
      className={`button ${variant}`}
      onClick={onClick}
      type={type}
    >
      {link ? <a href={link}>{text}</a> : text}
    </button>
  );
}