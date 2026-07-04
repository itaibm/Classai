import { useState } from 'react';
import type { ElementProps } from './types.ts';
import type { ArrayEl } from '@shared/elements.ts';
import { arrayDots } from './geometry.ts';

/**
 * `array` — an area/times-table array of dots, rows × cols.
 *
 * demonstrate: dots laid out via `arrayDots`; an optional "↻ turn it" button
 * (when `animate: 'rotate'`) swaps rows/cols to show the commutative flip.
 * manipulate: the child builds the array one row-group at a time; finishing
 * all `rows` groups reports the built product.
 */
export const ArrayElement: React.FC<ElementProps<ArrayEl>> = ({ el, mode, onResult }) => {
  const [rot, setRot] = useState(false);
  const [built, setBuilt] = useState(0);
  const rows = rot ? el.cols : el.rows, cols = rot ? el.rows : el.cols;
  const dots = arrayDots(rows, cols);
  const label = `${rows} × ${cols} = ${rows * cols}`;
  if (mode === 'manipulate') {
    const done = built === el.rows;
    return (
      <div className="el-array">
        <p className="el-prompt">Build {el.rows} groups of {el.cols}.</p>
        <div className="el-groups">
          {Array.from({ length: built }).map((_, g) => (
            <span key={g} className="el-group">{'●'.repeat(el.cols)}</span>
          ))}
        </div>
        <button
          className="el-btn"
          disabled={done}
          onClick={() => {
            const n = built + 1;
            setBuilt(n);
            if (n === el.rows) onResult?.({ text: `built ${el.rows}×${el.cols}`, correct: true });
          }}
        >
          + add a group of {el.cols}
        </button>
      </div>
    );
  }
  return (
    <div className="el-array">
      <svg viewBox="0 0 260 150" width="240" role="img" aria-label={`array ${label}`}>
        {dots.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r="9" fill={rot ? 'var(--el-orange)' : 'var(--el-blue)'} />
        ))}
        <text x="130" y="140" textAnchor="middle" fontSize="16" fill="var(--el-ink)">{label}</text>
      </svg>
      {el.animate === 'rotate' && <button className="el-btn" onClick={() => setRot((r) => !r)}>↻ turn it</button>}
    </div>
  );
};
