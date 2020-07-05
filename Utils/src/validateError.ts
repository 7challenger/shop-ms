// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateError = async (error: Error, serviceName: string) => {
  if (error) {
    console.error(error);

    process.exit(1);
  }
};

export default validateError;
