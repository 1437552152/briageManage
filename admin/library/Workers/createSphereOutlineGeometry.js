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
define(["./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Ellipsoid-d2aa3b12","./Transforms-7b04d7e0","./Matrix4-33464f2b","./RuntimeError-443472b0","./Cartesian2-f49a1383","./FeatureDetection-0d4fee13","./WebGLConstants-2ddfa2f9","./ComponentDatatype-329b9462","./GeometryAttribute-b8faa946","./GeometryAttributes-614c63f8","./IndexDatatype-153fdd7f","./arrayFill-11a46844","./EllipsoidOutlineGeometry-2bdf6cbe"],(function(e,i,t,r,n,a,o,s,d,l,u,c,p,f,m,y,b){"use strict";function G(i){var t=e.defaultValue(i.radius,1),n={radii:new r.Cartesian3(t,t,t),stackPartitions:i.stackPartitions,slicePartitions:i.slicePartitions,subdivisions:i.subdivisions};this._ellipsoidGeometry=new b.EllipsoidOutlineGeometry(n),this._workerName="createSphereOutlineGeometry"}G.packedLength=b.EllipsoidOutlineGeometry.packedLength,G.pack=function(e,t,r){return i.Check.typeOf.object("value",e),b.EllipsoidOutlineGeometry.pack(e._ellipsoidGeometry,t,r)};var k=new b.EllipsoidOutlineGeometry,v={radius:void 0,radii:new r.Cartesian3,stackPartitions:void 0,slicePartitions:void 0,subdivisions:void 0};return G.unpack=function(i,t,n){var a=b.EllipsoidOutlineGeometry.unpack(i,t,k);return v.stackPartitions=a._stackPartitions,v.slicePartitions=a._slicePartitions,v.subdivisions=a._subdivisions,e.defined(n)?(r.Cartesian3.clone(a._radii,v.radii),n._ellipsoidGeometry=new b.EllipsoidOutlineGeometry(v),n):(v.radius=a._radii.x,new G(v))},G.createGeometry=function(e){return b.EllipsoidOutlineGeometry.createGeometry(e._ellipsoidGeometry)},function(i,t){return e.defined(t)&&(i=G.unpack(i,t)),G.createGeometry(i)}}));
