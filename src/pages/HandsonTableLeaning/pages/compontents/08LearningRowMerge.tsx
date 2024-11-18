import React, { useEffect, useRef, useState } from "react";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.css";
import "./08LearningRowMerge.css"; // 样式文件

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);

  const data = Handsontable.helper.createSpreadsheetData(20, 20); // 示例数据

  // 表头配置
  const headers = [
    ["单位工程", "审核内容", "提交时间", "提交人", "审核时间", "审核人", "审核状态", "审核建议", "操作"],
  ];

  // 列宽设置
  const columnWidths = [150, 150, 120, 120, 120, 100, 120, 200, 120];

  useEffect(() => {
    if (containerRef.current) {
      const hot = new Handsontable(containerRef.current, {
        data,
        colHeaders: false, // 不显示默认表头
        rowHeaders: true,
        width: "100%",
        height: "auto",
        licenseKey: "non-commercial-and-evaluation",
        colWidths: columnWidths, // 设置列宽
        manualColumnResize: true, // 支持拖拽列宽
        afterSelection: (_, col) => {
          setSelectedColumn(col); // 选中列
        },
        afterDeselect: () => {
          setSelectedColumn(null); // 清除选中状态
        },
        afterRender: () => {
          // 同步 .ht_clone_top 的宽度
          const htMaster: any = document.querySelector('.ht_master');
          const htCloneTop: any = document.querySelector('.ht_clone_top');
          if (htMaster && htCloneTop) {
            htCloneTop.style.width = `${htMaster.offsetWidth}px`; // 设置 .ht_clone_top 宽度
          }

          // 设置动态表头背景色
          const headerRows = document.querySelectorAll(".ht_clone_top tbody tr");
          headerRows.forEach((row) => {
            const cells = row.querySelectorAll("td");
            cells.forEach((cell, cellIndex) => {
              const isSelected = cellIndex === selectedColumn;
              (cell as HTMLElement).style.backgroundColor = isSelected ? "yellow" : "red";
            });
          });
        },
        beforeOnCellMouseDown: (event, coords) => {
          if (coords.row < 0) {
            event.stopImmediatePropagation(); // 禁用默认行为
          }
        },
      });

      // 替换表头
      const headerHTML = headers
        .map((row) => {
          return `<tr>${row
            .map((header) => `<td class="htCenter htMiddle theadBg">${header}</td>`)
            .join("")}</tr>`;
        })
        .join("");

      const table = containerRef.current.querySelector(".ht_clone_top .htCore");
      const tbody = table?.querySelector("tbody");
      if (tbody) {
        tbody.innerHTML = headerHTML;
      }

      return () => hot.destroy();
    }
  }, [selectedColumn]);

  return (
    <div>
      <div ref={containerRef} className="hot-container" style={{ position: "relative" }}>
        <style>
          {`
            .ht_clone_top {
              position: absolute;
              top: 0;
              left: 0;
              z-index: 1; /* 使其位于 .ht_master 上方 */
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default App;
