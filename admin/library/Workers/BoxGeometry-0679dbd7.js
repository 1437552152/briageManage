define(["exports","./when-7ef6387a","./Check-ed6a1804","./GeometryOffsetAttribute-5cfc2755","./Ellipsoid-1cbb4ac9","./Transforms-c20c38d0","./ComponentDatatype-a863af81","./GeometryAttribute-6b3c7112","./GeometryAttributes-cb18da36","./VertexFormat-d75df48f"],(function(e,t,a,n,r,i,o,m,u,s){"use strict";var y=new r.Cartesian3;function f(e){var i=(e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT)).minimum,o=e.maximum;if(a.Check.typeOf.object("min",i),a.Check.typeOf.object("max",o),t.defined(e.offsetAttribute)&&e.offsetAttribute===n.GeometryOffsetAttribute.TOP)throw new a.DeveloperError("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");var m=t.defaultValue(e.vertexFormat,s.VertexFormat.DEFAULT);this._minimum=r.Cartesian3.clone(i),this._maximum=r.Cartesian3.clone(o),this._vertexFormat=m,this._offsetAttribute=e.offsetAttribute,this._workerName="createBoxGeometry"}f.fromDimensions=function(e){var n=(e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT)).dimensions;a.Check.typeOf.object("dimensions",n),a.Check.typeOf.number.greaterThanOrEquals("dimensions.x",n.x,0),a.Check.typeOf.number.greaterThanOrEquals("dimensions.y",n.y,0),a.Check.typeOf.number.greaterThanOrEquals("dimensions.z",n.z,0);var i=r.Cartesian3.multiplyByScalar(n,.5,new r.Cartesian3);return new f({minimum:r.Cartesian3.negate(i,new r.Cartesian3),maximum:i,vertexFormat:e.vertexFormat,offsetAttribute:e.offsetAttribute})},f.fromAxisAlignedBoundingBox=function(e){return a.Check.typeOf.object("boundingBox",e),new f({minimum:e.minimum,maximum:e.maximum})},f.packedLength=2*r.Cartesian3.packedLength+s.VertexFormat.packedLength+1,f.pack=function(e,n,i){return a.Check.typeOf.object("value",e),a.Check.defined("array",n),i=t.defaultValue(i,0),r.Cartesian3.pack(e._minimum,n,i),r.Cartesian3.pack(e._maximum,n,i+r.Cartesian3.packedLength),s.VertexFormat.pack(e._vertexFormat,n,i+2*r.Cartesian3.packedLength),n[i+2*r.Cartesian3.packedLength+s.VertexFormat.packedLength]=t.defaultValue(e._offsetAttribute,-1),n};var p,c=new r.Cartesian3,x=new r.Cartesian3,b=new s.VertexFormat,d={minimum:c,maximum:x,vertexFormat:b,offsetAttribute:void 0};f.unpack=function(e,n,i){a.Check.defined("array",e),n=t.defaultValue(n,0);var o=r.Cartesian3.unpack(e,n,c),m=r.Cartesian3.unpack(e,n+r.Cartesian3.packedLength,x),u=s.VertexFormat.unpack(e,n+2*r.Cartesian3.packedLength,b),y=e[n+2*r.Cartesian3.packedLength+s.VertexFormat.packedLength];return t.defined(i)?(i._minimum=r.Cartesian3.clone(o,i._minimum),i._maximum=r.Cartesian3.clone(m,i._maximum),i._vertexFormat=s.VertexFormat.clone(u,i._vertexFormat),i._offsetAttribute=-1===y?void 0:y,i):(d.offsetAttribute=-1===y?void 0:y,new f(d))},f.createGeometry=function(e){var a=e._minimum,s=e._maximum,f=e._vertexFormat;if(!r.Cartesian3.equals(a,s)){var p,c,x=new u.GeometryAttributes;if(f.position&&(f.st||f.normal||f.tangent||f.bitangent)){if(f.position&&((c=new Float64Array(72))[0]=a.x,c[1]=a.y,c[2]=s.z,c[3]=s.x,c[4]=a.y,c[5]=s.z,c[6]=s.x,c[7]=s.y,c[8]=s.z,c[9]=a.x,c[10]=s.y,c[11]=s.z,c[12]=a.x,c[13]=a.y,c[14]=a.z,c[15]=s.x,c[16]=a.y,c[17]=a.z,c[18]=s.x,c[19]=s.y,c[20]=a.z,c[21]=a.x,c[22]=s.y,c[23]=a.z,c[24]=s.x,c[25]=a.y,c[26]=a.z,c[27]=s.x,c[28]=s.y,c[29]=a.z,c[30]=s.x,c[31]=s.y,c[32]=s.z,c[33]=s.x,c[34]=a.y,c[35]=s.z,c[36]=a.x,c[37]=a.y,c[38]=a.z,c[39]=a.x,c[40]=s.y,c[41]=a.z,c[42]=a.x,c[43]=s.y,c[44]=s.z,c[45]=a.x,c[46]=a.y,c[47]=s.z,c[48]=a.x,c[49]=s.y,c[50]=a.z,c[51]=s.x,c[52]=s.y,c[53]=a.z,c[54]=s.x,c[55]=s.y,c[56]=s.z,c[57]=a.x,c[58]=s.y,c[59]=s.z,c[60]=a.x,c[61]=a.y,c[62]=a.z,c[63]=s.x,c[64]=a.y,c[65]=a.z,c[66]=s.x,c[67]=a.y,c[68]=s.z,c[69]=a.x,c[70]=a.y,c[71]=s.z,x.position=new m.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:c})),f.normal){var b=new Float32Array(72);b[0]=0,b[1]=0,b[2]=1,b[3]=0,b[4]=0,b[5]=1,b[6]=0,b[7]=0,b[8]=1,b[9]=0,b[10]=0,b[11]=1,b[12]=0,b[13]=0,b[14]=-1,b[15]=0,b[16]=0,b[17]=-1,b[18]=0,b[19]=0,b[20]=-1,b[21]=0,b[22]=0,b[23]=-1,b[24]=1,b[25]=0,b[26]=0,b[27]=1,b[28]=0,b[29]=0,b[30]=1,b[31]=0,b[32]=0,b[33]=1,b[34]=0,b[35]=0,b[36]=-1,b[37]=0,b[38]=0,b[39]=-1,b[40]=0,b[41]=0,b[42]=-1,b[43]=0,b[44]=0,b[45]=-1,b[46]=0,b[47]=0,b[48]=0,b[49]=1,b[50]=0,b[51]=0,b[52]=1,b[53]=0,b[54]=0,b[55]=1,b[56]=0,b[57]=0,b[58]=1,b[59]=0,b[60]=0,b[61]=-1,b[62]=0,b[63]=0,b[64]=-1,b[65]=0,b[66]=0,b[67]=-1,b[68]=0,b[69]=0,b[70]=-1,b[71]=0,x.normal=new m.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:b})}if(f.st){var d=new Float32Array(48);d[0]=0,d[1]=0,d[2]=1,d[3]=0,d[4]=1,d[5]=1,d[6]=0,d[7]=1,d[8]=1,d[9]=0,d[10]=0,d[11]=0,d[12]=0,d[13]=1,d[14]=1,d[15]=1,d[16]=0,d[17]=0,d[18]=1,d[19]=0,d[20]=1,d[21]=1,d[22]=0,d[23]=1,d[24]=1,d[25]=0,d[26]=0,d[27]=0,d[28]=0,d[29]=1,d[30]=1,d[31]=1,d[32]=1,d[33]=0,d[34]=0,d[35]=0,d[36]=0,d[37]=1,d[38]=1,d[39]=1,d[40]=0,d[41]=0,d[42]=1,d[43]=0,d[44]=1,d[45]=1,d[46]=0,d[47]=1,x.st=new m.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:d})}if(f.tangent){var l=new Float32Array(72);l[0]=1,l[1]=0,l[2]=0,l[3]=1,l[4]=0,l[5]=0,l[6]=1,l[7]=0,l[8]=0,l[9]=1,l[10]=0,l[11]=0,l[12]=-1,l[13]=0,l[14]=0,l[15]=-1,l[16]=0,l[17]=0,l[18]=-1,l[19]=0,l[20]=0,l[21]=-1,l[22]=0,l[23]=0,l[24]=0,l[25]=1,l[26]=0,l[27]=0,l[28]=1,l[29]=0,l[30]=0,l[31]=1,l[32]=0,l[33]=0,l[34]=1,l[35]=0,l[36]=0,l[37]=-1,l[38]=0,l[39]=0,l[40]=-1,l[41]=0,l[42]=0,l[43]=-1,l[44]=0,l[45]=0,l[46]=-1,l[47]=0,l[48]=-1,l[49]=0,l[50]=0,l[51]=-1,l[52]=0,l[53]=0,l[54]=-1,l[55]=0,l[56]=0,l[57]=-1,l[58]=0,l[59]=0,l[60]=1,l[61]=0,l[62]=0,l[63]=1,l[64]=0,l[65]=0,l[66]=1,l[67]=0,l[68]=0,l[69]=1,l[70]=0,l[71]=0,x.tangent=new m.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:l})}if(f.bitangent){var A=new Float32Array(72);A[0]=0,A[1]=1,A[2]=0,A[3]=0,A[4]=1,A[5]=0,A[6]=0,A[7]=1,A[8]=0,A[9]=0,A[10]=1,A[11]=0,A[12]=0,A[13]=1,A[14]=0,A[15]=0,A[16]=1,A[17]=0,A[18]=0,A[19]=1,A[20]=0,A[21]=0,A[22]=1,A[23]=0,A[24]=0,A[25]=0,A[26]=1,A[27]=0,A[28]=0,A[29]=1,A[30]=0,A[31]=0,A[32]=1,A[33]=0,A[34]=0,A[35]=1,A[36]=0,A[37]=0,A[38]=1,A[39]=0,A[40]=0,A[41]=1,A[42]=0,A[43]=0,A[44]=1,A[45]=0,A[46]=0,A[47]=1,A[48]=0,A[49]=0,A[50]=1,A[51]=0,A[52]=0,A[53]=1,A[54]=0,A[55]=0,A[56]=1,A[57]=0,A[58]=0,A[59]=1,A[60]=0,A[61]=0,A[62]=1,A[63]=0,A[64]=0,A[65]=1,A[66]=0,A[67]=0,A[68]=1,A[69]=0,A[70]=0,A[71]=1,x.bitangent=new m.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:A})}(p=new Uint16Array(36))[0]=0,p[1]=1,p[2]=2,p[3]=0,p[4]=2,p[5]=3,p[6]=6,p[7]=5,p[8]=4,p[9]=7,p[10]=6,p[11]=4,p[12]=8,p[13]=9,p[14]=10,p[15]=8,p[16]=10,p[17]=11,p[18]=14,p[19]=13,p[20]=12,p[21]=15,p[22]=14,p[23]=12,p[24]=18,p[25]=17,p[26]=16,p[27]=19,p[28]=18,p[29]=16,p[30]=20,p[31]=21,p[32]=22,p[33]=20,p[34]=22,p[35]=23}else(c=new Float64Array(24))[0]=a.x,c[1]=a.y,c[2]=a.z,c[3]=s.x,c[4]=a.y,c[5]=a.z,c[6]=s.x,c[7]=s.y,c[8]=a.z,c[9]=a.x,c[10]=s.y,c[11]=a.z,c[12]=a.x,c[13]=a.y,c[14]=s.z,c[15]=s.x,c[16]=a.y,c[17]=s.z,c[18]=s.x,c[19]=s.y,c[20]=s.z,c[21]=a.x,c[22]=s.y,c[23]=s.z,x.position=new m.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:c}),(p=new Uint16Array(36))[0]=4,p[1]=5,p[2]=6,p[3]=4,p[4]=6,p[5]=7,p[6]=1,p[7]=0,p[8]=3,p[9]=1,p[10]=3,p[11]=2,p[12]=1,p[13]=6,p[14]=5,p[15]=1,p[16]=2,p[17]=6,p[18]=2,p[19]=3,p[20]=7,p[21]=2,p[22]=7,p[23]=6,p[24]=3,p[25]=0,p[26]=4,p[27]=3,p[28]=4,p[29]=7,p[30]=0,p[31]=1,p[32]=5,p[33]=0,p[34]=5,p[35]=4;var C=r.Cartesian3.subtract(s,a,y),v=.5*r.Cartesian3.magnitude(C);if(t.defined(e._offsetAttribute)){var h=c.length,z=new Uint8Array(h/3),w=e._offsetAttribute===n.GeometryOffsetAttribute.NONE?0:1;n.arrayFill(z,w),x.applyOffset=new m.GeometryAttribute({componentDatatype:o.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:z})}return new m.Geometry({attributes:x,indices:p,primitiveType:m.PrimitiveType.TRIANGLES,boundingSphere:new i.BoundingSphere(r.Cartesian3.ZERO,v),offsetAttribute:e._offsetAttribute})}},f.getUnitBox=function(){return t.defined(p)||(p=f.createGeometry(f.fromDimensions({dimensions:new r.Cartesian3(1,1,1),vertexFormat:s.VertexFormat.POSITION_ONLY}))),p},e.BoxGeometry=f}));
//# sourceMappingURL=BoxGeometry-0679dbd7.js.map
