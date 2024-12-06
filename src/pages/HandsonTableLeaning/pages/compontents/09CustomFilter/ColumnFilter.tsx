import React from 'react';

interface ColumnFilterProps {
  value: string;
  onChange: (value: string) => void;
  onReset: () => void;
}

const ColumnFilter: React.FC<ColumnFilterProps> = ({ value, onChange, onReset }) => {
  return (
    <div>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
      <button onClick={onReset}>重置</button>
      <button onClick={() => onChange(value)}>应用</button>
    </div>
  );
};

export default ColumnFilter;