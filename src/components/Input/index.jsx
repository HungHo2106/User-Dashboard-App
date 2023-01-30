export const InputComponent = ({ value, onChange, name, placeholder }) => {
  return (
    <input
      className="form-control"
      style={{ width: 250 }}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
