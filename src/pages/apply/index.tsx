import React, { useState, useEffect } from 'react';

import { history } from 'umi';

import { Card, Button, Input, Form, Uploader, Picker, Typography, Toast, Dialog, Selector } from 'react-vant';

import { reqProjects, reqApply, reqApplyRegistered, reqUpload } from '@/services/apply';

import { apply } from '@/utils/rules';

import styles from './index.less';

interface IndexProps {}

const typeOption = [
  {
    label: '校内参赛队',
    value: 1,
  },
  {
    label: '非校内参赛队',
    value: 2,
  },
  {
    label: '邀请赛俱乐部',
    value: 3,
  },
];

const Index: React.FC<IndexProps> = props => {
  const [form] = Form.useForm();
  // const schoolDocument = Form.useWatch('schoolDocument', form)
  // const setFileImageKey = (fileKey: any) => form.setFieldsValue({ 'schoolDocument': fileKey })

  const [type, setType] = useState<any>(1);

  const [initialValues, setInitialValues] = useState({});

  const [projectNames, setProjectNames] = useState<any>([]);

  const [groupProject, setGroupProject] = useState<any>({
    registerProjectList: [],
    projectType: '',
  });

  const handleOnFinish = async (values: any) => {
    console.log('value', values);
    console.log(projectNames?.length, projectNames);

    if (type === null) {
      Dialog.alert({
        message: '请选择注册类型',
      });
      return;
    }

    if (values.groupName === undefined) {
      Dialog.alert({
        message: '请选择参赛队伍',
      });
      return;
    } else if (projectNames?.length <= 0) {
      Dialog.alert({
        message: '请选择项目',
      });
      return;
    } else if (values.colleageCert === undefined && type === 1) {
      Dialog.alert({
        message: '请上传学校公章证明文件',
      });
      return;
    }
    const res = await reqApply({ ...values, type, projectNames });
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
    let arr: any = [];
    const res = await reqProjects(parmas);
    if (res?.code === 200) {
      const { projectType, registerProjectList } = res?.data;
      if (projectType === '固定项目') {
        registerProjectList?.forEach((item: any) => {
          arr.push({
            label: item?.projectName,
            value: item?.key,
          });
        });
      } else {
        registerProjectList?.forEach((item: any) => {
          let proList: any = [];
          arr.push({
            projectName: item?.projectName,
            proList,
          });
          item?.propList.forEach((item2: { value: any; key: any }) => {
            proList.push({
              label: item2?.value,
              value: item2?.key,
            });
          });
        });
      }

      setGroupProject({
        projectType,
        registerProjectList: arr,
      });
    }
  };

  const handleRegistered = async () => {
    const res = await reqApplyRegistered({});
    if (res?.code === 200) {
      if (res.data !== null) {
        history.replace({
          pathname: '/apply/list',
          query: {
            type: type + '',
            parentId: res?.data?.id,
          },
        });
      }
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

  const handleprojectNames = (v: any) => {
    setProjectNames((pre: any) => [...pre, ...v]);
  };

  const handleSettled = (v: any) => {
    setProjectNames(v);
  };

  useEffect(() => {
    handleRegistered();

    return () => {};
  }, []);

  return (
    <>
      <div className={styles.bg}></div>
      <Card round className={styles.applyCard}>
        <Form
          layout="vertical"
          form={form}
          initialValues={initialValues}
          onFinish={handleOnFinish}
          footer={
            <div style={{ margin: '10px 0 10px 0' }}>
              <Button round nativeType="submit" type="info" block color="linear-gradient(to right, #1654ff, #1654ff)">
                保存并添加队伍信息
              </Button>
            </div>
          }
        >
          <Form.Item label="注册类型" rules={apply.type}>
            <Selector
              style={{
                '--rv-selector-border-radius': '100px',
                '--rv-selector-checked-border': 'solid var(--adm-color-primary) 1px',
                '--rv-selector-padding': '5px 10px',
              }}
              showCheckMark={false}
              options={typeOption}
              defaultValue={[type]}
              onChange={v => setType(...v)}
            />
          </Form.Item>

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

          {groupProject?.registerProjectList.length > 0 ? (
            <Form.Item name="projectNames" label={<Typography.Title>{groupProject?.projectType}</Typography.Title>}>
              {groupProject?.projectType === '自选项目' ? (
                <div>
                  {groupProject?.registerProjectList.map((item: any, index: number) => {
                    return (
                      <div key={index}>
                        <Typography.Text style={{ padding: '10px' }}> {item?.projectName}</Typography.Text>
                        <Selector
                          style={{
                            '--rv-selector-border-radius': '100px',
                            '--rv-selector-checked-border': 'solid var(--adm-color-primary) 1px',
                            '--rv-selector-padding': '14px 54px',
                            '--rv-selector-margin': '10px',
                          }}
                          showCheckMark={false}
                          onChange={v => {
                            handleprojectNames(v);
                          }}
                          options={item?.proList}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <Selector
                  style={{
                    '--rv-selector-border-radius': '100px',
                    '--rv-selector-checked-border': 'solid var(--adm-color-primary) 1px',
                    '--rv-selector-padding': '5px 18px',
                  }}
                  showCheckMark={false}
                  onChange={v => handleSettled(v)}
                  options={groupProject?.registerProjectList}
                />
              )}
            </Form.Item>
          ) : null}

          {type === 1 || type === 2 ? (
            <>
              <Form.Item name="colleageCnName" label="学校中文名称">
                <Input placeholder="输入中文名称" />
              </Form.Item>

              <Form.Item name="colleageEnName" label="学校英文全写">
                <Input placeholder="英文全写" />
              </Form.Item>

              <Form.Item name="colleageEnShortName" label="学校英文简写">
                <Input placeholder="英文简写" />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item name="clubCnName" label="俱乐部中文名称">
                <Input placeholder="输入中文名称" />
              </Form.Item>

              <Form.Item name="clubEnName" label="俱乐部英文名称">
                <Input placeholder="英文全写" />
              </Form.Item>

              <Form.Item name="clubEnShortName" label="俱乐部英文简写">
                <Input placeholder="英文简写" />
              </Form.Item>
            </>
          )}

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

          {type === 1 ? (
            <Form.Item
              name="colleageCert"
              label={
                <>
                  学校公章证明文件
                  <Typography.Text type="danger" underline style={{ margin: '0 0 0 10px' }}>
                    上传扫描和清晰照片
                  </Typography.Text>
                </>
              }
            >
              <Uploader accept="image/png" maxCount={1} upload={handleUpload} />
            </Form.Item>
          ) : null}
          <Form.Item
            name="teamLogo"
            label={
              <>
                队伍logo
                <Typography.Text type="danger" underline style={{ margin: '0 0 0 10px' }}>
                  上传图片png格式
                </Typography.Text>
              </>
            }
            rules={[{ required: true, message: '请上传队伍logo' }]}
          >
            <Uploader accept="image/png" maxCount={1} upload={handleUpload} />
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default Index;
