import React from 'react';

import { Image, Cell, Typography, Divider, FloatingBall, Flex, Toast } from 'react-vant';

import NavBar from '@/components/NavBar';
import Ball from '@/components/Ball';

import styles from './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = props => {
  return (
    <>
      <NavBar title="赛事新闻" />
      <Typography.Title style={{ textAlign: 'center', lineHeight: '2' }}>标题</Typography.Title>
      <Cell
        center
        title={`Avatar`}
        rightIcon={
          <>
            <Typography.Text>2022-11-11</Typography.Text>
          </>
        }
        icon={<Image width={44} height={44} src="/demo_1.jpg" round />}
      />
      <Image width={'100%'} height={180} src="/demo_1.jpg" />
      <p className={styles.sportsDetailsText}>
        其中:text-indent:2em定义了文本缩进2em，em是相对长度单位，在这里你设置的字体大小有多大(px)，1em就是多大。我们中文段落一般每段前空两个汉字。实际上，就是首行缩进了2em。这段代码可以控制整个页面的段落缩进，也可以单独控制某个盒子(div)内的段落缩进。
        其中:text-indent:2em定义了文本缩进2em，em是相对长度单位，在这里你设置的字体大小有多大(px)，1em就是多大。我们中文段落一般每段前空两个汉字。实际上，就是首行缩进了2em。这段代码可以控制整个页面的段落缩进，也可以单独控制某个盒子(div)内的段落缩进。
        其中:text-indent:2em定义了文本缩进2em，em是相对长度单位，在这里你设置的字体大小有多大(px)，1em就是多大。我们中文段落一般每段前空两个汉字。实际上，就是首行缩进了2em。这段代码可以控制整个页面的段落缩进，也可以单独控制某个盒子(div)内的段落缩进。
        其中:text-indent:2em定义了文本缩进2em，em是相对长度单位，在这里你设置的字体大小有多大(px)，1em就是多大。我们中文段落一般每段前空两个汉字。实际上，就是首行缩进了2em。这段代码可以控制整个页面的段落缩进，也可以单独控制某个盒子(div)内的段落缩进。
        其中:text-indent:2em定义了文本缩进2em，em是相对长度单位，在这里你设置的字体大小有多大(px)，1em就是多大。我们中文段落一般每段前空两个汉字。实际上，就是首行缩进了2em。这段代码可以控制整个页面的段落缩进，也可以单独控制某个盒子(div)内的段落缩进。
      </p>
      <Divider />
      <Ball />
    </>
  );
};

export default Index;
