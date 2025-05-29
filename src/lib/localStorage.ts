import { FORM_KEY } from '../App';

//TODO make the newData a proper type something like types Pages = PageOne | PageTwo ... etc
export const updateLocalStorage = (newData: object) => {
  const existingData = localStorage.getItem(FORM_KEY) || '{}';
  const existingDataAsObject = JSON.parse(existingData);

  const newObject = {
    ...existingDataAsObject,
    ...newData
  };

  localStorage.setItem(FORM_KEY, JSON.stringify(newObject));
};
