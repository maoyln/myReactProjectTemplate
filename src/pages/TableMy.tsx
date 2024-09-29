import React, { useState } from 'react';
import { Form, Input, Button, Table } from 'antd';

const ExampleForm = () => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState<any[]>([{ fieldName: '' }]); // 管理字段状态

  // 更新字段值状态
  const handleFieldChange = (value: string, index: number) => {
    const newFields = [...fields];
    newFields[index].fieldName = value;
    setFields(newFields);

    // 触发校验
    form.validateFields([['list', index, 'fieldName']]);
  };

  // 校验函数：检查字段值是否重复
  const validateUniqueField = async (_: any, value: string, index: number) => {
    // 获取所有字段值
    const values = fields.map((item) => item.fieldName);
    // 检查是否有重复
    const isDuplicate = values.filter((item) => item === value).length > 1;
    if (isDuplicate) {
      return Promise.reject('字段名称不能重复');
    }
    return Promise.resolve();
  };

  return (
    <Form
      form={form}
      onFinish={(values) => {
        console.log('Form values:', values);
      }}
      layout="vertical"
    >
      <Form.List
        name="list"
        initialValue={fields} // 设置初始值
      >
        {(fieldsList, { add, remove }) => (
          <>
            {fieldsList.map(({ key, name, fieldKey, ...restField }, index) => (
              <Form.Item
                key={key}
                name={[name, 'fieldName']}
                fieldKey={[fieldKey as any, 'fieldName']}
                label={`字段名称 ${index + 1}`}
                rules={[
                  {
                    required: true,
                    message: '字段名称不能为空',
                  },
                  {
                    validator: (_, value) =>
                      validateUniqueField(_, value, index),
                  },
                ]}
              >
                <Input
                  placeholder="请输入字段名称"
                  value={fields?.[index]?.fieldName}
                  onChange={(e) => handleFieldChange(e.target.value, index)}
                />
              </Form.Item>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block>
                添加字段
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ExampleForm;
