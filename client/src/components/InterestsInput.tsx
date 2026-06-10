import { useState } from 'react';

/** Chip input for a list of short strings (interests, etc.). */
export function InterestsInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [text, setText] = useState('');
  const add = () => {
    const v = text.trim();
    if (v && !value.includes(v)) onChange([...value, v]);
    setText('');
  };
  return (
    <div>
      <div className="chips" style={{ marginBottom: 8 }}>
        {value.map((v) => (
          <span key={v} className="chip">
            {v}
            <button type="button" onClick={() => onChange(value.filter((x) => x !== v))} aria-label={`remove ${v}`}>×</button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            add();
          }
        }}
        onBlur={add}
        placeholder="Type an interest and press Enter (e.g. soccer, space, anime)"
      />
    </div>
  );
}
