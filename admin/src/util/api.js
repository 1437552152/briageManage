import { get, post } from "./request";
export const getbridgeBridgeInfo = p => post("info/list", p);
export const getbridgeStructInfo = p => post("struct/list", p);
export const getbridgeComponentInfo = p => post("component/list", p);
export const getbridgeSensorInfo = p => post("sensor/list", p);
export const getbridgeInspectInfo = p => post("inspect/list", p);
export const getbridgeMainInfo = p => post("inspect/main", p);
export const login = p => post("manager/login", p);
export const getsensorInfo = p => post("sensor/typeMap", p);
