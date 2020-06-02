const { NODE_ENV } = process.env;

/* const Host =
NODE_ENV === 'production' ? 'http://47.107.180.202:40605/restapi/data/bridge/' : 'http://47.107.180.202:40605/restapi/data/bridge/'; */

const Host =
NODE_ENV === 'production' ? 'http://47.107.180.202:40605/restapi/data/bridge/' : 'http://47.107.180.202:40605/restapi/data/bridge/';

export default Host;