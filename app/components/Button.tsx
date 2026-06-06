import "../css/button.css";

type ButtonProps = {
  text: string;
  variant?: "type1" | "type2" | "type3";
  link?: string;
  onClick?: () => void;
};

export default function Button({
  text,
  link,
  onClick,
  variant = "type1",
}: ButtonProps) {
  return (
    <button
      className={`button ${variant}`}
      onClick={onClick}
    >
      {link ? <a href={link}>{text}</a> : text}
    </button>
  );
}