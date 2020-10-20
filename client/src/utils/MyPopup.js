import React from 'react';
import { Popup } from 'semantic-ui-react';

function myPopup({ content, children }) {
  return <Popup inverted size='tiny' content={content} trigger={children} />;
}

export default myPopup;
