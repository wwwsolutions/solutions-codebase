export const environment = {
  type: 'development',
  production: false,
  apiPort: 3333,
  mongoConfig: {
    dbName: 'natours-app',
    dbUser: 'natoursUser',
    dbPassword: 'P@ssw0rd',
    dbConnectionStr: 'mongodb+srv://natoursUser:P@ssw0rd@cluster0.dfmz5.mongodb.net/natours-app?retryWrites=true&w=majority',
  }
};
