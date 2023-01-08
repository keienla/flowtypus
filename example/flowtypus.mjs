var Jt = Object.defineProperty;
var Qt = (e, n, t) => n in e ? Jt(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var _ = (e, n, t) => (Qt(e, typeof n != "symbol" ? n + "" : n, t), t);
var p = {}, de = {}, d = {};
Object.defineProperty(d, "__esModule", { value: !0 });
function nt(e, n, t = []) {
  const r = n || 0;
  return function(...i) {
    const o = [...t, ...i];
    return e.length - o.length <= 0 && o.length >= r ? e(...o) : nt(e, n, o);
  };
}
d.default = nt;
Object.defineProperty(de, "__esModule", { value: !0 });
const Yt = d;
de.default = (0, Yt.default)(function(n, t) {
  return n + t;
});
var le = {}, _e = {}, Z = {}, T = {};
Object.defineProperty(T, "__esModule", { value: !0 });
function Zt(e) {
  return function(...t) {
    for (var r = e(...t); r instanceof Function; )
      r = r();
    return r;
  };
}
T.default = Zt;
Object.defineProperty(Z, "__esModule", { value: !0 });
const Vt = T, xt = d;
Z.default = (0, xt.default)(function(n, t, r, u, i) {
  const o = (c, a, f, h, b = null) => !a || !a.length || f === b ? f : () => o(c, a.slice(1), c(f, a[0](h)), h, b);
  return (0, Vt.default)(o)(n, t, r, u, i);
});
Object.defineProperty(_e, "__esModule", { value: !0 });
const en = d, tn = Z;
_e.default = (0, en.default)(function(n, t, r) {
  return (0, tn.default)((u, i) => u && i, [n, t], !0, r, !1);
});
Object.defineProperty(le, "__esModule", { value: !0 });
const nn = _e;
function rn(...e) {
  return (0, nn.default)(...e);
}
le.default = rn;
var B = {}, K = {}, U = {}, k = {}, V = {}, M = {}, v = {}, q = {};
Object.defineProperty(q, "__esModule", { value: !0 });
function un(e) {
  return Object.freeze(e);
}
q.default = un;
Object.defineProperty(v, "__esModule", { value: !0 });
v._generatorReduce = v._objectReduce = v._arrayReduce = void 0;
const rt = q, ye = T, he = d;
v._arrayReduce = (0, he.default)(function(n, t, r) {
  if (!r || r.length === 0)
    return t;
  function u(i, o, c) {
    return o >= c.length ? i : () => u(n(i, c[o], o, (0, rt.default)(c)), o + 1, c);
  }
  return (0, ye.default)(u)(t !== void 0 ? t : r[0], t !== void 0 ? 0 : 1, r);
});
v._objectReduce = (0, he.default)(function(n, t, r) {
  const u = Object.keys(r);
  if (!r || u.length === 0)
    return t;
  function i(o, c, a, f) {
    return c >= a.length ? o : () => i(n(o, f[a[c]], a[c], (0, rt.default)(f)), c + 1, a, f);
  }
  return (0, ye.default)(i)(t !== void 0 ? t : r[u[0]], t !== void 0 ? 0 : 1, u, r);
});
v._generatorReduce = (0, he.default)(function(n, t, r) {
  if (!r)
    return t;
  if (t === void 0) {
    const i = r.next();
    if (i.done)
      return t;
    t = i.value;
  }
  function u(i, o) {
    const c = o.next();
    return c.done ? i : () => u(n(i, c.value), o);
  }
  return (0, ye.default)(u)(t, r);
});
Object.defineProperty(M, "__esModule", { value: !0 });
const on = v;
function cn(...e) {
  return (0, on._arrayReduce)(...e);
}
M.default = cn;
Object.defineProperty(V, "__esModule", { value: !0 });
const an = M;
function sn(e) {
  return function(...t) {
    return (0, an.default)((r, u, i) => i === t.length - 1 ? r[0](...r[1], u) : r[0].length === [...r[1], u].length ? [r[0](...r[1], u), []] : [r[0], [...r[1], u]], [e, []], t);
  };
}
V.default = sn;
Object.defineProperty(k, "__esModule", { value: !0 });
const fn = V;
function dn(e) {
  return function(...t) {
    return !(0, fn.default)(e)(...t);
  };
}
k.default = dn;
var x = {}, C = {}, L = {};
Object.defineProperty(L, "__esModule", { value: !0 });
function ln(e) {
  return e === null ? "null" : e === void 0 ? "undefined" : Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
}
L.default = ln;
Object.defineProperty(C, "__esModule", { value: !0 });
const _n = L;
function yn(e) {
  switch ((0, _n.default)(e)) {
    case "array":
    case "function":
    case "string":
      return e.length;
    case "object":
      return Object.keys(e).length;
    case "regexp":
      return e.toString().length;
    default:
      return null;
  }
}
C.default = yn;
Object.defineProperty(x, "__esModule", { value: !0 });
const Be = C, hn = d;
x.default = (0, hn.default)(function(n, t) {
  const r = (0, Be.default)(n), u = (0, Be.default)(t);
  return r === null || u === null ? !1 : r === u;
});
Object.defineProperty(U, "__esModule", { value: !0 });
const gn = k, bn = x;
U.default = (0, gn.default)(bn.default);
var G = {}, D = {}, H = {}, W = {}, X = {}, Ke;
function vn() {
  if (Ke)
    return X;
  Ke = 1, Object.defineProperty(X, "__esModule", { value: !0 });
  const e = k, n = ee(), t = d, r = V;
  return X.default = (0, t.default)(function(i, o) {
    return (0, e.default)((0, r.default)(n.default))(i, o);
  }), X;
}
var Ge;
function ut() {
  if (Ge)
    return W;
  Ge = 1, Object.defineProperty(W, "__esModule", { value: !0 });
  const e = vn();
  function n(...t) {
    return (0, e.default)(...t);
  }
  return W.default = n, W;
}
var De;
function it() {
  if (De)
    return H;
  De = 1, Object.defineProperty(H, "__esModule", { value: !0 });
  const e = d, n = U, t = ut(), r = (0, e.default)(function(i, o) {
    if ((0, n.default)(i, o))
      return !1;
    if (i === o)
      return !0;
    const c = Object.keys(i);
    for (let a of c)
      if (!(a in o) || (0, t.default)(i[a], o[a]))
        return !1;
    return !0;
  });
  return H.default = r, H;
}
var He;
function pn() {
  if (He)
    return D;
  He = 1, Object.defineProperty(D, "__esModule", { value: !0 });
  const e = d, n = L, t = ot(), r = it();
  return D.default = (0, e.default)(function(i, o) {
    if ((0, n.default)(i) !== (0, n.default)(o))
      return !1;
    switch ((0, n.default)(i)) {
      case "array":
        return (0, t.default)(i, o);
      case "object":
        return (0, r.default)(i, o);
      case "function":
      case "regexp":
        return i.toString() === o.toString();
      default:
        return i === o;
    }
  }), D;
}
var We;
function ee() {
  if (We)
    return G;
  We = 1, Object.defineProperty(G, "__esModule", { value: !0 });
  const e = pn();
  function n(...t) {
    return (0, e.default)(...t);
  }
  return G.default = n, G;
}
var Xe;
function On() {
  if (Xe)
    return K;
  Xe = 1, Object.defineProperty(K, "__esModule", { value: !0 });
  const e = d, n = U, t = ee(), r = T;
  return K.default = (0, e.default)(function(i, o) {
    if ((0, n.default)(i, o))
      return !1;
    if (i === o)
      return !0;
    const c = (a = !0, f = 0) => a ? f === i.length ? a : () => c((0, t.default)(i[f], o[f]), f + 1) : !1;
    return (0, r.default)(c)();
  }), K;
}
var Je;
function ot() {
  if (Je)
    return B;
  Je = 1, Object.defineProperty(B, "__esModule", { value: !0 });
  const e = On();
  function n(...t) {
    return (0, e.default)(...t);
  }
  return B.default = n, B;
}
var ge = {}, te = {}, ne = {};
Object.defineProperty(ne, "__esModule", { value: !0 });
function jn(e) {
  return function(t) {
    return t && t.length ? e(...t) : e();
  };
}
ne.default = jn;
Object.defineProperty(te, "__esModule", { value: !0 });
const wn = ne, mn = M;
function An(...e) {
  return function(...t) {
    return e[0] = (0, wn.default)(e[0]), (0, mn.default)(function(u, i) {
      return i(u);
    }, t, e || []);
  };
}
te.default = An;
Object.defineProperty(ge, "__esModule", { value: !0 });
const Pn = te;
function $n(...e) {
  return (0, Pn.default)(...e.reverse());
}
ge.default = $n;
var be = {};
Object.defineProperty(be, "__esModule", { value: !0 });
function Mn(e) {
  return function() {
    return e;
  };
}
be.default = Mn;
var ve = {}, re = {}, A = {};
Object.defineProperty(A, "__esModule", { value: !0 });
A._whenElse = A._when = void 0;
const ct = d;
A._when = (0, ct.default)(function(n, t) {
  return at(n, t);
});
A._whenElse = (0, ct.default)(function(n, t, r) {
  return at(n, t, r);
});
function at(e, n, t) {
  return function(u) {
    return e(u) ? n(u) : t ? t(u) : u;
  };
}
Object.defineProperty(re, "__esModule", { value: !0 });
const Rn = A;
function En(...e) {
  return (0, Rn._when)(...e);
}
re.default = En;
var ue = {}, pe = {};
Object.defineProperty(pe, "__esModule", { value: !0 });
const Sn = d, In = Z;
pe.default = (0, Sn.default)(function(n, t, r) {
  return (0, In.default)((u, i) => u || i, [n, t], !1, r, !0);
});
Object.defineProperty(ue, "__esModule", { value: !0 });
const Tn = pe;
function Ln(...e) {
  return (0, Tn.default)(...e);
}
ue.default = Ln;
var s = {};
Object.defineProperty(s, "__esModule", { value: !0 });
s.isNull = s.isUndefined = s.isRegexp = s.isFunction = s.isBigint = s.isSymbol = s.isBoolean = s.isNumber = s.isString = s.isObject = s.isGeneratorFunction = s.isGenerator = s.isArray = void 0;
const Fn = L, Nn = d, y = (0, Nn.default)(function(n, t) {
  return (0, Fn.default)(t) === n;
});
s.default = y;
function Un(e) {
  return y("array", e);
}
s.isArray = Un;
function kn(e) {
  return y("generator", e);
}
s.isGenerator = kn;
function qn(e) {
  return y("generatorfunction", e);
}
s.isGeneratorFunction = qn;
function Cn(e) {
  return y("object", e);
}
s.isObject = Cn;
function zn(e) {
  return y("string", e);
}
s.isString = zn;
function Bn(e) {
  return y("number", e);
}
s.isNumber = Bn;
function Kn(e) {
  return y("boolean", e);
}
s.isBoolean = Kn;
function Gn(e) {
  return y("symbol", e);
}
s.isSymbol = Gn;
function Dn(e) {
  return y("bigint", e);
}
s.isBigint = Dn;
function Hn(e) {
  return y("function", e);
}
s.isFunction = Hn;
function Wn(e) {
  return y("regexp", e);
}
s.isRegexp = Wn;
function Xn(e) {
  return y("undefined", e);
}
s.isUndefined = Xn;
function Jn(e) {
  return y("null", e);
}
s.isNull = Jn;
var ie = {}, P = {}, z = {};
Object.defineProperty(z, "__esModule", { value: !0 });
const Qn = v;
function Yn(...e) {
  return (0, Qn._objectReduce)(...e);
}
z.default = Yn;
Object.defineProperty(P, "__esModule", { value: !0 });
P._objectMap = P._arrayMap = void 0;
const st = M, Zn = z, ft = d;
P._arrayMap = (0, ft.default)(function(n, t) {
  return !t || t.length === 0 ? [] : (0, st.default)(function(u, i, o, c) {
    return [...u, n(i, o, c)];
  }, [], t);
});
P._objectMap = (0, ft.default)(function(n, t) {
  if (!t)
    return {};
  const r = Object.keys(t);
  return r.length === 0 ? {} : (0, Zn.default)(function(i, o, c, a) {
    return Object.assign(Object.assign({}, i), { [c]: n(o, c, a) });
  }, (0, st.default)(function(i, o) {
    return Object.assign(Object.assign({}, i), { [o]: void 0 });
  }, {}, r), t);
});
Object.defineProperty(ie, "__esModule", { value: !0 });
const Vn = P;
function xn(...e) {
  return (0, Vn._objectMap)(...e);
}
ie.default = xn;
Object.defineProperty(ve, "__esModule", { value: !0 });
const Qe = q, er = re, tr = ue, Ye = s, nr = ie;
function rr(e) {
  return (0, Qe.default)((0, nr.default)((0, er.default)((0, tr.default)(Ye.isArray, Ye.isObject), Qe.default), e));
}
ve.default = rr;
var Oe = {};
Object.defineProperty(Oe, "__esModule", { value: !0 });
const ur = d;
Oe.default = (0, ur.default)(function(n, t) {
  if (t === 0)
    throw new Error(`Can't divide by "0"`);
  return n / t;
});
var je = {}, $ = {};
Object.defineProperty($, "__esModule", { value: !0 });
$._objectFilter = $._arrayFilter = void 0;
const ir = M, or = z, dt = d;
$._arrayFilter = (0, dt.default)(function(n, t) {
  return (0, ir.default)(function(u, i, o, c) {
    return n(i, o, c) ? [...u, i] : u;
  }, [], t);
});
$._objectFilter = (0, dt.default)(function(n, t) {
  return (0, or.default)(function(u, i, o, c) {
    return n(i, o, c) ? Object.assign(Object.assign({}, u), { [o]: c[o] }) : u;
  }, {}, t);
});
Object.defineProperty(je, "__esModule", { value: !0 });
const cr = $;
function ar(...e) {
  return (0, cr._arrayFilter)(...e);
}
je.default = ar;
var we = {};
Object.defineProperty(we, "__esModule", { value: !0 });
const sr = $;
function fr(...e) {
  return (0, sr._objectFilter)(...e);
}
we.default = fr;
var me = {};
Object.defineProperty(me, "__esModule", { value: !0 });
function dr(e) {
  return function(t, r, ...u) {
    return e(r, t, ...u);
  };
}
me.default = dr;
var Ae = {};
Object.defineProperty(Ae, "__esModule", { value: !0 });
function lr(e) {
  return e;
}
Ae.default = lr;
var Pe = {};
Object.defineProperty(Pe, "__esModule", { value: !0 });
const _r = d, yr = C, hr = (0, _r.default)(function(n, t) {
  return (0, yr.default)(t) === n;
});
Pe.default = hr;
var $e = {};
Object.defineProperty($e, "__esModule", { value: !0 });
const gr = P;
function br(...e) {
  return (0, gr._arrayMap)(...e);
}
$e.default = br;
var Me = {};
Object.defineProperty(Me, "__esModule", { value: !0 });
const vr = ee();
function pr(e) {
  let n = {};
  return function(...r) {
    const u = Object.keys(n);
    for (let i of u)
      if ((0, vr.default)(n[i].args, r))
        return n[i].value;
    return n = Object.assign(Object.assign({}, n), { [u.length.toString()]: {
      args: r,
      value: e(...r)
    } }), n[u.length.toString()].value;
  };
}
Me.default = pr;
var Re = {};
Object.defineProperty(Re, "__esModule", { value: !0 });
const Or = d;
Re.default = (0, Or.default)(function(n, t) {
  return n * t;
});
var Ee = {};
Object.defineProperty(Ee, "__esModule", { value: !0 });
function jr(e, ...n) {
  return function(...r) {
    return e(...n, ...r);
  };
}
Ee.default = jr;
var Se = {}, Ie = {};
Object.defineProperty(Ie, "__esModule", { value: !0 });
const wr = d;
Ie.default = (0, wr.default)(function(n, t = []) {
  var r = {};
  for (let u of t)
    r[u] = n[u];
  return r;
});
Object.defineProperty(Se, "__esModule", { value: !0 });
const mr = Ie;
function Ar(...e) {
  return (0, mr.default)(...e);
}
Se.default = Ar;
var Te = {};
Object.defineProperty(Te, "__esModule", { value: !0 });
function Pr(e) {
  return Object.assign({}, e);
}
Te.default = Pr;
var Le = {};
Object.defineProperty(Le, "__esModule", { value: !0 });
function $r(e) {
  return function(...t) {
    return e(...t.reverse());
  };
}
Le.default = $r;
var Fe = {};
Object.defineProperty(Fe, "__esModule", { value: !0 });
function Mr(e) {
  return function(...t) {
    return t.length ? e(t) : e();
  };
}
Fe.default = Mr;
var Ne = {};
Object.defineProperty(Ne, "__esModule", { value: !0 });
const Rr = d;
Ne.default = (0, Rr.default)(function(n, t) {
  return n - t;
});
var Ue = {};
Object.defineProperty(Ue, "__esModule", { value: !0 });
const Er = A;
function Sr(...e) {
  return (0, Er._whenElse)(...e);
}
Ue.default = Sr;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.substract = e.spreadArgs = e.sameLength = e.reverseArgs = e.reduceObject = e.reduce = e.pipe = e.pickAll = e.pick = e.partial = e.or = e.objectIs = e.notSameLength = e.not = e.multiply = e.memoize = e.mapObject = e.map = e.length = e.isNull = e.isUndefined = e.isRegexp = e.isFunction = e.isBigint = e.isSymbol = e.isBoolean = e.isNumber = e.isString = e.isObject = e.isGeneratorFunction = e.isGenerator = e.isArray = e.isType = e.isnt = e.isLength = e.is = e.identity = e.gatherArgs = e.freeze = e.flipArgs = e.filterObject = e.filter = e.divide = e.deepFreeze = e.curry = e.constant = e.compose = e.arrayIs = e.and = e.add = void 0, e.whenElse = e.when = e.type = e.transpoline = void 0;
  const n = de;
  e.add = n.default;
  const t = le;
  e.and = t.default;
  const r = ot();
  e.arrayIs = r.default;
  const u = ge;
  e.compose = u.default;
  const i = be;
  e.constant = i.default;
  const o = d;
  e.curry = o.default;
  const c = ve;
  e.deepFreeze = c.default;
  const a = Oe;
  e.divide = a.default;
  const f = je;
  e.filter = f.default;
  const h = we;
  e.filterObject = h.default;
  const b = me;
  e.flipArgs = b.default;
  const R = q;
  e.freeze = R.default;
  const E = ne;
  e.gatherArgs = E.default;
  const oe = Ae;
  e.identity = oe.default;
  const jt = ee();
  e.is = jt.default;
  const wt = Pe;
  e.isLength = wt.default;
  const mt = ut();
  e.isnt = mt.default;
  const At = s;
  e.isType = At.default;
  const g = s;
  Object.defineProperty(e, "isArray", { enumerable: !0, get: function() {
    return g.isArray;
  } }), Object.defineProperty(e, "isGenerator", { enumerable: !0, get: function() {
    return g.isGenerator;
  } }), Object.defineProperty(e, "isGeneratorFunction", { enumerable: !0, get: function() {
    return g.isGeneratorFunction;
  } }), Object.defineProperty(e, "isObject", { enumerable: !0, get: function() {
    return g.isObject;
  } }), Object.defineProperty(e, "isString", { enumerable: !0, get: function() {
    return g.isString;
  } }), Object.defineProperty(e, "isNumber", { enumerable: !0, get: function() {
    return g.isNumber;
  } }), Object.defineProperty(e, "isBoolean", { enumerable: !0, get: function() {
    return g.isBoolean;
  } }), Object.defineProperty(e, "isSymbol", { enumerable: !0, get: function() {
    return g.isSymbol;
  } }), Object.defineProperty(e, "isBigint", { enumerable: !0, get: function() {
    return g.isBigint;
  } }), Object.defineProperty(e, "isFunction", { enumerable: !0, get: function() {
    return g.isFunction;
  } }), Object.defineProperty(e, "isRegexp", { enumerable: !0, get: function() {
    return g.isRegexp;
  } }), Object.defineProperty(e, "isUndefined", { enumerable: !0, get: function() {
    return g.isUndefined;
  } }), Object.defineProperty(e, "isNull", { enumerable: !0, get: function() {
    return g.isNull;
  } });
  const Pt = C;
  e.length = Pt.default;
  const $t = $e;
  e.map = $t.default;
  const Mt = ie;
  e.mapObject = Mt.default;
  const Rt = Me;
  e.memoize = Rt.default;
  const Et = Re;
  e.multiply = Et.default;
  const St = k;
  e.not = St.default;
  const It = U;
  e.notSameLength = It.default;
  const Tt = it();
  e.objectIs = Tt.default;
  const Lt = ue;
  e.or = Lt.default;
  const Ft = Ee;
  e.partial = Ft.default;
  const Nt = Se;
  e.pick = Nt.default;
  const Ut = Te;
  e.pickAll = Ut.default;
  const kt = te;
  e.pipe = kt.default;
  const qt = M;
  e.reduce = qt.default;
  const Ct = z;
  e.reduceObject = Ct.default;
  const zt = Le;
  e.reverseArgs = zt.default;
  const Bt = x;
  e.sameLength = Bt.default;
  const Kt = Fe;
  e.spreadArgs = Kt.default;
  const Gt = Ne;
  e.substract = Gt.default;
  const Dt = T;
  e.transpoline = Dt.default;
  const Ht = L;
  e.type = Ht.default;
  const Wt = re;
  e.when = Wt.default;
  const Xt = Ue;
  e.whenElse = Xt.default;
})(p);
const Ir = new window.DOMParser(), lt = "data-flowtypus-container", _t = "data-flowtypus-view", Ze = "data-flowtypus-target-template", ke = "data-flowtypus-old-view", ce = "data-flowtypus-new-view", Tr = "data-flowtypus-disabled", Ve = "data-flowtypus-reload", j = [], w = /* @__PURE__ */ new Map(), xe = [], S = /* @__PURE__ */ new Map(), l = {
  previousTemplate: null,
  transitions: /* @__PURE__ */ new Map(),
  state: "end",
  previousURL: null
}, ae = {
  out: async (e) => {
    var t;
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    const n = (t = e.from.view) == null ? void 0 : t.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 200,
      iterations: 1,
      fill: "forwards",
      easing: "ease-out"
    });
    return n == null || n.play(), (n == null ? void 0 : n.finished) || Promise.resolve();
  },
  in: async (e) => {
    var t;
    e.from.view && (e.from.view.style.position = "absolute");
    const n = (t = e.to.view) == null ? void 0 : t.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 200,
      iterations: 1,
      fill: "forwards",
      easing: "ease-in"
    });
    return n == null || n.play(), (n == null ? void 0 : n.finished) || Promise.resolve();
  }
}, se = {
  out: async () => Promise.resolve(),
  in: async () => Promise.resolve()
};
function Lr(e, n, t = (r, u) => r === u) {
  e || (e = []), n || (n = []);
  const r = e.length > n.length ? "added" : "missing", u = r === "added" ? "missing" : "added", i = r === "added" ? n : e, o = {
    missing: r === "added" ? [...e] : [],
    commun: [],
    added: r === "missing" ? [...n] : []
  };
  for (let c = 0, a = i.length; c < a; c++) {
    const f = i[c], h = o[u].findIndex((b) => t(b, f));
    h === -1 ? o[r].push(f) : (o.commun.push(f), o[u].splice(h, 1));
  }
  return o;
}
function Q(e, n, t = !0) {
  var i;
  e || (e = "*"), n || (n = "*");
  const r = (i = window == null ? void 0 : window.matchMedia) != null && i.call(window, "(prefers-reduced-motion: reduce)").matches ? " (reduced)" : "", u = [
    `${e} => ${n}${r}`,
    `${n} <= ${e}${r}`,
    `${e} <=> ${n}${r}`
  ];
  return e !== n && u.push(`${n} <=> ${e}${r}`), n !== "*" && t && u.push(...Q(e, "*", !1)), e !== "*" && t && u.push(...Q("*", n, !1)), e !== "*" && n !== "*" && t && u.push(...Q("*", "*", !1)), u;
}
function O(e, n) {
  if (!e)
    return null;
  if (e instanceof URL)
    return e;
  try {
    return new URL(e);
  } catch {
    try {
      return new URL(e, n || window.location.href);
    } catch {
      return null;
    }
  }
}
function m() {
  return O(window.location.href);
}
function Y(e) {
  return e instanceof URL;
}
function fe(e, n) {
  return e = O(e), n = O(n), Y(e) && Y(n) && e.origin === n.origin;
}
function Fr(e, n) {
  return e = O(e), n = O(n), Y(e) && Y(n) && e.pathname === n.pathname && e.search === n.search;
}
function yt(e) {
  return e ? e.tagName === "A" ? e : e.parentElement ? yt(e.parentElement) : null : null;
}
function Nr(e) {
  return e instanceof Document ? e : Ir.parseFromString(
    typeof e == "string" ? e : e.toString(),
    "text/html"
  );
}
function F(e) {
  return !e || !(e instanceof Document) ? null : e.querySelector(`[${lt}]`) || null;
}
function N(e) {
  var n;
  return Array.from(((n = F(e)) == null ? void 0 : n.children) || []).filter(
    (t) => t.hasAttribute(_t) && !t.hasAttribute(ke)
  )[0] || null;
}
function qe(e) {
  var t;
  const n = N(e);
  return ((t = n == null ? void 0 : n.getAttribute) == null ? void 0 : t.call(n, _t)) || null;
}
function Ur(e) {
  return !e || !(e instanceof HTMLElement) ? null : e.hasAttribute(Ze) && e.getAttribute(Ze) || null;
}
function et(e, n, t, r = "") {
  var u, i;
  !!n && n.getAttribute(t) !== ((u = e == null ? void 0 : e.getAttribute) == null ? void 0 : u.call(e, t)) && n.setAttribute(t, ((i = e == null ? void 0 : e.getAttribute) == null ? void 0 : i.call(e, t)) || r);
}
const kr = p.curry(function(n, t) {
  const r = t.children[0], u = n.children[0];
  return et(u, r, "lang"), et(u, r, "dir", "ltr"), t;
}), qr = p.curry(function(n, t) {
  const r = Array.from(t.head.children), u = Array.from(n.head.children), { missing: i, added: o } = Lr(
    r,
    u,
    (c, a) => c.isEqualNode(a)
  );
  return i.forEach((c) => c.remove()), t.head.append(...o), o.filter((c) => c.tagName === "SCRIPT").forEach((c) => Ce(c)), t;
}), Cr = p.curry(function(n, t) {
  let r = F(t);
  if (!r)
    throw new Error('no container with attribute "' + lt + '"');
  let u = N(t), i = N(n);
  if (!u)
    throw new Error("No view with attribute");
  if (!u || !i)
    throw new Error("No content");
  return i.setAttribute(ce, "true"), u.setAttribute(ke, "true"), u.nextSibling ? r.insertBefore(i, u.nextSibling) : r.append(i), t;
});
function zr(e) {
  const n = e.querySelector(`[${ke}]`);
  n == null || n.remove();
  const t = e.querySelector(`[${ce}]`);
  return t == null || t.removeAttribute(ce), e;
}
function Br(e = document) {
  return Array.from(
    e.querySelectorAll(`a:not([${Tr}]):not([href^="#"])`)
  ).filter((n) => fe(n.getAttribute("href"), window.location.href) ? n.hasAttribute("target") ? n.getAttribute("target") === "_self" : !0 : !1);
}
function Kr(e = document) {
  const n = e.head.querySelectorAll(
    `script[${Ve}]`
  ), t = e.body.querySelectorAll(
    `script[${Ve}]`
  );
  return [...Array.from(n), ...Array.from(t)];
}
function Ce(e) {
  const n = document.createElement("script"), t = Array.from(e.attributes);
  for (const { name: r, value: u } of t)
    n[r] = u;
  n.append(e.textContent || ""), e.replaceWith(n);
}
function Gr(e, n = document) {
  if (e = O(e), !(e != null && e.href) || xe.indexOf(e.href) !== -1)
    return;
  const t = n.createElement("link");
  t.setAttribute("rel", "prefetch"), t.setAttribute("href", e.href), t.setAttribute("as", "document"), n.head.appendChild(t), xe.push(e.href);
}
const Dr = p.curry(function(n, t) {
  return p.pipe(
    Cr(n),
    kr(n),
    qr(n)
  )(t);
});
class ht extends Event {
  constructor(t) {
    super("flow:loading:progress");
    _(this, "detail");
    this.detail = t;
  }
}
class Hr extends Event {
  constructor(t) {
    super("flow:transition:out");
    _(this, "from");
    _(this, "to");
    _(this, "link");
    _(this, "transitionKey");
    _(this, "container");
    this.from = t.from, this.to = t.to, this.link = t.link, this.transitionKey = t.transitionKey, this.container = t.container;
  }
}
class Wr extends Event {
  constructor(t) {
    super("flow:transition:in");
    _(this, "from");
    _(this, "to");
    _(this, "link");
    _(this, "transitionKey");
    _(this, "container");
    this.from = t.from, this.to = t.to, this.link = t.link, this.transitionKey = t.transitionKey, this.container = t.container;
  }
}
class J extends Event {
  constructor(t) {
    super("flow:transition:end");
    _(this, "from");
    _(this, "to");
    _(this, "link");
    _(this, "transitionKey");
    _(this, "container");
    _(this, "error");
    this.from = t.from, this.to = t.to, this.link = t.link, this.transitionKey = t.transitionKey, this.container = t.container, this.error = t.error;
  }
}
function Xr() {
  w.clear();
}
function gt(e) {
  return e = O(e), !e || !w.has(e.href) ? !0 : w.delete(e.href);
}
function ze(e, n, t, r = !1) {
  const u = e.split(" ").filter((i) => !!i).concat(r ? ["(reduced)"] : []).join(" ");
  l.transitions.set(u, {
    in: t,
    out: n
  });
}
ze("* <=> *", ae.out, ae.in);
ze("* <=> *", se.out, se.in, !0);
function bt(e, n, t) {
  var u;
  if (l.state !== "end" && l.state !== "error")
    return t && t.preventDefault(), !1;
  const r = m();
  return r ? (typeof e == "string" && (e = O(e)), !!e && fe(e, r) && (t ? !(t.metaKey || t.ctrlKey) : !0) ? (t && t.preventDefault(), Fr(e, r) || ((u = history == null ? void 0 : history.pushState) == null || u.call(history, { template: n }, "", e.href), pt(
    { state: { template: n } },
    t ? yt(t == null ? void 0 : t.target) : null
  )), !0) : (!!e && !fe(e, r) && (window.location.href = e.href), !1)) : !1;
}
function vt() {
  p.pipe(Kr, p.map(Ce))(document);
}
function Jr() {
  return window.onload = () => {
    Ot(), Zr();
  }, window.addEventListener("popstate", pt), l.previousTemplate = qe(document), l.previousURL = m(), {
    back: () => {
      var e;
      return history ? ((e = history.back) == null || e.call(history), !0) : !1;
    },
    clearAllCache: Xr,
    clearCacheForUrl: gt,
    forward: () => {
      var e;
      return history ? ((e = history.forward) == null || e.call(history), !0) : !1;
    },
    goToPage: (e, n) => bt(e, n),
    rerunScript: Ce,
    rerunScripts: vt,
    setTransition: ze
  };
}
function tt(e) {
  return (n) => {
    if (!e)
      return;
    const t = O(e.getAttribute("href")), r = Ur(e);
    bt(t, r, n);
  };
}
function I(e) {
  return () => {
    !e || (Gr(e.href), e.removeEventListener("mouseenter", I(e)), e.removeEventListener("focus", I(e)));
  };
}
async function pt({ state: e }, n = null) {
  const t = l.previousTemplate || "*", r = l.previousURL || m(), u = (e == null ? void 0 : e.template) || "*", i = m(), o = {
    view: N(document),
    template: t,
    url: r
  };
  l.state = "out";
  const { transition: c, transitionKey: a } = Qr(t, u), f = {
    from: o,
    to: {
      template: u,
      url: i
    },
    link: n,
    transitionKey: a,
    container: F(document)
  };
  window.dispatchEvent(new Hr(f)), Yr(m()).then(async (h) => {
    await c.out(f);
    const b = {
      from: o,
      to: null,
      link: n,
      transitionKey: a,
      container: F(document),
      error: null
    };
    if (!h) {
      console.error("No page founded"), l.state = "error", window.dispatchEvent(
        new J({
          ...b,
          error: "No page founded"
        })
      );
      return;
    }
    const R = Nr(h).cloneNode(!0), E = {
      ...b,
      to: {
        document: R,
        container: F(R),
        view: N(R),
        template: u,
        url: m()
      }
    };
    try {
      Dr(R, document);
    } catch (oe) {
      l.state = "error", window.dispatchEvent(
        new J({
          ...E,
          error: oe
        })
      );
      return;
    }
    l.state = "in", window.dispatchEvent(new Wr(E)), await c.in(E), zr(document), l.state = "end", window.dispatchEvent(
      new J({
        ...E,
        error: null
      })
    ), l.previousTemplate = qe(document), l.previousURL = i, Ot(), vt();
  }).catch((h) => {
    l.state = "error", window.dispatchEvent(
      new J({
        ...f,
        to: {
          ...f.to,
          view: null
        },
        error: h
      })
    ), console.error(h);
  });
}
function Qr(e, n) {
  var c;
  const t = Q(
    e,
    n
  ), r = !!((c = window == null ? void 0 : window.matchMedia) != null && c.call(window, "(prefers-reduced-motion: reduce)").matches), u = `* <=> *${r ? " (reduced)" : ""}`, i = t.find((a) => l.transitions.get(a)) || u, o = i && l.transitions.has(i) ? l.transitions.get(i) : l.transitions.has(u) ? l.transitions.get(u) : r ? se : ae;
  return {
    transitionKey: i,
    transition: o
  };
}
async function Yr(e) {
  return new Promise(async (n, t) => {
    if (!e)
      return t();
    if (w.has(e.href)) {
      const r = w.get(e.href), u = new TextEncoder().encode(r).length;
      return window.dispatchEvent(
        new ht({
          progress: 1,
          cache: !0,
          done: !0,
          fullBytesLength: u,
          bytesReceived: u
        })
      ), n(r);
    }
    if (S.has(e.href))
      try {
        return await S.get(e.href), n(w.get(e.href));
      } catch (r) {
        return t(r);
      }
    try {
      S.set(
        e.href,
        fetch(e.href, {
          mode: "same-origin",
          method: "GET",
          headers: { "X-Requested-With": "self-navigation", "X-flow": "1" },
          credentials: "same-origin"
        }).then(Vr).then((i) => i instanceof Response ? i : new Response(i, {
          headers: { "Content-Type": "text/html" }
        }))
      );
      const r = await S.get(e.href);
      if (!r)
        throw new Error();
      const u = await r.text();
      if (S.delete(e.href), r.status >= 200 && r.status < 300)
        w.set(e.href, u);
      else
        return t({ status: r.status });
      return n(u);
    } catch (r) {
      return S.delete(e.href), gt(e), t(r);
    }
  });
}
function Ot() {
  j.forEach((e) => {
    e.removeEventListener("click", tt(e)), e.removeEventListener("mouseenter", I(e)), e.removeEventListener("focus", I(e));
  }), j.length = 0, Br(document).forEach((e) => {
    j.push(e);
  }), j != null && j.length && j.forEach((e) => {
    e.addEventListener("click", tt(e)), e.addEventListener("mouseenter", I(e)), e.addEventListener("focus", I(e));
  });
}
function Zr() {
  var t;
  const e = m(), n = qe(document);
  (t = history == null ? void 0 : history.replaceState) == null || t.call(history, { template: n }, "", e == null ? void 0 : e.href);
}
function Vr(e) {
  var u;
  if (!(e.status >= 200 && e.status < 300))
    return e;
  const n = (u = e.body) == null ? void 0 : u.getReader(), t = parseInt(e.headers.get("Content-Length") || "0");
  let r = 0;
  return new ReadableStream({
    start(i) {
      function o() {
        n == null || n.read().then(({ done: c, value: a }) => {
          if (window.dispatchEvent(
            new ht({
              progress: t ? p.divide(r, t) : c ? 1 : 0,
              fullBytesLength: c ? r : t,
              bytesReceived: r,
              cache: !1,
              done: c
            })
          ), c) {
            i.close();
            return;
          }
          r += (a == null ? void 0 : a.length) || 0, i.enqueue(a), o();
        });
      }
      o();
    }
  });
}
const eu = () => {
  const e = Jr();
  if (window) {
    const n = window;
    n.flowtypus = e;
  }
  return e;
};
export {
  eu as default
};
//# sourceMappingURL=flowtypus.mjs.map
