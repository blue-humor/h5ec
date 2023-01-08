import React, { useState, useEffect } from 'react';

import { history } from 'umi';

import { Image, Cell, Typography, Divider, Sticky } from 'react-vant';

import NavBar from '@/components/NavBar';
import Bubble from '@/components/Ball/bubble';
import XGPlayer from '@/components/XGPlayer';

import { reqArticle } from '@/services/sports/details';

import styles from './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  const { query } = history.location;

  const [article, setArticle] = useState<any>({});

  const handleArticle = async () => {
    const res = await reqArticle(query);
    if (res?.code === 200) {
      setArticle(res?.data);
    }
  };

  useEffect(() => {
    handleArticle();

    return () => {};
  }, []);

  const content = 'React Vant 是一套轻量、可靠的移动端 React 组件库，提供了丰富的基础组件和业务组件，帮助开发者快速搭建移动应用，使用过程中发现任何问题都可以提 Issue 给我们，当然，我们也非常欢迎你给我们发 PR。';

  return (
    <>
      {/* <NavBar title="赛事新闻" /> */}
      <Typography.Title level={5} className={styles.detailsTitle}>
        {article?.title}
      </Typography.Title>
      <Cell
        center
        className={styles.userInfo}
        title={<Typography.Text>{article?.member?.nickName}</Typography.Text>}
        rightIcon={
          <>
            <Typography.Text>{article?.createtime}</Typography.Text>
          </>
        }
        icon={<Image width={44} height={44} src={article?.member?.headimg} round />}
      />
      {article?.video ? (
        <div className={styles.newsPlary}>
          <XGPlayer url={article?.video} poster={article?.thumb} />
        </div>
      ) : (
        <Image width={'100%'} src={article?.thumb} />
      )}

      <p className={styles.sportsDetailsText}>{article?.content}</p>
      <Divider>到底啦～</Divider>
      <Bubble articleId={query?.id} like={article?.like} />
    </>
  );
};

export default Index;
