export function Input({ name, value, onChange }: { name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return <input name={name} value={value} onChange={onChange} className="border p-2 w-full rounded-md" />;
  }