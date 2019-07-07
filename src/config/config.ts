import * as env from 'env-var';

enum DEFAULTS {
  PORT = '3000',
  NBP_EXCHANGE_RATE_ENDPOINT = 'http://api.nbp.pl/api/exchangerates/tables/C',
  ZOMBIE_API_ITEMS_ENDPOINT = 'https://zombie-items-api.herokuapp.com/api/items',
}

export default {
  port: env.get('PORT', DEFAULTS.PORT).asPortNumber(),
  nbpExchangeRateEndpoint:
    env.get('NBP_URL', DEFAULTS.NBP_EXCHANGE_RATE_ENDPOINT).asUrlString(),
  zombieApiItemsEndpoint:
    env.get('ZOMBIE_API_URL', DEFAULTS.ZOMBIE_API_ITEMS_ENDPOINT).asUrlString(),
};
