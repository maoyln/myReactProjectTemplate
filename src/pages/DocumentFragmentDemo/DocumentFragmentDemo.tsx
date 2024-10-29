import React, { useEffect, useRef } from 'react';

interface Item {
  id: number;
  text: string;
}

const DocumentFragmentDemo: React.FC = () => {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const items: Item[] = [
      { id: 1, text: 'Item 1' },
      { id: 2, text: 'Item 2' },
      { id: 3, text: 'Item 3' },
      { id: 4, text: 'Item 4' },
      { id: 5, text: 'Item 5' },
      { id: 6, text: 'Item 6' },
      { id: 7, text: 'Item 7' },
      { id: 8, text: 'Item 8' },
      { id: 9, text: 'Item 9' },
      { id: 10, text: 'Item 10' },
      { id: 11, text: 'Item 11' },
      { id: 12, text: 'Item 12' },
      { id: 13, text: 'Item 13' },
      { id: 14, text: 'Item 14' },
      { id: 15, text: 'Item 15' },
      { id: 16, text: 'Item 16' },
    ];

    const fragment = new DocumentFragment();

    items.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item.text;
      li.id = `item-${item.id}`;
      fragment.appendChild(li);
    });

    if (listRef.current) {
      listRef.current.appendChild(fragment);
    }
  }, []);

  return (
    <div>
      <h1>DocumentFragment Demo</h1>
      <ul ref={listRef}></ul>
    </div>
  );
};

export default DocumentFragmentDemo;
