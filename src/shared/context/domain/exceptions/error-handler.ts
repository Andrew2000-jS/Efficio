export const errorHanlder = (error, errorTypes: any[]) =>
  errorTypes.map((errorType) => {
    if (error instanceof errorType) {
      throw new errorType();
    }
  });
