const getFormData = (data) => {
  const formBody = [];

  Object.keys(data).map((k) => {
    const encodedKey = encodeURIComponent(k);
    const encodedValue = encodeURIComponent(data[k]);
    formBody.push(`${encodedKey}=${encodedValue}`);
    return `${encodedKey}=${encodedValue}`;
  });

  return formBody.join('&');
};


export default getFormData;
