import classes from "./Button.module.css";

export default function Button({ onClick, children, className, ...props }) {
  return (
    <button
      onClick={onClick}
      className={`${classes.button} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
