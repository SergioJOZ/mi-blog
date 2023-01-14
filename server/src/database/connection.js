const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    //Paramteros dentro de objeto //SOLO EN CASO DE AVISO
    //useNewUrlParser : true
    //useUnifiedTopology : true
    //useCreateIndex : true

    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log(error);
    throw new Error("No se ha podido conectar con la base de datos");
  }
};

module.exports = {
  connection,
};
