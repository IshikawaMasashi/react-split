!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("react")):"function"==typeof define&&define.amd?define(["react"],e):"object"==typeof exports?exports.ReactContexify=e(require("react")):t.ReactContexify=e(t.react)}(window,function(t){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=7)}([function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(5),i=r(6),o=function(){function t(){var t=a(arguments);this._terms=t.terms,this._constant=t.constant}return t.prototype.terms=function(){return this._terms},t.prototype.constant=function(){return this._constant},t.prototype.value=function(){for(var t=this._constant,e=0,r=this._terms.size();e<r;e++){var n=this._terms.itemAt(e);t+=n.first.value()*n.second}return t},t.prototype.plus=function(e){return new t(this,e)},t.prototype.minus=function(e){return new t(this,"number"==typeof e?-e:[-1,e])},t.prototype.multiply=function(e){return new t([e,this])},t.prototype.divide=function(e){return new t([1/e,this])},t.prototype.isConstant=function(){return 0==this._terms.size()},t.prototype.toString=function(){var t=this._terms.array.map(function(t){return t.second+"*"+t.first.toString()}).join(" + ");return this.isConstant()||0===this._constant||(t+=" + "),t+=this._constant},t}();function a(t){for(var e=0,r=function(){return 0},a=n.createMap(),s=0,u=t.length;s<u;++s){var c=t[s];if("number"==typeof c)e+=c;else if(c instanceof i.Variable)a.setDefault(c,r).second+=1;else if(c instanceof o){e+=c.constant();for(var f=0,l=(v=c.terms()).size();f<l;f++){var p=v.itemAt(f);a.setDefault(p.first,r).second+=p.second}}else{if(!(c instanceof Array))throw new Error("invalid Expression argument: "+c);if(2!==c.length)throw new Error("array must have length 2");var h=c[0],d=c[1];if("number"!=typeof h)throw new Error("array item 0 must be a number");if(d instanceof i.Variable)a.setDefault(d,r).second+=h;else{if(!(d instanceof o))throw new Error("array item 1 must be a variable or expression");e+=d.constant()*h;var v;for(f=0,l=(v=d.terms()).size();f<l;f++){p=v.itemAt(f);a.setDefault(p.first,r).second+=p.second*h}}}}return{terms:a,constant:e}}e.Expression=o},function(t,e,r){"use strict";var n=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e},i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o,a=n(r(2)),s=i(r(8)),u=i(r(9)),c=i(r(10)),f=r(11),l=r(13),p=r(14),h=a.useState,d=a.useEffect,v=a.useRef;!function(t){t[t.Horizontal=0]="Horizontal",t[t.Vertical=1]="Vertical"}(o=e.SplitOrientation||(e.SplitOrientation={})),e.Split=function(t){var e,r=v(null),n=v(-1),i=v(),y=v(),_=v([]),m=(e=h()[1],function(){return e({})});d(function(){document.addEventListener("mousemove",w),document.addEventListener("mouseup",b);var e=S(t);return E(e,M(t.orientation)),g(e),_.current=e,t.onChange&&t.onChange(e),function(){document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",b)}},[]),d(function(){b();var e=S(t);E(e,M(t.orientation)),g(e),_.current=e,m(),u.default()},[t]);var b=function(){if(!(n.current<0)){n.current=-1,window.document.documentElement.style.pointerEvents="auto";var e=_.current.slice();return g(e),t.onChange&&t.onChange(e)}},w=function(e){if(!(n.current<0)){var a=y.current,s=t.orientation===o.Vertical,u=r.current.getBoundingClientRect(),c=s?e.clientX-u.left:e.clientY-u.top,f=n.current,l=i.current;l.suggestValue(a[f+1],c),l.updateVariables();var p=_.current.slice();g(p),m(),e.preventDefault()}},g=function(t){for(var e=y.current,r=0;r<t.length;r++)t[r].value=e[r+1].value()-e[r].value()},M=function(t){var e=r.current;return t===o.Horizontal?e.clientHeight:e.clientWidth},S=function(t){for(var e=a.Children.count(t.children),r=M(t.orientation),n=[],i=0;i<e;i++){var o={};t.splits&&i<t.splits.length&&(o=Object.assign(o,t.splits[i])),t.defaultSplit&&(o=Object.assign(t.defaultSplit,o)),n.push(Object.assign({min:32,max:r},o))}return n},E=function(t,e){s.default(n.current<0,"Should not be in a dragging state."),y.current=[new f.Variable];var r=y.current;i.current=new f.Solver;for(var o=i.current,a=0;a<t.length;a++)r.push(new f.Variable);o.addEditVariable(r[0],f.Strength.strong),o.suggestValue(r[0],0);var u=new f.Constraint(r[0],f.Operator.Eq,0);o.addConstraint(u),o.addEditVariable(r[r.length-1],f.Strength.strong),o.suggestValue(r[r.length-1],e),u=new f.Constraint(r[r.length-1],f.Operator.Eq,e),o.addConstraint(u);for(a=0;a<r.length-1;a++){var c=t[a],l=c.min,p=c.max,h=r[a],d=r[a+1];o.addConstraint(new f.Constraint(d.minus(h),f.Operator.Ge,l,f.Strength.strong)),o.addConstraint(new f.Constraint(d.minus(h),f.Operator.Le,p,f.Strength.strong))}for(a=1;a<r.length-1;a++)o.addEditVariable(r[a],f.Strength.weak),o.suggestValue(r[a],1e4);x(t)},x=function(t){for(var e=y.current,r=i.current,n=0;n<e.length-1;n++){var o=e[n],a=e[n+1];t[n].value&&(n<e.length-2?r.suggestValue(a,o.value()+t[n].value):r.suggestValue(o,a.value()-t[n].value),r.updateVariables())}},O=t.orientation===o.Horizontal,j=a.Children.count(t.children),k=[];return a.Children.forEach(t.children,function(e,r){var o={};r<j-1&&r<_.current.length?o.flexBasis=c.default(Math.round(_.current[r].value)):o.flex=1,k.push(a.createElement(l.SplitPane,{key:r,style:o,child:e})),r<j-1&&k.push(a.createElement(p.Resizer,{key:"Resizer-"+r,orientation:t.orientation,onMouseDown:function(t){return function(t){n.current=t;var e=n.current,r=y.current,o=i.current,a=r[e+1];o.removeEditVariable(a),o.addEditVariable(a,f.Strength.medium),window.document.documentElement.style.pointerEvents="none"}(r)}}))}),a.createElement("div",{className:"split",ref:r,style:{flexDirection:O?"column":"row"}},k)}},function(e,r){e.exports=t},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(){}return t.create=function(t,e,r,n){void 0===n&&(n=1);var i=0;return i+=1e6*Math.max(0,Math.min(1e3,t*n)),i+=1e3*Math.max(0,Math.min(1e3,e*n)),i+=Math.max(0,Math.min(1e3,r*n))},t.clip=function(e){return Math.max(0,Math.min(t.required,e))},t.required=t.create(1e3,1e3,1e3),t.strong=t.create(1,0,0),t.medium=t.create(0,1,0),t.weak=t.create(0,0,1),t}();e.Strength=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(0),i=r(3);!function(t){t[t.Le=0]="Le",t[t.Ge=1]="Ge",t[t.Eq=2]="Eq"}(e.Operator||(e.Operator={}));var o=function(){function t(t,e,r,o){void 0===o&&(o=i.Strength.required),this._id=a++,this._operator=e,this._strength=i.Strength.clip(o),void 0===r&&t instanceof n.Expression?this._expression=t:this._expression=t.minus(r)}return t.prototype.id=function(){return this._id},t.prototype.expression=function(){return this._expression},t.prototype.op=function(){return this._operator},t.prototype.strength=function(){return this._strength},t.prototype.toString=function(){return this._expression.toString()+" "+["<=",">=","="][this._operator]+" 0 ("+this._strength.toString()+")"},t}();e.Constraint=o;var a=0},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.createMap=function(){return new n};var n=function(){function t(){this.index={},this.array=[]}return t.prototype.size=function(){return this.array.length},t.prototype.empty=function(){return 0===this.array.length},t.prototype.itemAt=function(t){return this.array[t]},t.prototype.contains=function(t){return void 0!==this.index[t.id()]},t.prototype.find=function(t){var e=this.index[t.id()];return void 0===e?void 0:this.array[e]},t.prototype.setDefault=function(t,e){var r=this.index[t.id()];if(void 0===r){var n=new i(t,e());return this.index[t.id()]=this.array.length,this.array.push(n),n}return this.array[r]},t.prototype.insert=function(t,e){var r=new i(t,e),n=this.index[t.id()];return void 0===n?(this.index[t.id()]=this.array.length,this.array.push(r)):this.array[n]=r,r},t.prototype.erase=function(t){var e=this.index[t.id()];if(void 0!==e){this.index[t.id()]=void 0;var r=this.array[e],n=this.array.pop();return r!==n&&(this.array[e]=n,this.index[n.first.id()]=e),r}},t.prototype.copy=function(){for(var e=new t,r=0;r<this.array.length;r++){var n=this.array[r].copy();e.array[r]=n,e.index[n.first.id()]=r}return e},t}(),i=function(){function t(t,e){this.first=t,this.second=e}return t.prototype.copy=function(){return new t(this.first,this.second)},t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(0),i=function(){function t(t){void 0===t&&(t=""),this._value=0,this._context=null,this._id=o++,this._name=t}return t.prototype.id=function(){return this._id},t.prototype.name=function(){return this._name},t.prototype.setName=function(t){this._name=t},t.prototype.context=function(){return this._context},t.prototype.setContext=function(t){this._context=t},t.prototype.value=function(){return this._value},t.prototype.setValue=function(t){this._value=t},t.prototype.plus=function(t){return new n.Expression(this,t)},t.prototype.minus=function(t){return new n.Expression(this,"number"==typeof t?-t:[-1,t])},t.prototype.multiply=function(t){return new n.Expression([t,this])},t.prototype.divide=function(t){return new n.Expression([1/t,this])},t.prototype.toJSON=function(){return{name:this._name,value:this._value}},t.prototype.toString=function(){return this._context+"["+this._name+":"+this._value+"]"},t}();e.Variable=i;var o=0},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(1);e.Split=n.Split;var i=r(1);e.SplitOrientation=i.SplitOrientation},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){if(!t)throw new Error(e)}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=10,i=0;e.default=function(){i&&window.clearTimeout(i),window.setTimeout(function(){i=0,document.dispatchEvent(new Event("layout"))},n)}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){return(0|t)+"px"}},function(t,e,r){"use strict";function n(t){for(var r in t)e.hasOwnProperty(r)||(e[r]=t[r])}Object.defineProperty(e,"__esModule",{value:!0}),n(r(4)),n(r(0)),n(r(12)),n(r(3)),n(r(6))},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,i=r(4),o=r(0),a=r(5),s=r(3),u=function(){function t(){this._cnMap=a.createMap(),this._rowMap=a.createMap(),this._varMap=a.createMap(),this._editMap=a.createMap(),this._infeasibleRows=[],this._objective=new p,this._artificial=null,this._idTick=0}return t.prototype.createConstraint=function(t,e,r,n){void 0===n&&(n=s.Strength.required);var o=new i.Constraint(t,e,r,n);return this.addConstraint(o),o},t.prototype.addConstraint=function(t){if(void 0!==this._cnMap.find(t))throw new Error("duplicate constraint");var e=this._createRow(t),r=e.row,i=e.tag,o=this._chooseSubject(r,i);if(o.type()===n.Invalid&&r.allDummies()){if(!c(r.constant()))throw new Error("unsatisfiable constraint");o=i.marker}if(o.type()===n.Invalid){if(!this._addWithArtificialVariable(r))throw new Error("unsatisfiable constraint")}else r.solveFor(o),this._substitute(o,r),this._rowMap.insert(o,r);this._cnMap.insert(t,i),this._optimize(this._objective)},t.prototype.removeConstraint=function(t){var e=this._cnMap.erase(t);if(void 0===e)throw new Error("unknown constraint");this._removeConstraintEffects(t,e.second);var r=e.second.marker,i=this._rowMap.erase(r);if(void 0===i){var o=this._getMarkerLeavingSymbol(r);if(o.type()===n.Invalid)throw new Error("failed to find leaving row");(i=this._rowMap.erase(o)).second.solveForEx(o,r),this._substitute(r,i.second)}this._optimize(this._objective)},t.prototype.hasConstraint=function(t){return this._cnMap.contains(t)},t.prototype.addEditVariable=function(t,e){if(void 0!==this._editMap.find(t))throw new Error("duplicate edit variable");if((e=s.Strength.clip(e))===s.Strength.required)throw new Error("bad required strength");var r=new o.Expression(t),n=new i.Constraint(r,i.Operator.Eq,void 0,e);this.addConstraint(n);var a={tag:this._cnMap.find(n).second,constraint:n,constant:0};this._editMap.insert(t,a)},t.prototype.removeEditVariable=function(t){var e=this._editMap.erase(t);if(void 0===e)throw new Error("unknown edit variable");this.removeConstraint(e.second.constraint)},t.prototype.hasEditVariable=function(t){return this._editMap.contains(t)},t.prototype.suggestValue=function(t,e){var r=this._editMap.find(t);if(void 0===r)throw new Error("unknown edit variable");var i=this._rowMap,o=r.second,a=e-o.constant;o.constant=e;var s=o.tag.marker,u=i.find(s);if(void 0!==u)return u.second.add(-a)<0&&this._infeasibleRows.push(s),void this._dualOptimize();var c=o.tag.other;if(void 0!==(u=i.find(c)))return u.second.add(a)<0&&this._infeasibleRows.push(c),void this._dualOptimize();for(var f=0,l=i.size();f<l;++f){var p=i.itemAt(f),h=p.second,d=h.coefficientFor(s);0!==d&&h.add(a*d)<0&&p.first.type()!==n.External&&this._infeasibleRows.push(p.first)}this._dualOptimize()},t.prototype.updateVariables=function(){for(var t=this._varMap,e=this._rowMap,r=0,n=t.size();r<n;++r){var i=t.itemAt(r),o=e.find(i.second);void 0!==o?i.first.setValue(o.second.constant()):i.first.setValue(0)}},t.prototype._getVarSymbol=function(t){var e=this;return this._varMap.setDefault(t,function(){return e._makeSymbol(n.External)}).second},t.prototype._createRow=function(t){for(var e=t.expression(),r=new p(e.constant()),o=e.terms(),a=0,u=o.size();a<u;++a){var f=o.itemAt(a);if(!c(f.second)){var h=this._getVarSymbol(f.first),d=this._rowMap.find(h);void 0!==d?r.insertRow(d.second,f.second):r.insertSymbol(h,f.second)}}var v=this._objective,y=t.strength(),_={marker:l,other:l};switch(t.op()){case i.Operator.Le:case i.Operator.Ge:var m=t.op()===i.Operator.Le?1:-1,b=this._makeSymbol(n.Slack);if(_.marker=b,r.insertSymbol(b,m),y<s.Strength.required){var w=this._makeSymbol(n.Error);_.other=w,r.insertSymbol(w,-m),v.insertSymbol(w,y)}break;case i.Operator.Eq:if(y<s.Strength.required){var g=this._makeSymbol(n.Error),M=this._makeSymbol(n.Error);_.marker=g,_.other=M,r.insertSymbol(g,-1),r.insertSymbol(M,1),v.insertSymbol(g,y),v.insertSymbol(M,y)}else{var S=this._makeSymbol(n.Dummy);_.marker=S,r.insertSymbol(S)}}return r.constant()<0&&r.reverseSign(),{row:r,tag:_}},t.prototype._chooseSubject=function(t,e){for(var r=t.cells(),i=0,o=r.size();i<o;++i){var a=r.itemAt(i);if(a.first.type()===n.External)return a.first}var s=e.marker.type();return(s===n.Slack||s===n.Error)&&t.coefficientFor(e.marker)<0?e.marker:((s=e.other.type())===n.Slack||s===n.Error)&&t.coefficientFor(e.other)<0?e.other:l},t.prototype._addWithArtificialVariable=function(t){var e=this._makeSymbol(n.Slack);this._rowMap.insert(e,t.copy()),this._artificial=t.copy(),this._optimize(this._artificial);var r=c(this._artificial.constant());this._artificial=null;var i=this._rowMap.erase(e);if(void 0!==i){var o=i.second;if(o.isConstant())return r;var a=this._anyPivotableSymbol(o);if(a.type()===n.Invalid)return!1;o.solveForEx(e,a),this._substitute(a,o),this._rowMap.insert(a,o)}for(var s=this._rowMap,u=0,f=s.size();u<f;++u)s.itemAt(u).second.removeSymbol(e);return this._objective.removeSymbol(e),r},t.prototype._substitute=function(t,e){for(var r=this._rowMap,i=0,o=r.size();i<o;++i){var a=r.itemAt(i);a.second.substitute(t,e),a.second.constant()<0&&a.first.type()!==n.External&&this._infeasibleRows.push(a.first)}this._objective.substitute(t,e),this._artificial&&this._artificial.substitute(t,e)},t.prototype._optimize=function(t){for(;;){var e=this._getEnteringSymbol(t);if(e.type()===n.Invalid)return;var r=this._getLeavingSymbol(e);if(r.type()===n.Invalid)throw new Error("the objective is unbounded");var i=this._rowMap.erase(r).second;i.solveForEx(r,e),this._substitute(e,i),this._rowMap.insert(e,i)}},t.prototype._dualOptimize=function(){for(var t=this._rowMap,e=this._infeasibleRows;0!==e.length;){var r=e.pop(),i=t.find(r);if(void 0!==i&&i.second.constant()<0){var o=this._getDualEnteringSymbol(i.second);if(o.type()===n.Invalid)throw new Error("dual optimize failed");var a=i.second;t.erase(r),a.solveForEx(r,o),this._substitute(o,a),t.insert(o,a)}}},t.prototype._getEnteringSymbol=function(t){for(var e=t.cells(),r=0,i=e.size();r<i;++r){var o=e.itemAt(r),a=o.first;if(o.second<0&&a.type()!==n.Dummy)return a}return l},t.prototype._getDualEnteringSymbol=function(t){for(var e=Number.MAX_VALUE,r=l,i=t.cells(),o=0,a=i.size();o<a;++o){var s=i.itemAt(o),u=s.first,c=s.second;if(c>0&&u.type()!==n.Dummy){var f=this._objective.coefficientFor(u)/c;f<e&&(e=f,r=u)}}return r},t.prototype._getLeavingSymbol=function(t){for(var e=Number.MAX_VALUE,r=l,i=this._rowMap,o=0,a=i.size();o<a;++o){var s=i.itemAt(o),u=s.first;if(u.type()!==n.External){var c=s.second,f=c.coefficientFor(t);if(f<0){var p=-c.constant()/f;p<e&&(e=p,r=u)}}}return r},t.prototype._getMarkerLeavingSymbol=function(t){for(var e=Number.MAX_VALUE,r=e,i=e,o=l,a=o,s=o,u=o,c=this._rowMap,f=0,p=c.size();f<p;++f){var h=c.itemAt(f),d=h.second,v=d.coefficientFor(t);if(0!==v){var y=h.first;if(y.type()===n.External)u=y;else if(v<0){(_=-d.constant()/v)<r&&(r=_,a=y)}else{var _;(_=d.constant()/v)<i&&(i=_,s=y)}}}return a!==o?a:s!==o?s:u},t.prototype._removeConstraintEffects=function(t,e){e.marker.type()===n.Error&&this._removeMarkerEffects(e.marker,t.strength()),e.other.type()===n.Error&&this._removeMarkerEffects(e.other,t.strength())},t.prototype._removeMarkerEffects=function(t,e){var r=this._rowMap.find(t);void 0!==r?this._objective.insertRow(r.second,-e):this._objective.insertSymbol(t,-e)},t.prototype._anyPivotableSymbol=function(t){for(var e=t.cells(),r=0,i=e.size();r<i;++r){var o=e.itemAt(r),a=o.first.type();if(a===n.Slack||a===n.Error)return o.first}return l},t.prototype._makeSymbol=function(t){return new f(t,this._idTick++)},t}();function c(t){return t<0?-t<1e-8:t<1e-8}e.Solver=u,function(t){t[t.Invalid=0]="Invalid",t[t.External=1]="External",t[t.Slack=2]="Slack",t[t.Error=3]="Error",t[t.Dummy=4]="Dummy"}(n||(n={}));var f=function(){function t(t,e){this._id=e,this._type=t}return t.prototype.id=function(){return this._id},t.prototype.type=function(){return this._type},t}(),l=new f(n.Invalid,-1),p=function(){function t(t){void 0===t&&(t=0),this._cellMap=a.createMap(),this._constant=t}return t.prototype.cells=function(){return this._cellMap},t.prototype.constant=function(){return this._constant},t.prototype.isConstant=function(){return this._cellMap.empty()},t.prototype.allDummies=function(){for(var t=this._cellMap,e=0,r=t.size();e<r;++e){if(t.itemAt(e).first.type()!==n.Dummy)return!1}return!0},t.prototype.copy=function(){var e=new t(this._constant);return e._cellMap=this._cellMap.copy(),e},t.prototype.add=function(t){return this._constant+=t},t.prototype.insertSymbol=function(t,e){void 0===e&&(e=1),c(this._cellMap.setDefault(t,function(){return 0}).second+=e)&&this._cellMap.erase(t)},t.prototype.insertRow=function(t,e){void 0===e&&(e=1),this._constant+=t._constant*e;for(var r=t._cellMap,n=0,i=r.size();n<i;++n){var o=r.itemAt(n);this.insertSymbol(o.first,o.second*e)}},t.prototype.removeSymbol=function(t){this._cellMap.erase(t)},t.prototype.reverseSign=function(){this._constant=-this._constant;for(var t=this._cellMap,e=0,r=t.size();e<r;++e){var n=t.itemAt(e);n.second=-n.second}},t.prototype.solveFor=function(t){var e=this._cellMap,r=-1/e.erase(t).second;this._constant*=r;for(var n=0,i=e.size();n<i;++n)e.itemAt(n).second*=r},t.prototype.solveForEx=function(t,e){this.insertSymbol(t,-1),this.solveFor(e)},t.prototype.coefficientFor=function(t){var e=this._cellMap.find(t);return void 0!==e?e.second:0},t.prototype.substitute=function(t,e){var r=this._cellMap.erase(t);void 0!==r&&this.insertRow(e,r.second)},t}()},function(t,e,r){"use strict";var n=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var i=n(r(2));e.SplitPane=function(t){var e=t.style,r=t.child;return i.createElement("div",{className:"split-pane",style:e},r)}},function(t,e,r){"use strict";var n=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var i=n(r(2)),o=r(1),a=i.useEffect;e.Resizer=function(t){var e=t.orientation,r=t.onMouseDown;a(function(){return function(){}},[]);var n="resizer";return n+=e===o.SplitOrientation.Horizontal?" horizontal":" vertical",i.createElement("div",{className:n,onMouseDown:r})}}])});
//# sourceMappingURL=ReactContexify.js.map