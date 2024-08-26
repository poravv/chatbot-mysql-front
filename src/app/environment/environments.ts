export const environment = {
    production: false,
    apiUrl: 'https://kc.mindtechpy.net/admin/realms/realm_pedidos',
    serverUrl: 'http://localhost:3002/chatbot/api',
    keycloakConfig: {
        clientId:"cli-pedidos",
        issuer: 'https://kc.mindtechpy.net/realms/realm_pedidos',
        tokenEndpoint: 'https://kc.mindtechpy.net/realms/realm_pedidos/protocol/openid-connect/token',
        responseType: 'code',
        scope: 'openid profile',
        showDebugInformation: true,
        //clave: 'R8QDxlT5BmeBoyw9KPXtMqjcD2P5DzCJ',
    }
  };
