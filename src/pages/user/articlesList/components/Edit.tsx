import React, { useEffect, useState } from 'react';
import { history } from 'umi';

import { Popup, Uploader, Form, Input, Button, Card, Typography, Skeleton, Toast } from 'react-vant';

import { reqUpload } from '@/services/apply';

import { reqAddArticle, reqEdit } from '@/services/articles';

import styles from './index.less';

interface IndexProps {
  row: any;
  visible: boolean;
  handleOpenVisible: (parmas: boolean) => void;
  handleArticleList: () => void;
}

const Edit: React.FC<IndexProps> = ({ visible, handleOpenVisible, row, handleArticleList }) => {
  const [form] = Form.useForm();

  const [initialValues, setInitialValues] = useState({});

  const handleAdd = async (values: any) => {
    const res = await reqAddArticle(values);
    if (res?.code === 200) {
      Toast.success(res?.message);
      handleOpenVisible(false);
      handleArticleList();
    }
  };

  const handleEdit = async (values: any) => {
    const res = await reqEdit({ ...values, id: row?.id });
    if (res?.code === 200) {
      Toast.success(res?.message);
      handleOpenVisible(false);
      handleArticleList();
    }
  };

  const handleUpload = async (file: any) => {
    const body = new FormData();
    body.append('file', file);
    const res = await reqUpload(body);
    if (res.code === 200) {
      return { url: res?.data };
    } else {
      return { url: '' };
    }
  };

  form.setFieldsValue({
    id: row?.id,
    title: row?.title,
    content: row?.content,
    thumb: row?.thumb ? [{ url: row?.thumb }] : [],
    video: row?.video ? [{ url: row?.video }] : [],
  });

  return (
    <>
      <Popup title={row?.id ? '编辑投稿' : '添加投稿'} safeAreaInsetBottom destroyOnClose={true} visible={visible} closeable style={{ height: '88%' }} position="bottom" round onClose={() => handleOpenVisible(false)}>
        <Card className={styles.container}>
          <Form
            layout="vertical"
            form={form}
            onFinish={params => (row?.id ? handleEdit(params) : handleAdd(params))}
            // initialValues={initialValues}
            footer={
              <div style={{ margin: '16px 16px 0' }}>
                <Button round nativeType="submit" block color="linear-gradient(to right, #1654ff, #1654ff)">
                  保存
                </Button>
              </div>
            }
          >
            <Form.Item name="title" label="投稿标题" rules={[{ required: true, message: '请输入投稿标题' }]}>
              <Input placeholder="请输入投稿标题" />
            </Form.Item>

            <Form.Item name="content" label="投稿内容" rules={[{ required: true, message: '请输入投稿内容' }]}>
              <Input.TextArea placeholder="请输入投稿内容" showWordLimit={({ currentCount }) => <span>已经输入{currentCount}个字啦 ✍️</span>} />
            </Form.Item>
            <Form.Item name="thumb" label="上传投稿配图" rules={[{ required: true, message: '请上传投稿配图' }]}>
              <Uploader accept="image/*" maxCount={1} upload={handleUpload} />
            </Form.Item>
            <Form.Item name="video" label="上传视频">
              <Uploader accept="video/*" maxCount={1} upload={handleUpload} />
            </Form.Item>
          </Form>
        </Card>
      </Popup>
    </>
  );
};

export default Edit;
