define(["exports","./when-7ef6387a","./Check-71521db1","./Cartesian3-ca5d3f12"],(function(e,n,i,a){"use strict";function r(){this.high=a.Cartesian3.clone(a.Cartesian3.ZERO),this.low=a.Cartesian3.clone(a.Cartesian3.ZERO)}r.encode=function(e,a){var r;return i.Check.typeOf.number("value",e),n.defined(a)||(a={high:0,low:0}),e>=0?(r=65536*Math.floor(e/65536),a.high=r,a.low=e-r):(r=65536*Math.floor(-e/65536),a.high=-r,a.low=e+r),a};var h={high:0,low:0};r.fromCartesian=function(e,a){i.Check.typeOf.object("cartesian",e),n.defined(a)||(a=new r);var t=a.high,o=a.low;return r.encode(e.x,h),t.x=h.high,o.x=h.low,r.encode(e.y,h),t.y=h.high,o.y=h.low,r.encode(e.z,h),t.z=h.high,o.z=h.low,a};var t=new r;r.writeElements=function(e,n,a){i.Check.defined("cartesianArray",n),i.Check.typeOf.number("index",a),i.Check.typeOf.number.greaterThanOrEquals("index",a,0),r.fromCartesian(e,t);var h=t.high,o=t.low;n[a]=h.x,n[a+1]=h.y,n[a+2]=h.z,n[a+3]=o.x,n[a+4]=o.y,n[a+5]=o.z},e.EncodedCartesian3=r}));
//# sourceMappingURL=EncodedCartesian3-2bb7c2ad.js.map
