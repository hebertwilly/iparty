export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  className = "",
  maxLength,
}) {
  return (
    <div className={className}>
      <label className="block text-[#6F6F6F] text-sm mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        className="w-full h-[46px] bg-black border border-[#C39F20] rounded-xl px-5 text-[#C39F20] placeholder:text-[#C39F20] outline-none focus:ring-1 focus:ring-[#C39F20]"
      />
    </div>
  );
}