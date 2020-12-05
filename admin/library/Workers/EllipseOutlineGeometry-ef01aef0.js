define(["exports","./when-7ef6387a","./Check-ed6a1804","./Math-85667bf9","./Ellipsoid-1cbb4ac9","./Transforms-c20c38d0","./ComponentDatatype-a863af81","./GeometryAttribute-6b3c7112","./GeometryAttributes-cb18da36","./IndexDatatype-f12d39b5","./GeometryOffsetAttribute-5cfc2755","./EllipseGeometryLibrary-22c86a32"],(function(e,t,i,r,a,n,o,s,l,u,d,f){"use strict";var p=new a.Cartesian3,c=new a.Cartesian3;var m=new n.BoundingSphere,h=new n.BoundingSphere;function y(e){var n=(e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT)).center,o=t.defaultValue(e.ellipsoid,a.Ellipsoid.WGS84),s=e.semiMajorAxis,l=e.semiMinorAxis,u=t.defaultValue(e.granularity,r.CesiumMath.RADIANS_PER_DEGREE);if(!t.defined(n))throw new i.DeveloperError("center is required.");if(!t.defined(s))throw new i.DeveloperError("semiMajorAxis is required.");if(!t.defined(l))throw new i.DeveloperError("semiMinorAxis is required.");if(s<l)throw new i.DeveloperError("semiMajorAxis must be greater than or equal to the semiMinorAxis.");if(u<=0)throw new i.DeveloperError("granularity must be greater than zero.");var d=t.defaultValue(e.height,0),f=t.defaultValue(e.extrudedHeight,d);this._center=a.Cartesian3.clone(n),this._semiMajorAxis=s,this._semiMinorAxis=l,this._ellipsoid=a.Ellipsoid.clone(o),this._rotation=t.defaultValue(e.rotation,0),this._height=Math.max(f,d),this._granularity=u,this._extrudedHeight=Math.min(f,d),this._numberOfVerticalLines=Math.max(t.defaultValue(e.numberOfVerticalLines,16),0),this._offsetAttribute=e.offsetAttribute,this._workerName="createEllipseOutlineGeometry"}y.packedLength=a.Cartesian3.packedLength+a.Ellipsoid.packedLength+8,y.pack=function(e,r,n){if(!t.defined(e))throw new i.DeveloperError("value is required");if(!t.defined(r))throw new i.DeveloperError("array is required");return n=t.defaultValue(n,0),a.Cartesian3.pack(e._center,r,n),n+=a.Cartesian3.packedLength,a.Ellipsoid.pack(e._ellipsoid,r,n),n+=a.Ellipsoid.packedLength,r[n++]=e._semiMajorAxis,r[n++]=e._semiMinorAxis,r[n++]=e._rotation,r[n++]=e._height,r[n++]=e._granularity,r[n++]=e._extrudedHeight,r[n++]=e._numberOfVerticalLines,r[n]=t.defaultValue(e._offsetAttribute,-1),r};var b=new a.Cartesian3,A=new a.Ellipsoid,_={center:b,ellipsoid:A,semiMajorAxis:void 0,semiMinorAxis:void 0,rotation:void 0,height:void 0,granularity:void 0,extrudedHeight:void 0,numberOfVerticalLines:void 0,offsetAttribute:void 0};y.unpack=function(e,r,n){if(!t.defined(e))throw new i.DeveloperError("array is required");r=t.defaultValue(r,0);var o=a.Cartesian3.unpack(e,r,b);r+=a.Cartesian3.packedLength;var s=a.Ellipsoid.unpack(e,r,A);r+=a.Ellipsoid.packedLength;var l=e[r++],u=e[r++],d=e[r++],f=e[r++],p=e[r++],c=e[r++],m=e[r++],h=e[r];return t.defined(n)?(n._center=a.Cartesian3.clone(o,n._center),n._ellipsoid=a.Ellipsoid.clone(s,n._ellipsoid),n._semiMajorAxis=l,n._semiMinorAxis=u,n._rotation=d,n._height=f,n._granularity=p,n._extrudedHeight=c,n._numberOfVerticalLines=m,n._offsetAttribute=-1===h?void 0:h,n):(_.height=f,_.extrudedHeight=c,_.granularity=p,_.rotation=d,_.semiMajorAxis=l,_.semiMinorAxis=u,_.numberOfVerticalLines=m,_.offsetAttribute=-1===h?void 0:h,new y(_))},y.createGeometry=function(e){if(!(e._semiMajorAxis<=0||e._semiMinorAxis<=0)){var i=e._height,y=e._extrudedHeight,b=!r.CesiumMath.equalsEpsilon(i,y,0,r.CesiumMath.EPSILON2);e._center=e._ellipsoid.scaleToGeodeticSurface(e._center,e._center);var A,_={center:e._center,semiMajorAxis:e._semiMajorAxis,semiMinorAxis:e._semiMinorAxis,ellipsoid:e._ellipsoid,rotation:e._rotation,height:i,granularity:e._granularity,numberOfVerticalLines:e._numberOfVerticalLines};if(b)_.extrudedHeight=y,_.offsetAttribute=e._offsetAttribute,A=function(e){var i=e.center,c=e.ellipsoid,y=e.semiMajorAxis,b=a.Cartesian3.multiplyByScalar(c.geodeticSurfaceNormal(i,p),e.height,p);m.center=a.Cartesian3.add(i,b,m.center),m.radius=y,b=a.Cartesian3.multiplyByScalar(c.geodeticSurfaceNormal(i,b),e.extrudedHeight,b),h.center=a.Cartesian3.add(i,b,h.center),h.radius=y;var A=f.EllipseGeometryLibrary.computeEllipsePositions(e,!1,!0).outerPositions,_=new l.GeometryAttributes({position:new s.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:f.EllipseGeometryLibrary.raisePositionsToHeight(A,e,!0)})});A=_.position.values;var g=n.BoundingSphere.union(m,h),v=A.length/3;if(t.defined(e.offsetAttribute)){var E=new Uint8Array(v);if(e.offsetAttribute===d.GeometryOffsetAttribute.TOP)E=d.arrayFill(E,1,0,v/2);else{var x=e.offsetAttribute===d.GeometryOffsetAttribute.NONE?0:1;E=d.arrayFill(E,x)}_.applyOffset=new s.GeometryAttribute({componentDatatype:o.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:E})}var M=t.defaultValue(e.numberOfVerticalLines,16);M=r.CesiumMath.clamp(M,0,v/2);var w=u.IndexDatatype.createTypedArray(v,2*v+2*M);v/=2;var C,D,G=0;for(C=0;C<v;++C)w[G++]=C,w[G++]=(C+1)%v,w[G++]=C+v,w[G++]=(C+1)%v+v;if(M>0){var L=Math.min(M,v);D=Math.round(v/L);var O=Math.min(D*M,v);for(C=0;C<O;C+=D)w[G++]=C,w[G++]=C+v}return{boundingSphere:g,attributes:_,indices:w}}(_);else if(A=function(e){var t=e.center;c=a.Cartesian3.multiplyByScalar(e.ellipsoid.geodeticSurfaceNormal(t,c),e.height,c),c=a.Cartesian3.add(t,c,c);for(var i=new n.BoundingSphere(c,e.semiMajorAxis),r=f.EllipseGeometryLibrary.computeEllipsePositions(e,!1,!0).outerPositions,d=new l.GeometryAttributes({position:new s.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:f.EllipseGeometryLibrary.raisePositionsToHeight(r,e,!1)})}),p=r.length/3,m=u.IndexDatatype.createTypedArray(p,2*p),h=0,y=0;y<p;++y)m[h++]=y,m[h++]=(y+1)%p;return{boundingSphere:i,attributes:d,indices:m}}(_),t.defined(e._offsetAttribute)){var g=A.attributes.position.values.length,v=new Uint8Array(g/3),E=e._offsetAttribute===d.GeometryOffsetAttribute.NONE?0:1;d.arrayFill(v,E),A.attributes.applyOffset=new s.GeometryAttribute({componentDatatype:o.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:v})}return new s.Geometry({attributes:A.attributes,indices:A.indices,primitiveType:s.PrimitiveType.LINES,boundingSphere:A.boundingSphere,offsetAttribute:e._offsetAttribute})}},e.EllipseOutlineGeometry=y}));
//# sourceMappingURL=EllipseOutlineGeometry-ef01aef0.js.map
