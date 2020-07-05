const entryPointStartPath = 'entryPoint=';
const entryPointNotProvidedMessage = 'entryPoint argument is not provided';

const EntryPointNotProvided = new Error(entryPointNotProvidedMessage);

const getEntryPoint = (args = process.argv) => {
  const entryPointIndex = args.findIndex((arg) => {
    return arg.startsWith(entryPointStartPath);
  });

  if (entryPointIndex !== -1) {
    const [_, entryPoint] = args[entryPointIndex].split('=');

    return entryPoint;
  }

  throw EntryPointNotProvided;
};

module.exports = getEntryPoint;
