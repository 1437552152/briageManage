define(["exports","./when-7ef6387a","./DeveloperError-101d8eb9","./Matrix4-027dd006"],(function(e,t,i,r){"use strict";e.GeometryInstance=function(e){if(e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT),!t.defined(e.geometry))throw new i.DeveloperError("options.geometry is required.");this.geometry=e.geometry,this.modelMatrix=r.Matrix4.clone(t.defaultValue(e.modelMatrix,r.Matrix4.IDENTITY)),this.id=e.id,this.pickPrimitive=e.pickPrimitive,this.attributes=t.defaultValue(e.attributes,{}),this.westHemisphereGeometry=void 0,this.eastHemisphereGeometry=void 0}}));
//# sourceMappingURL=GeometryInstance-a564cde3.js.map