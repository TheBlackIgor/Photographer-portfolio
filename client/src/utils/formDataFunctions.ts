export const concatenateFormData = (
  formData1: FormData,
  formData2: FormData
) => {
  const concatenatedFormData = new FormData();

  // Copy key-value pairs from formData1
  for (const [key, value] of formData1.entries()) {
    concatenatedFormData.append(key, value);
  }

  // Copy key-value pairs from formData2
  for (const [key, value] of formData2.entries()) {
    concatenatedFormData.append(key, value);
  }

  return concatenatedFormData;
};

export const removeByIndex = (formData: FormData, indexToRemove: number) => {
  const keys = Array.from(formData.keys());

  if (keys.length > indexToRemove) {
    const keyToRemove = keys[indexToRemove];
    formData.delete(keyToRemove);
  }

  return formData;
};
