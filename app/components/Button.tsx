import "../css/button.css";

type ButtonProps = {
  text: string;
  variant?: "type1" | "type2" | "type3";
  link: string;
};

export default function Button({
  text,
  link,
  variant = "type1",
}: ButtonProps) {
  return (
    <button className={`button ${variant}`}>
      <a href={link}>{text}</a>
    </button>
  );
}