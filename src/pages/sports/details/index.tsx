import React, { useState, useEffect } from 'react';

import { history } from 'umi';

import { Image, Cell, Typography, Divider } from 'react-vant';

import NavBar from '@/components/NavBar';
import Ball from '@/components/Ball';
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

  return (
    <>
      <NavBar title="赛事新闻" />
      <Typography.Title level={3} className={styles.detailsTitle}>
        {article?.title}
      </Typography.Title>
      <Cell
        center
        className={styles.userInfo}
        title={article?.member?.username}
        rightIcon={
          <>
            <Typography.Text>{article?.createtime}</Typography.Text>
          </>
        }
        icon={<Image width={44} height={44} src={article?.member?.headimg} round />}
      />
      {article?.video ? <XGPlayer url={article?.video} poster={article?.thumb} /> : <Image width={'100%'} src={article?.thumb} />}

      <p className={styles.sportsDetailsText}>{article?.content}</p>
      <Divider></Divider>
      <Ball />
    </>
  );
};

export default Index;
