import { userInfo } from 'os';
import React, { useState } from 'react';
import { UserProps } from '../../types/Props';
import EventFeed from './EventFeed';
import Menu from './Menu';

function HomeScreen(user: UserProps) {
  const [expanded, setExpanded] = useState(false);
  const [mainSection, setMainSection] = useState(<EventFeed {...user} />);

  function setPageAndCloseMenu(section: JSX.Element) {
    setExpanded(false);
    setMainSection(section);
  }

  return (
    <div>
      <Menu
        user={user}
        setMainSection={setPageAndCloseMenu}
        expanded={expanded}
        setExpanded={setExpanded}
      />
      <div className='main-section'>{mainSection}</div>
    </div>
  );
}

export default HomeScreen;
