
"use client";
import WithAuth from "@/components/Layout/WithLayout";
import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef, InputRef, TableProps } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Popconfirm, Table , Flex, Progress  } from 'antd';
import useUserActivity from "../../../../hooks/useUserActivity";



const ProgressComponent: React.FC = () => {
    const [percent, setPercent] = useState<number>(0);
    useUserActivity();
    const increase = () => {
      setPercent((prevPercent) => {
        const newPercent = prevPercent + 20;
        if (newPercent > 100) {
          return 100;
        }
        return newPercent;
      });
    };
  
    const decline = () => {
      setPercent((prevPercent) => {
        const newPercent = prevPercent - 20;
        if (newPercent < 0) {
          return 0;
        }
        return newPercent;
      });
    };
  
    return (
      <Flex vertical gap="small">
        <Flex vertical gap="small">
          <Progress percent={percent} type="line" />
        </Flex>
        <Button.Group>
          <Button onClick={decline} icon={<MinusOutlined />} />
          <Button onClick={increase} icon={<PlusOutlined />} />
        </Button.Group>
      </Flex>
    );
  };



type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} is required.` }]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

interface DataType {
  key: React.Key;
  goal: string;
  status: string;
}

type ColumnTypes = Exclude<TableProps<DataType>['columns'], undefined>;

const Goal: React.FC = () => {  
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: '0',
      goal: 'Improve math score by 10%',
      status: 'London, Park Lane no. 0',
    },
    {
      key: '1',
      goal: 'Complete all assignments on time',
      status: 'London, Park Lane no. 1',
    },
  ]);

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'Goal/Target',
      dataIndex: 'goal',
      width: '30%',
      editable: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: () => <ProgressComponent/>
    },
    {
      title: 'Actions',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      goal: `Edward King ${count}`,
      status: `London, Park Lane no. ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
        <h1 className="text-center text-3xl">Student Goals & Targets</h1>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
     <Input placeholder="Enter New Goal"/>
      <Table<DataType>
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default WithAuth(Goal);
