import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { pageFour } from '../../lib/lang';
import BackButton from '../BackButton';
import ProgressBar from '../ProgressBar/ProgressBar';
import { PageFourT } from '../../lib/schema';
import DateOfBirth from './PageOne/DateOfBirth';
import AppointmentDate from './PageFour/AppointmentDate';

const PageFour = () => {
  const { register, control, handleSubmit } =
    useFormContext<PageFourT>();
  const { errors, isValid: formValid } = useFormState({ control });

  return (
    <>
      <BackButton page={1} />
      <ProgressBar sections={4} page={4} />
      <h1>{pageFour.title}</h1>
      <Controller
        name="otherInfo"
        control={control}
        render={({ field }) => {
          return <AppointmentDate {...field} error={errors['otherInfo']} />;
        }}
      />
    </>
  );
};

export default PageFour;
