import React from 'react';

import first from '../svg/first.svg';
import play from '../svg/play3.svg';
import pause from '../svg/pause2.svg';
import record from '../svg/record.svg';
import last from '../svg/last.svg';
const Record = () => {
  return (
    <div id="record">
      <div id="record-top-bar">
        <button type="button"><img alt="First" src={first}></img></button>
        <button type="button"><img alt="Play" src={play}></img></button>
        <button type="button"><img alt="Pause" src={pause}></img></button>
        <button type="button"><img alt="Record" src={record}></img></button>
        <button type="button"><img alt="Last" src={last}></img></button>
      </div>
      {/* Copy, Paste, Clear */}
    </div>
  )
}
export default Record;