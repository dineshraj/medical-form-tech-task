import '../../../../styles/Pages/PageTwo/SymptomIcon.css';

const SymptomIcon = ({ fill }: { fill: string}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 128 128"
    enableBackground="new 0 0 128 128"
    className="symptom-list__icon"
    data-testid="icon"
  >
    <g>
      <g>
        <g>
          <rect
            x="38.384"
            y="15.407"
            fill={fill}
            width="58.958"
            height="4"
          />
        </g>
        <g>
          <polygon
            fill={fill}
            points="128,46.467 0,46.467 0,15.407 19.224,15.407 19.224,19.407 4,19.407 4,42.467 124,42.467 
				124,19.407 116.079,19.407 116.079,15.407 128,15.407 			"
          />
        </g>
        <g>
          <polygon
            fill={fill}
            points="125.475,123.256 2.527,123.256 2.527,53.552 6.527,53.552 6.527,119.256 121.475,119.256 
				121.475,53.552 125.475,53.552 			"
          />
        </g>
        <g>
          <g>
            <path
              fill={fill}
              d="M32.205,32.347H17.783V4.744h14.422V32.347z M21.783,28.347h6.422V8.744h-6.422V28.347z"
            />
          </g>
          <g>
            <path
              fill={fill}
              d="M110.218,32.347H95.794V4.744h14.424V32.347z M99.794,28.347h6.424V8.744h-6.424V28.347z"
            />
          </g>
        </g>
      </g>
      <g>
        <path
          fill={fill}
          d="M74.721,109.286H53.28v-16.71H36.733V70.964H53.28v-16.71h21.441v16.71h16.547v21.612H74.721V109.286z
			 M57.28,105.286h13.441v-16.71h16.547V74.964H70.721v-16.71H57.28v16.71H40.733v13.612H57.28V105.286z"
        />
      </g>
    </g>
  </svg>
)

export default SymptomIcon;
