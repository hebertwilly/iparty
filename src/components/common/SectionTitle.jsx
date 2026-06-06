export default function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl mx-auto text-center mb-12">
      {eyebrow && (
        <p className="text-yellow-500 font-semibold mb-3">{eyebrow}</p>
      )}

      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
        {title}
      </h2>

      {description && (
        <p className="text-zinc-400 text-base sm:text-lg">{description}</p>
      )}
    </div>
  );
}