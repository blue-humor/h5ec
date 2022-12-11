import React from 'react';

import { history } from 'umi';

import { Card, Form, Input, Picker, Button, Toast } from 'react-vant';

import NavBar from '@/components/NavBar';

import { apply } from '@/utils/rules';

import { reqApplyAdd, reqApplyEditor } from '@/services/apply';

import styles from './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = props => {
  const [form] = Form.useForm();

  const { query } = history.location;
  const { type, register_memberId, info }: any = query;

  // 编辑
  const handleApplyAdd = async (params: any) => {
    const res = await reqApplyAdd(params);
    if (res?.code === 200) {
      Toast.success(res.message);
      history.goBack();
    }
  };
  // 添加
  const handleApplyEdit = async (params: any) => {
    const res = await reqApplyEditor(params);
    if (res.code === 200) {
      Toast.success(res.message);
      history.goBack();
    }
  };

  const handleOnFinish = (params: any) => {
    if (info?.id) {
      handleApplyEdit({ ...params, register_memberId, id: info?.id });
    } else {
      handleApplyAdd({ ...params, register_memberId, type });
    }
  };
  return (
    <>
      <NavBar title={` ${query?.id ? '编辑收货地址' : '添加收货地址'}`} />

      <Card className={styles.container}>
        <Form
          layout="vertical"
          form={form}
          onFinish={params => handleOnFinish(params)}
          initialValues={{
            name: info?.name,
            sex: info?.sex,
            idNo: info?.idNo,
            colleageName: info?.colleageName,
            supervisorIdNo: info?.supervisorIdNo,
            supervisorName: info?.supervisorName,
          }}
          footer={
            <div style={{ margin: '16px 16px 0' }}>
              <Button round nativeType="submit" block color="linear-gradient(to right, #aad08f, #87c38f)">
                保存
              </Button>
            </div>
          }
        >
          <Form.Item rules={apply.name} name="name" label="队员姓名">
            <Input placeholder="请输入队员姓名" />
          </Form.Item>
          <Form.Item
            isLink
            name="sex"
            label="性别"
            rules={apply.sex}
            trigger="onConfirm"
            onClick={(_, action: any) => {
              action.current?.open();
            }}
          >
            <Picker popup columns={['男', '女']}>
              {val => val || '选择性别'}
            </Picker>
          </Form.Item>
          <Form.Item rules={apply.idNo} name="idNo" label="队员身份证号码">
            <Input placeholder="输入身份证号码" />
          </Form.Item>
          {type !== '1' ? (
            <>
              <Form.Item rules={apply.name} name="colleageName" label="队员所属学校">
                <Input placeholder="请输入队员所属学校" />
              </Form.Item>

              <Form.Item rules={apply.name} name="supervisorName" label="未成年监护人姓名">
                <Input placeholder="请输入未成年监护人姓名" />
              </Form.Item>

              <Form.Item rules={apply.name} name="supervisorIdNo" label="未成年监护人身份证号">
                <Input placeholder="请输入未成年监护人身份证号" />
              </Form.Item>
            </>
          ) : null}
        </Form>
      </Card>
    </>
  );
};

export default Index;
