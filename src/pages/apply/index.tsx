import React, { useState } from 'react';

import { Card, Tabs, Button, Input, Form, Uploader, Picker, Typography, Checkbox } from 'react-vant';

import { reqProjects } from '@/services/apply';

interface IndexProps {}

const Index: React.FC<IndexProps> = props => {
  const [form] = Form.useForm();

  const [groupProject, setGroupProject] = useState<any>({
    registerProjectList: [],
    projectType: '',
  });

  const onFinish = (values: any) => {
    console.log(values);
  };

  const handleProjects = async (parmas: any) => {
    const res = await reqProjects(parmas);
    if (res.code === 200) {
      setGroupProject(res.data);
    }
  };

  return (
    <>
      <Tabs active="c" lazyRender lazyRenderPlaceholder swipeable color="#000000" offsetTop="10">
        <Tabs.TabPane title={`非校内参赛队注册`}>
          <Card style={{ margin: '20px 10px 44px 10px ' }}>
            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
              footer={
                <div style={{ margin: '16px 0 10px 0' }}>
                  <Button round nativeType="submit" type="info" block>
                    保存并添加队伍信息
                  </Button>
                </div>
              }
            >
              <Form.Item
                isLink
                name="groupName"
                label="选择队伍"
                trigger="onConfirm"
                onClick={(_, action: any) => {
                  action.current?.open();
                }}
              >
                <Picker onConfirm={(v: string) => handleProjects({ groupName: v })} popup columns={['甲', '乙', '丙', '丁']}>
                  {val => val || '请选择队伍'}
                </Picker>
              </Form.Item>

              <Form.Item name="projectNames" label={<Typography.Title>{groupProject?.projectType}</Typography.Title>}>
                {groupProject?.projectType === '自选项目' ? (
                  <Checkbox.Group>
                    {groupProject?.registerProjectList.map((item: any, index: number) => {
                      return (
                        <>
                          <Typography.Text> {item?.projectName}</Typography.Text>
                          {item.propList.map((item2: any) => {
                            return (
                              <Checkbox checkedColor="#ee0a24" key={item2?.key} shape="round" labelPosition="right" name={item2?.key} style={{ margin: '10px' }}>
                                {item2?.value}
                              </Checkbox>
                            );
                          })}
                        </>
                      );
                    })}
                  </Checkbox.Group>
                ) : (
                  <Checkbox.Group>
                    {groupProject?.registerProjectList.map((item: any, index: number) => {
                      return (
                        <>
                          <Checkbox key={item?.key} shape="round" labelPosition="right" name={item?.key} style={{ margin: '10px' }}>
                            {item?.projectName}
                          </Checkbox>
                        </>
                      );
                    })}
                  </Checkbox.Group>
                )}
              </Form.Item>
              <Form.Item
                // rules={[{ required: true, message: '请填写密码' }]}
                name="clubName"
                label="俱乐部名称"
              >
                <Input placeholder="请输入俱乐部名称" />
              </Form.Item>
              <Form.Item
                // rules={[{ required: true, message: '请填写密码' }]}
                name="teamName"
                label="队伍名称"
              >
                <Input placeholder="请输入队伍名称" />
              </Form.Item>
              <Form.Item
                // rules={[{ required: true, message: '请填写密码' }]}
                name="leader"
                label="负责人/领队姓名"
              >
                <Input placeholder="请输入负责人/领队姓名" />
              </Form.Item>
              <Form.Item
                // rules={[{ required: true, message: '请填写密码' }]}
                name="contactPhone"
                label="联系电话"
              >
                <Input placeholder="请输入联系电话" />
              </Form.Item>
              <Form.Item
                isLink
                name="sex   "
                label="性别"
                trigger="onConfirm"
                onClick={(_, action: any) => {
                  action.current?.open();
                }}
              >
                <Picker popup columns={['男', '女']}>
                  {val => val || '请选择性别'}
                </Picker>
              </Form.Item>
              <Form.Item
                // rules={[{ required: true, message: '请填写密码' }]}
                name="email"
                label="电子邮箱"
              >
                <Input placeholder="请输入电子邮箱" />
              </Form.Item>
              <Form.Item
                // rules={[{ required: true, message: '请填写密码' }]}
                name="idNo"
                label="身份证号码"
              >
                <Input placeholder="请输入身份证号码" />
              </Form.Item>
              <Form.Item
                name="teamLogo"
                label="队伍logo"
                // rules={[{ required: true, message: '请上传队伍logo' }]}
              >
                <Uploader accept="image/png" maxCount={1} />
                <Typography.Text underline style={{ margin: '54px 0 0 10px' }}>
                  上传图片png格式
                </Typography.Text>
              </Form.Item>
            </Form>
          </Card>
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default Index;
