export const configuration = () => {
  return {
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT ?? '3306', 10), // Aseguramos que sea un string
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      name: process.env.DB_DATABASE || 'test', // Cambiamos a DB_DATABASE
    },
    jwt: {
      secret: process.env.JWT_SECRET
    }
  };
};
