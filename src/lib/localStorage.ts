import { appName } from './lang';

export const updateLocalStorage = (newData: object) => {
  const existingData = localStorage.getItem(appName) || "{}";
  const existingDataAsObject = JSON.parse(existingData);

  const newObject = {
    ...existingDataAsObject,
    ...newData
  };
  localStorage.setItem(appName, JSON.stringify(newObject));
};
