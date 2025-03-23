
interface Config {
  env: string;
  apiDomain: string;
}

const config: Config = {
  env: process.env.NODE_ENV || 'development',
  apiDomain: process.env.API_DOMAIN || 'http://localhost:8000',
};

export default config;