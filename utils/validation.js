export const validateEmail = (email) => {
  const regextSt = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regextSt.test(email);
};

export const validateCreateCar = (car, images) => {
  const checks = [
    {
      msg: 'Title, Description, Brand added successfully.',
      type: 'success',
    },
  ];
  if (images.length < 1) {
    checks.push({
      msg: 'Choose at least 1 image.',
      type: 'error',
    });
  } else {
    checks.push({
      msg: `${images.length} images choosen.`,
      type: 'success',
    });
  }

  const sTest = checks.find((c) => c.type === 'error');
  if (sTest) {
    return checks;
  }
  return 'valid';
};
