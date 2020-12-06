/*
 * @Description: 
 * @Author: yfye
 * @Date: 2020-06-06 02:39:01
 * @LastEditTime: 2020-12-06 21:55:34
 * @LastEditors: yfye
 */
 const config = {
    out:{
        bimServer:"https://open.lubansoft.com/api",
        motorAppId:"d0b3c61c6639434e84900b1fd8d391cb",
        motorSecret:"459dc8b77a63a0c009aec27f818febf6",
        bimProjectId:"bfdf508b-ae25-426a-ba6c-838f190eb4d6",
        cimProjectId:"ad938619-858f-4a90-8451-0e5e8daa0a6f",
        library:"https://lbdp.lubansoft.com/reference/motor-web-library/motor.js"
    },
    inner:{
        bimServer:"http://192.168.2.57:8765",
        motorAppId:"7bf7b151697c4adba41707f808daa7c2",
        motorSecret:"ed349b4563f7dbffb881b24ebf07e6ee",
        bimProjectId:"49fb5920-2127-49c2-8025-674d6bbde749",
        cimProjectId:"c373a7e5-1c13-4fc1-91d1-f5158842478e",
        library:"http://192.168.2.57:7000/reference/motor-web-library/motor.js"
    },
    test:{
        bimServer:"https://opentest.lubansoft.com/api",
        motorAppId:"b78fb3221404494e85d3ce87e67ebba3",
        motorSecret:"f81084d2c1a089b5c3dbb6c40116404d",
        bimProjectId:"916e5c6d-9a78-4ce1-b2bd-b474b595b827",
        cimProjectId:"14930a46-1635-4f40-96d4-0fba9b4886a2",
        library:"https://opentest.lubansoft.com/reference/motor-web-library/motor.js"
    },
    bridge:{
        bimServer:"https://open.lubansoft.com/api",
        motorAppId:"a3e0bca8c90c4fa6bce0efac843896ae",
        motorSecret:"26181acfaa21d0f9b94d561d86041aba",
        bimProjectId:"62924801-9263-4a15-89a3-933563bcdf49",
        cimProjectId:"62924801-9263-4a15-89a3-933563bcdf49",
        library:"https://lbdp.lubansoft.com/reference/motor-web-library/motor.js",
        library_1:"http://localhost:20605/bim/library/motor.js",
        library_2:"https://lbdp.lubansoft.com/reference/motor-web-library/motor.js"
    }
}

export default {
    config
}