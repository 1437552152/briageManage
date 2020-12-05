define(["exports","./when-7ef6387a","./Check-ed6a1804","./Math-85667bf9","./Cartesian3-2a8ef78e","./Ellipsoid-367a1bb3"],(function(e,t,i,a,o,r){"use strict";function n(e){this._ellipsoid=t.defaultValue(e,r.Ellipsoid.WGS84),this._semimajorAxis=this._ellipsoid.maximumRadius,this._oneOverSemimajorAxis=1/this._semimajorAxis}Object.defineProperties(n.prototype,{ellipsoid:{get:function(){return this._ellipsoid}}}),n.mercatorAngleToGeodeticLatitude=function(e){return a.CesiumMath.PI_OVER_TWO-2*Math.atan(Math.exp(-e))},n.geodeticLatitudeToMercatorAngle=function(e){e>n.MaximumLatitude?e=n.MaximumLatitude:e<-n.MaximumLatitude&&(e=-n.MaximumLatitude);var t=Math.sin(e);return.5*Math.log((1+t)/(1-t))},n.MaximumLatitude=n.mercatorAngleToGeodeticLatitude(Math.PI),n.prototype.project=function(e,i){var a=this._semimajorAxis,r=e.longitude*a,u=n.geodeticLatitudeToMercatorAngle(e.latitude)*a,d=e.height;return t.defined(i)?(i.x=r,i.y=u,i.z=d,i):new o.Cartesian3(r,u,d)},n.prototype.unproject=function(e,a){if(!t.defined(e))throw new i.DeveloperError("cartesian is required");var o=this._oneOverSemimajorAxis,u=e.x*o,d=n.mercatorAngleToGeodeticLatitude(e.y*o),s=e.z;return t.defined(a)?(a.longitude=u,a.latitude=d,a.height=s,a):new r.Cartographic(u,d,s)},e.WebMercatorProjection=n}));
//# sourceMappingURL=WebMercatorProjection-7fb7d575.js.map