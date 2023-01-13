import React, { useState, useEffect } from 'react';

import { history } from 'umi';

import { Button, Form, Input, Picker, Popup, Toast } from 'react-vant';

import { apply } from '@/utils/rules';

import { reqApplyAdd, reqApplyEditor } from '@/services/apply';

import styles from './index.less';

type Props = {
  info: any;
  visible: boolean;
  handleapplyList: () => void;
  handleOpenVisible: (params: boolean) => void;
};

const EditModel = ({ handleOpenVisible, handleapplyList, visible, info }: Props) => {
  const [form] = Form.useForm();

  const { query } = history.location;
  const { type, activityId }: any = query;

  form.setFieldsValue({
    name: info?.name,
    sex: info?.sex,
    idNo: info?.idNo,
    colleageName: info?.colleageName,
    supervisorIdNo: info?.supervisorIdNo,
    supervisorName: info?.supervisorName,
  });

  // 编辑
  const handleApplyAdd = async (params: any) => {
    const res = await reqApplyAdd({ ...params, activityId });
    if (res?.code === 200) {
      Toast.success(res.message);
      handleapplyList();
      handleOpenVisible(false);
    }
  };
  // 添加
  const handleApplyEdit = async (params: any) => {
    const res = await reqApplyEditor({ ...params });
    if (res.code === 200) {
      Toast.success(res.message);
      handleapplyList();
      handleOpenVisible(false);
    }
  };

  const handleOnFinish = (params: any) => {
    if (info?.id) {
      handleApplyEdit({ ...params, id: info?.id, activityId, type });
    } else {
      handleApplyAdd({ ...params, type, activityId });
    }
  };

  return (
    <Popup title={info?.id ? '编辑队员信息' : '添加队员信息'} safeAreaInsetBottom destroyOnClose={true} visible={visible} closeable style={{ height: '88%' }} position="bottom" round onClose={() => handleOpenVisible(false)}>
      <Form
        layout="vertical"
        form={form}
        onFinish={params => handleOnFinish(params)}
        // initialValues={{
        //     name: info?.name,
        //     sex: info?.sex,
        //     idNo: info?.idNo,
        //     colleageName: info?.colleageName,
        //     supervisorIdNo: info?.supervisorIdNo,
        //     supervisorName: info?.supervisorName,
        // }}
        footer={
          <div style={{ margin: '16px 16px 0' }}>
            <Button round nativeType="submit" block color="linear-gradient(to right, #1654ff, #1654ff)">
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
        {type == '1' ? (
          <>
            <Form.Item rules={apply.name} name="colleageName" label="队员所属学校">
              <Input placeholder="请输入队员所属学校" />
            </Form.Item>

            <Form.Item rules={apply.supervisorName} name="supervisorName" label="未成年监护人姓名">
              <Input placeholder="请输入未成年监护人姓名" />
            </Form.Item>

            <Form.Item rules={apply.supervisorIdNo} name="supervisorIdNo" label="未成年监护人身份证号">
              <Input placeholder="请输入未成年监护人身份证号" />
            </Form.Item>
          </>
        ) : null}
      </Form>
    </Popup>
  );
};

export default EditModel;
