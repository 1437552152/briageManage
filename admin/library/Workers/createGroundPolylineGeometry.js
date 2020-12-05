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
define(["./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Ellipsoid-d2aa3b12","./Transforms-7b04d7e0","./Matrix4-33464f2b","./RuntimeError-443472b0","./Cartesian2-f49a1383","./FeatureDetection-0d4fee13","./WebGLConstants-2ddfa2f9","./ComponentDatatype-329b9462","./GeometryAttribute-b8faa946","./EncodedCartesian3-63b18b5e","./IntersectionTests-15d018f5","./Plane-84b14a0a","./WebMercatorProjection-72bc39e7","./arrayRemoveDuplicates-c3fd0b84","./ArcType-51c149e1","./EllipsoidRhumbLine-c004db91","./EllipsoidGeodesic-c57b5e5c"],(function(e,a,t,r,n,i,s,o,l,u,c,C,p,d,h,g,f,m,w,v,y){"use strict";function T(a){a=e.defaultValue(a,{}),this._ellipsoid=e.defaultValue(a.ellipsoid,n.Ellipsoid.WGS84),this._rectangle=e.defaultValue(a.rectangle,l.Rectangle.MAX_VALUE),this._projection=new i.GeographicProjection(this._ellipsoid),this._numberOfLevelZeroTilesX=e.defaultValue(a.numberOfLevelZeroTilesX,2),this._numberOfLevelZeroTilesY=e.defaultValue(a.numberOfLevelZeroTilesY,1)}t.defineProperties(T.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},rectangle:{get:function(){return this._rectangle}},projection:{get:function(){return this._projection}}}),T.prototype.getNumberOfXTilesAtLevel=function(e){return this._numberOfLevelZeroTilesX<<e},T.prototype.getNumberOfYTilesAtLevel=function(e){return this._numberOfLevelZeroTilesY<<e},T.prototype.rectangleToNativeRectangle=function(r,n){a.Check.defined("rectangle",r);var i=t.CesiumMath.toDegrees(r.west),s=t.CesiumMath.toDegrees(r.south),o=t.CesiumMath.toDegrees(r.east),u=t.CesiumMath.toDegrees(r.north);return e.defined(n)?(n.west=i,n.south=s,n.east=o,n.north=u,n):new l.Rectangle(i,s,o,u)},T.prototype.tileXYToNativeRectangle=function(e,a,r,n){var i=this.tileXYToRectangle(e,a,r,n);return i.west=t.CesiumMath.toDegrees(i.west),i.south=t.CesiumMath.toDegrees(i.south),i.east=t.CesiumMath.toDegrees(i.east),i.north=t.CesiumMath.toDegrees(i.north),i},T.prototype.tileXYToRectangle=function(a,t,r,n){var i=this._rectangle,s=this.getNumberOfXTilesAtLevel(r),o=this.getNumberOfYTilesAtLevel(r),u=i.width/s,c=a*u+i.west,C=(a+1)*u+i.west,p=i.height/o,d=i.north-t*p,h=i.north-(t+1)*p;return e.defined(n)||(n=new l.Rectangle(c,h,C,d)),n.west=c,n.south=h,n.east=C,n.north=d,n},T.prototype.positionToTileXY=function(a,r,n){var i=this._rectangle;if(l.Rectangle.contains(i,a)){var s=this.getNumberOfXTilesAtLevel(r),o=this.getNumberOfYTilesAtLevel(r),u=i.width/s,c=i.height/o,C=a.longitude;i.east<i.west&&(C+=t.CesiumMath.TWO_PI);var p=(C-i.west)/u|0;p>=s&&(p=s-1);var d=(i.north-a.latitude)/c|0;return d>=o&&(d=o-1),e.defined(n)?(n.x=p,n.y=d,n):new l.Cartesian2(p,d)}};var E=new r.Cartesian3,M=new r.Cartesian3,_=new n.Cartographic,b=new r.Cartesian3,O=new r.Cartesian3,P=new i.BoundingSphere,A=new T,k=[new n.Cartographic,new n.Cartographic,new n.Cartographic,new n.Cartographic],I=new l.Cartesian2,S={};function L(e){n.Cartographic.fromRadians(e.east,e.north,0,k[0]),n.Cartographic.fromRadians(e.west,e.north,0,k[1]),n.Cartographic.fromRadians(e.east,e.south,0,k[2]),n.Cartographic.fromRadians(e.west,e.south,0,k[3]);var a,t=0,r=0,i=0,s=0,o=S._terrainHeightsMaxLevel;for(a=0;a<=o;++a){for(var l=!1,u=0;u<4;++u){var c=k[u];if(A.positionToTileXY(c,a,I),0===u)i=I.x,s=I.y;else if(i!==I.x||s!==I.y){l=!0;break}}if(l)break;t=i,r=s}if(0!==a)return{x:t,y:r,level:a>o?o:a-1}}S.initialize=function(){var a=S._initPromise;return e.defined(a)||(a=i.Resource.fetchJson(i.buildModuleUrl("Assets/approximateTerrainHeights.json")).then((function(e){S._terrainHeights=e})),S._initPromise=a),a},S.getMinimumMaximumHeights=function(t,i){if(a.Check.defined("rectangle",t),!e.defined(S._terrainHeights))throw new a.DeveloperError("You must call ApproximateTerrainHeights.initialize and wait for the promise to resolve before using this function");i=e.defaultValue(i,n.Ellipsoid.WGS84);var s=L(t),o=S._defaultMinTerrainHeight,u=S._defaultMaxTerrainHeight;if(e.defined(s)){var c=s.level+"-"+s.x+"-"+s.y,C=S._terrainHeights[c];e.defined(C)&&(o=C[0],u=C[1]),i.cartographicToCartesian(l.Rectangle.northeast(t,_),E),i.cartographicToCartesian(l.Rectangle.southwest(t,_),M),r.Cartesian3.midpoint(M,E,b);var p=i.scaleToGeodeticSurface(b,O);if(e.defined(p)){var d=r.Cartesian3.distance(b,p);o=Math.min(o,-d)}else o=S._defaultMinTerrainHeight}return{minimumTerrainHeight:o=Math.max(S._defaultMinTerrainHeight,o),maximumTerrainHeight:u}},S.getBoundingSphere=function(t,r){if(a.Check.defined("rectangle",t),!e.defined(S._terrainHeights))throw new a.DeveloperError("You must call ApproximateTerrainHeights.initialize and wait for the promise to resolve before using this function");r=e.defaultValue(r,n.Ellipsoid.WGS84);var s=L(t),o=S._defaultMaxTerrainHeight;if(e.defined(s)){var l=s.level+"-"+s.x+"-"+s.y,u=S._terrainHeights[l];e.defined(u)&&(o=u[1])}var c=i.BoundingSphere.fromRectangle3D(t,r,0);return i.BoundingSphere.fromRectangle3D(t,r,o,P),i.BoundingSphere.union(c,P,c)},S._terrainHeightsMaxLevel=6,S._defaultMaxTerrainHeight=9e3,S._defaultMinTerrainHeight=-1e5,S._terrainHeights=void 0,S._initPromise=void 0,t.defineProperties(S,{initialized:{get:function(){return e.defined(S._terrainHeights)}}});var N=[i.GeographicProjection,f.WebMercatorProjection],D=N.length,x=Math.cos(t.CesiumMath.toRadians(30)),R=Math.cos(t.CesiumMath.toRadians(150));function H(t){var r=(t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT)).positions;if(!e.defined(r)||r.length<2)throw new a.DeveloperError("At least two positions are required.");if(e.defined(t.arcType)&&t.arcType!==w.ArcType.GEODESIC&&t.arcType!==w.ArcType.RHUMB)throw new a.DeveloperError("Valid options for arcType are ArcType.GEODESIC and ArcType.RHUMB.");this.width=e.defaultValue(t.width,1),this._positions=r,this.granularity=e.defaultValue(t.granularity,9999),this.loop=e.defaultValue(t.loop,!1),this.arcType=e.defaultValue(t.arcType,w.ArcType.GEODESIC),this._ellipsoid=n.Ellipsoid.WGS84,this._projectionIndex=0,this._workerName="createGroundPolylineGeometry",this._scene3DOnly=!1}t.defineProperties(H.prototype,{packedLength:{get:function(){return 1+3*this._positions.length+1+1+1+n.Ellipsoid.packedLength+1+1}}}),H.setProjectionAndEllipsoid=function(e,a){for(var t=0,r=0;r<D;r++)if(a instanceof N[r]){t=r;break}e._projectionIndex=t,e._ellipsoid=a.ellipsoid};var z=new r.Cartesian3,B=new r.Cartesian3,G=new r.Cartesian3;function V(e,a,t,n,i){var s=W(n,e,0,z),o=W(n,e,t,B),l=W(n,a,0,G),u=Z(o,s,B),c=Z(l,s,G);return r.Cartesian3.cross(c,u,i),r.Cartesian3.normalize(i,i)}var j=new n.Cartographic,Y=new r.Cartesian3,F=new r.Cartesian3,q=new r.Cartesian3;function X(e,a,t,n,i,s,o,l,u,c,C){if(0!==i){var p;s===w.ArcType.GEODESIC?p=new y.EllipsoidGeodesic(e,a,o):s===w.ArcType.RHUMB&&(p=new v.EllipsoidRhumbLine(e,a,o));var d=p.surfaceDistance;if(!(d<i))for(var h=V(e,a,n,o,q),g=Math.ceil(d/i),f=d/g,m=f,T=g-1,E=l.length,M=0;M<T;M++){var _=p.interpolateUsingSurfaceDistance(m,j),b=W(o,_,t,Y),O=W(o,_,n,F);r.Cartesian3.pack(h,l,E),r.Cartesian3.pack(b,u,E),r.Cartesian3.pack(O,c,E),C.push(_.latitude),C.push(_.longitude),E+=3,m+=f}}}var U=new n.Cartographic;function W(e,a,t,r){return n.Cartographic.clone(a,U),U.height=t,n.Cartographic.toCartesian(U,e,r)}function Z(e,a,t){return r.Cartesian3.subtract(e,a,t),r.Cartesian3.normalize(t,t),t}H.pack=function(t,i,s){a.Check.typeOf.object("value",t),a.Check.defined("array",i);var o=e.defaultValue(s,0),l=t._positions,u=l.length;i[o++]=u;for(var c=0;c<u;++c){var C=l[c];r.Cartesian3.pack(C,i,o),o+=3}return i[o++]=t.granularity,i[o++]=t.loop?1:0,i[o++]=t.arcType,n.Ellipsoid.pack(t._ellipsoid,i,o),o+=n.Ellipsoid.packedLength,i[o++]=t._projectionIndex,i[o++]=t._scene3DOnly?1:0,i},H.unpack=function(t,i,s){a.Check.defined("array",t);for(var o=e.defaultValue(i,0),l=t[o++],u=new Array(l),c=0;c<l;c++)u[c]=r.Cartesian3.unpack(t,o),o+=3;var C=t[o++],p=1===t[o++],d=t[o++],h=n.Ellipsoid.unpack(t,o);o+=n.Ellipsoid.packedLength;var g=t[o++],f=1===t[o++];if(!e.defined(s)){var m=new H({positions:u,granularity:C,loop:p,arcType:d,ellipsoid:h});return m._projectionIndex=g,m._scene3DOnly=f,m}return s._positions=u,s.granularity=C,s.loop=p,s.arcType=d,s._ellipsoid=h,s._projectionIndex=g,s._scene3DOnly=f,s};var Q=new r.Cartesian3,J=new r.Cartesian3,K=new r.Cartesian3,$=new r.Cartesian3,ee=new g.Plane(r.Cartesian3.UNIT_X,0),ae=new r.Cartesian3;function te(e,a,n,i,s){var o=Z(n,a,ae),l=Z(e,a,Q),u=Z(i,a,J),c=r.Cartesian3.cross(o,l,$);c=r.Cartesian3.normalize(c,c);var C=g.Plane.fromPointNormal(a,c,ee),p=g.Plane.getPointDistance(C,i);if(t.CesiumMath.equalsEpsilon(p,0,t.CesiumMath.EPSILON7))return r.Cartesian3.clone(c,s),s;s=r.Cartesian3.add(u,l,s),s=r.Cartesian3.normalize(s,s);var d=r.Cartesian3.cross(o,s,K);return r.Cartesian3.normalize(d,d),r.Cartesian3.cross(d,o,s),r.Cartesian3.normalize(s,s),r.Cartesian3.dot(u,d)<0&&(s=r.Cartesian3.negate(s,s)),s}var re=g.Plane.fromPointNormal(r.Cartesian3.ZERO,r.Cartesian3.UNIT_Y),ne=new r.Cartesian3,ie=new r.Cartesian3,se=new r.Cartesian3,oe=new r.Cartesian3,le=new r.Cartesian3,ue=new r.Cartesian3,ce=new n.Cartographic,Ce=new n.Cartographic,pe=new n.Cartographic;H.createGeometry=function(a){var s,o,u,c,g,f,y=!a._scene3DOnly,T=a.loop,E=a._ellipsoid,M=a.granularity,_=a.arcType,b=new N[a._projectionIndex](E),O=a._positions,P=O.length;2===P&&(T=!1);var A,k,I,L=new v.EllipsoidRhumbLine(void 0,void 0,E),D=[O[0]];for(o=0;o<P-1;o++)u=O[o],c=O[o+1],A=h.IntersectionTests.lineSegmentPlane(u,c,re,ue),!e.defined(A)||r.Cartesian3.equalsEpsilon(A,u,t.CesiumMath.EPSILON7)||r.Cartesian3.equalsEpsilon(A,c,t.CesiumMath.EPSILON7)||(a.arcType===w.ArcType.GEODESIC?D.push(r.Cartesian3.clone(A)):a.arcType===w.ArcType.RHUMB&&(I=E.cartesianToCartographic(A,ce).longitude,g=E.cartesianToCartographic(u,ce),f=E.cartesianToCartographic(c,Ce),L.setEndPoints(g,f),k=L.findIntersectionWithLongitude(I,pe),A=E.cartographicToCartesian(k,ue),!e.defined(A)||r.Cartesian3.equalsEpsilon(A,u,t.CesiumMath.EPSILON7)||r.Cartesian3.equalsEpsilon(A,c,t.CesiumMath.EPSILON7)||D.push(r.Cartesian3.clone(A)))),D.push(c);T&&(u=O[P-1],c=O[0],A=h.IntersectionTests.lineSegmentPlane(u,c,re,ue),!e.defined(A)||r.Cartesian3.equalsEpsilon(A,u,t.CesiumMath.EPSILON7)||r.Cartesian3.equalsEpsilon(A,c,t.CesiumMath.EPSILON7)||(a.arcType===w.ArcType.GEODESIC?D.push(r.Cartesian3.clone(A)):a.arcType===w.ArcType.RHUMB&&(I=E.cartesianToCartographic(A,ce).longitude,g=E.cartesianToCartographic(u,ce),f=E.cartesianToCartographic(c,Ce),L.setEndPoints(g,f),k=L.findIntersectionWithLongitude(I,pe),A=E.cartographicToCartesian(k,ue),!e.defined(A)||r.Cartesian3.equalsEpsilon(A,u,t.CesiumMath.EPSILON7)||r.Cartesian3.equalsEpsilon(A,c,t.CesiumMath.EPSILON7)||D.push(r.Cartesian3.clone(A)))));var R=D.length,H=new Array(R);for(o=0;o<R;o++){var z=n.Cartographic.fromCartesian(D[o],E);z.height=0,H[o]=z}if(!((R=(H=m.arrayRemoveDuplicates(H,n.Cartographic.equalsEpsilon)).length)<2)){var B=[],G=[],j=[],Y=[],F=ne,q=ie,U=se,Q=oe,J=le,K=H[0],$=H[1];for(F=W(E,H[R-1],0,F),Q=W(E,$,0,Q),q=W(E,K,0,q),U=W(E,K,1e3,U),J=T?te(F,q,U,Q,J):V(K,$,1e3,E,J),r.Cartesian3.pack(J,G,0),r.Cartesian3.pack(q,j,0),r.Cartesian3.pack(U,Y,0),B.push(K.latitude),B.push(K.longitude),X(K,$,0,1e3,M,_,E,G,j,Y,B),o=1;o<R-1;++o){F=r.Cartesian3.clone(q,F),q=r.Cartesian3.clone(Q,q);var ee=H[o];W(E,ee,1e3,U),W(E,H[o+1],0,Q),te(F,q,U,Q,J),s=G.length,r.Cartesian3.pack(J,G,s),r.Cartesian3.pack(q,j,s),r.Cartesian3.pack(U,Y,s),B.push(ee.latitude),B.push(ee.longitude),X(H[o],H[o+1],0,1e3,M,_,E,G,j,Y,B)}var ae=H[R-1],de=H[R-2];if(q=W(E,ae,0,q),U=W(E,ae,1e3,U),T){var he=H[0];J=te(F=W(E,de,0,F),q,U,Q=W(E,he,0,Q),J)}else J=V(de,ae,1e3,E,J);if(s=G.length,r.Cartesian3.pack(J,G,s),r.Cartesian3.pack(q,j,s),r.Cartesian3.pack(U,Y,s),B.push(ae.latitude),B.push(ae.longitude),T){for(X(ae,K,0,1e3,M,_,E,G,j,Y,B),s=G.length,o=0;o<3;++o)G[s+o]=G[o],j[s+o]=j[o],Y[s+o]=Y[o];B.push(K.latitude),B.push(K.longitude)}return function(e,a,n,s,o,u,c){var h,g,f,m,w,v,y=a._ellipsoid,T=n.length/3-1,E=8*T,M=4*E,_=36*T,b=E>65535?new Uint32Array(_):new Uint16Array(_),O=new Float64Array(3*E),P=new Float32Array(M),A=new Float32Array(M),k=new Float32Array(M),I=new Float32Array(M),L=new Float32Array(M);c&&(f=new Float32Array(M),m=new Float32Array(M),w=new Float32Array(M),v=new Float32Array(2*E));var N=u.length/2,D=0,R=Pe;R.height=0;var H=Ae;H.height=0;var z=ke,B=Ie;if(c)for(g=0,h=1;h<N;h++)R.latitude=u[g],R.longitude=u[g+1],H.latitude=u[g+2],H.longitude=u[g+3],z=a.project(R,z),B=a.project(H,B),D+=r.Cartesian3.distance(z,B),g+=2;var G=s.length/3;B=r.Cartesian3.unpack(s,0,B);var V,j=0;for(g=3,h=1;h<G;h++)z=r.Cartesian3.clone(B,z),B=r.Cartesian3.unpack(s,g,B),j+=r.Cartesian3.distance(z,B),g+=3;g=3;var Y=0,F=0,q=0,X=0,U=!1,W=r.Cartesian3.unpack(n,0,Le),Q=r.Cartesian3.unpack(s,0,Ie),J=r.Cartesian3.unpack(o,0,De);if(e){var K=r.Cartesian3.unpack(n,n.length-6,Se);fe(J,K,W,Q)&&(J=r.Cartesian3.negate(J,J))}var $=0,ee=0,ae=0;for(h=0;h<T;h++){var te,re,ne,ie,se=r.Cartesian3.clone(W,Se),oe=r.Cartesian3.clone(Q,ke),le=r.Cartesian3.clone(J,Ne);if(U&&(le=r.Cartesian3.negate(le,le)),W=r.Cartesian3.unpack(n,g,Le),Q=r.Cartesian3.unpack(s,g,Ie),J=r.Cartesian3.unpack(o,g,De),U=fe(J,se,W,Q),R.latitude=u[Y],R.longitude=u[Y+1],H.latitude=u[Y+2],H.longitude=u[Y+3],c){var ue=Oe(R,H);te=a.project(R,Ve);var ce=Z(re=a.project(H,je),te,$e);ce.y=Math.abs(ce.y),ne=Ye,ie=Fe,0===ue||r.Cartesian3.dot(ce,r.Cartesian3.UNIT_Y)>x?(ne=ye(a,R,le,te,Ye),ie=ye(a,H,J,re,Fe)):1===ue?(ie=ye(a,H,J,re,Fe),ne.x=0,ne.y=t.CesiumMath.sign(R.longitude-Math.abs(H.longitude)),ne.z=0):(ne=ye(a,R,le,te,Ye),ie.x=0,ie.y=t.CesiumMath.sign(R.longitude-H.longitude),ie.z=0)}var Ce=r.Cartesian3.distance(oe,Q),pe=d.EncodedCartesian3.fromCartesian(se,Je),de=r.Cartesian3.subtract(W,se,qe),he=r.Cartesian3.normalize(de,We),ge=r.Cartesian3.subtract(oe,se,Xe);ge=r.Cartesian3.normalize(ge,ge);var me=r.Cartesian3.cross(he,ge,We);me=r.Cartesian3.normalize(me,me);var we=r.Cartesian3.cross(ge,le,Ze);we=r.Cartesian3.normalize(we,we);var ve=r.Cartesian3.subtract(Q,W,Ue);ve=r.Cartesian3.normalize(ve,ve);var Te=r.Cartesian3.cross(J,ve,Qe);Te=r.Cartesian3.normalize(Te,Te);var Ee,_e,sa,oa=Ce/j,la=$/j,ua=0,ca=0,Ca=0;if(c){ua=r.Cartesian3.distance(te,re),Ee=d.EncodedCartesian3.fromCartesian(te,Ke),_e=r.Cartesian3.subtract(re,te,$e);var pa=(sa=r.Cartesian3.normalize(_e,ea)).x;sa.x=sa.y,sa.y=-pa,ca=ua/D,Ca=ee/D}for(V=0;V<8;V++){var da=X+4*V,ha=F+2*V,ga=da+3,fa=V<4?1:-1,ma=2===V||3===V||6===V||7===V?1:-1;r.Cartesian3.pack(pe.high,P,da),P[ga]=de.x,r.Cartesian3.pack(pe.low,A,da),A[ga]=de.y,r.Cartesian3.pack(we,k,da),k[ga]=de.z,r.Cartesian3.pack(Te,I,da),I[ga]=oa*fa,r.Cartesian3.pack(me,L,da);var wa=la*ma;0===wa&&ma<0&&(wa=Number.POSITIVE_INFINITY),L[ga]=wa,c&&(f[da]=Ee.high.x,f[da+1]=Ee.high.y,f[da+2]=Ee.low.x,f[da+3]=Ee.low.y,w[da]=-ne.y,w[da+1]=ne.x,w[da+2]=ie.y,w[da+3]=-ie.x,m[da]=_e.x,m[da+1]=_e.y,m[da+2]=sa.x,m[da+3]=sa.y,v[ha]=ca*fa,0===(wa=Ca*ma)&&ma<0&&(wa=Number.POSITIVE_INFINITY),v[ha+1]=wa)}var va=Be,ya=Ge,Ta=He,Ea=ze,Ma=l.Rectangle.fromCartographicArray(xe,Re),_a=S.getMinimumMaximumHeights(Ma,y),ba=_a.minimumTerrainHeight,Oa=_a.maximumTerrainHeight;ae+=ba,ae+=Oa,Me(se,oe,ba,Oa,va,Ta),Me(W,Q,ba,Oa,ya,Ea);var Pa=r.Cartesian3.multiplyByScalar(me,t.CesiumMath.EPSILON5,aa);r.Cartesian3.add(va,Pa,va),r.Cartesian3.add(ya,Pa,ya),r.Cartesian3.add(Ta,Pa,Ta),r.Cartesian3.add(Ea,Pa,Ea),be(va,ya),be(Ta,Ea),r.Cartesian3.pack(va,O,q),r.Cartesian3.pack(ya,O,q+3),r.Cartesian3.pack(Ea,O,q+6),r.Cartesian3.pack(Ta,O,q+9),Pa=r.Cartesian3.multiplyByScalar(me,-2*t.CesiumMath.EPSILON5,aa),r.Cartesian3.add(va,Pa,va),r.Cartesian3.add(ya,Pa,ya),r.Cartesian3.add(Ta,Pa,Ta),r.Cartesian3.add(Ea,Pa,Ea),be(va,ya),be(Ta,Ea),r.Cartesian3.pack(va,O,q+12),r.Cartesian3.pack(ya,O,q+15),r.Cartesian3.pack(Ea,O,q+18),r.Cartesian3.pack(Ta,O,q+21),Y+=2,g+=3,F+=16,q+=24,X+=32,$+=Ce,ee+=ua}g=0;var Aa=0;for(h=0;h<T;h++){for(V=0;V<na;V++)b[g+V]=ra[V]+Aa;Aa+=8,g+=na}var ka=ta;i.BoundingSphere.fromVertices(n,r.Cartesian3.ZERO,3,ka[0]),i.BoundingSphere.fromVertices(s,r.Cartesian3.ZERO,3,ka[1]);var Ia=i.BoundingSphere.fromBoundingSpheres(ka);Ia.radius+=ae/(2*T);var Sa={position:new p.GeometryAttribute({componentDatatype:C.ComponentDatatype.DOUBLE,componentsPerAttribute:3,normalize:!1,values:O}),startHiAndForwardOffsetX:ia(P),startLoAndForwardOffsetY:ia(A),startNormalAndForwardOffsetZ:ia(k),endNormalAndTextureCoordinateNormalizationX:ia(I),rightNormalAndTextureCoordinateNormalizationY:ia(L)};c&&(Sa.startHiLo2D=ia(f),Sa.offsetAndRight2D=ia(m),Sa.startEndNormals2D=ia(w),Sa.texcoordNormalization2D=new p.GeometryAttribute({componentDatatype:C.ComponentDatatype.FLOAT,componentsPerAttribute:2,normalize:!1,values:v}));return new p.Geometry({attributes:Sa,indices:b,boundingSphere:Ia})}(T,b,j,Y,G,B,y)}};var de=new r.Cartesian3,he=new s.Matrix3,ge=new i.Quaternion;function fe(e,a,n,o){var l=Z(n,a,de),u=r.Cartesian3.dot(l,e);if(u>x||u<R){var c=Z(o,n,ae),C=u<R?t.CesiumMath.PI_OVER_TWO:-t.CesiumMath.PI_OVER_TWO,p=i.Quaternion.fromAxisAngle(c,C,ge),d=s.Matrix3.fromQuaternion(p,he);return s.Matrix3.multiplyByVector(d,e,e),!0}return!1}var me=new n.Cartographic,we=new r.Cartesian3,ve=new r.Cartesian3;function ye(e,a,i,s,o){var l=n.Cartographic.toCartesian(a,e._ellipsoid,we),u=r.Cartesian3.add(l,i,ve),c=!1,C=e._ellipsoid,p=C.cartesianToCartographic(u,me);Math.abs(a.longitude-p.longitude)>t.CesiumMath.PI_OVER_TWO&&(c=!0,u=r.Cartesian3.subtract(l,i,ve),p=C.cartesianToCartographic(u,me)),p.height=0;var d=e.project(p,o);return(o=r.Cartesian3.subtract(d,s,o)).z=0,o=r.Cartesian3.normalize(o,o),c&&r.Cartesian3.negate(o,o),o}var Te=new r.Cartesian3,Ee=new r.Cartesian3;function Me(e,a,t,n,i,s){var o=r.Cartesian3.subtract(a,e,Te);r.Cartesian3.normalize(o,o);var l=t-0,u=r.Cartesian3.multiplyByScalar(o,l,Ee);r.Cartesian3.add(e,u,i);var c=n-1e3;u=r.Cartesian3.multiplyByScalar(o,c,Ee),r.Cartesian3.add(a,u,s)}var _e=new r.Cartesian3;function be(e,a){var n=g.Plane.getPointDistance(re,e),i=g.Plane.getPointDistance(re,a),s=_e;t.CesiumMath.equalsEpsilon(n,0,t.CesiumMath.EPSILON2)?(s=Z(a,e,s),r.Cartesian3.multiplyByScalar(s,t.CesiumMath.EPSILON2,s),r.Cartesian3.add(e,s,e)):t.CesiumMath.equalsEpsilon(i,0,t.CesiumMath.EPSILON2)&&(s=Z(e,a,s),r.Cartesian3.multiplyByScalar(s,t.CesiumMath.EPSILON2,s),r.Cartesian3.add(a,s,a))}function Oe(e,a){var r=Math.abs(e.longitude),n=Math.abs(a.longitude);if(t.CesiumMath.equalsEpsilon(r,t.CesiumMath.PI,t.CesiumMath.EPSILON11)){var i=t.CesiumMath.sign(a.longitude);return e.longitude=i*(r-t.CesiumMath.EPSILON11),1}if(t.CesiumMath.equalsEpsilon(n,t.CesiumMath.PI,t.CesiumMath.EPSILON11)){var s=t.CesiumMath.sign(e.longitude);return a.longitude=s*(n-t.CesiumMath.EPSILON11),2}return 0}var Pe=new n.Cartographic,Ae=new n.Cartographic,ke=new r.Cartesian3,Ie=new r.Cartesian3,Se=new r.Cartesian3,Le=new r.Cartesian3,Ne=new r.Cartesian3,De=new r.Cartesian3,xe=[Pe,Ae],Re=new l.Rectangle,He=new r.Cartesian3,ze=new r.Cartesian3,Be=new r.Cartesian3,Ge=new r.Cartesian3,Ve=new r.Cartesian3,je=new r.Cartesian3,Ye=new r.Cartesian3,Fe=new r.Cartesian3,qe=new r.Cartesian3,Xe=new r.Cartesian3,Ue=new r.Cartesian3,We=new r.Cartesian3,Ze=new r.Cartesian3,Qe=new r.Cartesian3,Je=new d.EncodedCartesian3,Ke=new d.EncodedCartesian3,$e=new r.Cartesian3,ea=new r.Cartesian3,aa=new r.Cartesian3,ta=[new i.BoundingSphere,new i.BoundingSphere],ra=[0,2,1,0,3,2,0,7,3,0,4,7,0,5,4,0,1,5,5,7,4,5,6,7,5,2,6,5,1,2,3,6,2,3,7,6],na=ra.length;function ia(e){return new p.GeometryAttribute({componentDatatype:C.ComponentDatatype.FLOAT,componentsPerAttribute:4,normalize:!1,values:e})}return H._projectNormal=ye,function(a,t){return S.initialize().then((function(){return e.defined(t)&&(a=H.unpack(a,t)),H.createGeometry(a)}))}}));
