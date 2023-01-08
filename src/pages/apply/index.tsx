import React, { useState, useEffect } from 'react';

import { history } from 'umi';

import { Card, Button, Input, Form, Uploader, Picker, Typography, Toast, Dialog, Selector, Flex } from 'react-vant';

import { reqProjects, reqApply, reqApplyRegistered, reqUpload } from '@/services/apply';

import { apply } from '@/utils/rules';
import { optionalEvents, fixedEvents } from './option';

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
    label: '俱乐部组',
    value: 3,
  },
];

const Index: React.FC<IndexProps> = props => {
  const [form] = Form.useForm();
  // const schoolDocument = Form.useWatch('schoolDocument', form)
  // const setFileImageKey = (fileKey: any) => form.setFieldsValue({ 'schoolDocument': fileKey })

  const [type, setType] = useState<any>(1);

  // const [initialValues, setInitialValues] = useState({});

  // const [projectNames, setProjectNames] = useState<any>([]);

  const [groupProject, setGroupProject] = useState<string | null>(null);

  const handleOnFinish = async (values: any) => {
    console.log(values);

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
    } else if (values.colleageCert === undefined && type === 1) {
      Dialog.alert({
        message: '请上传学校公章证明文件',
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

  const handleProjectType = async (v: string) => {
    setGroupProject(v);
    // const res = await reqProjects(parmas);
    // if (res?.code === 200) {
    //   const { projectType, registerProjectList } = res?.data;
    //   registerProjectList?.forEach((item: any) => {
    //     let proList: any = [];
    //     arr.push({
    //       projectName: item?.projectName,
    //       proList,
    //     });
    //     item?.propList.forEach((item2: { value: any; key: any }) => {
    //       proList.push({
    //         label: item2?.value,
    //         value: item2?.key,
    //       });
    //     });
    //   });

    //   setGroupProject({
    //     projectType,
    //     registerProjectList: arr,
    //   });
    // }
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

  const handlegroupProject = () => {
    if (groupProject === '固定项目') {
      return fixedEvents.map(item => {
        return (
          <Form.Item name={item?.name} key={item?.name} label={item?.title}>
            <Selector
              showCheckMark={false}
              style={{
                '--rv-selector-border-radius': '100px',
                '--rv-selector-checked-border': 'solid var(--adm-color-primary) 1px',
                '--rv-selector-padding': '10px 54px',
                '--rv-selector-margin': '0px 32px 8px 0',
              }}
              options={item?.option}
            />
          </Form.Item>
        );
      });
    } else if (groupProject === '自选项目') {
      return optionalEvents.map(item => {
        return (
          <Form.Item name={item?.name} key={item?.name} label={item?.title}>
            <Selector
              showCheckMark={false}
              className={item?.name === 'lalacao' ? `${styles.laCaoPadding}` : `${styles.eventsPadding}`}
              style={{
                '--rv-selector-border-radius': '100px',
                '--rv-selector-checked-border': 'solid var(--adm-color-primary) 1px',
                // '--rv-selector-padding': '10px 54px',
                // '--rv-selector-margin': '10px 32px 8px 0'
              }}
              options={item?.option}
            />
          </Form.Item>
        );
      });
    } else {
      return;
    }
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
          // initialValues={initialValues}
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
            label="选择队伍类型"
            rules={apply.groupName}
            trigger="onConfirm"
            onClick={(_, action: any) => {
              action.current?.open();
            }}
          >
            <Picker title="选择队伍类型" key={'groupName'} popup columns={['甲', '乙', '丙', '丁']}>
              {val => val || '选择队伍'}
            </Picker>
          </Form.Item>

          <Form.Item
            isLink
            name="projectType"
            label="选择项目类型"
            rules={apply.projectType}
            trigger="onConfirm"
            onClick={(_, action: any) => {
              action.current?.open();
            }}
          >
            <Picker title="选择项目" key={'projectType'} onConfirm={(v: string) => handleProjectType(v)} popup columns={['固定项目', '自选项目']}>
              {val => val || '选择项目类型'}
            </Picker>
          </Form.Item>

          {handlegroupProject()}

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
