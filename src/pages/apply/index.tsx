import React, { useState } from 'react';

import { history } from 'umi';

import { Card, Tabs, Button, Input, Form, Uploader, Picker, Typography, Checkbox, Toast, Dialog } from 'react-vant';

import { reqProjects, reqApply } from '@/services/apply';

import { apply } from '@/utils/rules';

interface IndexProps {}

const Index: React.FC<IndexProps> = props => {
  const [form] = Form.useForm();

  const [type, seTtype] = useState<number>(1);

  const [initialValues, setInitialValues] = useState({});

  const [groupProject, setGroupProject] = useState<any>({
    registerProjectList: [],
    projectType: '',
  });

  const handleType = v => {
    seTtype(v);
  };

  const handleOnFinish = async (values: any) => {
    console.log(values);

    if (values.groupName === undefined) {
      Dialog.alert({
        message: '请选择参赛队伍',
      });
      return;
    } else if (values.projectNames === undefined || values.projectNames?.length <= 0) {
      Dialog.alert({
        message: '请选择参赛项目',
      });
      return;
    }
    const res = await reqApply({ ...values, type });
    if (res?.code === 200) {
      Toast.success(res?.message);
      history.push({
        pathname: '/apply/list',
        query: {
          type: type + '',
          parentId: res?.data?.id,
        },
      });
    } else {
      Toast.fail(res?.message);
    }
  };

  const handleProjects = async (parmas: any) => {
    const res = await reqProjects(parmas);
    if (res?.code === 200) {
      setGroupProject(res.data);
    }
  };

  return (
    <>
      <Tabs active={1} sticky swipeable color="#000000" offsetTop="0.1" onChange={(v: number) => handleType(v)}>
        <Tabs.TabPane title={`校内参赛队注册`} key={1} name={1}>
          <Card style={{ margin: '20px 10px 44px 10px ' }}>
            <Form
              layout="vertical"
              form={form}
              initialValues={initialValues}
              onFinish={handleOnFinish}
              footer={
                <div style={{ margin: '10px 0 10px 0' }}>
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
                rules={apply.groupName}
                trigger="onConfirm"
                onClick={(_, action: any) => {
                  action.current?.open();
                }}
              >
                <Picker key={'groupName'} onConfirm={(v: string) => handleProjects({ groupName: v })} popup columns={['甲', '乙', '丙', '丁']}>
                  {val => val || '选择队伍'}
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
                          <Checkbox checkedColor="#ee0a24" key={item?.key} shape="round" labelPosition="right" name={item?.key} style={{ margin: '10px' }}>
                            {item?.projectName}
                          </Checkbox>
                        </>
                      );
                    })}
                  </Checkbox.Group>
                )}
              </Form.Item>

              <Form.Item name="colleageCnName" label="学校中文名称">
                <Input placeholder="输入中文名称" />
              </Form.Item>

              <Form.Item name="colleageEnName" label="学校英文全写">
                <Input placeholder="英文全写" />
              </Form.Item>

              <Form.Item name="colleageEnShortName" label="学校英文简写">
                <Input placeholder="英文简写" />
              </Form.Item>

              <Form.Item rules={apply.teamName} name="teamName" label="队伍名称">
                <Input placeholder="输入队伍名称" />
              </Form.Item>
              <Form.Item rules={apply.leader} name="leader" label="负责人/领队姓名">
                <Input placeholder="输入负责人/领队姓名" />
              </Form.Item>
              <Form.Item rules={apply.contactPhone} name="contactPhone" label="联系电话">
                <Input maxLength={11} placeholder="输入联系电话" />
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
              <Form.Item rules={apply.email} name="email" label="电子邮箱">
                <Input placeholder="输入电子邮箱" />
              </Form.Item>
              <Form.Item rules={apply.idNo} name="idNo" label="身份证号码">
                <Input placeholder="输入身份证号码" />
              </Form.Item>

              <Form.Item
                name="schoolDocument"
                label="学校公章证明文件"
                // rules={[{ required: true, message: '请上传队伍logo' }]}
              >
                <Uploader accept="image/png" maxCount={1} />
                <Typography.Text underline style={{ margin: '54px 0 0 10px' }}>
                  上传扫描和清晰照片
                </Typography.Text>
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

        <Tabs.TabPane title={`非校内参赛队注册`} key={2} name={2}>
          <Card style={{ margin: '20px 10px 44px 10px ' }}>
            <Form
              initialValues={initialValues}
              layout="vertical"
              form={form}
              onFinish={handleOnFinish}
              footer={
                <div style={{ margin: '10px 0 10px 0' }}>
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
                rules={apply.groupName}
                trigger="onConfirm"
                onClick={(_, action: any) => {
                  action.current?.open();
                }}
              >
                <Picker onConfirm={(v: string) => handleProjects({ groupName: v })} popup columns={['甲', '乙', '丙', '丁']}>
                  {val => val || '选择队伍'}
                </Picker>
              </Form.Item>

              <Form.Item name="projectNames" label={<Typography.Title>{groupProject?.projectType}</Typography.Title>}>
                {groupProject?.projectType === '自选项目' ? (
                  <Checkbox.Group>
                    {groupProject?.registerProjectList.map((item: any, index: number) => {
                      return (
                        <>
                          <Typography.Text key={item?.projectName}> {item?.projectName}</Typography.Text>
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
                          <Checkbox checkedColor="#ee0a24" key={item?.key} shape="round" labelPosition="right" name={item?.key} style={{ margin: '10px' }}>
                            {item?.projectName}
                          </Checkbox>
                        </>
                      );
                    })}
                  </Checkbox.Group>
                )}
              </Form.Item>

              <Form.Item name="clubCnName" label="俱乐部中文名称">
                <Input placeholder="输入中文名称" />
              </Form.Item>

              <Form.Item name="clubEnName" label="俱乐部英文名称">
                <Input placeholder="英文全写" />
              </Form.Item>

              <Form.Item name="clubEnShortName" label="俱乐部英文简写">
                <Input placeholder="英文简写" />
              </Form.Item>

              <Form.Item rules={apply.teamName} name="teamName" label="队伍名称">
                <Input placeholder="输入队伍名称" />
              </Form.Item>
              <Form.Item rules={apply.leader} name="leader" label="负责人/领队姓名">
                <Input placeholder="输入负责人/领队姓名" />
              </Form.Item>
              <Form.Item rules={apply.contactPhone} name="contactPhone" label="联系电话">
                <Input maxLength={11} placeholder="输入联系电话" />
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
              <Form.Item rules={apply.email} name="email" label="电子邮箱">
                <Input placeholder="输入电子邮箱" />
              </Form.Item>
              <Form.Item rules={apply.idNo} name="idNo" label="身份证号码">
                <Input placeholder="输入身份证号码" />
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

        <Tabs.TabPane title={`邀请赛俱乐部注册`} key={3} name={3}>
          <Card style={{ margin: '20px 10px 44px 10px ' }}>
            <Form
              initialValues={initialValues}
              layout="vertical"
              form={form}
              onFinish={handleOnFinish}
              footer={
                <div style={{ margin: '10px 0 10px  0' }}>
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
                rules={apply.groupName}
                trigger="onConfirm"
                onClick={(_, action: any) => {
                  action.current?.open();
                }}
              >
                <Picker onConfirm={(v: string) => handleProjects({ groupName: v })} popup columns={['甲', '乙', '丙', '丁']}>
                  {val => val || '选择队伍'}
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
                          <Checkbox checkedColor="#ee0a24" key={item?.key} shape="round" labelPosition="right" name={item?.key} style={{ margin: '10px' }}>
                            {item?.projectName}
                          </Checkbox>
                        </>
                      );
                    })}
                  </Checkbox.Group>
                )}
              </Form.Item>
              <Form.Item name="clubCnName" label="俱乐部中文名称">
                <Input placeholder="输入中文名称" />
              </Form.Item>

              <Form.Item name="clubEnName" label="俱乐部英文名称">
                <Input placeholder="英文全写" />
              </Form.Item>

              <Form.Item name="clubEnShortName" label="俱乐部英文简写">
                <Input placeholder="英文简写" />
              </Form.Item>
              <Form.Item rules={apply.teamName} name="teamName" label="队伍名称">
                <Input placeholder="输入队伍名称" />
              </Form.Item>
              <Form.Item rules={apply.leader} name="leader" label="负责人/领队姓名">
                <Input placeholder="输入负责人/领队姓名" />
              </Form.Item>
              <Form.Item rules={apply.contactPhone} name="contactPhone" label="联系电话">
                <Input maxLength={11} placeholder="输入联系电话" />
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
              <Form.Item rules={apply.email} name="email" label="电子邮箱">
                <Input placeholder="输入电子邮箱" />
              </Form.Item>
              <Form.Item rules={apply.idNo} name="idNo" label="身份证号码">
                <Input placeholder="输入身份证号码" />
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
