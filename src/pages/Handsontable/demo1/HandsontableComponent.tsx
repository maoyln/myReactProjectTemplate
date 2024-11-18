// HandsontableComponent.tsx
import React, { useEffect, useRef, useState } from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

interface TreeNode {
  name: string;
  typeName: string;
  level: number;
  id: string;
  __children?: TreeNode[];
  isCollapse?: boolean;
  [key: string]: any;
}

interface Props {
  data: TreeNode[];
}

const HandsontableComponent: React.FC<Props> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hotInstance, setHotInstance] = useState<Handsontable | null>(null);

  useEffect(() => {
    // if (containerRef.current) {
    //   const hot = new Handsontable(containerRef.current, {
    //     data: flattenTreeData(data),
    //     rowHeaders: true,
    //     colHeaders: ['Name', 'Material Code', 'Material Quantity', 'Design Quantity'],
    //     columns: [
    //       { data: 'name' },
    //       { data: 'materialCode_8' },
    //       { data: 'materialQuantity_8' },
    //       { data: 'designQuantity_8' }
    //     ],
    //     cells: function (row, col) {
    //       const cellProperties: Handsontable.CellProperties = {};
    //       const rowData = hotInstance?.getSourceDataAtRow(row);

    //       if (rowData && rowData.__children && rowData.__children.length > 0) {
    //         cellProperties.renderer = (instance, td, row, col, prop, value, cellProperties) => {
    //           Handsontable.renderers.TextRenderer.apply(this, arguments);
              
    //           const isCollapsed = rowData.isCollapse || false;
    //           td.innerHTML = `<span class="toggle-icon" style="cursor: pointer;">${isCollapsed ? '+' : '-'}</span> ${value}`;

    //           td.querySelector('.toggle-icon')?.addEventListener('click', () => {
    //             rowData.isCollapse = !isCollapsed;
    //             updateTreeView();
    //           });
    //         };
    //       }

    //       return cellProperties;
    //     },
    //     afterChange: function (changes: any, source: string) {
    //       if (changes) {
    //         changes.forEach(([row, prop, oldValue, newValue]) => {
    //           const rowData = hotInstance?.getSourceDataAtRow(row);
    //           if (rowData && rowData.__children) {
    //             rowData.isCollapse = !rowData.isCollapse;
    //             updateTreeView();
    //           }
    //         });
    //       }
    //     }
    //   });
    //   setHotInstance(hot);
    // }
    // return () => {
    //   if (hotInstance) {
    //     hotInstance.destroy();
    //   }
    // };
  }, [data]);

  const flattenTreeData = (data: TreeNode[]): any[] => {
    let result: any[] = [];

    const traverse = (nodes: TreeNode[], parent?: any) => {
      nodes.forEach(node => {
        const currentNode = { ...node, parent };
        result.push(currentNode);
        if (node.__children) {
          traverse(node.__children, node);
        }
      });
    };

    traverse(data);
    return result;
  };

  const updateTreeView = () => {
    const data = hotInstance?.getData();
    data?.forEach((rowData: any) => {
      if (rowData.__children) {
        rowData.isCollapse
          ? rowData.__children.forEach((child: any) => (child._hidden = true))
          : rowData.__children.forEach((child: any) => (child._hidden = false));
      }
    });
    hotInstance?.render();
  };

  return <div ref={containerRef} />;
};

export default HandsontableComponent;
