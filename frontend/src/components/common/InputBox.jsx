const InputBox = ({ label, placeholder, value, onChange, disabled }) => {
  return (
    <div>
      <div className="font-medium text-left py-3">{label}</div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-2 py-1 border rounded-b-2xl border-slate-200 ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
};

export default InputBox;
