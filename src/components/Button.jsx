import classes from "./Button.module.css";

export default function Button({
  onClick,
  children,
  className,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${classes.button} ${className || ""}`} // fallback if no className is passed to Button. Final strings resolves to "", instead of 'undefined'
      {...props}
    >
      {children}
    </button>
  );
}
