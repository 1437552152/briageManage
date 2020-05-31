/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["exports","./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Ellipsoid-d2aa3b12"],(function(t,i,e,a,n,s){"use strict";function h(t,i,e){if(0===t)return i*e;var a=t*t,n=a*a,s=n*a,h=s*a,r=h*a,u=r*a,d=e;return i*((1-a/4-3*n/64-5*s/256-175*h/16384-441*r/65536-4851*u/1048576)*d-(3*a/8+3*n/32+45*s/1024+105*h/4096+2205*r/131072+6237*u/524288)*Math.sin(2*d)+(15*n/256+45*s/1024+525*h/16384+1575*r/65536+155925*u/8388608)*Math.sin(4*d)-(35*s/3072+175*h/12288+3675*r/262144+13475*u/1048576)*Math.sin(6*d)+(315*h/131072+2205*r/524288+43659*u/8388608)*Math.sin(8*d)-(693*r/1310720+6237*u/5242880)*Math.sin(10*d)+1001*u/8388608*Math.sin(12*d))}function r(t,i){if(0===t)return Math.log(Math.tan(.5*(a.CesiumMath.PI_OVER_TWO+i)));var e=t*Math.sin(i);return Math.log(Math.tan(.5*(a.CesiumMath.PI_OVER_TWO+i)))-t/2*Math.log((1+e)/(1-e))}var u=new n.Cartesian3,d=new n.Cartesian3;function o(t,i,o,l){var c=n.Cartesian3.normalize(l.cartographicToCartesian(i,d),u),M=n.Cartesian3.normalize(l.cartographicToCartesian(o,d),d);e.Check.typeOf.number.greaterThanOrEquals("value",Math.abs(Math.abs(n.Cartesian3.angleBetween(c,M))-Math.PI),.0125);var _=l.maximumRadius,m=l.minimumRadius,p=_*_,f=m*m;t._ellipticitySquared=(p-f)/p,t._ellipticity=Math.sqrt(t._ellipticitySquared),t._start=s.Cartographic.clone(i,t._start),t._start.height=0,t._end=s.Cartographic.clone(o,t._end),t._end.height=0,t._heading=function(t,i,e,n,s){var h=r(t._ellipticity,e),u=r(t._ellipticity,s);return Math.atan2(a.CesiumMath.negativePiToPi(n-i),u-h)}(t,i.longitude,i.latitude,o.longitude,o.latitude),t._distance=function(t,i,e,n,s,r,u){var d=t._heading,o=r-n,l=0;if(a.CesiumMath.equalsEpsilon(Math.abs(d),a.CesiumMath.PI_OVER_TWO,a.CesiumMath.EPSILON8))if(i===e)l=i*Math.cos(s)*a.CesiumMath.negativePiToPi(o);else{var c=Math.sin(s);l=i*Math.cos(s)*a.CesiumMath.negativePiToPi(o)/Math.sqrt(1-t._ellipticitySquared*c*c)}else{var M=h(t._ellipticity,i,s);l=(h(t._ellipticity,i,u)-M)/Math.cos(d)}return Math.abs(l)}(t,l.maximumRadius,l.minimumRadius,i.longitude,i.latitude,o.longitude,o.latitude)}function l(t,e,n,u,d,o){var l,c,M,_=d*d;if(Math.abs(a.CesiumMath.PI_OVER_TWO-Math.abs(e))>a.CesiumMath.EPSILON8){c=function(t,i,e){var a=t/e;if(0===i)return a;var n=a*a,s=n*a,h=s*a,r=i*i,u=r*r,d=u*r,o=d*r,l=o*r,c=l*r,M=Math.sin(2*a),_=Math.cos(2*a),m=Math.sin(4*a),p=Math.cos(4*a),f=Math.sin(6*a),g=Math.cos(6*a),C=Math.sin(8*a),v=Math.cos(8*a),P=Math.sin(10*a);return a+a*r/4+7*a*u/64+15*a*d/256+579*a*o/16384+1515*a*l/65536+16837*a*c/1048576+(3*a*u/16+45*a*d/256-a*(32*n-561)*o/4096-a*(232*n-1677)*l/16384+a*(399985-90560*n+512*h)*c/5242880)*_+(21*a*d/256+483*a*o/4096-a*(224*n-1969)*l/16384-a*(33152*n-112599)*c/1048576)*p+(151*a*o/4096+4681*a*l/65536+1479*a*c/16384-453*s*c/32768)*g+(1097*a*l/65536+42783*a*c/1048576)*v+8011*a*c/1048576*Math.cos(10*a)+(3*r/8+3*u/16+213*d/2048-3*n*d/64+255*o/4096-33*n*o/512+20861*l/524288-33*n*l/512+h*l/1024+28273*c/1048576-471*n*c/8192+9*h*c/4096)*M+(21*u/256+21*d/256+533*o/8192-21*n*o/512+197*l/4096-315*n*l/4096+584039*c/16777216-12517*n*c/131072+7*h*c/2048)*m+(151*d/6144+151*o/4096+5019*l/131072-453*n*l/16384+26965*c/786432-8607*n*c/131072)*f+(1097*o/131072+1097*l/65536+225797*c/10485760-1097*n*c/65536)*C+(8011*l/2621440+8011*c/1048576)*P+293393*c/251658240*Math.sin(12*a)}(h(d,u,t.latitude)+n*Math.cos(e),d,u);var m=r(d,t.latitude),p=r(d,c);M=Math.tan(e)*(p-m),l=a.CesiumMath.negativePiToPi(t.longitude+M)}else{var f;if(c=t.latitude,0===d)f=u*Math.cos(t.latitude);else{var g=Math.sin(t.latitude);f=u*Math.cos(t.latitude)/Math.sqrt(1-_*g*g)}M=n/f,l=e>0?a.CesiumMath.negativePiToPi(t.longitude+M):a.CesiumMath.negativePiToPi(t.longitude-M)}return i.defined(o)?(o.longitude=l,o.latitude=c,o.height=0,o):new s.Cartographic(l,c,0)}function c(t,e,a){var n=i.defaultValue(a,s.Ellipsoid.WGS84);this._ellipsoid=n,this._start=new s.Cartographic,this._end=new s.Cartographic,this._heading=void 0,this._distance=void 0,this._ellipticity=void 0,this._ellipticitySquared=void 0,i.defined(t)&&i.defined(e)&&o(this,t,e,n)}a.defineProperties(c.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},surfaceDistance:{get:function(){return e.Check.defined("distance",this._distance),this._distance}},start:{get:function(){return this._start}},end:{get:function(){return this._end}},heading:{get:function(){return e.Check.defined("distance",this._distance),this._heading}}}),c.fromStartHeadingDistance=function(t,n,h,r,u){e.Check.defined("start",t),e.Check.defined("heading",n),e.Check.defined("distance",h),e.Check.typeOf.number.greaterThan("distance",h,0);var d=i.defaultValue(r,s.Ellipsoid.WGS84),o=d.maximumRadius,M=d.minimumRadius,_=o*o,m=M*M,p=Math.sqrt((_-m)/_),f=l(t,n=a.CesiumMath.negativePiToPi(n),h,d.maximumRadius,p);return!i.defined(u)||i.defined(r)&&!r.equals(u.ellipsoid)?new c(t,f,d):(u.setEndPoints(t,f),u)},c.prototype.setEndPoints=function(t,i){e.Check.defined("start",t),e.Check.defined("end",i),o(this,t,i,this._ellipsoid)},c.prototype.interpolateUsingFraction=function(t,i){return this.interpolateUsingSurfaceDistance(t*this._distance,i)},c.prototype.interpolateUsingSurfaceDistance=function(t,a){if(e.Check.typeOf.number("distance",t),!i.defined(this._distance)||0===this._distance)throw new e.DeveloperError("EllipsoidRhumbLine must have distinct start and end set.");return l(this._start,this._heading,t,this._ellipsoid.maximumRadius,this._ellipticity,a)},c.prototype.findIntersectionWithLongitude=function(t,n){if(e.Check.typeOf.number("intersectionLongitude",t),!i.defined(this._distance)||0===this._distance)throw new e.DeveloperError("EllipsoidRhumbLine must have distinct start and end set.");var h=this._ellipticity,r=this._heading,u=Math.abs(r),d=this._start;if(t=a.CesiumMath.negativePiToPi(t),i.defined(n)||(n=new s.Cartographic),Math.abs(a.CesiumMath.PI_OVER_TWO-u)<=a.CesiumMath.EPSILON8)return n.longitude=t,n.latitude=d.latitude,n.height=0,n;if(a.CesiumMath.equalsEpsilon(Math.abs(a.CesiumMath.PI_OVER_TWO-u),a.CesiumMath.PI_OVER_TWO,a.CesiumMath.EPSILON8)){if(a.CesiumMath.equalsEpsilon(t,d.longitude,a.CesiumMath.EPSILON12))return;return n.longitude=t,n.latitude=a.CesiumMath.PI_OVER_TWO*Math.sign(a.CesiumMath.PI_OVER_TWO-r),n.height=0,n}var o,l=d.latitude,c=h*Math.sin(l),M=Math.tan(.5*(a.CesiumMath.PI_OVER_TWO+l))*Math.exp((t-d.longitude)/Math.tan(r)),_=(1+c)/(1-c),m=d.latitude;do{o=m;var p=h*Math.sin(o),f=(1+p)/(1-p);m=2*Math.atan(M*Math.pow(f/_,h/2))-a.CesiumMath.PI_OVER_TWO}while(!a.CesiumMath.equalsEpsilon(m,o,a.CesiumMath.EPSILON12));return n.longitude=t,n.latitude=o,n.height=0,n},c.prototype.findIntersectionWithLatitude=function(t,n){if(e.Check.typeOf.number("intersectionLatitude",t),!i.defined(this._distance)||0===this._distance)throw new e.DeveloperError("EllipsoidRhumbLine must have distinct start and end set.");var h=this._ellipticity,u=this._heading,d=this._start;if(!a.CesiumMath.equalsEpsilon(Math.abs(u),a.CesiumMath.PI_OVER_TWO,a.CesiumMath.EPSILON8)){var o=r(h,d.latitude),l=r(h,t),c=Math.tan(u)*(l-o),M=a.CesiumMath.negativePiToPi(d.longitude+c);return i.defined(n)?(n.longitude=M,n.latitude=t,n.height=0,n):new s.Cartographic(M,t,0)}},t.EllipsoidRhumbLine=c}));
