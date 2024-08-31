export const environment = {
    production: false,
    apiUrl: 'https://kc.mindtechpy.net/admin/realms/realm_pedidos',
    serverUrl: 'https://back.mindtechpy.net/chatbot/chatbot/api',
    //serverUrl: 'http://localhost:3000/chatbot/api',
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
