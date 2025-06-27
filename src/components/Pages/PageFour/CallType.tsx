import { UseFormRegisterReturn } from 'react-hook-form';
import { pageFour } from '../../../lib/lang';

import '../../../styles/Pages/PageFour/CallType.css';
import { AudioIcon, VideoIcon } from './CallType/CallTypeIcons';

interface CallTypeProps {
  registered: UseFormRegisterReturn<'callType'>;
}

const CallType = ({ registered }: CallTypeProps) => {
  return (
    <div className="call-type" data-testid="call-type">
      <div className="title call-type__title" data-testid="title">
        {pageFour.callType}
      </div>
      <ul className="call-type-list">
        <li data-testid="call-type-options" className="call-type-options">
          <label htmlFor="call-type-video">
            <VideoIcon />
            Video Call
          </label>

          <input
            type="radio"
            data-testid="video-call"
            id="call-type-video"
            className="call-type-options__radio"
            {...registered}
            name="callType"
            value="video call"
          />
        </li>
        <li data-testid="call-type-options" className="call-type-options">
          <label htmlFor="call-type-audio">
            <AudioIcon />
            Audio Call
          </label>
          <input
            type="radio"
            className="call-type-options__radio"
            id="call-type-audio"
            {...registered}
            name="callType"
            value="audio call"
          />
        </li>
      </ul>
    </div>
  );
};

export default CallType;
