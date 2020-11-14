const { NODE_ENV } = process.env;
/*
 const Host =
NODE_ENV === 'production' ? 'https://111.4.119.69:40605/restapi/data/bridge/' : 'https://111.4.119.69:40605/restapi/data/bridge/'; 
*/
const Host =
NODE_ENV === 'production' ? 'https://mobile.yyf2gml.site/restapi/data/bridge/' : 'https://mobile.yyf2gml.site/restapi/data/bridge/';

export default Host;
