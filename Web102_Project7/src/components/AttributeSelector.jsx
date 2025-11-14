export default function AttributeSelector({ name, options, value, onChange }) {
  return (
    <div className="attribute-selector">
      <div className="attribute-name">{name}</div>
      <div className="attribute-options">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`option-btn ${value === opt ? "selected" : ""}`}
            onClick={() => onChange(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}