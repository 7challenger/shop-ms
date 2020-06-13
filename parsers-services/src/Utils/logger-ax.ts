import axios from 'axios';
import getEnvConfig from './getEnvConfig';


type GelfType = {
  version?: string,
  short_message: string,
  level: Levels,
  host?: string,

  _log_message?: string,
  _errorStack?: string,
  _serviceName: string,
};

enum Levels {
  Emergency = 0, // A panic condition
  Alert = 1,     // A condition that should be corrected immediately, such as a corrupted system database
  Critical = 2,  // Hard device errors
  Error = 3,     // Error
  Warning = 4,   // Warning
  Notice = 5,    // Conditions that are not error conditions, but that may require special handling
  Informational = 6,
  Debug = 7,     // Messages that contain information normally of use only when debugging a program
};


const headers = {
  'content-type': 'application/json',
};

const getOptions = (data: GelfType) => {
  const envConfig = getEnvConfig();
  const options = {
    headers,
    method: ('POST' as const),
    data: JSON.stringify(data),
    url: envConfig.graylog.host,
  };

  return options;
};

type Info = string | any[];

const log = async (info: Info, serviceName: string) => {
  const normalizedInfo = Array.isArray(info)
    ? (info as Array<any>).map(el => JSON.stringify(el))
    : info;

  const infoMessage = Array.isArray(normalizedInfo)
    ? (normalizedInfo as Array<string>).join(' ')
    : normalizedInfo;

  const data: GelfType = {
    level: Levels.Informational,
    short_message: serviceName,
    version: process.env.npm_package_version,

    _log_message: infoMessage,
    _serviceName: serviceName,
  };

  await axios(getOptions(data));
}

const error = async (error: Error, serviceName: string) => {
  const data: GelfType = {
    level: Levels.Error,
    short_message: error.message,
    version: process.env.npm_package_version,

    _errorStack: error.stack,
    _serviceName: serviceName,
  };

  await axios(getOptions(data));
}

const logger = {
  log,
  error,
}

export default logger;
