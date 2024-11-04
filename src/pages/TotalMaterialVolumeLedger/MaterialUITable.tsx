import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Collapse } from '@mui/material';
import { Paper } from '@mui/material';

interface DataNode {
  key: string;
  title: string;
  children?: DataNode[];
}

const createData = (): DataNode[] => {
  return [
    {
      key: '1',
      title: '热札圆盘条1',
      children: [
        {
          key: '1-1',
          title: '子项1-1',
          children: [
            { key: '1-1-1', title: '子项1-1-1' },
            { key: '1-1-2', title: '子项1-1-2' },
          ],
        },
        { key: '1-2', title: '子项1-2' },
      ],
    },
    {
      key: '2',
      title: '热札圆盘条2',
      children: [
        { key: '2-1', title: '子项2-1' },
        { key: '2-2', title: '子项2-2' },
      ],
    },
  ];
};

const TreeTable: React.FC = () => {
  const [data, setData] = useState<DataNode[]>(createData());
  const [openRows, setOpenRows] = useState<Set<string>>(new Set());

  const handleToggleRow = (key: string) => {
    const newOpenRows = new Set(openRows);
    if (newOpenRows.has(key)) {
      newOpenRows.delete(key);
    } else {
      newOpenRows.add(key);
    }
    setOpenRows(newOpenRows);
  };

  const renderRows = (nodes: DataNode[]) => {
    return nodes.map((node) => (
      <React.Fragment key={node.key}>
        <TableRow>
          <TableCell>
            {node.children && (
              <TableSortLabel onClick={() => handleToggleRow(node.key)}>
                {openRows.has(node.key) ? '[-]' : '[+]'}
              </TableSortLabel>
            )}
            {node.title}
          </TableCell>
        </TableRow>
        {node.children && openRows.has(node.key) && (
          <TableRow>
            <TableCell colSpan={1} style={{ padding: 0 }}>
              <Collapse in={openRows.has(node.key)} timeout="auto" unmountOnExit>
                <Table size="small">
                  <TableBody>{renderRows(node.children)}</TableBody>
                </Table>
              </Collapse>
            </TableCell>
          </TableRow>
        )}
      </React.Fragment>
    ));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>标题</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderRows(data)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TreeTable;
