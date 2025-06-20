import '../../../../styles/Pages/PageTwo/SymptomIcon.css';

const VideoIcon = () => (
  <svg
    enableBackground="new 0 0 50 50"
    height="30px"
    version="1.1"
    viewBox="0 0 50 50"
    width="30px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect fill="none" height="50" width="50" />
    <polygon
      fill="none"
      points="49,14 36,21 36,29   49,36 "
      stroke="#000000"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="2"
    />
    <path
      d="M36,36c0,2.209-1.791,4-4,4  H5c-2.209,0-4-1.791-4-4V14c0-2.209,1.791-4,4-4h27c2.209,0,4,1.791,4,4V36z"
      fill="none"
      stroke="#000000"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="2"
    />
  </svg>
);

const AudioIcon = () => (
  <svg
    enableBackground="new 0 0 50 50"
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
    height="30px"
    width="30px"
  >
    <rect fill="none" height="50" width="50" />

    <path
      d="M92.5,124.8a83.6,83.6,0,0,0,39,38.9,8,8,0,0,0,7.9-.6l25-16.7a7.9,7.9,0,0,1,7.6-.7l46.8,20.1a7.9,7.9,0,0,1,4.8,8.3A48,48,0,0,1,176,216,136,136,0,0,1,40,80,48,48,0,0,1,81.9,32.4a7.9,7.9,0,0,1,8.3,4.8l20.1,46.9a8,8,0,0,1-.6,7.5L93,117A8,8,0,0,0,92.5,124.8Z"
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeLinejoin="round"
      strokeWidth="8"
    />
  </svg>
);

export { VideoIcon, AudioIcon };
