import { UseFormRegisterReturn } from 'react-hook-form';
import { pageThree } from '../../../lib/lang';

import '../../../styles/Pages/PageThree/TextArea.css'

interface TextAreaProps {
  registered: UseFormRegisterReturn<'otherInfo'>;
}

const TextArea = ({ registered }: TextAreaProps) => {
  return (
    <textarea
      className="other-info"
      data-testid="other-info"
      placeholder={pageThree.placeholder}
      {...registered}
    ></textarea>
  );
};

export default TextArea;
