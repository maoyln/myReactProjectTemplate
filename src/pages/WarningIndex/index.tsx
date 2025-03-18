import React from 'react';
import styles from './index.module.scss';

type IProps = {
  data?: any;
};

const Card = (card: any) => {
  const bgUrl = require(`./hiddenperiolimgs/${card.bg}.png`);
  return (
    <div className={styles['card']}>
      <div className={styles['card-content']} style={{ backgroundImage: `url('${bgUrl}')` }}>
        <div className={styles['card-text-container']}>
          <div className={styles['card-data']}>{card.data}</div>
          <div className={styles['card-unit']}>{card.unit}</div>
        </div>
      </div>
      <div className={styles['card-title']}>{card.title}</div>
    </div>
  );
};

const WarningIndex: React.FC<IProps> = (props) => {
  console.log(props, 'props');
  const cards = [
    {
      bg: '1',
      data: '58',
      unit: '个',
      title: '这是第一个图标'
    },
    {
      bg: '2',
      data: '58',
      unit: '个',
      title: '这是第二个图标'
    },
    {
      bg: '3',
      data: '58',
      unit: '个',
      title: '这是第三个图标'
    }
  ];

  const handleClick = () => {
    console.log(12);
  };

  return (
    <div className={styles['warning-index']}>
      <span className={styles['detail']} onClick={handleClick}>
        查看详情&nbsp;{'>'}
      </span>
      <div className={styles['warning-index-cards']}>
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default WarningIndex;
