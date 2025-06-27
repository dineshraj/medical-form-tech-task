import { modifyDate, modifyTime } from '../../lib/date';
import { pageFive } from '../../lib/lang';
import { getFromLocalStorage } from '../../lib/localStorage';
import success from '../assets/success.jpg';
import NextButton from '../NextButton';

import '../../styles/Pages/PageFive/Image.css';
import '../../styles/Pages/PageFive/Success.css';

const PageFive = () => {
  // console.log("🚀 ~ PageFive ~ getFromLocalStorage(FORM_KEY):", getFromLocalStorage(FORM_KEY))
  // console.log("🚀 ~ PageFive ~ getFromLocalStorage:", getFromLocalStorage)
  const appointmentDate = getFromLocalStorage('appointmentDate');
  const appointmentTime = getFromLocalStorage('appointmentTime');
  const callType = getFromLocalStorage('callType');

  return (
    <>
      <div className="details">
        <img
          src={success}
          data-testid="success-image"
          className="success-image"
        />
        <h1>{pageFive.title}</h1>
        <ul
          className="appointment-info-list"
          data-testid="appointment-info-list"
        >
          <li data-testid="appointment-info-list__date">
            Scheduled for {modifyDate(appointmentDate)}
          </li>
          <li data-testid="appointment-info-list__time">
            From {modifyTime(appointmentTime)}
          </li>
          <li>Consultant will be our case counsellor</li>
          <li data-testid="appointment-info-list__call-type">
            Consultant will be a {callType}
          </li>
          <li>Link sent to your email and Whatsapp</li>
        </ul>
      </div>
      <div className="final">
        <NextButton disabled={false} page={5} text="Now go away you prick" />
      </div>
    </>
  );
};

export default PageFive;
