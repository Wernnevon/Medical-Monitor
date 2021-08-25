import SequelizeConnection from "../Connection/Connection";

export const testeDb = () => {
    try {
        async () => await SequelizeConnection.authenticate();
        console.log("Connection has been established successfully.");
      } catch (error) {
        console.error("Unable to connect to the database:", error);
      }
};