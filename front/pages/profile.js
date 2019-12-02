import React from 'react';
import { Button, List, Card, Icon } from 'antd';
import UsernameEditForm from '../components/UsernameEditForm';

const Profile = () => {
  console.log('pages.profile.js');

  return (
    <div>
         {console.log('pages.profile.js render')}

      <UsernameEditForm/>
      <List
        style={{ marginBottom: '20px' }}
        grid={{ gutter: 4, xs: 1, md: 3 }}
        size="small"
        header={<div>Following</div>}
        loadMore={<Button style={{ width: '100%' }}>read more</Button>}
        bordered
        dataSource={['data source1', 'soo', 'hello']}
        renderItem={item => (
          <List.Item  style={{ marginTop: '20px' }}>
            <Card actions={[<Icon key="question" type="question" />]}><Card.Meta description={item} /></Card>
          </List.Item>
        )}
      />
      <List
        style={{ marginBottom: '20px' }}
        grid={{ gutter: 4, xs: 1, md: 3 }}
        size="small"
        header={<div>Followers</div>}
        loadMore={<Button style={{ width: '100%' }}>read more</Button>}
        bordered
        dataSource={['data source2', 'aa', 'bb']}
        renderItem={item => (
          <List.Item style={{ marginTop: '20px' }}>
            <Card actions={[<Icon key="exclamation" type="exclamation" />]}>
              <Card.Meta description={item} /></Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Profile;