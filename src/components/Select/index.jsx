export const SelectComponent = ({ values, onChange }) => {
  return (
    <>
      {values &&
        values.length > 0 &&
        values.map(({ value, label }) => (
          <select
            className="form-select"
            key={value}
            style={{ width: 150 }}
            name="filters"
            value={value}
            onChange={onChange}
          >
            <option key={value}>{label}</option>
          </select>
        ))}
    </>
  );
};
