export const environment = {
  environmentType: 'development',
  production: false,
  apiPort: 4001,
  mongoConfig: {
    dbName: 'natours',
    dbUser: 'natoursUser',
    dbPassword: 'P@ssw0rd',
    dbCloudConnectionStr: 'mongodb+srv://natoursUser:P@ssw0rd@cluster0.dfmz5.mongodb.net/natours?retryWrites=true&w=majority',
    dbLocalConnectionStr: 'mongodb://localhost:27017/natours',
  }
};
