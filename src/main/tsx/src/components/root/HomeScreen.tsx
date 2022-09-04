import { userInfo } from 'os';
import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';
import { UserProps } from '../../types/Props';
import EventFeed from './EventFeed';
import Menu from './Menu';

function HomeScreen(user: UserProps) {
  const [showToast, setShowToast] = useState(false);
  const [mainSection, setMainSection] = useState(<EventFeed {...user} />);

  return (
    <div>
      <Menu
        user={user}
        setShowToast={setShowToast}
        setMainSection={setMainSection}
      />
      <div className='main-section'>{mainSection}</div>
      {showToast ? (
        <Toast onClose={() => setShowToast(false)} autohide={true}>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
      ) : null}
    </div>
  );
}

export default HomeScreen;
