export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
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
        placeholder={placeholder}
        required={required}
        className="w-full h-[46px] bg-black border border-[#C39F20] rounded-xl px-5 text-[#C39F20] placeholder:text-[#C39F20] outline-none focus:ring-1 focus:ring-[#C39F20]"
      />
    </div>
  );
}