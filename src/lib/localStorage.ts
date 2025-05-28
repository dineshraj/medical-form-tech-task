import { appName } from './lang';

//TODO make the newData a proper type something like types Pages = PageOne | PageTwo ... etc
export const updateLocalStorage = (newData: object) => {
  const existingData = localStorage.getItem(appName) || '{}';
  const existingDataAsObject = JSON.parse(existingData);

  const newObject = {
    ...existingDataAsObject,
    ...newData
  };
  localStorage.setItem(appName, JSON.stringify(newObject));
};
