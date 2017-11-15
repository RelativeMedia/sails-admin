const setupConfig = (environment) => {
  return {
    proxyApi: true,
    API_URL: (environment === 'development') ? 'http://localhost:1337/v1' : 'http://someproductionendpoint',
    APP_TITLE: 'SAP Infrastructure',
    token: {
      refreshThreshold: 30 * 1000 // in ms
    }
  };
};

export default setupConfig(process.env.NODE_ENV);
