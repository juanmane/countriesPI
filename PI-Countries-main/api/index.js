//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require("axios");
const { Country } = require("./src/db.js");

const apiToDB = async () => {
  try {
    const paises = await axios.get("https://restcountries.com/v3/all");
    paises.data.forEach( a =>
        Country.findOrCreate({
            where: {
            name: a.name.common,
            flag: a.flags[0],
            continent: a.continents.join(", "),
            id: a.cca3,
            capital: a.capital? a.capital.join(", "): null,
            subregion: a.subregion? a.subregion: null,
            area: a.area,
            population: a.population,
            }
        })
    )  
  } catch (error) {
      console.log(error);
  }
}
// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, async() => {
    //await apiToDB();
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
