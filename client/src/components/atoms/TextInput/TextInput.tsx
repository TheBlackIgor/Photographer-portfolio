import "./TextInput.scss";

interface TextInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  type?: "text" | "number" | "password" | "email";
  required?: boolean;
  autoComplete?: "on" | "off";
  name: string;
  label: string;
  width?: string;
  multiline?: boolean;
}

export const TextInput = ({
  value,
  setValue,
  type = "text",
  required = false,
  autoComplete = "off",
  name,
  label,
  width = "190px",
  multiline = false,
}: TextInputProps) => (
  <div className="text-input-input-group">
    <label htmlFor={name} className="text-input-label">
      {label}
    </label>
    <input
      aria-multiline={multiline}
      required={required}
      autoComplete={autoComplete}
      name={name}
      id={name}
      className="text-input-input"
      style={{ width: width }}
      value={value}
      type={type}
      onChange={e => setValue(e.target.value)}
    />
  </div>
);
