import {
  Controller,
  SubmitHandler,
  useFormContext,
  useFormState
} from 'react-hook-form';
import { fifthPage, pageFour } from '../../lib/lang';
import BackButton from '../BackButton';
import ProgressBar from '../ProgressBar/ProgressBar';
import { PageFourSchema, PageFourT } from '../../lib/schema';
import AppointmentDate from './PageFour/AppointmentDate';
import NextButton from '../NextButton';

import 'react-datepicker/dist/react-datepicker.css';
import { updateLocalStorage } from '../../lib/localStorage';
import { useNavigate } from 'react-router';
import TimePickerWrapper from './PageFour/TimePicker';
import CallType from './PageFour/CallType';

const PageFour = () => {
  const { control, handleSubmit, register } = useFormContext<PageFourT>();
  const navigate = useNavigate();
  const { errors, isValid: formValid } = useFormState({ control });
  // TODO fix time not being valid if before present time - allow any time
  // console.log('🚀 ~ PageFour ~ errors:', errors);
  // console.log('🚀 ~ PageFour ~ formValid:', formValid);

  const onSubmit: SubmitHandler<PageFourT> = async (data: PageFourT) => {
    const result = PageFourSchema.safeParse(data);

    if (result.success) {
      updateLocalStorage(data);
      navigate(`/${fifthPage}`);
    }
  };
  return (
    <>
      <BackButton page={1} />
      <ProgressBar sections={4} page={4} />
      <h1>{pageFour.title}</h1>
      <form
        className="form"
        data-testid="page-four-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Controller
            name="appointmentDate"
            control={control}
            render={({ field }) => {
              return (
                <AppointmentDate {...field} error={errors['appointmentDate']} />
              );
            }}
          />
          <Controller
            name="appointmentTime"
            control={control}
            render={({ field }) => {
              return (
                <TimePickerWrapper
                  {...field}
                  error={errors['appointmentTime']}
                />
              );
            }}
          />
          <CallType registered={register('callType')} />
        </div>

        <NextButton disabled={!formValid} page={4} />
      </form>
    </>
  );
};

export default PageFour;
