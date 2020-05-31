define(["exports","./when-7ef6387a","./Check-ed6a1804","./Math-55f9392d","./Ellipsoid-911f8bc2","./Transforms-d8f9dcbd","./Cartesian2-ff47d58f","./ComponentDatatype-a863af81","./AttributeCompression-31bd05f3"],(function(e,t,i,r,a,n,o,s,c){"use strict";function m(e,r){i.Check.typeOf.object("ellipsoid",e),this._ellipsoid=e,this._cameraPosition=new a.Cartesian3,this._cameraPositionInScaledSpace=new a.Cartesian3,this._distanceToLimbInScaledSpaceSquared=0,t.defined(r)&&(this.cameraPosition=r)}Object.defineProperties(m.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},cameraPosition:{get:function(){return this._cameraPosition},set:function(e){var t=this._ellipsoid.transformPositionToScaledSpace(e,this._cameraPositionInScaledSpace),i=a.Cartesian3.magnitudeSquared(t)-1;a.Cartesian3.clone(e,this._cameraPosition),this._cameraPositionInScaledSpace=t,this._distanceToLimbInScaledSpaceSquared=i}}});var d=new a.Cartesian3;m.prototype.isPointVisible=function(e){return S(this._ellipsoid.transformPositionToScaledSpace(e,d),this._cameraPositionInScaledSpace,this._distanceToLimbInScaledSpaceSquared)},m.prototype.isScaledSpacePointVisible=function(e){return S(e,this._cameraPositionInScaledSpace,this._distanceToLimbInScaledSpaceSquared)};var u=new a.Cartesian3;m.prototype.isScaledSpacePointVisiblePossiblyUnderEllipsoid=function(e,i){var r,a,n=this._ellipsoid;return t.defined(i)&&i<0&&n.minimumRadius>-i?((a=u).x=this._cameraPosition.x/(n.radii.x+i),a.y=this._cameraPosition.y/(n.radii.y+i),a.z=this._cameraPosition.z/(n.radii.z+i),r=a.x*a.x+a.y*a.y+a.z*a.z-1):(a=this._cameraPositionInScaledSpace,r=this._distanceToLimbInScaledSpaceSquared),S(e,a,r)},m.prototype.computeHorizonCullingPoint=function(e,t,i){return C(this._ellipsoid,e,t,i)};var l=a.Ellipsoid.clone(a.Ellipsoid.UNIT_SPHERE);m.prototype.computeHorizonCullingPointPossiblyUnderEllipsoid=function(e,t,i,r){return C(f(this._ellipsoid,i,l),e,t,r)},m.prototype.computeHorizonCullingPointFromVertices=function(e,t,i,r,a){return y(this._ellipsoid,e,t,i,r,a)},m.prototype.computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid=function(e,t,i,r,a,n){return y(f(this._ellipsoid,a,l),e,t,i,r,n)};var p=[];m.prototype.computeHorizonCullingPointFromRectangle=function(e,t,r){i.Check.typeOf.object("rectangle",e);var s=o.Rectangle.subsample(e,t,0,p),c=n.BoundingSphere.fromPoints(s);if(!(a.Cartesian3.magnitude(c.center)<.1*t.minimumRadius))return this.computeHorizonCullingPoint(c.center,s,r)};var h=new a.Cartesian3;function f(e,i,r){if(t.defined(i)&&i<0&&e.minimumRadius>-i){var n=a.Cartesian3.fromElements(e.radii.x+i,e.radii.y+i,e.radii.z+i,h);e=a.Ellipsoid.fromCartesian3(n,r)}return e}function C(e,r,n,o){i.Check.typeOf.object("directionToPoint",r),i.Check.defined("positions",n),t.defined(o)||(o=new a.Cartesian3);for(var s=P(e,r),c=0,m=0,d=n.length;m<d;++m){var u=T(e,n[m],s);if(u<0)return;c=Math.max(c,u)}return g(s,c,o)}var x=new a.Cartesian3;function y(e,r,n,o,s,c){i.Check.typeOf.object("directionToPoint",r),i.Check.defined("vertices",n),i.Check.typeOf.number("stride",o),t.defined(c)||(c=new a.Cartesian3),o=t.defaultValue(o,3),s=t.defaultValue(s,a.Cartesian3.ZERO);for(var m=P(e,r),d=0,u=0,l=n.length;u<l;u+=o){x.x=n[u]+s.x,x.y=n[u+1]+s.y,x.z=n[u+2]+s.z;var p=T(e,x,m);if(p<0)return;d=Math.max(d,p)}return g(m,d,c)}function S(e,t,i){var r=t,n=i,o=a.Cartesian3.subtract(e,r,d),s=-a.Cartesian3.dot(o,r);return!(n<0?s>0:s>n&&s*s/a.Cartesian3.magnitudeSquared(o)>n)}var b=new a.Cartesian3,v=new a.Cartesian3;function T(e,t,i){var r=e.transformPositionToScaledSpace(t,b),n=a.Cartesian3.magnitudeSquared(r),o=Math.sqrt(n),s=a.Cartesian3.divideByScalar(r,o,v);n=Math.max(1,n);var c=1/(o=Math.max(1,o));return 1/(a.Cartesian3.dot(s,i)*c-a.Cartesian3.magnitude(a.Cartesian3.cross(s,i,s))*(Math.sqrt(n-1)*c))}function g(e,t,i){if(!(t<=0||t===1/0||t!=t))return a.Cartesian3.multiplyByScalar(e,t,i)}var M=new a.Cartesian3;function P(e,t){return a.Cartesian3.equals(t,a.Cartesian3.ZERO)?t:(e.transformPositionToScaledSpace(t,M),a.Cartesian3.normalize(M,M))}var E=Object.freeze({NONE:0,BITS12:1}),z=new a.Cartesian3,N=new a.Cartesian3,I=new o.Cartesian2,B=new n.Matrix4,_=new n.Matrix4,w=Math.pow(2,12);function A(e,i,r,o,s,c){var m,d,u,l=E.NONE;if(t.defined(e)&&t.defined(i)&&t.defined(r)&&t.defined(o)){var p=e.minimum,h=e.maximum,f=a.Cartesian3.subtract(h,p,N),C=r-i;l=Math.max(a.Cartesian3.maximumComponent(f),C)<w-1?E.BITS12:E.NONE,m=e.center,d=n.Matrix4.inverseTransformation(o,new n.Matrix4);var x=a.Cartesian3.negate(p,z);n.Matrix4.multiply(n.Matrix4.fromTranslation(x,B),d,d);var y=z;y.x=1/f.x,y.y=1/f.y,y.z=1/f.z,n.Matrix4.multiply(n.Matrix4.fromScale(y,B),d,d),u=n.Matrix4.clone(o),n.Matrix4.setTranslation(u,a.Cartesian3.ZERO,u),o=n.Matrix4.clone(o,new n.Matrix4);var S=n.Matrix4.fromTranslation(p,B),b=n.Matrix4.fromScale(f,_),v=n.Matrix4.multiply(S,b,B);n.Matrix4.multiply(o,v,o),n.Matrix4.multiply(u,v,u)}this.quantization=l,this.minimumHeight=i,this.maximumHeight=r,this.center=m,this.toScaledENU=d,this.fromScaledENU=o,this.matrix=u,this.hasVertexNormals=s,this.hasWebMercatorT=t.defaultValue(c,!1)}A.prototype.encode=function(e,t,i,s,m,d,u){var l=s.x,p=s.y;if(this.quantization===E.BITS12){(i=n.Matrix4.multiplyByPoint(this.toScaledENU,i,z)).x=r.CesiumMath.clamp(i.x,0,1),i.y=r.CesiumMath.clamp(i.y,0,1),i.z=r.CesiumMath.clamp(i.z,0,1);var h=this.maximumHeight-this.minimumHeight,f=r.CesiumMath.clamp((m-this.minimumHeight)/h,0,1);o.Cartesian2.fromElements(i.x,i.y,I);var C=c.AttributeCompression.compressTextureCoordinates(I);o.Cartesian2.fromElements(i.z,f,I);var x=c.AttributeCompression.compressTextureCoordinates(I);o.Cartesian2.fromElements(l,p,I);var y=c.AttributeCompression.compressTextureCoordinates(I);if(e[t++]=C,e[t++]=x,e[t++]=y,this.hasWebMercatorT){o.Cartesian2.fromElements(u,0,I);var S=c.AttributeCompression.compressTextureCoordinates(I);e[t++]=S}}else a.Cartesian3.subtract(i,this.center,z),e[t++]=z.x,e[t++]=z.y,e[t++]=z.z,e[t++]=m,e[t++]=l,e[t++]=p,this.hasWebMercatorT&&(e[t++]=u);return this.hasVertexNormals&&(e[t++]=c.AttributeCompression.octPackFloat(d)),t},A.prototype.decodePosition=function(e,i,r){if(t.defined(r)||(r=new a.Cartesian3),i*=this.getStride(),this.quantization===E.BITS12){var o=c.AttributeCompression.decompressTextureCoordinates(e[i],I);r.x=o.x,r.y=o.y;var s=c.AttributeCompression.decompressTextureCoordinates(e[i+1],I);return r.z=s.x,n.Matrix4.multiplyByPoint(this.fromScaledENU,r,r)}return r.x=e[i],r.y=e[i+1],r.z=e[i+2],a.Cartesian3.add(r,this.center,r)},A.prototype.decodeTextureCoordinates=function(e,i,r){return t.defined(r)||(r=new o.Cartesian2),i*=this.getStride(),this.quantization===E.BITS12?c.AttributeCompression.decompressTextureCoordinates(e[i+2],r):o.Cartesian2.fromElements(e[i+4],e[i+5],r)},A.prototype.decodeHeight=function(e,t){return t*=this.getStride(),this.quantization===E.BITS12?c.AttributeCompression.decompressTextureCoordinates(e[t+1],I).y*(this.maximumHeight-this.minimumHeight)+this.minimumHeight:e[t+3]},A.prototype.decodeWebMercatorT=function(e,t){return t*=this.getStride(),this.quantization===E.BITS12?c.AttributeCompression.decompressTextureCoordinates(e[t+3],I).x:e[t+6]},A.prototype.getOctEncodedNormal=function(e,t,i){var r=e[t=(t+1)*this.getStride()-1]/256,a=Math.floor(r),n=256*(r-a);return o.Cartesian2.fromElements(a,n,i)},A.prototype.getStride=function(){var e;switch(this.quantization){case E.BITS12:e=3;break;default:e=6}return this.hasWebMercatorT&&++e,this.hasVertexNormals&&++e,e};var q={position3DAndHeight:0,textureCoordAndEncodedNormals:1},H={compressed0:0,compressed1:1};A.prototype.getAttributes=function(e){var t,i=s.ComponentDatatype.FLOAT,r=s.ComponentDatatype.getSizeInBytes(i);if(this.quantization===E.NONE){var a=2;return this.hasWebMercatorT&&++a,this.hasVertexNormals&&++a,[{index:q.position3DAndHeight,vertexBuffer:e,componentDatatype:i,componentsPerAttribute:4,offsetInBytes:0,strideInBytes:t=(4+a)*r},{index:q.textureCoordAndEncodedNormals,vertexBuffer:e,componentDatatype:i,componentsPerAttribute:a,offsetInBytes:4*r,strideInBytes:t}]}var n=3,o=0;return(this.hasWebMercatorT||this.hasVertexNormals)&&++n,this.hasWebMercatorT&&this.hasVertexNormals?(++o,[{index:H.compressed0,vertexBuffer:e,componentDatatype:i,componentsPerAttribute:n,offsetInBytes:0,strideInBytes:t=(n+o)*r},{index:H.compressed1,vertexBuffer:e,componentDatatype:i,componentsPerAttribute:o,offsetInBytes:n*r,strideInBytes:t}]):[{index:H.compressed0,vertexBuffer:e,componentDatatype:i,componentsPerAttribute:n}]},A.prototype.getAttributeLocations=function(){return this.quantization===E.NONE?q:H},A.clone=function(e,i){return t.defined(i)||(i=new A),i.quantization=e.quantization,i.minimumHeight=e.minimumHeight,i.maximumHeight=e.maximumHeight,i.center=a.Cartesian3.clone(e.center),i.toScaledENU=n.Matrix4.clone(e.toScaledENU),i.fromScaledENU=n.Matrix4.clone(e.fromScaledENU),i.matrix=n.Matrix4.clone(e.matrix),i.hasVertexNormals=e.hasVertexNormals,i.hasWebMercatorT=e.hasWebMercatorT,i},e.EllipsoidalOccluder=m,e.TerrainEncoding=A}));
//# sourceMappingURL=TerrainEncoding-35fa9829.js.map
