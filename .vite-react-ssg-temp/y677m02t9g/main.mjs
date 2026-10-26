var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa;
import { Head, ViteReactSSG } from "vite-react-ssg";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React, { useState, useEffect, useRef, useId, forwardRef, createContext, useContext, useCallback, useMemo } from "react";
import { Link, NavLink, useLocation, ScrollRestoration, Outlet, useSearchParams, useParams, Navigate } from "react-router-dom";
import { useTranslation, initReactI18next } from "react-i18next";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { X, Calendar, Phone, Globe, Menu, Mail, MapPin, ShieldCheck, Check, Copy, ExternalLink, FileText, Loader2, ChevronDown, CheckCircle2, AlertCircle, Info, ChevronRight, ChevronLeft, Home, ArrowLeft, ArrowRight, ArrowUp, BookOpen, Clock, Wrench, Sparkles, Building2, PackageCheck, ArrowUpDown, BadgeCheck, Truck, Siren, Gauge, HardHat, Timer, SlidersVertical, Cog, DoorOpen, TrendingUp, Cpu, Hexagon, Palette, FileCheck, Sliders, Droplets, Users, ScanLine, Activity, HeartHandshake, DoorClosed, ShieldAlert, Maximize2, CheckCheck, Eye, FileSpreadsheet, BatteryCharging, Award, Zap, AlertOctagon, Search, Compass, Scan, ClipboardCheck, MoveRight, Accessibility, Package, Briefcase, Share2, Link2, Languages, HelpCircle, Tag, Send, Headset, PhoneCall } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import i18n from "i18next";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/app/providers.tsx");
const AppProviders = ({ children }) => {
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1e3 * 60 * 5,
          refetchOnWindowFocus: false
        }
      }
    })
  );
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children });
};
const whiteHeader1x = "data:image/webp;base64,UklGRi4JAABXRUJQVlA4WAoAAAAQAAAAnwAAFwAAQUxQSLUIAAAB8L9t2/I02v7Pa9vP80oI1Fvq7u7u7uPuXnd3mFIndNzd3YfqTKn7uFtl6i4JNSCcPyQEbomICQBZWVGwMUTLyor/i7KyxDaGeE0gYChSWdEp68q3Q5AVRWhEUYvSM2q2nuQvjKHvfA8VztBqBrffiIjbELdl1Uq8orCG6i/nunznvmiKrBDF+yZ3q4SJYShTPxFE1S7JvRNRDAkw1HP9R14oiaQ45JESSkBWkmIpymOU04ZMrKjaNblPEgKZSrVtlKJoNn58U1QoGYrNOOMieS4vz13KSMYYQ0s3aP9d2CiPzuGPPVnL6P3X5NfFSEQbg6FupO+I8yUQYBVlhGXOqQREtKyItsJjRIR1n2MtY/cPvlgPg2WMm4FniGnY+eijWzGF03W/uUhuxDkXyYm4Q8N8CNuoUuvKlAyAofXZ78ojROm6gTp+YtpSASRDPddvVHYJlFTCIoHAV4yU8wFqpdWwiQEhkVDaQ/IY5diQiRElGlVqXwIZ7nUvYhCmtAdQvXxydQoryn/p8vNy8110fm5uvtvRiOrvHjh+/GV2z8BH19Pu5OFT23pgqbCuFx5Ln4KWe0/s6I4tiN0Xjr2UjMStP4V3MTeURG93+sTJE0deLA8jzh95uzK+Ajy6bz589PBIPMY4d/j4iQ/q0PBEVyi5u33qolbbyqG4LM+6Kzl57vS/LuJ+OOIiOTlutf+b44/NOZDF0SCJZljGvKXpy3Zeag913b0ksWoHdHFvbb7YEhrFMpMXPxpeowC3uJUZs5gbKkk/98rC4NJnsld7zHOPnNrqDzA2Bs2yv124ODcVf5mURanpyx49/Idp7AZiKrmrP1s9yFXBxCPY5K7ku/U10t0lNzv5g3yX6w4PymsKn2zm8BIsBf7xElTLuRUfn2+CdpEe7H0c6uT3HREugTB0dW1g20cYj3lnE+nlWmEMXVx7Uk7TxPWCEY6sL2D5PpF4cB6WaEM1d1UV1xfKuoHvfdHTVS6MNjr3540+HnGXXAqm107njo1yy9MXHspi7+6UpUuWBYPBYMb8PfsXLHzaffHwsvn/HE5Le819OO/fPfMXPuv6jrpQis5PpS950n3w8OIL21IzniozxS17+G33+uKMjCVPuI9mbL4SXO6+nJ/61WWzIRM+PpYWfPTC5tSlS9KDwWAwfbEbU9W9O3/RY+79P/9511UtDNuvTCtGAsvdJTcXP96Dx87efvJM6Nz5V32/ubOhAsMHD4RD5/aeDJ/P3vNnOHxm76nsAwfDodMnOt39RymGuTPhc/+cCof2Hc0+65rfGTodPr3nTDgUCp3bczL72L7Q+b0nwqEz33vvvwJPnjsXOr//WDhU4JnQHbVc+Hzo3J5Thw6e+b0yigd8E5pgrI+gC7s5eNZQeS7RIjF7HB6FFtWbEr8s/83GUJSWTq4ZhiKWxbP4WO4uuRQ8rA8vSviXnKqNKZzH4/+guP4PiuR1W0BFI8xL94CxNL5+8LX1MVb0XQEG0S+9IVaAiU9UbQxgTJQBawADyETJAFIMY0C2IBtL1hYGHpxdFlFUbHCZrZAVgDXUet2dQhLRQiCQBEZIEtGSACQRWyAAgRRDAhAgIQkkQAKQACGBBBgjkBBSobJc5NKTFfH8nt+j+Nyzzh3DNPHTrB0edYqBr64RIJAQBiRDo/aIhCaGLvWR6vqhWG0QtTshAzIY6nWEGtdgEGAHJCFE+YeuSRAYQEIIWQ8RLSQKtc5djrhj4/wI3fKXi1xxB6h5oAPzHiGRx0fB4PcoVSvgU4NSJNVJ9FOpNhQvPu1J/PTYV5k3R5LA20Ng1HISPO55sVQFbh6NrV2OkS9SvMV0AlVscjVfiQ2tSmNo+ef7W8ZRpTo2UCOxTBX8SbUTUM2yPl+gWvGERBKKxYdljsvNzc133w+k3TqXn5ub615jzpnHmbucBB4Ll+fvj2v8sOqnu+ZkTU7euvanyR0zPx1TYuuaPen4ee70VN4cjo8v/yL5QsrUu2u8ccOBzF86rrzY7/Hvtjw9In1sWsuMHvseufG3z//ouvnrPwbCipkUt3d+/8O01t9nbX39QMe5uzZ8nbT4l7WfDt61btXtH/D0CGxcwMSQy8vJczlbwy4vJ8/lBBPKb2q3qeykR8esGpn2+6IJvy95YRbvTkxdUSvlKTKefjtjTFbGUwSfgdZrO2zj+WlzV9zx2G8TF/4xZdGwqp/fuZoHX5jycKOdXPPFTccy6f/etd/w9RC+Hbqp6oRnYGdPKLGrIRsnZdrdHcYveCSVl176inYbblvHqhvevymrMorPP7xc6ZcjLi8n4vJzcvPditp23OTTacemj3kiuU+F5ya9vu3O5zOeYMXMyjO2L3+L1x575dV7Bk79iDefgWf3Lsy+5vGJ1XpV/ODOrW9MXjT10Ws/vHm3nffE+Kca/VRqWOYtp7bW6fX+jW+xZkTg96tWFX/oeVi0pdagwVmDam0e+y6rGjyUnvEMny7bUPuqzXd8wIpBQy/OwxKvYPvFB+i8xeXnXs7Jd79ew1X7z712e9Prnxg5Dj+zbqnTpuvisqu/XHHD9M+CZd9btfr+eu+/M9h+sGbtaEq/PajJsPmzrscj2LVt3Zsnlvx4Y4cOa77YWLPJzm5Tt3+ResPY3k91mt87jc7bPlzT/vGka6YjX/qOXf27btp+R6sgj9W4dtSSH1a/ybhdHz05YDEZXcrtq48phDY790NV7tnnIu7k1EDCaueOW8AIGQMS4CsJprzFlhQklQVbSmAMYIUxAgkwFijhB59HSQ+EZ4gOFKNAkeBBoDgxDS8/gA9K+AEsI9/EUpit7rLrBWWmfphWHWrlRNxJGWOEAMWQMAjJYDBCMhiBjDGImFEyMhgkCYMRMkIIIwxCAllkjDAxRN2KWBkkQDSsioog13XDJwCPapecO0kRChAgQAJEEQsQMUXcEnFKIBGnAFGgKGQB3THyPE+iek4R/T+XiFtFZ4k2sQAAVlA4IFIAAACQBACdASqgABgAPjEYikOiIaESZAAgAwS0gAASOR+EW4JjgWwRDeJ6cheA/AAA/v5SSG6rv0AAH1X//7U6pHZbk2r6duPc51/zngipJVYhoAAA";
const whiteHeader2x = "/assets/logo-white-header@2x-BNNYTehd.webp";
const whiteFooter1x = "data:image/webp;base64,UklGRhAOAABXRUJQVlA4WAoAAAAQAAAA2wAAIAAAQUxQSGwNAAABsIbt//qm1fP9/v5JvYW2uNuG69zxsdrcfcwVO3N3139bbO7uG1KYuw8YVmYcqmO45Z//90XSEI6+jYgJ4P9Hp/Sa1bT2mf6oE1JUQXUnRKQFURGVNEUiSNSlLdoubxe5qBKJSDJVVFIQkZ0Ruj9zAW7XOCX/hg0WhrblriLUpZBGFXa9UPjFp4xbfzmaFsch4SO4XeC4eMMEFnxdjCTspAo7rQy3V3aNOuSEWosHYRjE7c+JHk6TRffqE92nV0oq0axCL0HocEB+h/3ykXS0XdfM0fYALk3j7KlddLMdz58b2yfJ2rtn1j49kCQqmTlFOyF0G1NaPjwrfeIJe39gYRCamYVBaF8egngCSjd7r7u9iookc3So2ewjgONaG3OtjcWBSIKISLI2axs5yu5LEBFJRUQ8xtmTySRpMhGRFm6y4/h9fTsEZZC9OMCexCV47Ldk3QVoEkni8bz1fcH6omkSpdOsmAVxazEeWPhcL1QR2j59aeFzFyAkVwo/tfl5qBOUirkDKt4ZgJKquCRt1zVxtN2fkOg0mTrAMc6eSpbcuYREp0lutuP5c2N7BKHbs+d2eO5MFPAYVmcPgnoJyZULXut8yYsdkPQIWdOaLR6YhWFCGDcL4rb+hjwQgYwil5tJcTsHCHk19m2nnEKHCjvvtW1XoOjOuOI2xVmIJIgQbV2cy3h7iignrDovo21RUWE2KFDQoTgDkZ1RgaxClxsBlP6/2zMZrfMFFbI7ZifsYqHNFxaPhWZBaEnDwCwM4raou9LvqUazmJWyaHNXVCj4wMLNW4INP1yeg+Bxxw9DUcd+i6fh0XddsOGT45CUIvTaaLHf/C4ICF0eWrHBbuAwe4oMptn2HTt27Ni2+uW9Uccs2/LrAx2Q1JS9Xvvbwvj2QagycLWFG7fH/vroJPG4yKbgHEetPLrr9/fw+pt5SBocD9q20CwIbO0ms9B+W23xwCzcbs8wtMnWLl30t5WzPOiWcH/T4uW1q1b+ud3eiyDK27Y/zqPMZhOh3/Ztv8ftGlRT8Ojy7bKlG2x5F0TpXmubVzZOZkKSKVa/ora2tnadbR9HhCfst/W2qB2SisfYrda0ZMlmG4wj7701S5avWrWyPm53wKX2DzyPS+yiXvYuDc2F6RD4xgKLB2bP9P/R4jF7uvDxwIK4xa2WN+3K/AKesxKWxXoQ0Wjb3Pz8vLy8/O7v2TlkRHjTDiAapdxmkkk/+9E7sG5HX6J0aMHhsrNzCx+wR4hGmWX3FhXk5zDOniabKXY9rfPy8vPPsW8jER6zCRkz7S6iUW5tQfQbm5ibG1log4hKbnFOfn5eXn7eXrW2N5PscjIyEvrY26xpaJ0e/cmCIG5fjSRzccLzsM+HFgZxa+yw9RcPj6eshOVBV5SWlT3sTdTxlu2Hc5TaTCLsZt/DNXY+Edr83dwCILRd91sE8lc35yM4xtmTZDDZrsADhHk2GB6zUXTbuhQ8bmqBIbYQFWqsP0rLjvPtWqbYNDwvoae9Q11z+mK2eqKHZC1KeI4IcmKtBdY4wL6eUF4xssZKWGanjystKSlNXj7h1HB52WFloz+3qaPLyg65wd4bWT72nHDFYWPvtucPqhh/4sY6jrJ7cRxQUVJaevhv246fMP702IqystLycYy1eSMPP3iGPXZIRWlp6eEj59h1o8fMsStHH1234dhDy0c+Y8fz27p2cKjNGX146aHf2/ljykpKSpOXj73WZjHFZh9cVn5glVWeZV+OX1tXmLZNdxeiHhktqHPkX7/O6odaaGYWtwp+scD+peNWz9H2AI5vLbDU4/ZPb5zFbdfG7GT+3NgejrDA0hqzJ/iHxSzF0NYUpennubsjTiQVcEqPFxs7z6zyfd+vnD2EZTb7YT/16irf9/2q6krf9/1H7rvf932/usr3K6urfN9/ZNZd7PHW8SiXz3zY9/3qat/3/eoq339k+q3a/9FK3/crqyv95FXVlb5fVV3p+9XVvu/7jzy1N/dUFcDQx/3Eqmp/Jx958jSmWs29Vb5fWV3pV1c9MvPOnHRAdC8PJyBk/GDbttrTCYiDfWhRyFy9JgMh/V7XtvyXjXCTHYXHv2JESbLI4oG9kASNAC55hGNsFhGX9gh9bAERt7OIU8ClE3G7XnAOEJduj1a1GzrjuVTTFHnoIMQJgjfp3ttve+AEBMQpQ54gqVBw/9b32yCkXWj//m0o/0WFY1Y2lqHsaoHvrKoj6kjZKUV3xZpbKjpmiPIvKpKKSFpEdkqSSEoiuw7GjM9D+BeQr82aJmXiHF4kEok41OFNXG1WB+KEpKqIJIimRzVZi6KkqJKgkqxFSSGppJaqc+I0TSCOfwW+te1xW1QKTgDECYd8ZWHMGkFIEKcACSKAKgKqgCiSIICoiCRDQCQJCSIgIIiICiIiiIoIAoI4REQQFUFENImSXFRARAUVEFRRpyoIggoiIJIe+dbiYSy0twYiTsQpvZ8PLYiHVi8UzyqGwxZ4iDB1BKrsfwkeKCgICiKogqKq3Hs3ijLiIRxXT0dAb2yLOE4+HAeOq6tQUXKiiCKODp/0I8JZn4ATFNRx+z2oAsJhH/36xp44EAVFHCgoKKKIAoIoCaRVeN92mAWBbb2vGHXk37jB4oFZzL5znG6nw0mNEfGivFCT8NkstE1XzVY69UAo6OFleWjPNiheT158CYfjYRsB1TVEPI8ld+HRunki+Uge1e/SKyrMuQwn3VpHtNv6PSmSYeeSLW2KaN3d5fHcC3QWUC6wt6Z99yK07uHQrEj3PDq0Q7K1fXsE6VbosiTb65xHXhQyc9PiOM7isdAsiNua8yJy4iqLB2ZhLLCL8D7f8lkmJ9ZHEMd0OxHOsPu4NVY///s2Z65qfICJm9fWLN4354PVjZfT8/sd3//5GE7p8fvWx6FyHirClzYUHrQJE76lcOmQG+u+2rai87kWVGZ+HFv05ezWm3Y7+o+cYxfw/mtN+5++o3n+iq4PNH1n9+Io2nQzEs3hxk0bFu2e++Pnm368uT52DF/N/S0+naKFwZJPH2u7uOavpt2nv4T74nJcGhBOrbN4EFoYC+3T+RbGQrMgbmsvhaPWj15/PKfWtxo1pqRgxrZFxZ0WxW4fbmcUvhAWf/tYu35ddtyUf6sNnv4Zh2zp+8KS7geFj+Mcd/18+LZ+zJiTN2HMuOzPNsxh/O9WcdQaijfsfa2VdPz8w4JGP2PGmv5D1r3dqmli3RlM/idL6gYNi11R8KB1fmRDtwu2doGRW3cjM4OjwmPazf2q1Y4HO61ZVPjKZzQv7FhiFbc3DRj017vF4X0FSyv3jbUes60nmg6vI0UPbLUgMIsHZkHcLB5Y7NHOdOLTZ3nmS075o//SxfUTHntzxqPPPTj3vku/hwM3tB9Zt3TvI+oK6PzX2E8/f/zJ+tMXnwZvvoRHQdPFLK7i0dfHrF5c2/eH2+dd98mkP4898g8Kmva882Moa85cMZVfr4Kqhbl/2xNwyZ+supFz66GrdZ35Jj1jg2B4cBDOY8ZC2HPLgPVjWTiTy37JbjoO3ps57wZ4uKZ4y35ULmDxpBdexLHzgvfZvXkMetfCIDSLB2ZhENqH+5B1zbL9bOncpda/ojkiXpSX3strXhP9+P6SrbsxJda9HVeuL9s8jhLb482FbYbvo98+Sf4/nybKefbVvIa13kM1RDyP2qv623vehmMODFoNDXrdvK4D96/it6uomQtfz83ZXtNwJJP+ZOUUDo3tw7HWaeZr9AoGoXy6vDfjx1zY3J7rVnfcPJYFM5i8NLu5ksL6y574EL6Y02brfvgfc8665n3QtOhP9uupSunPFg9CszCI28rjlMOXWMM7P4w6bvTPT1Y0RxDHix8w9WK+nMVHm75Y/VfvhZ9//I3Min+1Mr7P4Ka3v5lNyY4lP9tsxKt9YfQxpRsvuuMDVIQVt1M1ko1n8VHjuue52xb/HD+Jx+3ygRtrv4m91mpr37ODbufWsWoS+sKOL1dZt1mv0zMcjEe3b+O/2Uzvo79/iB0XDUazYCaTluX9uv6rpiU5Q9et+mbb6+227Yv/ETmNc1DS4n6ywD7ek+xJTRbGYqGtv66A/nMsbg0je6D03L/9vooo/YcQjTCsL9knXNh9r2ibSy4oxJVM2W1EMd0mnVEEu08b02cAZI8pQhg6pOcQRIS9epDpZP8OZJeO8th99wMuHwy5x+9P90nlvQZ7B+RzcN+2+7J3Z4gcPrnX3lm7DSTz4BwQvEPO2RMyjprSl8hBrRmyG11GZDeddsw5raDrZRU9BkcOzKfPMNqtPQKXHv3ZYtvtZSJ0qN5uYfB0DyJMtx0xa0Scc0KqooAILYoIiSIAKrSozjkhVRVABJSkioAKCIDSoigIqYoCIgooyYWstUfjRERo2XHDUpC0xQN7CeeE3c+cOBicx3SLhdboFFAnLokqgCrinDrE8wScp05Qzwmo51QBJ4CqahKnCDhBnBNUnacgTlHPqeIEJ+JwCuI8caIKTgDEOQVxnoITVBHVIa3xBNRzqjhBHf17IKQvZi+jqANQxTHdgtAa+d9ZSG9qoJ7nAMeM/2VU0qD/Gi3+j/OvvIsAVlA4IH4AAABQBwCdASrcACEAPjEWiEMiISEWFAAgAwS0gAAi+JWhuxW9rxKEWWz6Bojh5mbhqAdqpgWGWPgwKL/njbyUT7oSPLEAAP7/tWhN2sR7PZblWBPelWV4AZRn/+w6o//8k5h/+poBa5Vi0FRV/nRh0lQZIrO2qT4/+vUgAAAAAAA=";
const whiteFooter2x = "/assets/logo-white-footer@2x-ipxC2088.webp";
const whiteHorizontal = "/assets/logo-white-horizontal-Bcj9GPNh.webp";
const whiteSquare = "/assets/logo-white-square-B_ffhoX2.webp";
const darkHorizontal = "/assets/logo-dark-horizontal-DfvEyqOU.webp";
const logoDarkSquare = "/assets/logo-dark-square-DRTy44Ow.webp";
(_b = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _b.call(globalThis, "src/components/ui/Logo.tsx");
const Logo = ({
  variant = "horizontal",
  theme = "dark",
  size = "header",
  asLink = true,
  to = "/",
  className = "",
  alt = "شركة المصاعد المبتكرة"
}) => {
  let src = whiteHorizontal;
  let srcSet;
  let width = 160;
  let height = 50;
  if (variant === "horizontal") {
    if (theme === "dark") {
      if (size === "header") {
        src = whiteHeader1x;
        srcSet = `${whiteHeader1x} 1x, ${whiteHeader2x} 2x`;
        width = 160;
        height = 50;
      } else if (size === "footer") {
        src = whiteFooter1x;
        srcSet = `${whiteFooter1x} 1x, ${whiteFooter2x} 2x`;
        width = 220;
        height = 69;
      } else if (size === "lg") {
        src = whiteHorizontal;
        width = 300;
        height = 94;
      } else {
        src = whiteHorizontal;
        width = 200;
        height = 63;
      }
    } else {
      src = darkHorizontal;
      width = size === "header" ? 160 : size === "footer" ? 220 : 200;
      height = Math.round(width * 0.31);
    }
  } else {
    if (theme === "dark") {
      src = whiteSquare;
    } else {
      src = logoDarkSquare;
    }
    width = size === "lg" ? 160 : size === "footer" ? 120 : 80;
    height = width;
  }
  const image = /* @__PURE__ */ jsx(
    "img",
    {
      src,
      srcSet,
      alt,
      width,
      height,
      className: `object-contain transition-opacity duration-200 ${className}`,
      loading: size === "header" ? "eager" : "lazy",
      decoding: "async"
    }
  );
  if (asLink) {
    return /* @__PURE__ */ jsx(
      Link,
      {
        to,
        className: "inline-flex items-center focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none rounded-control p-1",
        "aria-label": alt,
        children: image
      }
    );
  }
  return image;
};
(_c = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _c.call(globalThis, "src/components/ui/Container.tsx");
const Container = ({
  children,
  className = "",
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-container ${className}`,
      ...props,
      children
    }
  );
};
(_d = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _d.call(globalThis, "src/hooks/useFocusTrap.ts");
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function useFocusTrap(containerRef, isActive) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    const container = containerRef.current;
    const previouslyFocused = document.activeElement;
    const rafId = requestAnimationFrame(() => {
      const first = container.querySelectorAll(FOCUSABLE)[0];
      first == null ? void 0 : first.focus();
    });
    const handleKeyDown = (e) => {
      if (e.key !== "Tab") return;
      const focusable = Array.from(container.querySelectorAll(FOCUSABLE)).filter(
        (el) => !el.closest("[inert]")
      );
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      var _a2;
      cancelAnimationFrame(rafId);
      document.removeEventListener("keydown", handleKeyDown);
      (_a2 = previouslyFocused == null ? void 0 : previouslyFocused.focus) == null ? void 0 : _a2.call(previouslyFocused);
    };
  }, [isActive, containerRef]);
}
(_e = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _e.call(globalThis, "src/components/ui/Drawer.tsx");
const Drawer = ({
  isOpen,
  onClose,
  placement = "start",
  title,
  children
}) => {
  const drawerRef = useRef(null);
  useFocusTrap(drawerRef, isOpen);
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  const placementClasses = placement === "start" ? "start-0 border-e border-surface-border animate-slide-in-start" : "end-0 border-s border-surface-border animate-slide-in-end";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 overflow-hidden",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": title ? "drawer-title" : "drawer-logo-label",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "fixed inset-0 bg-brand-900/60 backdrop-blur-sm animate-fade-in",
            onClick: onClose,
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: drawerRef,
            className: `fixed inset-y-0 ${placementClasses} w-full max-w-xs sm:max-w-sm bg-white shadow-elevated z-10 flex flex-col focus:outline-none`,
            tabIndex: -1,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 sm:p-5 border-b border-surface-border", children: [
                title ? /* @__PURE__ */ jsx(
                  "h3",
                  {
                    id: "drawer-title",
                    className: "text-lg font-bold text-content-heading",
                    children: title
                  }
                ) : /* @__PURE__ */ jsx("span", { id: "drawer-logo-label", className: "sr-only", children: "القائمة الرئيسية" }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: onClose,
                    className: "text-content-muted hover:text-content-heading rounded-control p-1 hover:bg-surface-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
                    "aria-label": "إغلاق القائمة",
                    children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5", "aria-hidden": "true" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-4 sm:p-5", children })
            ]
          }
        )
      ]
    }
  );
};
(_f = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _f.call(globalThis, "src/lib/supabase.ts");
const __vite_import_meta_env__ = { "VITE_SUPABASE_ANON_KEY": "sb_publishable_JZDI75TO1VvM67UieEvAjw_iMKGDR6i", "VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_JZDI75TO1VvM67UieEvAjw_iMKGDR6i", "VITE_SUPABASE_URL": "https://flkydlhewzezfomfjrvi.supabase.co" };
const env = typeof import.meta !== "undefined" ? __vite_import_meta_env__ : void 0;
const nodeEnv = typeof globalThis !== "undefined" && "process" in globalThis ? (_g = globalThis.process) == null ? void 0 : _g.env : void 0;
const supabaseUrl = (env == null ? void 0 : env.VITE_SUPABASE_URL) || (nodeEnv == null ? void 0 : nodeEnv.VITE_SUPABASE_URL) || "https://flkydlhewzezfomfjrvi.supabase.co";
const supabaseAnonKey = (env == null ? void 0 : env.VITE_SUPABASE_ANON_KEY) || (env == null ? void 0 : env.VITE_SUPABASE_PUBLISHABLE_KEY) || (nodeEnv == null ? void 0 : nodeEnv.VITE_SUPABASE_ANON_KEY) || (nodeEnv == null ? void 0 : nodeEnv.VITE_SUPABASE_PUBLISHABLE_KEY) || "sb_publishable_JZDI75TO1VvM67UieEvAjw_iMKGDR6i";
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});
(_h = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _h.call(globalThis, "src/lib/siteConfig.ts");
const siteConfig = {
  company: {
    nameAr: "شركة المصاعد المبتكرة",
    nameEn: "Al-Masaed Al-Mubtakirah Company",
    sloganAr: "ابتكار يرتفع بك",
    sloganEn: "Innovation that elevates you",
    taglineAr: "صيانة – تحديث – تركيب – قطع غيار",
    taglineEn: "Maintenance – Modernization – Installation – Spare Parts",
    crNumber: "4030227058",
    accreditationAr: "معتمدين في الدفاع المدني",
    accreditationEn: "Civil Defense Accredited",
    domain: "almubtakirah.com"
  },
  contact: {
    phones: ["+966124231773", "+966559557459"],
    phoneDisplay: ["+966 12 423 1773", "+966 55 955 7459"],
    whatsapp: "966559557459",
    whatsappDisplay: "+966 55 955 7459",
    unifiedNumber: "920016876",
    unifiedDisplay: "9 2001 6876",
    email: "info@almubtakirah.com",
    cityAr: "جدة",
    cityEn: "Jeddah",
    addressAr: "جدة - حي السلامة - شارع نهضة الشرق (مبنى 2523)",
    addressEn: "Nahdah East St., As Salamah Dist., Bldg 2523, Jeddah",
    shortAddress: "JESA2523",
    workingHoursAr: null,
    workingHoursEn: null,
    mapUrl: null
  },
  social: {
    instagram: "https://www.instagram.com/almasaed_almubtakirah",
    tiktok: "https://www.tiktok.com/@almubtakirah",
    x: null,
    linkedin: null,
    snapchat: "https://www.snapchat.com/add/almubtakirah4"
  },
  tax: {
    vatNumber: null
  }
};
(_i = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _i.call(globalThis, "src/services/settingsService.ts");
let cachedSettings = siteConfig;
async function fetchSiteSettings() {
  try {
    const { data, error } = await supabase.from("site_settings").select("key, value");
    if (error || !data || data.length === 0) {
      return cachedSettings;
    }
    const settingsMap = {};
    for (const row of data) {
      settingsMap[row.key] = row.value;
    }
    const companyData = settingsMap["company"] || {};
    const contactData = settingsMap["contact"] || {};
    const socialData = settingsMap["social"] || {};
    const taxData = settingsMap["tax"] || {};
    const phones = Array.isArray(contactData.phones) ? contactData.phones : siteConfig.contact.phones;
    const unifiedNumber = typeof contactData.unified_number === "string" && contactData.unified_number || siteConfig.contact.unifiedNumber;
    const whatsapp = typeof contactData.whatsapp === "string" && contactData.whatsapp || siteConfig.contact.whatsapp;
    const mergedSettings = {
      company: {
        nameAr: companyData.name_ar || siteConfig.company.nameAr,
        nameEn: companyData.name_en || siteConfig.company.nameEn,
        sloganAr: companyData.slogan_ar || siteConfig.company.sloganAr,
        sloganEn: siteConfig.company.sloganEn,
        taglineAr: siteConfig.company.taglineAr,
        taglineEn: siteConfig.company.taglineEn,
        crNumber: companyData.cr_number || siteConfig.company.crNumber,
        accreditationAr: siteConfig.company.accreditationAr,
        accreditationEn: siteConfig.company.accreditationEn,
        domain: siteConfig.company.domain
      },
      contact: {
        phones,
        phoneDisplay: phones.map((p) => {
          if (p === "+966124231773") return "+966 12 423 1773";
          if (p === "+966559557459") return "+966 55 955 7459";
          return p;
        }),
        whatsapp,
        whatsappDisplay: "+966 55 955 7459",
        unifiedNumber,
        unifiedDisplay: unifiedNumber.length === 9 ? `${unifiedNumber[0]} ${unifiedNumber.slice(1, 5)} ${unifiedNumber.slice(5)}` : unifiedNumber,
        email: typeof contactData.email === "string" && contactData.email || siteConfig.contact.email,
        cityAr: companyData.city_ar || siteConfig.contact.cityAr,
        cityEn: companyData.city_en || siteConfig.contact.cityEn,
        addressAr: contactData.address_ar || siteConfig.contact.addressAr,
        addressEn: contactData.address_en || siteConfig.contact.addressEn,
        shortAddress: contactData.short_address || siteConfig.contact.shortAddress,
        workingHoursAr: contactData.working_hours_ar ?? null,
        workingHoursEn: contactData.working_hours_en ?? null,
        mapUrl: contactData.map_url ?? null
      },
      social: {
        instagram: socialData.instagram || siteConfig.social.instagram,
        tiktok: socialData.tiktok || siteConfig.social.tiktok,
        x: socialData.x || siteConfig.social.x,
        linkedin: socialData.linkedin || siteConfig.social.linkedin,
        snapchat: socialData.snapchat || siteConfig.social.snapchat
      },
      tax: {
        vatNumber: taxData.vat_number ?? null
      }
    };
    cachedSettings = mergedSettings;
    return mergedSettings;
  } catch {
    return cachedSettings;
  }
}
function getCachedSiteSettings() {
  return cachedSettings;
}
(_j = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _j.call(globalThis, "src/hooks/useSiteSettings.ts");
const SITE_SETTINGS_QUERY_KEY = ["site_settings"];
function useSiteSettings() {
  const { data } = useQuery({
    queryKey: SITE_SETTINGS_QUERY_KEY,
    queryFn: fetchSiteSettings,
    initialData: getCachedSiteSettings(),
    staleTime: 1e3 * 60 * 15
    // 15 minutes client cache
  });
  return data ?? getCachedSiteSettings();
}
(_k = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _k.call(globalThis, "src/lib/gsap.ts");
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}
const ANIMATION_TOKENS = {
  duration: {
    normal: 0.45,
    hero: 0.8
  },
  ease: {
    out: "power2.out"
  },
  distance: {
    sm: 16,
    md: 24
  },
  stagger: {
    normal: 0.08,
    slow: 0.12
  }
};
const prefersReducedMotion = () => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};
(_l = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _l.call(globalThis, "src/components/layout/MobileNav.tsx");
const MobileNav = ({
  isOpen,
  onClose,
  isEn = false
}) => {
  const { t } = useTranslation();
  const settings = useSiteSettings();
  const prefix = isEn ? "/en" : "";
  const navContainerRef = useRef(null);
  useGSAP(
    () => {
      if (!isOpen || typeof window === "undefined") return;
      if (prefersReducedMotion()) return;
      const items = gsap.utils.toArray(".mobile-nav-item");
      if (items.length > 0) {
        gsap.from(items, {
          opacity: 0,
          x: isEn ? -14 : 14,
          duration: 0.28,
          stagger: 0.04,
          ease: "power2.out",
          clearProps: "transform,opacity"
        });
      }
    },
    { scope: navContainerRef, dependencies: [isOpen] }
  );
  const navItems = [
    { label: t("nav.home"), to: prefix || "/" },
    { label: t("nav.about"), to: `${prefix}/about` },
    { label: t("nav.services"), to: `${prefix}/services` },
    { label: t("nav.works"), to: `${prefix}/works` },
    { label: t("nav.blog"), to: `${prefix}/blog` },
    { label: t("nav.contact"), to: `${prefix}/contact` }
  ];
  const switchLanguagePath = isEn ? "/" : "/en";
  return /* @__PURE__ */ jsx(Drawer, { isOpen, onClose, placement: "start", children: /* @__PURE__ */ jsxs("div", { ref: navContainerRef, className: "flex flex-col h-full justify-between", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-brand-900 p-4 rounded-control flex items-center justify-center", children: /* @__PURE__ */ jsx(Logo, { size: "header", theme: "dark" }) }),
      /* @__PURE__ */ jsx("nav", { "aria-label": "قائمة الجوال", children: /* @__PURE__ */ jsx("ul", { className: "flex flex-col space-y-1", children: navItems.map((item) => /* @__PURE__ */ jsx("li", { className: "mobile-nav-item", children: /* @__PURE__ */ jsx(
        NavLink,
        {
          to: item.to,
          onClick: onClose,
          className: ({ isActive }) => `flex items-center px-4 py-3 rounded-control text-base font-medium transition-colors ${isActive ? "bg-brand-50 text-brand-900 font-bold" : "text-content-body hover:bg-surface-soft hover:text-brand-900"}`,
          children: item.label
        }
      ) }, item.to)) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-surface-border flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: `${prefix}/contact`,
          onClick: onClose,
          className: "flex items-center justify-center gap-2 w-full py-3 px-4 rounded-control bg-brand-500 text-white font-semibold text-sm hover:bg-brand-400 transition-colors shadow-sm",
          children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-brand-100", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("span", { children: t("actions.bookConsultation") })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: `tel:${settings.contact.unifiedNumber}`,
          className: "flex items-center justify-center gap-2 w-full py-3 px-4 rounded-control bg-brand-900 text-white font-semibold text-sm hover:bg-brand-800 transition-colors",
          children: [
            /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 text-brand-400", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("span", { children: settings.contact.unifiedDisplay })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: `https://wa.me/${settings.contact.whatsapp}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "flex items-center justify-center gap-2 w-full py-3 px-4 rounded-control bg-whatsapp text-white font-semibold text-sm hover:bg-whatsapp-hover transition-colors",
          children: /* @__PURE__ */ jsx("span", { children: "WhatsApp" })
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: switchLanguagePath,
          onClick: onClose,
          className: "flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-control border border-surface-border text-content-body text-sm font-medium hover:bg-surface-soft transition-colors mt-2",
          children: [
            /* @__PURE__ */ jsx(Globe, { className: "w-4 h-4 text-brand-600", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("span", { children: t("actions.switchLanguage") })
          ]
        }
      )
    ] })
  ] }) });
};
(_m = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _m.call(globalThis, "src/components/layout/Header.tsx");
const Header = () => {
  const { t } = useTranslation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();
  const isEn = location.pathname.startsWith("/en");
  const prefix = isEn ? "/en" : "";
  const navItems = [
    { label: t("nav.home"), to: prefix || "/" },
    { label: t("nav.about"), to: `${prefix}/about` },
    { label: t("nav.services"), to: `${prefix}/services` },
    { label: t("nav.works"), to: `${prefix}/works` },
    { label: t("nav.blog"), to: `${prefix}/blog` },
    { label: t("nav.contact"), to: `${prefix}/contact` }
  ];
  const targetLanguagePath = isEn ? location.pathname.replace(/^\/en/, "") || "/" : `/en${location.pathname === "/" ? "" : location.pathname}`;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-40 bg-brand-900 border-b border-brand-800 shadow-header select-none transition-shadow duration-200", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-20", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(
        Logo,
        {
          variant: "horizontal",
          theme: "dark",
          size: "header",
          to: prefix || "/"
        }
      ) }),
      /* @__PURE__ */ jsx(
        "nav",
        {
          className: "hidden lg:flex flex-1 items-center justify-center gap-1 xl:gap-2 px-4",
          "aria-label": "القائمة الرئيسية",
          children: navItems.map((item) => /* @__PURE__ */ jsx(
            NavLink,
            {
              to: item.to,
              end: item.to === "/" || item.to === "/en",
              className: ({ isActive }) => `px-3.5 py-2 rounded-control text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${isActive ? "text-brand-400 font-bold bg-white/5" : "text-white/90 hover:text-white hover:bg-white/10"}`,
              children: item.label
            },
            item.to
          ))
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: targetLanguagePath,
            className: "hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-control text-xs font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors border border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
            "aria-label": t("actions.switchLanguage"),
            children: [
              /* @__PURE__ */ jsx(
                Globe,
                {
                  className: "w-3.5 h-3.5 text-brand-400",
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsx("span", { children: t("actions.switchLanguage") })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: `${prefix}/contact`,
            className: "hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-control text-sm font-semibold bg-brand-500 hover:bg-brand-400 text-white transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
            children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-brand-100", "aria-hidden": "true" }),
              /* @__PURE__ */ jsx("span", { children: t("actions.bookConsultation") })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setIsMobileNavOpen(true),
            className: "lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-control text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
            "aria-label": t("actions.openMenu"),
            children: /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6", "aria-hidden": "true" })
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx(
      MobileNav,
      {
        isOpen: isMobileNavOpen,
        onClose: () => setIsMobileNavOpen(false),
        isEn
      }
    )
  ] });
};
const logoIconWhite = "/assets/logo-icon-white-DdxIR6Qn.webp";
(_n = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _n.call(globalThis, "src/components/ui/BrandPattern.tsx");
const BrandPattern = ({
  className = "",
  opacity = 0.08
}) => {
  const patternId = useId();
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className: `absolute inset-0 w-full h-full pointer-events-none select-none ${className}`,
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      style: { opacity },
      children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs(
          "pattern",
          {
            id: patternId,
            width: "140",
            height: "140",
            patternUnits: "userSpaceOnUse",
            children: [
              /* @__PURE__ */ jsx(
                "image",
                {
                  href: logoIconWhite,
                  x: "20",
                  y: "14",
                  width: "40",
                  height: "51",
                  preserveAspectRatio: "xMidYMid meet"
                }
              ),
              /* @__PURE__ */ jsx(
                "image",
                {
                  href: logoIconWhite,
                  x: "90",
                  y: "84",
                  width: "40",
                  height: "51",
                  preserveAspectRatio: "xMidYMid meet"
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("rect", { width: "100%", height: "100%", fill: `url(#${patternId})` })
      ]
    }
  );
};
(_o = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _o.call(globalThis, "src/components/ui/Dialog.tsx");
const Dialog = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "md",
  showCloseButton = true
}) => {
  const dialogRef = useRef(null);
  useFocusTrap(dialogRef, isOpen);
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl"
  }[maxWidth];
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": title ? "dialog-title" : void 0,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "fixed inset-0 bg-brand-900/60 backdrop-blur-sm animate-fade-in",
            onClick: onClose,
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: dialogRef,
            className: `relative w-full ${maxWidthClasses} bg-white rounded-card shadow-elevated p-6 z-10 my-8 text-start focus:outline-none animate-dialog-in`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4 mb-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  title && /* @__PURE__ */ jsx(
                    "h3",
                    {
                      id: "dialog-title",
                      className: "text-xl font-bold text-content-heading",
                      children: title
                    }
                  ),
                  description && /* @__PURE__ */ jsx("p", { className: "text-sm text-content-muted mt-1", children: description })
                ] }),
                showCloseButton && /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: onClose,
                    className: "text-content-muted hover:text-content-heading rounded-control p-1 hover:bg-surface-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
                    "aria-label": "إغلاق",
                    children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5", "aria-hidden": "true" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { children })
            ]
          }
        )
      ]
    }
  );
};
const crBadgeImg = "/assets/cr-badge-transparent-DCw37TVz.png";
const nationalAddressImg = "/assets/national-address-transparent-DbLZ5zMj.png";
(_p = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _p.call(globalThis, "src/components/layout/Footer.tsx");
const Footer = () => {
  const { t } = useTranslation();
  const settings = useSiteSettings();
  const location = useLocation();
  const isEn = location.pathname.startsWith("/en");
  const prefix = isEn ? "/en" : "";
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const [isCrModalOpen, setIsCrModalOpen] = useState(false);
  const [copiedCr, setCopiedCr] = useState(false);
  const quickLinks = [
    { label: t("nav.home"), to: prefix || "/" },
    { label: t("nav.about"), to: `${prefix}/about` },
    { label: t("nav.services"), to: `${prefix}/services` },
    { label: t("nav.works"), to: `${prefix}/works` },
    { label: t("nav.blog"), to: `${prefix}/blog` },
    { label: t("nav.contact"), to: `${prefix}/contact` },
    { label: isEn ? "Privacy Policy" : "سياسة الخصوصية", to: `${prefix}/privacy` }
  ];
  const serviceLinks = [
    {
      label: t("nav.servicesMenu.maintenance"),
      to: `${prefix}/services/elevator-maintenance`
    },
    {
      label: t("nav.servicesMenu.modernization"),
      to: `${prefix}/services/elevator-modernization`
    },
    {
      label: t("nav.servicesMenu.installation"),
      to: `${prefix}/services/elevator-installation`
    },
    {
      label: t("nav.servicesMenu.spareParts"),
      to: `${prefix}/services/elevator-spare-parts`
    },
    {
      label: t("nav.servicesMenu.escalators"),
      to: `${prefix}/services/escalators-moving-walkways`
    }
  ];
  const socialLinks = [
    settings.contact.whatsapp && {
      name: "WhatsApp",
      label: t("footer.social.whatsapp") || "WhatsApp",
      href: `https://wa.me/${settings.contact.whatsapp}`,
      icon: /* @__PURE__ */ jsx(
        "svg",
        {
          className: "w-4 h-4 fill-current",
          viewBox: "0 0 24 24",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
        }
      ),
      hoverClasses: "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]"
    },
    settings.social.tiktok && {
      name: "TikTok",
      label: t("footer.social.tiktok"),
      href: settings.social.tiktok,
      icon: /* @__PURE__ */ jsx(
        "svg",
        {
          className: "w-4 h-4 fill-current",
          viewBox: "0 0 24 24",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsx("path", { d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.86-4.49V8.59a8.27 8.27 0 0 0 4.84 1.56V6.69z" })
        }
      ),
      hoverClasses: "hover:bg-black hover:text-[#00f2fe] hover:border-[#fe2c55]"
    },
    settings.social.instagram && {
      name: "Instagram",
      label: t("footer.social.instagram"),
      href: settings.social.instagram,
      icon: /* @__PURE__ */ jsx(
        "svg",
        {
          className: "w-4 h-4 fill-current",
          viewBox: "0 0 24 24",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" })
        }
      ),
      hoverClasses: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent"
    },
    settings.social.snapchat && {
      name: "Snapchat",
      label: t("footer.social.snapchat"),
      href: settings.social.snapchat,
      icon: /* @__PURE__ */ jsx(
        "svg",
        {
          className: "w-4 h-4 fill-current",
          viewBox: "0 0 24 24",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsx("path", { d: "M12.002 2c-3.93 0-6.002 2.72-6.002 5.58 0 .84.28 1.83.69 2.58.11.2.14.3.06.49-.1.25-.56.93-.89 1.34-.35.43-.72.63-1.12.63-.3 0-.58-.1-.83-.28-.24-.18-.38-.25-.54-.25-.26 0-.5.22-.5.53 0 .7.81 1.42 1.63 1.83.47.23.94.36 1.4.38-.07.24-.1.49-.1.74 0 .37.1.72.29 1.05.3.52.84.86 1.47.93.38.04.77-.02 1.15-.17.38-.15.75-.36 1.14-.54.67-.32 1.25-.49 1.84-.49.58 0 1.17.17 1.84.49.39.18.76.39 1.14.54.38.15.77.21 1.15.17.63-.07 1.17-.41 1.47-.93.19-.33.29-.68.29-1.05 0-.25-.03-.5-.1-.74.46-.02.93-.15 1.4-.38.82-.41 1.63-1.13 1.63-1.83 0-.31-.24-.53-.5-.53-.16 0-.3.07-.54.25-.25.18-.53.28-.83.28-.4 0-.77-.2-1.12-.63-.33-.41-.79-1.09-.89-1.34-.08-.19-.05-.29.06-.49.41-.75.69-1.74.69-2.58 0-2.86-2.07-5.58-6-5.58z" })
        }
      ),
      hoverClasses: "hover:bg-[#FFFC00] hover:text-black hover:border-[#FFFC00]"
    },
    settings.social.x && {
      name: "X",
      label: t("footer.social.x"),
      href: settings.social.x,
      icon: /* @__PURE__ */ jsx(
        "svg",
        {
          className: "w-4 h-4 fill-current",
          viewBox: "0 0 24 24",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
        }
      ),
      hoverClasses: "hover:bg-black hover:text-white hover:border-black"
    },
    settings.social.linkedin && {
      name: "LinkedIn",
      label: t("footer.social.linkedin"),
      href: settings.social.linkedin,
      icon: /* @__PURE__ */ jsx(
        "svg",
        {
          className: "w-4 h-4 fill-current",
          viewBox: "0 0 24 24",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsx("path", { d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" })
        }
      ),
      hoverClasses: "hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5]"
    }
  ].filter(Boolean);
  const handleCopyCr = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(settings.company.crNumber);
      }
      setCopiedCr(true);
      setTimeout(() => setCopiedCr(false), 2e3);
    } catch {
    }
  };
  return /* @__PURE__ */ jsxs("footer", { className: "relative bg-brand-900 text-white overflow-hidden border-t border-brand-800", children: [
    /* @__PURE__ */ jsx(BrandPattern, { opacity: 0.05 }),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 py-14 md:py-16", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-4 flex flex-col gap-5", children: [
          /* @__PURE__ */ jsx(Logo, { variant: "horizontal", theme: "dark", size: "footer" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-brand-100/90 leading-relaxed max-w-sm", children: t("footer.aboutText") }),
          socialLinks.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-2.5 pt-1", children: socialLinks.map((item) => /* @__PURE__ */ jsx(
            "a",
            {
              href: item.href,
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": item.label,
              className: `w-9 h-9 rounded-full bg-brand-800/80 border border-brand-700/60 text-brand-200 flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${item.hoverClasses}`,
              children: item.icon
            },
            item.name
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-base font-bold text-amber-400 mb-5", children: t("footer.quickLinks") }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3 text-sm text-brand-100/90", children: quickLinks.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Link,
            {
              to: item.to,
              className: "hover:text-white transition-colors inline-block focus-visible:outline-none focus-visible:underline",
              children: item.label
            }
          ) }, item.to)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-3", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-base font-bold text-amber-400 mb-5", children: t("footer.servicesTitle") }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3 text-sm text-brand-100/90", children: serviceLinks.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Link,
            {
              to: item.to,
              className: "hover:text-white transition-colors inline-block focus-visible:outline-none focus-visible:underline",
              children: item.label
            }
          ) }, item.to)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-3 flex flex-col", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-base font-bold text-amber-400 mb-5", children: t("footer.contactTitle") }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-3.5 text-sm text-brand-100/90", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: `mailto:${settings.contact.email}`,
                className: "group flex items-center gap-3 hover:text-white transition-colors focus-visible:outline-none focus-visible:underline",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-brand-800/90 border border-brand-700/60 flex items-center justify-center shrink-0 text-amber-400 group-hover:bg-amber-400 group-hover:text-brand-950 transition-all duration-200", children: /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4", "aria-hidden": "true" }) }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium group-hover:text-white transition-colors text-xs sm:text-sm", children: settings.contact.email })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: `tel:${settings.contact.unifiedNumber}`,
                className: "group flex items-center gap-3 hover:text-white transition-colors focus-visible:outline-none focus-visible:underline",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-brand-800/90 border border-brand-700/60 flex items-center justify-center shrink-0 text-amber-400 group-hover:bg-amber-400 group-hover:text-brand-950 transition-all duration-200", children: /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4", "aria-hidden": "true" }) }),
                  /* @__PURE__ */ jsx("span", { dir: "ltr", className: "font-medium group-hover:text-white transition-colors", children: settings.contact.unifiedDisplay })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-brand-100/90", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-brand-800/90 border border-brand-700/60 flex items-center justify-center shrink-0 text-amber-400", children: /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4", "aria-hidden": "true" }) }),
              /* @__PURE__ */ jsx("span", { className: "font-medium text-xs sm:text-sm leading-relaxed", children: isEn ? "Jeddah - As Salamah Dist. - Nahdah East St." : "جدة - حي السلامة - شارع نهضة الشرق" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "pt-6 mt-6 border-t border-brand-800/60 flex items-center gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1.5 text-center", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setIsCrModalOpen(true),
                  className: "w-12 h-12 rounded-full bg-white shadow-md border border-white/80 p-1.5 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group/cr overflow-hidden",
                  "aria-label": t("footer.crLabel"),
                  title: `${t("footer.crLabel")}: ${settings.company.crNumber}`,
                  children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: crBadgeImg,
                      alt: t("footer.crLabel"),
                      width: 44,
                      height: 44,
                      loading: "lazy",
                      decoding: "async",
                      className: "w-full h-full object-contain filter group-hover/cr:scale-105 transition-transform"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setIsCrModalOpen(true),
                  className: "text-xs text-brand-100 hover:text-white transition-colors font-medium text-center focus-visible:outline-none",
                  children: t("footer.crLabel")
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1.5 text-center", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "/documents/national-address.pdf",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-12 h-12 rounded-full bg-white shadow-md border border-white/80 p-1.5 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group/pdf overflow-hidden",
                  "aria-label": t("footer.viewNationalAddressPdf"),
                  title: `${t("footer.viewNationalAddressPdf")} (${settings.contact.shortAddress || "JESA2523"})`,
                  children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: nationalAddressImg,
                      alt: t("footer.nationalAddress"),
                      width: 44,
                      height: 44,
                      loading: "lazy",
                      decoding: "async",
                      className: "w-full h-full object-contain filter group-hover/pdf:scale-105 transition-transform"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "/documents/national-address.pdf",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-xs text-brand-100 hover:text-white transition-colors font-medium text-center focus-visible:outline-none",
                  children: t("footer.nationalAddress")
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-14 pt-8 border-t border-brand-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-200", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3 text-center sm:text-start", children: [
          /* @__PURE__ */ jsx("span", { children: settings.company.crNumber ? `السجل التجاري رقم ${settings.company.crNumber}` : "" }),
          /* @__PURE__ */ jsx("span", { children: "•" }),
          /* @__PURE__ */ jsx("span", { children: isEn ? settings.company.accreditationEn : settings.company.accreditationAr }),
          /* @__PURE__ */ jsx("span", { children: "•" }),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "/documents/national-address.pdf",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "hover:text-white transition-colors underline-offset-4 hover:underline",
              children: [
                t("footer.nationalAddress"),
                ": ",
                settings.contact.shortAddress || "JESA2523"
              ]
            }
          ),
          /* @__PURE__ */ jsx("span", { children: "•" }),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: `${prefix}/privacy`,
              className: "hover:text-white transition-colors underline-offset-4 hover:underline",
              children: isEn ? "Privacy Policy" : "سياسة الخصوصية"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-center sm:text-end", children: /* @__PURE__ */ jsxs("p", { children: [
          "© ",
          currentYear,
          " ",
          isEn ? settings.company.nameEn : settings.company.nameAr,
          ".",
          " ",
          t("footer.rights"),
          "."
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      Dialog,
      {
        isOpen: isCrModalOpen,
        onClose: () => setIsCrModalOpen(false),
        maxWidth: "md",
        showCloseButton: true,
        children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3.5 pb-4 border-b border-surface-border", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-white border border-surface-border p-1.5 flex items-center justify-center shrink-0 shadow-2xs", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: crBadgeImg,
                alt: isEn ? "Ministry of Commerce" : "وزارة التجارة",
                className: "w-full h-full object-contain"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-content-heading", children: t("footer.crModalTitle") }),
              /* @__PURE__ */ jsxs("span", { className: "text-xs text-emerald-700 font-semibold flex items-center gap-1 mt-0.5", children: [
                /* @__PURE__ */ jsx(ShieldCheck, { className: "w-3.5 h-3.5", "aria-hidden": "true" }),
                /* @__PURE__ */ jsx("span", { children: isEn ? "Active & Verified" : "سجل تجاري موثق وقائم" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3.5 text-sm", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-content-body leading-relaxed", children: t("footer.crModalDesc") }),
            /* @__PURE__ */ jsxs("div", { className: "p-3.5 rounded-xl bg-surface-soft border border-surface-border flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-[11px] text-content-muted block font-medium", children: t("footer.crLabel") }),
                /* @__PURE__ */ jsx("span", { dir: "ltr", className: "font-mono text-base font-bold text-content-heading", children: settings.company.crNumber })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: handleCopyCr,
                  className: "px-3 py-1.5 rounded-lg border border-surface-border bg-white text-xs font-semibold text-content-heading hover:bg-surface-soft transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer",
                  children: copiedCr ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-emerald-600" }),
                    /* @__PURE__ */ jsx("span", { className: "text-emerald-600", children: t("footer.copied") })
                  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(Copy, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsx("span", { children: isEn ? "Copy" : "نسخ" })
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-3.5 rounded-xl bg-surface-soft border border-surface-border space-y-2 text-xs", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-content-muted", children: [
                  isEn ? "Company" : "اسم المنشأة",
                  ":"
                ] }),
                /* @__PURE__ */ jsx("span", { className: "font-bold text-content-heading", children: isEn ? settings.company.nameEn : settings.company.nameAr })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-content-muted", children: [
                  isEn ? "Accreditation" : "الاعتماد الحكومي",
                  ":"
                ] }),
                /* @__PURE__ */ jsx("span", { className: "font-bold text-emerald-700", children: isEn ? settings.company.accreditationEn : settings.company.accreditationAr })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-content-muted", children: [
                  isEn ? "Headquarters" : "المركز الرئيسي",
                  ":"
                ] }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-content-heading", children: isEn ? settings.contact.cityEn : settings.contact.cityAr })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-content-muted", children: [
                  isEn ? "National Address" : "العنوان الوطني",
                  ":"
                ] }),
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "/documents/national-address.pdf",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "font-mono font-bold text-brand-600 hover:underline flex items-center gap-1.5",
                    children: [
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: nationalAddressImg,
                          alt: "",
                          className: "w-4 h-4 object-contain inline-block"
                        }
                      ),
                      /* @__PURE__ */ jsx("span", { children: settings.contact.shortAddress || "JESA2523" }),
                      /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3" })
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-4 border-t border-surface-border flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "/documents/national-address.pdf",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 underline underline-offset-2",
                children: [
                  /* @__PURE__ */ jsx(FileText, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsx("span", { children: t("footer.viewNationalAddressPdf") })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setIsCrModalOpen(false),
                className: "px-4 py-2 rounded-xl bg-brand-900 text-white text-xs font-semibold hover:bg-brand-800 transition-colors cursor-pointer",
                children: isEn ? "Close" : "إغلاق"
              }
            )
          ] })
        ] })
      }
    )
  ] });
};
(_q = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _q.call(globalThis, "src/components/layout/FloatingContact.tsx");
const FloatingContact = () => {
  const settings = useSiteSettings();
  return /* @__PURE__ */ jsxs(
    "aside",
    {
      "aria-label": "قنوات التواصل السريع",
      className: "fixed bottom-6 right-6 z-50 flex flex-col gap-3 print:hidden",
      children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: `https://wa.me/${settings.contact.whatsapp}`,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": "تواصل معنا عبر واتساب",
            className: "group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-7 h-7 fill-white",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: `tel:${settings.contact.unifiedNumber}`,
            "aria-label": "اتصل بنا الآن",
            className: "group flex items-center justify-center w-14 h-14 rounded-full bg-brand-900 text-white border-2 border-brand-400/60 shadow-xl hover:shadow-2xl hover:bg-brand-800 hover:scale-110 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-400/50",
            children: /* @__PURE__ */ jsx(Phone, { className: "w-6 h-6 text-brand-400 group-hover:rotate-12 transition-transform duration-300", "aria-hidden": "true" })
          }
        )
      ]
    }
  );
};
(_r = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _r.call(globalThis, "src/components/layout/SkipToContent.tsx");
const SkipToContent = () => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsx(
    "a",
    {
      href: "#main-content",
      className: "sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-900 focus:text-white focus:rounded-control focus:shadow-elevated focus:outline-none focus:ring-2 focus:ring-brand-400",
      children: t("actions.skipToContent")
    }
  );
};
(_s = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _s.call(globalThis, "src/components/ui/Button.tsx");
const Button = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  href,
  to,
  target,
  rel,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-control transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 select-none whitespace-nowrap";
  const sizeClasses = {
    sm: "text-sm px-3.5 py-1.5 gap-1.5 min-h-[36px]",
    md: "text-base px-5 py-2.5 gap-2 min-h-[44px]",
    lg: "text-lg px-7 py-3.5 gap-2.5 min-h-[52px]"
  }[size];
  const hasCustomBg = /\bbg-/.test(className);
  const variantClasses = {
    primary: hasCustomBg ? "text-white border border-transparent shadow-sm" : "bg-brand-900 text-white hover:bg-brand-800 active:bg-brand-900 border border-transparent shadow-sm",
    secondary: "bg-transparent text-brand-600 border border-brand-600 hover:bg-brand-50 active:bg-brand-100",
    ghost: "bg-transparent text-content-body hover:bg-surface-soft hover:text-brand-900 active:bg-surface-border",
    whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-hover active:bg-whatsapp shadow-sm border border-transparent",
    inverse: "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/35 active:bg-white/25 shadow-xs font-semibold",
    hero: "bg-brand-500 text-white hover:bg-brand-400 active:bg-brand-600 border border-brand-400/30 shadow-md font-semibold"
  }[variant];
  const widthClass = fullWidth ? "w-full" : "";
  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass} ${className}`.trim();
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    isLoading ? /* @__PURE__ */ jsx(
      Loader2,
      {
        className: "w-4 h-4 animate-spin text-current",
        "aria-hidden": "true"
      }
    ) : leftIcon,
    /* @__PURE__ */ jsx("span", { className: "inline-flex items-center gap-1.5", children }),
    !isLoading && rightIcon
  ] });
  if (to) {
    return /* @__PURE__ */ jsx(Link, { to, className: combinedClasses, children: content });
  }
  if (href) {
    return /* @__PURE__ */ jsx(
      "a",
      {
        href,
        target,
        rel: rel ?? (target === "_blank" ? "noopener noreferrer" : void 0),
        className: combinedClasses,
        children: content
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: combinedClasses,
      disabled: disabled || isLoading,
      "aria-busy": isLoading,
      ...props,
      children: content
    }
  );
};
(_t = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _t.call(globalThis, "src/components/ui/Input.tsx");
const Input = forwardRef(
  ({ error = false, leftIcon, rightIcon, className = "", disabled, ...props }, ref) => {
    return /* @__PURE__ */ jsxs("div", { className: "relative flex items-center w-full", children: [
      leftIcon && /* @__PURE__ */ jsx("div", { className: "absolute start-3 pointer-events-none text-content-muted flex items-center", children: leftIcon }),
      /* @__PURE__ */ jsx(
        "input",
        {
          ref,
          disabled,
          className: `w-full min-h-[44px] px-3.5 py-2.5 rounded-control text-base bg-white text-content-body border transition-colors duration-150 placeholder:text-content-muted/60 focus-visible:outline-none focus-visible:ring-2 disabled:bg-surface-soft disabled:text-content-muted disabled:cursor-not-allowed ${leftIcon ? "ps-10" : ""} ${rightIcon ? "pe-10" : ""} ${error ? "border-feedback-error focus-visible:ring-feedback-error/30" : "border-surface-border hover:border-brand-300 focus-visible:border-brand-600 focus-visible:ring-brand-400/30"} ${className}`.trim(),
          ...props
        }
      ),
      rightIcon && /* @__PURE__ */ jsx("div", { className: "absolute end-3 pointer-events-none text-content-muted flex items-center", children: rightIcon })
    ] });
  }
);
Input.displayName = "Input";
(_u = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _u.call(globalThis, "src/components/ui/Textarea.tsx");
const Textarea = forwardRef(
  ({ error = false, className = "", disabled, rows = 4, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        ref,
        rows,
        disabled,
        className: `w-full px-3.5 py-2.5 rounded-control text-base bg-white text-content-body border transition-colors duration-150 placeholder:text-content-muted/60 focus-visible:outline-none focus-visible:ring-2 disabled:bg-surface-soft disabled:text-content-muted disabled:cursor-not-allowed resize-y ${error ? "border-feedback-error focus-visible:ring-feedback-error/30" : "border-surface-border hover:border-brand-300 focus-visible:border-brand-600 focus-visible:ring-brand-400/30"} ${className}`.trim(),
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
(_v = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _v.call(globalThis, "src/components/ui/Select.tsx");
const Select = forwardRef(
  ({ options, placeholder, error = false, className = "", disabled, ...props }, ref) => {
    return /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
      /* @__PURE__ */ jsxs(
        "select",
        {
          ref,
          disabled,
          className: `w-full min-h-[44px] ps-3.5 pe-10 py-2.5 rounded-control text-base bg-white text-content-body border transition-colors duration-150 appearance-none focus-visible:outline-none focus-visible:ring-2 disabled:bg-surface-soft disabled:text-content-muted disabled:cursor-not-allowed ${error ? "border-feedback-error focus-visible:ring-feedback-error/30" : "border-surface-border hover:border-brand-300 focus-visible:border-brand-600 focus-visible:ring-brand-400/30"} ${className}`.trim(),
          ...props,
          children: [
            placeholder && /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: placeholder }),
            options.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.value, disabled: opt.disabled, children: opt.label }, opt.value))
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none text-content-muted flex items-center", children: /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4", "aria-hidden": "true" }) })
    ] });
  }
);
Select.displayName = "Select";
(_w = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _w.call(globalThis, "src/components/ui/FormField.tsx");
const FormField = ({
  label,
  htmlFor,
  error,
  helperText,
  hint,
  required = false,
  optional = false,
  optionalLabel,
  className = "",
  children
}) => {
  const displayHelper = hint || helperText;
  const displayOptional = optional ? "اختياري" : optionalLabel;
  return /* @__PURE__ */ jsxs("div", { className: `flex flex-col gap-1.5 ${className}`, children: [
    label && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm", children: [
      /* @__PURE__ */ jsxs("label", { htmlFor, className: "font-medium text-content-heading", children: [
        label,
        required && /* @__PURE__ */ jsx("span", { className: "text-feedback-error ms-1", children: "*" })
      ] }),
      !required && displayOptional && /* @__PURE__ */ jsx("span", { className: "text-xs text-content-muted", children: displayOptional })
    ] }),
    /* @__PURE__ */ jsx("div", { children }),
    error ? /* @__PURE__ */ jsx(
      "p",
      {
        className: "text-xs text-feedback-error flex items-center gap-1 mt-0.5",
        role: "alert",
        children: error
      }
    ) : displayHelper ? /* @__PURE__ */ jsx("p", { className: "text-xs text-content-muted mt-0.5 leading-relaxed", children: displayHelper }) : null
  ] });
};
(_x = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _x.call(globalThis, "src/components/ui/Accordion.tsx");
const Accordion = ({
  items,
  allowMultiple = false,
  defaultOpenIndex,
  className = ""
}) => {
  const baseId = useId();
  const [openIndices, setOpenIndices] = useState(
    () => defaultOpenIndex !== void 0 ? [defaultOpenIndex] : []
  );
  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenIndices(
        (prev) => prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => prev.includes(index) ? [] : [index]);
    }
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `divide-y divide-surface-border border border-surface-border rounded-card bg-white overflow-hidden shadow-sm ${className}`,
      children: items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        const headerId = `${baseId}-header-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return /* @__PURE__ */ jsxs("div", { className: "transition-colors", children: [
          /* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              id: headerId,
              "aria-expanded": isOpen,
              "aria-controls": panelId,
              onClick: () => toggleItem(index),
              className: "w-full flex items-center justify-between p-4 sm:p-5 text-start font-semibold text-content-heading hover:text-brand-600 transition-colors focus-visible:outline-none focus-visible:bg-surface-soft",
              children: [
                /* @__PURE__ */ jsx("span", { children: item.title }),
                /* @__PURE__ */ jsx(
                  ChevronDown,
                  {
                    className: `w-5 h-5 text-content-muted transition-transform duration-200 shrink-0 ms-2 ${isOpen ? "rotate-180 text-brand-600" : ""}`,
                    "aria-hidden": "true"
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsx(
            "div",
            {
              id: panelId,
              role: "region",
              "aria-labelledby": headerId,
              className: `grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`,
              children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "px-4 sm:px-5 pb-5 pt-1 text-content-body text-base leading-relaxed", children: item.content }) })
            }
          )
        ] }, item.id || index);
      })
    }
  );
};
(_y = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _y.call(globalThis, "src/components/ui/Badge.tsx");
const Badge = ({
  variant = "default",
  size = "md",
  icon,
  children,
  className = "",
  ...props
}) => {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5"
  }[size];
  const variantClasses = {
    default: "bg-brand-50 text-brand-900 border border-brand-200",
    brand: "bg-brand-900 text-white border border-brand-800",
    success: "bg-green-50 text-feedback-success border border-green-200",
    error: "bg-red-50 text-feedback-error border border-red-200",
    warning: "bg-amber-50 text-feedback-warning border border-amber-200",
    neutral: "bg-surface-soft text-content-body border border-surface-border"
  }[variant];
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: `inline-flex items-center font-medium rounded-full select-none ${sizeClasses} ${variantClasses} ${className}`.trim(),
      ...props,
      children: [
        icon,
        /* @__PURE__ */ jsx("span", { children })
      ]
    }
  );
};
(_z = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _z.call(globalThis, "src/components/ui/ToastContext.ts");
const ToastContext = createContext(
  void 0
);
const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
(_A = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _A.call(globalThis, "src/components/ui/Toast.tsx");
const ToastProvider = ({
  children
}) => {
  const [toasts, setToasts] = useState([]);
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  const showToast = useCallback(
    ({ type, title, message }) => {
      const id = Math.random().toString(36).slice(2, 9);
      setToasts((prev) => [...prev, { id, type, title, message }]);
      setTimeout(() => {
        removeToast(id);
      }, 5e3);
    },
    [removeToast]
  );
  const success = useCallback(
    (title, message) => {
      showToast({ type: "success", title, message });
    },
    [showToast]
  );
  const error = useCallback(
    (title, message) => {
      showToast({ type: "error", title, message });
    },
    [showToast]
  );
  const info = useCallback(
    (title, message) => {
      showToast({ type: "info", title, message });
    },
    [showToast]
  );
  return /* @__PURE__ */ jsxs(ToastContext.Provider, { value: { showToast, success, error, info }, children: [
    children,
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed bottom-4 end-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none p-4",
        "aria-live": "polite",
        children: toasts.map((toast) => /* @__PURE__ */ jsxs(
          "div",
          {
            role: "status",
            className: "pointer-events-auto flex items-start gap-3 p-4 rounded-control bg-white shadow-elevated border border-surface-border animate-slide-up",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "shrink-0 mt-0.5", children: [
                toast.type === "success" && /* @__PURE__ */ jsx(
                  CheckCircle2,
                  {
                    className: "w-5 h-5 text-feedback-success",
                    "aria-hidden": "true"
                  }
                ),
                toast.type === "error" && /* @__PURE__ */ jsx(
                  AlertCircle,
                  {
                    className: "w-5 h-5 text-feedback-error",
                    "aria-hidden": "true"
                  }
                ),
                toast.type === "info" && /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-brand-600", "aria-hidden": "true" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 text-sm", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-semibold text-content-heading", children: toast.title }),
                toast.message && /* @__PURE__ */ jsx("p", { className: "text-content-body mt-0.5 text-xs", children: toast.message })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => removeToast(toast.id),
                  className: "text-content-muted hover:text-content-heading rounded-control p-0.5 transition-colors focus-visible:outline-none",
                  "aria-label": "إغلاق التنبيه",
                  children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4", "aria-hidden": "true" })
                }
              )
            ]
          },
          toast.id
        ))
      }
    )
  ] });
};
(_B = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _B.call(globalThis, "src/components/ui/Pagination.tsx");
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  getPageUrl,
  isRtl = true,
  className = ""
}) => {
  if (totalPages <= 1) return null;
  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (currentPage > 3) {
      pages.push("ellipsis");
    }
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }
    pages.push(totalPages);
  }
  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      className: `flex items-center justify-center gap-1.5 ${className}`,
      "aria-label": "صفحات التنقل",
      children: [
        getPageUrl && !prevDisabled ? /* @__PURE__ */ jsx(
          Link,
          {
            to: getPageUrl(currentPage - 1),
            className: "inline-flex items-center justify-center w-10 h-10 rounded-control border border-surface-border bg-white text-content-body hover:bg-surface-soft hover:text-brand-900 transition-colors focus-visible:outline-none",
            "aria-label": "الصفحة السابقة",
            children: /* @__PURE__ */ jsx(PrevIcon, { className: "w-5 h-5", "aria-hidden": "true" })
          }
        ) : /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => onPageChange == null ? void 0 : onPageChange(currentPage - 1),
            disabled: prevDisabled,
            className: "inline-flex items-center justify-center w-10 h-10 rounded-control border border-surface-border bg-white text-content-body hover:bg-surface-soft hover:text-brand-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none",
            "aria-label": "الصفحة السابقة",
            children: /* @__PURE__ */ jsx(PrevIcon, { className: "w-5 h-5", "aria-hidden": "true" })
          }
        ),
        pages.map((p, idx) => {
          if (p === "ellipsis") {
            return /* @__PURE__ */ jsx(
              "span",
              {
                className: "inline-flex items-center justify-center w-8 h-10 text-content-muted",
                children: "…"
              },
              `ellipsis-${idx}`
            );
          }
          const isCurrent = p === currentPage;
          const itemClass = `inline-flex items-center justify-center min-w-[40px] h-10 px-3 rounded-control text-sm font-semibold transition-colors focus-visible:outline-none ${isCurrent ? "bg-brand-900 text-white" : "bg-white border border-surface-border text-content-body hover:bg-surface-soft hover:text-brand-900"}`;
          if (getPageUrl) {
            return /* @__PURE__ */ jsx(
              Link,
              {
                to: getPageUrl(p),
                "aria-current": isCurrent ? "page" : void 0,
                className: itemClass,
                children: p
              },
              p
            );
          }
          return /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => onPageChange == null ? void 0 : onPageChange(p),
              "aria-current": isCurrent ? "page" : void 0,
              className: itemClass,
              children: p
            },
            p
          );
        }),
        getPageUrl && !nextDisabled ? /* @__PURE__ */ jsx(
          Link,
          {
            to: getPageUrl(currentPage + 1),
            className: "inline-flex items-center justify-center w-10 h-10 rounded-control border border-surface-border bg-white text-content-body hover:bg-surface-soft hover:text-brand-900 transition-colors focus-visible:outline-none",
            "aria-label": "الصفحة التالية",
            children: /* @__PURE__ */ jsx(NextIcon, { className: "w-5 h-5", "aria-hidden": "true" })
          }
        ) : /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => onPageChange == null ? void 0 : onPageChange(currentPage + 1),
            disabled: nextDisabled,
            className: "inline-flex items-center justify-center w-10 h-10 rounded-control border border-surface-border bg-white text-content-body hover:bg-surface-soft hover:text-brand-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none",
            "aria-label": "الصفحة التالية",
            children: /* @__PURE__ */ jsx(NextIcon, { className: "w-5 h-5", "aria-hidden": "true" })
          }
        )
      ]
    }
  );
};
(_C = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _C.call(globalThis, "src/components/ui/Breadcrumbs.tsx");
const Breadcrumbs = ({
  items,
  isRtl = true,
  className = ""
}) => {
  const Separator = isRtl ? ChevronLeft : ChevronRight;
  const isDarkBanner = className.includes("text-white");
  return /* @__PURE__ */ jsx("nav", { "aria-label": "مسار التنقل", className: `text-sm ${className}`, children: /* @__PURE__ */ jsxs(
    "ol",
    {
      className: `flex flex-wrap items-center gap-1.5 ${isDarkBanner ? "text-white/80" : "text-content-muted"}`,
      children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          Link,
          {
            to: isRtl ? "/" : "/en",
            className: `flex items-center transition-colors focus-visible:outline-none ${isDarkBanner ? "text-white/80 hover:text-white" : "text-content-muted hover:text-brand-900"}`,
            "aria-label": "الرئيسية",
            children: /* @__PURE__ */ jsx(Home, { className: "w-4 h-4", "aria-hidden": "true" })
          }
        ) }),
        items.map((item, index) => {
          const isLast = index === items.length - 1;
          const targetUrl = item.to || item.href;
          return /* @__PURE__ */ jsxs(React.Fragment, { children: [
            /* @__PURE__ */ jsx(
              "li",
              {
                "aria-hidden": "true",
                className: `select-none ${isDarkBanner ? "text-white/40" : "text-surface-border"}`,
                children: /* @__PURE__ */ jsx(Separator, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsx("li", { children: isLast || !targetUrl ? /* @__PURE__ */ jsx(
              "span",
              {
                className: `font-semibold ${isDarkBanner ? "text-brand-300" : "text-content-heading"}`,
                "aria-current": isLast ? "page" : void 0,
                children: item.label
              }
            ) : /* @__PURE__ */ jsx(
              Link,
              {
                to: targetUrl,
                className: `transition-colors focus-visible:outline-none ${isDarkBanner ? "text-white/80 hover:text-white hover:underline" : "hover:text-brand-900"}`,
                children: item.label
              }
            ) })
          ] }, index);
        })
      ]
    }
  ) });
};
(_D = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _D.call(globalThis, "src/components/ui/SectionHeading.tsx");
const SectionHeading = ({
  kicker,
  title,
  intro,
  align = "start",
  theme = "light",
  level = "h2",
  className = ""
}) => {
  const isCenter = align === "center";
  const isDark = theme === "dark";
  const HeadingTag = level === "h1" ? "h1" : "h2";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `max-w-3xl mb-10 md:mb-14 ${isCenter ? "mx-auto text-center" : "text-start"} ${className}`,
      children: [
        kicker && /* @__PURE__ */ jsx(
          "span",
          {
            className: `inline-block text-xs md:text-sm font-semibold tracking-wider uppercase mb-2 ${isDark ? "text-brand-400" : "text-brand-600"}`,
            children: kicker
          }
        ),
        /* @__PURE__ */ jsx(
          HeadingTag,
          {
            className: `text-2xl md:text-4xl font-bold tracking-tight mb-4 ${isDark ? "text-white" : "text-content-heading"}`,
            children: title
          }
        ),
        intro && /* @__PURE__ */ jsx(
          "p",
          {
            className: `text-base md:text-lg leading-relaxed ${isDark ? "text-brand-100" : "text-content-body"}`,
            children: intro
          }
        )
      ]
    }
  );
};
(_E = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _E.call(globalThis, "src/components/ui/Section.tsx");
const Section = ({
  variant = "white",
  withPattern = false,
  patternOpacity,
  children,
  className = "",
  ...props
}) => {
  const variantClasses = {
    white: "bg-white text-content-body",
    soft: "bg-surface-soft text-content-body",
    dark: "bg-brand-900 text-white relative overflow-hidden"
  }[variant];
  const showPattern = withPattern || variant === "dark" && withPattern !== false;
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: `py-16 md:py-28 relative ${variantClasses} ${className}`,
      ...props,
      children: [
        showPattern && /* @__PURE__ */ jsx(BrandPattern, { opacity: patternOpacity }),
        /* @__PURE__ */ jsx("div", { className: "relative z-10", children })
      ]
    }
  );
};
(_F = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _F.call(globalThis, "src/lib/media.ts");
function getStoragePublicUrl(storagePath) {
  if (storagePath.startsWith("http://") || storagePath.startsWith("https://") || storagePath.startsWith("/")) {
    return storagePath;
  }
  return supabase.storage.from("media").getPublicUrl(storagePath).data.publicUrl;
}
function getImageProps(media, optionsOrAlt) {
  if (!media) return null;
  let fallbackAlt = "";
  let customSizes = void 0;
  if (typeof optionsOrAlt === "string") {
    fallbackAlt = optionsOrAlt;
  } else if (optionsOrAlt && typeof optionsOrAlt === "object") {
    fallbackAlt = optionsOrAlt.fallbackAlt ?? "";
    customSizes = optionsOrAlt.sizes;
  }
  if (typeof media === "string") {
    return {
      src: getStoragePublicUrl(media),
      alt: fallbackAlt,
      sizes: customSizes
    };
  }
  const src = getStoragePublicUrl(media.storage_path);
  const alt = media.alt_text || fallbackAlt;
  let srcSet = void 0;
  let parsedVariants = [];
  if (Array.isArray(media.variants)) {
    parsedVariants = media.variants;
  } else if (typeof media.variants === "string") {
    try {
      parsedVariants = JSON.parse(media.variants);
    } catch {
      parsedVariants = [];
    }
  }
  if (parsedVariants.length > 0) {
    const validVariants = parsedVariants.filter(
      (v) => typeof v.w === "number" && v.w > 0 && Boolean(v.path)
    );
    if (validVariants.length > 0) {
      const sorted = [...validVariants].sort((a, b) => a.w - b.w);
      srcSet = sorted.map((v) => `${getStoragePublicUrl(v.path)} ${v.w}w`).join(", ");
    }
  }
  return {
    src,
    srcSet,
    sizes: customSizes,
    width: media.width ?? void 0,
    height: media.height ?? void 0,
    alt
  };
}
(_G = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _G.call(globalThis, "src/components/ui/ResponsiveImage.tsx");
const ResponsiveImage = ({
  media,
  src: directSrc,
  srcSet: directSrcSet,
  alt: directAlt = "",
  priority = false,
  width,
  height,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  fallbackComponent,
  onError,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const derived = media ? getImageProps(media, directAlt) : null;
  const src = (derived == null ? void 0 : derived.src) || directSrc;
  const srcSet = (derived == null ? void 0 : derived.srcSet) || directSrcSet;
  const alt = (derived == null ? void 0 : derived.alt) ?? directAlt;
  const imgWidth = width ?? (derived == null ? void 0 : derived.width);
  const imgHeight = height ?? (derived == null ? void 0 : derived.height);
  if (!src || hasError) {
    if (fallbackComponent) {
      return /* @__PURE__ */ jsx(Fragment, { children: fallbackComponent });
    }
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: `bg-surface-subtle flex items-center justify-center text-content-muted ${className}`,
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsx("span", { className: "text-xs", children: "Image unavailable" })
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "img",
    {
      src,
      srcSet,
      sizes: srcSet ? sizes : void 0,
      alt,
      width: imgWidth,
      height: imgHeight,
      loading: priority ? "eager" : "lazy",
      decoding: priority ? "sync" : "async",
      ...priority ? { fetchpriority: "high" } : {},
      onError: (e) => {
        setHasError(true);
        onError == null ? void 0 : onError(e);
      },
      className,
      ...rest
    }
  );
};
(_H = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _H.call(globalThis, "src/components/ui/Lightbox.tsx");
const Lightbox = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate
}) => {
  const { i18n: i18n2 } = useTranslation();
  const isRtl = i18n2.dir() === "rtl";
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);
  const touchStartX = useRef(null);
  const currentImage = images[currentIndex];
  const total = images.length;
  const handleNext = useCallback(() => {
    if (total <= 1) return;
    onNavigate((currentIndex + 1) % total);
  }, [currentIndex, total, onNavigate]);
  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    onNavigate((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onNavigate]);
  useEffect(() => {
    var _a2, _b2, _c2;
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      (_a2 = dialogRef.current) == null ? void 0 : _a2.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      (_c2 = (_b2 = previousFocusRef.current) == null ? void 0 : _b2.focus) == null ? void 0 : _c2.call(_b2);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (isRtl) {
          handlePrev();
        } else {
          handleNext();
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (isRtl) {
          handleNext();
        } else {
          handlePrev();
        }
      } else if (e.key === "Tab") {
        if (!dialogRef.current) return;
        const focusableElements = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last == null ? void 0 : last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first == null ? void 0 : first.focus();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isRtl, handleNext, handlePrev, onClose]);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        if (isRtl) handleNext();
        else handlePrev();
      } else {
        if (isRtl) handlePrev();
        else handleNext();
      }
    }
  };
  if (!isOpen || !currentImage) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-label": isRtl ? "معرض الصور" : "Image gallery",
      ref: dialogRef,
      tabIndex: -1,
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md outline-none",
      onClick: onClose,
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "absolute top-0 inset-x-0 p-4 flex items-center justify-between text-white/90 z-10",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium tracking-wide", children: [
                currentIndex + 1,
                " / ",
                total
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  "aria-label": isRtl ? "إغلاق المعرض" : "Close gallery",
                  className: "p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
                  children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6", "aria-hidden": "true" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative max-w-5xl max-h-[85vh] w-full p-4 flex flex-col items-center justify-center",
            onClick: (e) => e.stopPropagation(),
            onTouchStart: handleTouchStart,
            onTouchEnd: handleTouchEnd,
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: currentImage.src,
                  alt: currentImage.alt || "",
                  className: "max-h-[80vh] max-w-full w-auto h-auto object-contain rounded-card shadow-2xl select-none"
                }
              ),
              currentImage.alt && /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-white/80 text-center max-w-2xl px-4 line-clamp-2", children: currentImage.alt })
            ]
          }
        ),
        total > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: (e) => {
                e.stopPropagation();
                handlePrev();
              },
              "aria-label": isRtl ? "الصورة السابقة" : "Previous image",
              className: "absolute start-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 z-10",
              children: isRtl ? /* @__PURE__ */ jsx(ChevronRight, { className: "w-6 h-6", "aria-hidden": "true" }) : /* @__PURE__ */ jsx(ChevronLeft, { className: "w-6 h-6", "aria-hidden": "true" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: (e) => {
                e.stopPropagation();
                handleNext();
              },
              "aria-label": isRtl ? "الصورة التالية" : "Next image",
              className: "absolute end-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 z-10",
              children: isRtl ? /* @__PURE__ */ jsx(ChevronLeft, { className: "w-6 h-6", "aria-hidden": "true" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "w-6 h-6", "aria-hidden": "true" })
            }
          )
        ] })
      ]
    }
  );
};
(_I = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _I.call(globalThis, "src/components/ui/index.ts");
(_J = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _J.call(globalThis, "src/hooks/useScrollReveal.ts");
const useScrollReveal = (options = {}) => {
  const containerRef = useRef(null);
  const {
    selector = "[data-reveal]",
    stagger = ANIMATION_TOKENS.stagger.normal,
    distance = ANIMATION_TOKENS.distance.sm,
    duration = ANIMATION_TOKENS.duration.normal,
    start = "top 88%",
    delay = 0,
    scrollTrigger = true,
    dependencies = []
  } = options;
  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      const isReduced = prefersReducedMotion();
      const elements = gsap.utils.toArray(selector);
      if (!elements || elements.length === 0) return;
      if (isReduced) {
        gsap.set(elements, { opacity: 1, y: 0 });
        return;
      }
      const animProps = {
        opacity: 0,
        y: distance,
        duration,
        stagger,
        delay,
        ease: ANIMATION_TOKENS.ease.out,
        clearProps: "transform,opacity"
      };
      if (scrollTrigger) {
        animProps.scrollTrigger = {
          trigger: containerRef.current,
          start,
          once: true
        };
      }
      gsap.from(elements, animProps);
    },
    {
      scope: containerRef,
      dependencies,
      revertOnUpdate: true
    }
  );
  return containerRef;
};
(_K = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _K.call(globalThis, "src/components/layout/CtaBand.tsx");
const CtaBand = ({
  title,
  subtitle,
  className = ""
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const isEn = location.pathname.startsWith("/en");
  const isRtl = !isEn;
  const contactPath = isEn ? "/en/contact" : "/contact";
  const revealRef = useScrollReveal({
    selector: "[data-cta-element]",
    stagger: 0.08,
    distance: 16,
    duration: 0.45
  });
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: revealRef,
      className: `relative overflow-hidden bg-brand-900 text-white py-16 md:py-20 mb-12 sm:mb-16 md:mb-20 border-b border-brand-800 shadow-sm ${className}`,
      "aria-label": title || t("home.ctaBandHeading"),
      children: [
        /* @__PURE__ */ jsx(BrandPattern, { opacity: 0.07 }),
        /* @__PURE__ */ jsx(Container, { className: "relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
          /* @__PURE__ */ jsx(
            "h2",
            {
              "data-cta-element": true,
              className: "text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4",
              children: title || t("home.ctaBandHeading")
            }
          ),
          /* @__PURE__ */ jsx(
            "p",
            {
              "data-cta-element": true,
              className: "text-base sm:text-lg text-brand-100 max-w-2xl mx-auto mb-8 font-normal leading-relaxed",
              children: subtitle || t("home.ctaBandSubtitle")
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              "data-cta-element": true,
              className: "flex flex-wrap items-center justify-center gap-3 sm:gap-4",
              children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "hero",
                    size: "lg",
                    to: contactPath,
                    rightIcon: isRtl ? /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" }),
                    children: t("actions.requestQuote")
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "inverse",
                    size: "lg",
                    to: `${contactPath}?service=consultation`,
                    leftIcon: /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-brand-300" }),
                    className: "font-semibold",
                    children: t("actions.bookConsultation")
                  }
                )
              ]
            }
          )
        ] }) })
      ]
    }
  );
};
(_L = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _L.call(globalThis, "src/components/layout/ScrollToTop.tsx");
const RADIUS = 21;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const ScrollToTop = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(Math.max(scrollTop / docHeight * 100, 0), 100);
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
      setIsVisible(scrollTop > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const strokeDashoffset = CIRCUMFERENCE - scrollProgress / 100 * CIRCUMFERENCE;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `fixed bottom-6 left-6 z-50 transition-all duration-300 print:hidden ${isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"}`,
      children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: handleScrollToTop,
          "aria-label": t("actions.scrollToTop", "العودة إلى أعلى الصفحة"),
          title: t("actions.scrollToTop", "العودة إلى أعلى الصفحة"),
          className: "relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-900 text-brand-400 shadow-elevated hover:bg-brand-800 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-400/50 group cursor-pointer",
          children: [
            /* @__PURE__ */ jsxs(
              "svg",
              {
                className: "absolute inset-0 w-full h-full -rotate-90 pointer-events-none",
                viewBox: "0 0 48 48",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsx(
                    "circle",
                    {
                      cx: "24",
                      cy: "24",
                      r: RADIUS,
                      className: "stroke-brand-400/20 group-hover:stroke-brand-400/30 transition-colors duration-300",
                      strokeWidth: "3",
                      fill: "none"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "circle",
                    {
                      cx: "24",
                      cy: "24",
                      r: RADIUS,
                      className: "stroke-brand-400 group-hover:stroke-brand-300 transition-[stroke-dashoffset,stroke] duration-150 ease-out",
                      strokeWidth: "3",
                      fill: "none",
                      strokeDasharray: CIRCUMFERENCE,
                      strokeDashoffset,
                      strokeLinecap: "round"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              ArrowUp,
              {
                className: "w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:-translate-y-1 relative z-10",
                "aria-hidden": "true",
                strokeWidth: 2.5
              }
            )
          ]
        }
      )
    }
  );
};
(_M = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _M.call(globalThis, "src/components/layout/index.ts");
(_N = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _N.call(globalThis, "src/lib/analytics.ts");
function initDataLayer() {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
  }
}
function trackEvent(event, payload) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    ...payload
  });
}
function updateConsentState(granted) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  const state = granted ? "granted" : "denied";
  window.dataLayer.push({
    event: "consent_update",
    analytics_storage: state,
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state
  });
}
(_O = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _O.call(globalThis, "src/components/analytics/CookieConsent.tsx");
const CONSENT_STORAGE_KEY = "almubtakirah_cookie_consent";
const CookieConsent = ({ isActive }) => {
  const { i18n: i18n2 } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const isEn = i18n2.language === "en";
  useEffect(() => {
    if (!isActive || typeof window === "undefined") return;
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) {
      setIsVisible(true);
    } else {
      updateConsentState(stored === "granted");
    }
  }, [isActive]);
  if (!isVisible || !isActive) return null;
  const handleAccept = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
    updateConsentState(true);
    setIsVisible(false);
  };
  const handleDecline = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, "denied");
    updateConsentState(false);
    setIsVisible(false);
  };
  return /* @__PURE__ */ jsx(
    "aside",
    {
      role: "dialog",
      "aria-live": "polite",
      "aria-label": isEn ? "Cookie Consent" : "إشعار ملفات تعريف الارتباط",
      className: "fixed bottom-4 start-4 end-4 md:start-6 md:end-auto md:max-w-md z-50 bg-white rounded-card shadow-elevated border border-surface-border p-5 text-start animate-fade-in print:hidden",
      children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "p-2 bg-brand-50 rounded-control text-brand-600 shrink-0", children: /* @__PURE__ */ jsx(ShieldCheck, { className: "w-5 h-5", "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-content-heading mb-1", children: isEn ? "Privacy & Analytics" : "الخصوصية وإحصاءات الاستخدام" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-content-muted leading-relaxed mb-4", children: isEn ? "We use analytical cookies to measure site traffic and improve elevator engineering services. No personal data is sold." : "نستخدم ملفات تعريف الارتباط التحليلية لقياس حركة المرور وتحسين خدماتنا الهندسية. لا يتم بيع أي بيانات شخصية." }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: handleAccept,
                className: "px-3 py-1.5 rounded-control text-xs font-semibold bg-brand-900 text-white hover:bg-brand-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
                children: isEn ? "Accept" : "موافق"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: handleDecline,
                className: "px-3 py-1.5 rounded-control text-xs font-semibold bg-surface-soft text-content-muted hover:text-content-heading hover:bg-surface-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
                children: isEn ? "Decline" : "رفض"
              }
            )
          ] })
        ] })
      ] })
    }
  );
};
(_P = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _P.call(globalThis, "src/components/analytics/AnalyticsProvider.tsx");
const AnalyticsProvider = ({ children }) => {
  const location = useLocation();
  const { i18n: i18n2 } = useTranslation();
  useEffect(() => {
    initDataLayer();
  }, []);
  const isAdmin = location.pathname.startsWith("/admin");
  const gtmId = !isAdmin ? "" : "";
  useEffect(() => {
    return;
  }, [gtmId, isAdmin]);
  useEffect(() => {
    if (isAdmin || typeof window === "undefined") return;
    const rafId = requestAnimationFrame(() => {
      trackEvent("page_view", {
        page_path: location.pathname,
        page_title: document.title,
        page_language: i18n2.language
      });
    });
    return () => cancelAnimationFrame(rafId);
  }, [location.pathname, i18n2.language, isAdmin]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    children,
    /* @__PURE__ */ jsx(CookieConsent, { isActive: Boolean(gtmId) })
  ] });
};
(_Q = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Q.call(globalThis, "src/app/layouts/PublicLayout.tsx");
const PublicLayoutContent = () => {
  const { i18n: i18n2 } = useTranslation();
  const location = useLocation();
  const isEn = location.pathname.startsWith("/en");
  const currentLang = isEn ? "en" : "ar";
  const mainRef = useRef(null);
  if (i18n2.language !== currentLang) {
    i18n2.changeLanguage(currentLang);
  }
  useEffect(() => {
    const dir = isEn ? "ltr" : "rtl";
    document.documentElement.lang = currentLang;
    document.documentElement.dir = dir;
  }, [isEn, currentLang]);
  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        mainRef.current,
        { opacity: 0.88, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.28,
          ease: "power2.out",
          clearProps: "transform,opacity"
        }
      );
    },
    { scope: mainRef, dependencies: [location.pathname] }
  );
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-white text-content-body font-sans antialiased selection:bg-brand-400 selection:text-brand-900", children: [
    /* @__PURE__ */ jsx(ScrollRestoration, {}),
    /* @__PURE__ */ jsx(SkipToContent, {}),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { id: "main-content", ref: mainRef, className: "flex-1 focus:outline-none", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(FloatingContact, {}),
    /* @__PURE__ */ jsx(ScrollToTop, {})
  ] });
};
const PublicLayout = () => {
  return /* @__PURE__ */ jsx(AppProviders, { children: /* @__PURE__ */ jsx(AnalyticsProvider, { children: /* @__PURE__ */ jsx(ToastProvider, { children: /* @__PURE__ */ jsx(PublicLayoutContent, {}) }) }) });
};
(_R = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _R.call(globalThis, "src/components/seo/cleanJsonLd.ts");
function cleanJsonLd(data) {
  if (data === null || data === void 0) return null;
  if (Array.isArray(data)) {
    const cleanedArr = data.map((item) => cleanJsonLd(item)).filter((item) => item !== null && item !== void 0 && item !== "");
    return cleanedArr.length > 0 ? cleanedArr : null;
  }
  if (typeof data === "object") {
    const cleanedObj = {};
    let hasKeys = false;
    for (const [key, val] of Object.entries(data)) {
      const cleanedVal = cleanJsonLd(val);
      if (cleanedVal !== null && cleanedVal !== void 0 && cleanedVal !== "") {
        cleanedObj[key] = cleanedVal;
        hasKeys = true;
      }
    }
    return hasKeys ? cleanedObj : null;
  }
  if (typeof data === "string") {
    const trimmed = data.trim();
    return trimmed.length > 0 ? trimmed : null;
  }
  return data;
}
(_S = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _S.call(globalThis, "src/components/seo/schema.ts");
const SITE_URL$1 = "https://almubtakirah.com";
const LOGO_URL = `${SITE_URL$1}/brand/logo-dark-square.webp`;
const DEFAULT_IMAGE_URL = `${SITE_URL$1}/brand/og-default.png`;
function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "شركة المصاعد المبتكرة",
    alternateName: siteConfig.company.nameEn,
    url: SITE_URL$1,
    logo: LOGO_URL,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phones[0],
        contactType: "customer service",
        areaServed: "SA",
        availableLanguage: ["Arabic", "English"]
      },
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phones[1],
        contactType: "emergency",
        areaServed: "SA",
        availableLanguage: ["Arabic", "English"]
      }
    ]
  };
}
function getWebSiteSchema(lang = "ar") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: lang === "en" ? "Innovative Elevators Co." : "شركة المصاعد المبتكرة",
    alternateName: lang === "en" ? "Al-Masaed Al-Mubtakirah" : "المساعد المبتكرة",
    url: SITE_URL$1,
    inLanguage: lang === "en" ? "en" : "ar-SA"
  };
}
function getLocalBusinessSchema(lang = "ar") {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: lang === "en" ? "Innovative Elevators Co." : "شركة المصاعد المبتكرة",
    alternateName: siteConfig.company.nameEn,
    url: SITE_URL$1,
    logo: LOGO_URL,
    image: DEFAULT_IMAGE_URL,
    telephone: siteConfig.contact.phones[1] || siteConfig.contact.phones[0],
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jeddah",
      addressRegion: "Makkah Province",
      addressCountry: "SA"
    },
    areaServed: {
      "@type": "City",
      name: "Jeddah"
    },
    identifier: siteConfig.company.crNumber
  };
}
function getServiceSchema(title, description, serviceUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    url: serviceUrl,
    provider: {
      "@type": "Organization",
      name: "شركة المصاعد المبتكرة",
      url: SITE_URL$1
    },
    areaServed: {
      "@type": "City",
      name: "Jeddah"
    }
  };
}
function getFaqSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a
      }
    }))
  };
}
function getBlogPostingSchema(input) {
  const published = input.datePublished || (/* @__PURE__ */ new Date()).toISOString();
  const modified = input.dateModified || published;
  return {
    "@context": "https://schema.org",
    "@type": input.schemaType || "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": input.url
    },
    headline: input.title,
    description: input.description || void 0,
    image: input.imageUrl || DEFAULT_IMAGE_URL,
    datePublished: published,
    dateModified: modified,
    author: {
      "@type": "Organization",
      name: input.authorName || "شركة المصاعد المبتكرة",
      url: SITE_URL$1
    },
    publisher: {
      "@type": "Organization",
      name: "شركة المصاعد المبتكرة",
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL
      }
    },
    inLanguage: input.lang === "en" ? "en" : "ar-SA"
  };
}
function getBreadcrumbsSchema(items) {
  if (!items || items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL$1}${item.url.startsWith("/") ? "" : "/"}${item.url}`
    }))
  };
}
function getCollectionPageSchema(title, description, url) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url
  };
}
function getWorkSchema(title, description, url, imageUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url,
    image: imageUrl || DEFAULT_IMAGE_URL,
    creator: {
      "@type": "Organization",
      name: "شركة المصاعد المبتكرة",
      url: SITE_URL$1
    }
  };
}
(_T = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _T.call(globalThis, "src/components/seo/Seo.tsx");
const SITE_URL = "https://almubtakirah.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/brand/og-default.png`;
function toAbsoluteUrl(url) {
  if (!url) return SITE_URL;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  const clean = url.startsWith("/") ? url : `/${url}`;
  return `${SITE_URL}${clean}`;
}
function cleanCanonical(url) {
  if (!url) return SITE_URL;
  const absolute = toAbsoluteUrl(url);
  const withoutQuery = absolute.split("?")[0].split("#")[0];
  if (withoutQuery !== SITE_URL && withoutQuery.endsWith("/")) {
    return withoutQuery.slice(0, -1);
  }
  return withoutQuery;
}
const Seo = ({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  noindex = false,
  lang = "ar",
  dir = lang === "ar" ? "rtl" : "ltr",
  article,
  hreflang,
  jsonLd,
  breadcrumbs,
  children
}) => {
  var _a2;
  let fullTitle;
  if (!title) {
    fullTitle = lang === "en" ? "Innovative Elevators Co. | Elevator Installation & Maintenance in Jeddah" : "شركة المصاعد المبتكرة | تركيب وصيانة المصاعد في جدة";
  } else if (title.includes("|")) {
    fullTitle = title;
  } else {
    const brandSuffix = lang === "en" ? "Innovative Elevators Co." : "شركة المصاعد المبتكرة";
    fullTitle = `${title} | ${brandSuffix}`;
  }
  const fullDescription = description || (lang === "en" ? "Saudi company specialized in elevator installation, maintenance, modernization and escalators in Jeddah. Civil Defense approved with reliable maintenance contracts." : "شركة سعودية متخصصة في توريد وتركيب وصيانة وتحديث المصاعد والسلالم الكهربائية في جدة. معتمدون من الدفاع المدني ونوفر عقود صيانة دورية موثوقة.");
  const canonicalUrl = cleanCanonical(canonical);
  const resolvedOgImage = ogImage ? toAbsoluteUrl(ogImage) : DEFAULT_OG_IMAGE;
  const siteName = lang === "en" ? "Innovative Elevators Co." : "شركة المصاعد المبتكرة";
  const ogLocale = lang === "en" ? "en_US" : "ar_SA";
  const schemasToRender = [];
  if (jsonLd) {
    if (Array.isArray(jsonLd)) {
      schemasToRender.push(...jsonLd);
    } else {
      schemasToRender.push(jsonLd);
    }
  }
  if (breadcrumbs && breadcrumbs.length > 0) {
    const bSchema = getBreadcrumbsSchema(breadcrumbs);
    if (bSchema) schemasToRender.push(bSchema);
  }
  return /* @__PURE__ */ jsxs(Head, { children: [
    /* @__PURE__ */ jsx("html", { lang, dir }),
    /* @__PURE__ */ jsx("title", { children: fullTitle }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: fullDescription }),
    /* @__PURE__ */ jsx("meta", { name: "theme-color", content: "#132454" }),
    void 0,
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: canonicalUrl }),
    /* @__PURE__ */ jsx("meta", { name: "robots", content: noindex ? "noindex, nofollow" : "index, follow" }),
    (hreflang == null ? void 0 : hreflang.ar) && /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "ar-SA", href: toAbsoluteUrl(hreflang.ar) }),
    (hreflang == null ? void 0 : hreflang.en) && /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "en", href: toAbsoluteUrl(hreflang.en) }),
    (hreflang == null ? void 0 : hreflang.xDefault) && /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "x-default", href: toAbsoluteUrl(hreflang.xDefault) }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: ogType }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: fullTitle }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: fullDescription }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonicalUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: resolvedOgImage }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale", content: ogLocale }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: siteName }),
    ogType === "article" && (article == null ? void 0 : article.publishedTime) && /* @__PURE__ */ jsx("meta", { property: "article:published_time", content: article.publishedTime }),
    ogType === "article" && (article == null ? void 0 : article.modifiedTime) && /* @__PURE__ */ jsx("meta", { property: "article:modified_time", content: article.modifiedTime }),
    ogType === "article" && (article == null ? void 0 : article.section) && /* @__PURE__ */ jsx("meta", { property: "article:section", content: article.section }),
    ogType === "article" && (article == null ? void 0 : article.author) && /* @__PURE__ */ jsx("meta", { property: "article:author", content: article.author }),
    ogType === "article" && ((_a2 = article == null ? void 0 : article.tags) == null ? void 0 : _a2.map((tag) => /* @__PURE__ */ jsx("meta", { property: "article:tag", content: tag }, tag))),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: fullTitle }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: fullDescription }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: resolvedOgImage }),
    schemasToRender.map((schema, index) => {
      const cleaned = cleanJsonLd(schema);
      if (!cleaned) return null;
      return /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(cleaned) }, index);
    }),
    children
  ] });
};
(_U = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _U.call(globalThis, "src/components/seo/index.ts");
(_V = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _V.call(globalThis, "src/services/worksService.ts");
async function getPublishedWorks({
  serviceType,
  limit = 12,
  offset = 0
} = {}) {
  var _a2, _b2;
  try {
    let query = supabase.from("works").select(
      `
        id,
        slug,
        title_ar,
        title_en,
        description_ar,
        description_en,
        service_type,
        location_ar,
        location_en,
        completed_year,
        cover_media_id,
        gallery_media_ids,
        seo_title,
        seo_description,
        is_published,
        sort_order,
        created_at,
        updated_at,
        cover_media:cover_media_id (
          id,
          storage_path,
          width,
          height,
          alt_text,
          variants
        )
      `,
      { count: "exact" }
    ).eq("is_published", true);
    if (serviceType && serviceType !== "all") {
      query = query.eq("service_type", serviceType);
    }
    query = query.order("sort_order", { ascending: true }).order("completed_year", { ascending: false, nullsFirst: false }).order("created_at", { ascending: false });
    if (typeof limit === "number") {
      query = query.range(offset, offset + limit - 1);
    }
    const { data, count, error } = await query;
    if (error) {
      return { works: [], total: 0 };
    }
    const works2 = data || [];
    if (works2.length === 0) {
      const { fallbackWorks: fallbackWorks2 } = await ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/data/seedData.ts"), Promise.resolve().then(() => seedData));
      let filtered = fallbackWorks2;
      if (serviceType && serviceType !== "all") {
        filtered = filtered.filter((w) => w.service_type === serviceType);
      }
      const totalFallback = filtered.length;
      if (typeof limit === "number") {
        filtered = filtered.slice(offset, offset + limit);
      }
      return { works: filtered, total: totalFallback };
    }
    return { works: works2, total: count ?? works2.length };
  } catch {
    const { fallbackWorks: fallbackWorks2 } = await ((_b2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _b2.call(globalThis, "src/data/seedData.ts"), Promise.resolve().then(() => seedData));
    let filtered = fallbackWorks2;
    if (serviceType && serviceType !== "all") {
      filtered = filtered.filter((w) => w.service_type === serviceType);
    }
    const totalFallback = filtered.length;
    if (typeof limit === "number") {
      filtered = filtered.slice(offset, offset + limit);
    }
    return { works: filtered, total: totalFallback };
  }
}
async function getWorkBySlug(slug) {
  var _a2;
  try {
    const { data, error } = await supabase.from("works").select(
      `
        id,
        slug,
        title_ar,
        title_en,
        description_ar,
        description_en,
        service_type,
        location_ar,
        location_en,
        completed_year,
        cover_media_id,
        gallery_media_ids,
        seo_title,
        seo_description,
        is_published,
        sort_order,
        created_at,
        updated_at,
        cover_media:cover_media_id (
          id,
          storage_path,
          width,
          height,
          alt_text,
          variants
        )
      `
    ).eq("slug", slug).eq("is_published", true).maybeSingle();
    if (error || !data) {
      const { fallbackWorks: fallbackWorks2, fallbackMedia: fallbackMedia2 } = await ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/data/seedData.ts"), Promise.resolve().then(() => seedData));
      const fallback = fallbackWorks2.find((w) => w.slug === slug);
      if (fallback) {
        return {
          ...fallback,
          gallery_media: [fallbackMedia2.gallery1, fallbackMedia2.gallery2]
        };
      }
      return null;
    }
    const work = data;
    if (work.gallery_media_ids && work.gallery_media_ids.length > 0) {
      const { data: galleryData } = await supabase.from("media").select("id, storage_path, width, height, alt_text, variants").in("id", work.gallery_media_ids);
      if (galleryData) {
        const map = new Map(galleryData.map((m) => [m.id, m]));
        work.gallery_media = work.gallery_media_ids.map((id) => map.get(id)).filter((m) => Boolean(m));
      } else {
        work.gallery_media = [];
      }
    } else {
      work.gallery_media = [];
    }
    return work;
  } catch {
    return null;
  }
}
async function getRelatedWorks({
  currentWorkId,
  serviceType,
  limit = 3
}) {
  var _a2, _b2;
  try {
    const { data, error } = await supabase.from("works").select(
      `
        id,
        slug,
        title_ar,
        title_en,
        description_ar,
        description_en,
        service_type,
        location_ar,
        location_en,
        completed_year,
        cover_media_id,
        gallery_media_ids,
        seo_title,
        seo_description,
        is_published,
        sort_order,
        created_at,
        updated_at,
        cover_media:cover_media_id (
          id,
          storage_path,
          width,
          height,
          alt_text,
          variants
        )
      `
    ).eq("is_published", true).eq("service_type", serviceType).neq("id", currentWorkId).order("sort_order", { ascending: true }).order("created_at", { ascending: false }).limit(limit);
    if (error || !data || data.length === 0) {
      const { fallbackWorks: fallbackWorks2 } = await ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/data/seedData.ts"), Promise.resolve().then(() => seedData));
      return fallbackWorks2.filter(
        (w) => w.id !== currentWorkId && (!serviceType || w.service_type === serviceType)
      ).slice(0, limit);
    }
    return data;
  } catch {
    const { fallbackWorks: fallbackWorks2 } = await ((_b2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _b2.call(globalThis, "src/data/seedData.ts"), Promise.resolve().then(() => seedData));
    return fallbackWorks2.filter(
      (w) => w.id !== currentWorkId && (!serviceType || w.service_type === serviceType)
    ).slice(0, limit);
  }
}
(_W = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _W.call(globalThis, "src/hooks/useWorks.ts");
function useWorks(params = {}) {
  return useQuery({
    queryKey: ["works", params],
    queryFn: () => getPublishedWorks(params),
    staleTime: 1e3 * 60 * 5
    // 5 minutes
  });
}
function useWorkDetail(slug) {
  return useQuery({
    queryKey: ["work", slug],
    queryFn: () => getWorkBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 1e3 * 60 * 5
  });
}
function useRelatedWorks(params) {
  return useQuery({
    queryKey: ["related_works", params],
    queryFn: () => getRelatedWorks(params),
    enabled: Boolean(params.currentWorkId && params.serviceType),
    staleTime: 1e3 * 60 * 5
  });
}
(_X = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _X.call(globalThis, "src/services/partnersService.ts");
async function getPublishedPartners() {
  var _a2, _b2;
  try {
    const { data, error } = await supabase.from("partners").select(
      `
        id,
        name_ar,
        name_en,
        logo_media_id,
        website_url,
        sort_order,
        is_published,
        created_at,
        updated_at,
        logo_media:logo_media_id (
          id,
          storage_path,
          width,
          height,
          alt_text,
          variants
        )
      `
    ).eq("is_published", true).order("sort_order", { ascending: true }).order("created_at", { ascending: true });
    if (error || !data || data.length === 0) {
      const { fallbackPartners: fallbackPartners2 } = await ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/data/seedData.ts"), Promise.resolve().then(() => seedData));
      return fallbackPartners2;
    }
    return data;
  } catch {
    const { fallbackPartners: fallbackPartners2 } = await ((_b2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _b2.call(globalThis, "src/data/seedData.ts"), Promise.resolve().then(() => seedData));
    return fallbackPartners2;
  }
}
(_Y = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Y.call(globalThis, "src/hooks/usePartners.ts");
function usePartners() {
  return useQuery({
    queryKey: ["partners"],
    queryFn: getPublishedPartners,
    staleTime: 1e3 * 60 * 10
    // 10 minutes
  });
}
(_Z = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _Z.call(globalThis, "src/services/blogService.ts");
const POST_LIST_SELECT = `
  id,
  lang,
  translation_key,
  slug,
  title,
  excerpt,
  featured_image_id,
  featured_image_alt,
  category_id,
  author_id,
  published_at,
  reading_time_min,
  created_at,
  updated_at,
  category:category_id (
    id,
    slug,
    name_ar,
    name_en,
    description_ar,
    description_en
  ),
  featured_image:featured_image_id (
    id,
    file_name,
    storage_path,
    mime_type,
    size_bytes,
    width,
    height,
    variants,
    alt_text,
    title,
    folder,
    uploaded_by,
    created_at,
    updated_at
  ),
  author:author_id (
    id,
    full_name,
    avatar_url,
    role
  )
`;
async function getPublishedPosts({
  lang,
  categorySlug,
  tagSlug,
  limit = 9,
  offset = 0
} = {}) {
  var _a2, _b2;
  try {
    const nowIso = (/* @__PURE__ */ new Date()).toISOString();
    let categoryId = null;
    if (categorySlug) {
      const { data: cat } = await supabase.from("categories").select("id").eq("slug", categorySlug).maybeSingle();
      if (!cat) {
        return { posts: [], total: 0 };
      }
      categoryId = cat.id;
    }
    let postIdsFromTag = null;
    if (tagSlug) {
      const { data: tag } = await supabase.from("tags").select("id").eq("slug", tagSlug).maybeSingle();
      if (!tag) {
        return { posts: [], total: 0 };
      }
      const { data: postTagRows } = await supabase.from("post_tags").select("post_id").eq("tag_id", tag.id);
      if (!postTagRows || postTagRows.length === 0) {
        return { posts: [], total: 0 };
      }
      postIdsFromTag = postTagRows.map((r) => r.post_id);
    }
    let query = supabase.from("posts").select(POST_LIST_SELECT, { count: "exact" }).eq("status", "published").lte("published_at", nowIso);
    if (lang) {
      query = query.eq("lang", lang);
    }
    if (categoryId) {
      query = query.eq("category_id", categoryId);
    }
    if (postIdsFromTag) {
      query = query.in("id", postIdsFromTag);
    }
    query = query.order("published_at", { ascending: false }).range(offset, offset + limit - 1);
    const { data, count, error } = await query;
    if (error) {
      console.warn("Supabase posts fetch warning:", error.message);
    }
    const posts = data || [];
    if (posts.length === 0) {
      const { fallbackPosts: fallbackPosts2 } = await ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/data/seedData.ts"), Promise.resolve().then(() => seedData));
      let filtered = fallbackPosts2.filter((p) => p.lang === lang);
      if (categorySlug) {
        filtered = filtered.filter((p) => {
          var _a3;
          return ((_a3 = p.category) == null ? void 0 : _a3.slug) === categorySlug;
        });
      }
      const totalFallback = filtered.length;
      if (typeof limit === "number") {
        filtered = filtered.slice(offset, offset + limit);
      }
      return {
        posts: filtered,
        total: totalFallback
      };
    }
    return {
      posts,
      total: count ?? 0
    };
  } catch (err) {
    console.error("Unexpected error in getPublishedPosts:", err);
    const { fallbackPosts: fallbackPosts2 } = await ((_b2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _b2.call(globalThis, "src/data/seedData.ts"), Promise.resolve().then(() => seedData));
    let filtered = fallbackPosts2.filter((p) => p.lang === lang);
    if (categorySlug) {
      filtered = filtered.filter((p) => {
        var _a3;
        return ((_a3 = p.category) == null ? void 0 : _a3.slug) === categorySlug;
      });
    }
    const totalFallback = filtered.length;
    if (typeof limit === "number") {
      filtered = filtered.slice(offset, offset + limit);
    }
    return {
      posts: filtered,
      total: totalFallback
    };
  }
}
async function getPostBySlug(lang, slug) {
  var _a2, _b2;
  try {
    const nowIso = (/* @__PURE__ */ new Date()).toISOString();
    const { data, error } = await supabase.from("posts").select(
      `
        *,
        category:category_id (*),
        featured_image:featured_image_id (*),
        author:author_id (*),
        post_tags (
          tag:tag_id (*)
        )
      `
    ).eq("lang", lang).eq("slug", slug).eq("status", "published").lte("published_at", nowIso).maybeSingle();
    if (error || !data) {
      const { fallbackPosts: fallbackPosts2 } = await ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/data/seedData.ts"), Promise.resolve().then(() => seedData));
      const fallback = fallbackPosts2.find(
        (p) => p.lang === lang && p.slug === slug
      );
      if (fallback) {
        return fallback;
      }
      return null;
    }
    const rawPostTags = data.post_tags || [];
    const tags = rawPostTags.map((item) => item.tag).filter((tag) => Boolean(tag));
    let faq = [];
    if (Array.isArray(data.faq)) {
      faq = data.faq;
    } else if (typeof data.faq === "string") {
      try {
        faq = JSON.parse(data.faq);
      } catch {
        faq = [];
      }
    }
    return {
      ...data,
      faq,
      category: data.category,
      featured_image: data.featured_image,
      author: data.author,
      tags
    };
  } catch (err) {
    console.error("Unexpected error in getPostBySlug:", err);
    const { fallbackPosts: fallbackPosts2 } = await ((_b2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _b2.call(globalThis, "src/data/seedData.ts"), Promise.resolve().then(() => seedData));
    const fallback = fallbackPosts2.find(
      (p) => p.lang === lang && p.slug === slug
    );
    return fallback || null;
  }
}
async function getPostTranslation(translationKey, targetLang) {
  var _a2, _b2;
  try {
    const nowIso = (/* @__PURE__ */ new Date()).toISOString();
    const { data, error } = await supabase.from("posts").select("slug, title, lang").eq("translation_key", translationKey).eq("lang", targetLang).eq("status", "published").lte("published_at", nowIso).maybeSingle();
    if (error || !data) {
      const { fallbackPosts: fallbackPosts2 } = await ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/data/seedData.ts"), Promise.resolve().then(() => seedData));
      const twin = fallbackPosts2.find(
        (p) => p.translation_key === translationKey && p.lang === targetLang
      );
      return twin ? { slug: twin.slug, title: twin.title, lang: twin.lang } : null;
    }
    return data;
  } catch (err) {
    console.error("Unexpected error in getPostTranslation:", err);
    const { fallbackPosts: fallbackPosts2 } = await ((_b2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _b2.call(globalThis, "src/data/seedData.ts"), Promise.resolve().then(() => seedData));
    const twin = fallbackPosts2.find(
      (p) => p.translation_key === translationKey && p.lang === targetLang
    );
    return twin ? { slug: twin.slug, title: twin.title, lang: twin.lang } : null;
  }
}
async function getRelatedPosts(categoryId, currentPostId, lang, limit = 3) {
  var _a2, _b2;
  try {
    const nowIso = (/* @__PURE__ */ new Date()).toISOString();
    let query = supabase.from("posts").select(POST_LIST_SELECT).eq("status", "published").eq("lang", lang).neq("id", currentPostId).lte("published_at", nowIso);
    if (categoryId) {
      query = query.eq("category_id", categoryId);
    }
    query = query.order("published_at", { ascending: false }).limit(limit);
    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      const { fallbackPosts: fallbackPosts2 } = await ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/data/seedData.ts"), Promise.resolve().then(() => seedData));
      return fallbackPosts2.filter(
        (p) => p.lang === lang && p.id !== currentPostId && (!categoryId || p.category_id === categoryId)
      ).slice(0, limit);
    }
    if (data.length < limit && categoryId) {
      const remaining = limit - data.length;
      const existingIds = [currentPostId, ...data.map((p) => p.id)];
      const { data: backfill } = await supabase.from("posts").select(POST_LIST_SELECT).eq("status", "published").eq("lang", lang).lte("published_at", nowIso).not("id", "in", `(${existingIds.join(",")})`).order("published_at", { ascending: false }).limit(remaining);
      if (backfill && backfill.length > 0) {
        return [...data, ...backfill];
      }
    }
    return data || [];
  } catch (err) {
    console.error("Unexpected error in getRelatedPosts:", err);
    const { fallbackPosts: fallbackPosts2 } = await ((_b2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _b2.call(globalThis, "src/data/seedData.ts"), Promise.resolve().then(() => seedData));
    return fallbackPosts2.filter(
      (p) => p.lang === lang && p.id !== currentPostId && (!categoryId || p.category_id === categoryId)
    ).slice(0, limit);
  }
}
async function getPrevNextPosts(publishedAt, lang) {
  var _a2;
  if (!publishedAt) {
    return { prev: null, next: null };
  }
  try {
    const nowIso = (/* @__PURE__ */ new Date()).toISOString();
    const { data: prevData } = await supabase.from("posts").select("slug, title, lang").eq("lang", lang).eq("status", "published").lte("published_at", nowIso).lt("published_at", publishedAt).order("published_at", { ascending: false }).limit(1).maybeSingle();
    const { data: nextData } = await supabase.from("posts").select("slug, title, lang").eq("lang", lang).eq("status", "published").lte("published_at", nowIso).gt("published_at", publishedAt).order("published_at", { ascending: true }).limit(1).maybeSingle();
    if (!prevData && !nextData) {
      const { fallbackPosts: fallbackPosts2 } = await ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/data/seedData.ts"), Promise.resolve().then(() => seedData));
      const sameLang = fallbackPosts2.filter((p) => p.lang === lang);
      const currentIndex = sameLang.findIndex((p) => p.published_at === publishedAt);
      if (currentIndex !== -1) {
        const prev = currentIndex < sameLang.length - 1 ? sameLang[currentIndex + 1] : null;
        const next = currentIndex > 0 ? sameLang[currentIndex - 1] : null;
        return {
          prev: prev ? { slug: prev.slug, title: prev.title, lang: prev.lang } : null,
          next: next ? { slug: next.slug, title: next.title, lang: next.lang } : null
        };
      }
    }
    return {
      prev: prevData || null,
      next: nextData || null
    };
  } catch (err) {
    console.error("Unexpected error in getPrevNextPosts:", err);
    return { prev: null, next: null };
  }
}
async function getBlogCategories() {
  var _a2, _b2;
  try {
    const { data, error } = await supabase.from("categories").select("*").order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) {
      const { fallbackCategories: fallbackCategories2 } = await ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/data/seedData.ts"), Promise.resolve().then(() => seedData));
      return fallbackCategories2;
    }
    return data;
  } catch (err) {
    console.error("Unexpected error in getBlogCategories:", err);
    const { fallbackCategories: fallbackCategories2 } = await ((_b2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _b2.call(globalThis, "src/data/seedData.ts"), Promise.resolve().then(() => seedData));
    return fallbackCategories2;
  }
}
async function getCategoryBySlug(slug) {
  try {
    const { data, error } = await supabase.from("categories").select("*").eq("slug", slug).maybeSingle();
    if (error || !data) {
      return null;
    }
    return data;
  } catch (err) {
    console.error("Unexpected error in getCategoryBySlug:", err);
    return null;
  }
}
(__ = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : __.call(globalThis, "src/hooks/useBlog.ts");
function useBlogPosts(params = {}) {
  return useQuery({
    queryKey: ["blog_posts", params],
    queryFn: () => getPublishedPosts(params),
    staleTime: 1e3 * 60 * 5
    // 5 minutes
  });
}
function useBlogPost(lang, slug) {
  return useQuery({
    queryKey: ["blog_post", lang, slug],
    queryFn: () => getPostBySlug(lang, slug),
    enabled: Boolean(slug),
    staleTime: 1e3 * 60 * 5
  });
}
function useBlogCategories() {
  return useQuery({
    queryKey: ["blog_categories"],
    queryFn: () => getBlogCategories(),
    staleTime: 1e3 * 60 * 15
    // 15 minutes
  });
}
function useBlogCategory(slug) {
  return useQuery({
    queryKey: ["blog_category", slug],
    queryFn: () => getCategoryBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 1e3 * 60 * 15
  });
}
function useRelatedPosts(params) {
  return useQuery({
    queryKey: ["related_posts", params],
    queryFn: () => getRelatedPosts(
      params.categoryId,
      params.currentPostId,
      params.lang,
      params.limit
    ),
    enabled: Boolean(params.currentPostId),
    staleTime: 1e3 * 60 * 5
  });
}
function usePrevNextPosts(publishedAt, lang) {
  return useQuery({
    queryKey: ["prev_next_posts", publishedAt, lang],
    queryFn: () => getPrevNextPosts(publishedAt, lang),
    enabled: Boolean(publishedAt),
    staleTime: 1e3 * 60 * 5
  });
}
function usePostTranslation(translationKey, targetLang) {
  return useQuery({
    queryKey: ["post_translation", translationKey, targetLang],
    queryFn: () => translationKey ? getPostTranslation(translationKey, targetLang) : null,
    enabled: Boolean(translationKey),
    staleTime: 1e3 * 60 * 15
  });
}
(_$ = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _$.call(globalThis, "src/features/works/components/WorkCard.tsx");
const WorkCard = ({ work, priority = false }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const isEn = location.pathname.startsWith("/en");
  const isRtl = !isEn;
  const title = isEn && work.title_en ? work.title_en : work.title_ar;
  const description = isEn && work.description_en ? work.description_en : work.description_ar;
  const locationText = isEn && work.location_en ? work.location_en : work.location_ar;
  const detailUrl = isEn ? `/en/works/${work.slug}` : `/works/${work.slug}`;
  const serviceLabelMap = {
    installation: t("works.filters.installation"),
    maintenance: t("works.filters.maintenance"),
    modernization: t("works.filters.modernization"),
    "spare-parts": t("works.filters.spareParts"),
    escalators: t("works.filters.escalators")
  };
  const serviceLabel = serviceLabelMap[work.service_type] || work.service_type;
  return /* @__PURE__ */ jsxs("article", { className: "group card-hover bg-white rounded-card border border-surface-border overflow-hidden shadow-xs flex flex-col h-full", children: [
    /* @__PURE__ */ jsxs(Link, { to: detailUrl, className: "block relative aspect-[16/10] overflow-hidden bg-brand-950", children: [
      work.cover_media ? /* @__PURE__ */ jsx(
        ResponsiveImage,
        {
          media: work.cover_media,
          alt: title,
          priority,
          className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
          sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        }
      ) : /* @__PURE__ */ jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-brand-900 to-brand-950 text-white", children: [
        /* @__PURE__ */ jsx("span", { className: "text-brand-300 text-xs font-semibold tracking-wider uppercase mb-1", children: serviceLabel }),
        /* @__PURE__ */ jsx("p", { className: "text-white font-bold text-sm line-clamp-2", children: title })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-3 start-3 z-10", children: /* @__PURE__ */ jsx(Badge, { variant: "brand", size: "sm", className: "bg-brand-900/90 backdrop-blur-xs text-white border-none shadow-xs", children: serviceLabel }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6 flex flex-col flex-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3 text-xs text-content-muted mb-3", children: [
        work.completed_year && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "w-3.5 h-3.5 text-brand-600", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("span", { children: work.completed_year })
        ] }),
        locationText && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "w-3.5 h-3.5 text-brand-600", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("span", { children: locationText })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-content-heading group-hover:text-brand-600 transition-colors line-clamp-2 mb-2", children: /* @__PURE__ */ jsx(Link, { to: detailUrl, className: "focus-visible:outline-none focus-visible:underline", children: title }) }),
      description && /* @__PURE__ */ jsx("p", { className: "text-sm text-content-body line-clamp-2 leading-relaxed mb-6 flex-1", children: description }),
      /* @__PURE__ */ jsx("div", { className: "mt-auto pt-4 border-t border-surface-border", children: /* @__PURE__ */ jsxs(
        Link,
        {
          to: detailUrl,
          className: "inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 group-hover:text-brand-500 transition-colors focus-visible:outline-none",
          children: [
            /* @__PURE__ */ jsx("span", { children: t("works.cardViewDetails") }),
            isRtl ? /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 transition-transform group-hover:-translate-x-1", "aria-hidden": "true" }) : /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 transition-transform group-hover:translate-x-1", "aria-hidden": "true" })
          ]
        }
      ) })
    ] })
  ] });
};
(_aa = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _aa.call(globalThis, "src/features/home/components/WorksSection.tsx");
const WorksSection = ({ works: works2 }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const isEn = location.pathname.startsWith("/en");
  const isRtl = !isEn;
  const revealRef = useScrollReveal({
    selector: "[data-work-card]",
    stagger: 0.08,
    distance: 20,
    dependencies: [works2]
  });
  if (!works2 || works2.length === 0) {
    return null;
  }
  const prefix = isEn ? "/en" : "";
  return /* @__PURE__ */ jsx(Section, { variant: "white", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { ref: revealRef, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between mb-12", children: [
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          kicker: t("home.worksEyebrow"),
          title: t("home.worksHeading"),
          intro: t("home.worksSubtitle")
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: `${prefix}/works`,
          className: "inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-500 font-semibold text-sm mt-4 md:mt-0 transition-colors",
          children: [
            /* @__PURE__ */ jsx("span", { children: t("actions.viewWorks") }),
            isRtl ? /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: works2.slice(0, 6).map((work) => /* @__PURE__ */ jsx("div", { "data-work-card": true, children: /* @__PURE__ */ jsx(WorkCard, { work }) }, work.id)) })
  ] }) }) });
};
(_ba = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ba.call(globalThis, "src/features/home/components/PartnersSection.tsx");
const PartnersSection = ({
  partners,
  variant = "soft"
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const isEn = location.pathname.startsWith("/en");
  if (!partners || partners.length === 0) {
    return null;
  }
  const displayPartners = [...partners, ...partners, ...partners, ...partners];
  const isSoft = variant === "soft";
  return /* @__PURE__ */ jsx(Section, { variant, className: "overflow-hidden", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(
      SectionHeading,
      {
        kicker: t("home.partnersEyebrow"),
        title: t("home.partnersHeading"),
        intro: t("home.partnersSubtitle"),
        align: "center",
        className: "max-w-2xl mx-auto mb-14"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative w-full overflow-hidden py-4", dir: "ltr", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 z-10 ${isSoft ? "bg-gradient-to-r from-[#f4f7fb] to-transparent" : "bg-gradient-to-r from-white to-transparent"}`,
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 z-10 ${isSoft ? "bg-gradient-to-l from-[#f4f7fb] to-transparent" : "bg-gradient-to-l from-white to-transparent"}`,
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "flex gap-6 sm:gap-8 animate-marquee w-max py-4 items-center select-none",
          style: { animation: "marquee 28s linear infinite" },
          children: displayPartners.map((partner, index) => {
            const name = isEn && partner.name_en ? partner.name_en : partner.name_ar;
            const cardContent = /* @__PURE__ */ jsx(
              "div",
              {
                className: "w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white border-2 border-surface-border overflow-hidden flex items-center justify-center shadow-xs transition-all duration-300 transform hover:scale-[1.15] hover:border-brand-500 hover:shadow-card hover:z-20 cursor-pointer group flex-shrink-0 relative",
                title: name,
                children: partner.logo_media ? /* @__PURE__ */ jsx(
                  ResponsiveImage,
                  {
                    media: partner.logo_media,
                    alt: name,
                    className: "w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500",
                    sizes: "128px"
                  }
                ) : /* @__PURE__ */ jsx("span", { className: "text-xs sm:text-sm font-semibold text-content-body text-center line-clamp-2 px-3 group-hover:text-brand-600 transition-colors", children: name })
              }
            );
            if (partner.website_url) {
              return /* @__PURE__ */ jsx(
                "a",
                {
                  href: partner.website_url,
                  target: "_blank",
                  rel: "noopener nofollow",
                  className: "block rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
                  children: cardContent
                },
                `${partner.id}-${index}`
              );
            }
            return /* @__PURE__ */ jsx("div", { className: "block rounded-full", children: cardContent }, `${partner.id}-${index}`);
          })
        }
      )
    ] })
  ] }) });
};
(_ca = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ca.call(globalThis, "src/features/blog/components/PostCard.tsx");
const PostCard = ({
  post,
  priority = false
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const isEn = location.pathname.startsWith("/en");
  const isRtl = !isEn;
  const prefix = isEn ? "/en" : "";
  const postUrl = `${prefix}/blog/${post.slug}`;
  const categoryName = post.category ? isEn && post.category.name_en ? post.category.name_en : post.category.name_ar : null;
  const categoryUrl = post.category ? `${prefix}/blog/category/${post.category.slug}` : null;
  const formattedDate = post.published_at ? new Date(post.published_at).toLocaleDateString(
    isEn ? "en-US" : "ar-SA",
    { year: "numeric", month: "long", day: "numeric" }
  ) : null;
  return /* @__PURE__ */ jsxs("article", { className: "group card-hover bg-white rounded-card border border-surface-border overflow-hidden shadow-xs flex flex-col h-full", children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        to: postUrl,
        className: "block relative aspect-[16/10] overflow-hidden bg-brand-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
        tabIndex: -1,
        "aria-hidden": "true",
        children: [
          post.featured_image ? /* @__PURE__ */ jsx(
            ResponsiveImage,
            {
              media: post.featured_image,
              alt: post.featured_image_alt || post.title,
              priority,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
              sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
          ) : /* @__PURE__ */ jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-brand-900 to-brand-950 text-white", children: [
            /* @__PURE__ */ jsx(
              BookOpen,
              {
                className: "w-8 h-8 text-brand-300 mb-2 opacity-80",
                "aria-hidden": "true"
              }
            ),
            categoryName && /* @__PURE__ */ jsx("span", { className: "text-brand-300 text-xs font-semibold tracking-wider uppercase mb-1", children: categoryName }),
            /* @__PURE__ */ jsx("p", { className: "text-white font-bold text-sm line-clamp-2 px-4", children: post.title })
          ] }),
          categoryName && categoryUrl && /* @__PURE__ */ jsx("div", { className: "absolute top-3 start-3 z-10", children: /* @__PURE__ */ jsx(
            "span",
            {
              onClick: (e) => {
                e.stopPropagation();
              },
              children: /* @__PURE__ */ jsx(Link, { to: categoryUrl, tabIndex: 0, children: /* @__PURE__ */ jsx(
                Badge,
                {
                  variant: "brand",
                  size: "sm",
                  className: "bg-brand-900/90 backdrop-blur-xs text-white border-none shadow-xs hover:bg-brand-800 transition-colors",
                  children: categoryName
                }
              ) })
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "p-6 flex flex-col flex-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 text-xs text-content-muted mb-3", children: [
        formattedDate && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(
            Calendar,
            {
              className: "w-3.5 h-3.5 text-brand-600",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsx("time", { dateTime: post.published_at || void 0, children: formattedDate })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-brand-600", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("span", { children: t("blog.readTime", { count: post.reading_time_min || 5 }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-content-heading group-hover:text-brand-600 transition-colors line-clamp-2 mb-3 leading-snug", children: /* @__PURE__ */ jsx(
        Link,
        {
          to: postUrl,
          className: "focus-visible:outline-none focus-visible:underline",
          children: post.title
        }
      ) }),
      post.excerpt && /* @__PURE__ */ jsx("p", { className: "text-sm text-content-body line-clamp-3 leading-relaxed mb-6 flex-1", children: post.excerpt }),
      /* @__PURE__ */ jsx("div", { className: "mt-auto pt-4 border-t border-surface-border", children: /* @__PURE__ */ jsxs(
        Link,
        {
          to: postUrl,
          className: "inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 group-hover:text-brand-500 transition-colors focus-visible:outline-none",
          children: [
            /* @__PURE__ */ jsx("span", { children: t("actions.readMore") }),
            isRtl ? /* @__PURE__ */ jsx(
              ArrowLeft,
              {
                className: "w-4 h-4 transition-transform group-hover:-translate-x-1",
                "aria-hidden": "true"
              }
            ) : /* @__PURE__ */ jsx(
              ArrowRight,
              {
                className: "w-4 h-4 transition-transform group-hover:translate-x-1",
                "aria-hidden": "true"
              }
            )
          ]
        }
      ) })
    ] })
  ] });
};
(_da = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _da.call(globalThis, "src/features/home/components/LatestPostsSection.tsx");
const LatestPostsSection = ({ posts }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const isEn = location.pathname.startsWith("/en");
  const isRtl = !isEn;
  const revealRef = useScrollReveal({
    selector: "[data-post-card]",
    stagger: 0.08,
    distance: 20,
    dependencies: [posts]
  });
  if (!posts || posts.length === 0) {
    return null;
  }
  const prefix = isEn ? "/en" : "";
  return /* @__PURE__ */ jsx(Section, { variant: "white", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { ref: revealRef, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between mb-12", children: [
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          kicker: t("home.blogEyebrow"),
          title: t("home.blogHeading"),
          intro: t("home.blogSubtitle"),
          className: "mb-0"
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: `${prefix}/blog`,
          className: "inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-500 font-semibold text-sm mt-4 md:mt-0 transition-colors flex-shrink-0",
          children: [
            /* @__PURE__ */ jsx("span", { children: t("home.blogViewAll") }),
            isRtl ? /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: posts.slice(0, 3).map((post, idx) => /* @__PURE__ */ jsx("div", { "data-post-card": true, children: /* @__PURE__ */ jsx(
      PostCard,
      {
        post,
        priority: idx === 0
      }
    ) }, post.id)) })
  ] }) }) });
};
(_ea = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ea.call(globalThis, "src/hooks/useHeroAnimation.ts");
const useHeroAnimation = (options = {}) => {
  return useScrollReveal({
    selector: "[data-hero-element]",
    stagger: ANIMATION_TOKENS.stagger.slow,
    distance: ANIMATION_TOKENS.distance.md,
    duration: ANIMATION_TOKENS.duration.hero,
    delay: 0.05,
    scrollTrigger: false,
    ...options
  });
};
(_fa = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _fa.call(globalThis, "src/features/home/HomePage.tsx");
const HomePage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isEn = location.pathname.startsWith("/en");
  const isRtl = !isEn;
  const heroRef = useHeroAnimation();
  const aboutRef = useScrollReveal({
    selector: "[data-about-reveal]",
    distance: 16,
    stagger: 0.08
  });
  const servicesRef = useScrollReveal({
    selector: "[data-service-card]",
    distance: 20,
    stagger: 0.08
  });
  const whyUsRef = useScrollReveal({
    selector: "[data-why-card]",
    distance: 20,
    stagger: 0.06
  });
  const maintRef = useScrollReveal({
    selector: "[data-maint-item]",
    distance: 14,
    stagger: 0.04
  });
  const settings = useSiteSettings();
  const { data: worksData } = useWorks({ limit: 6 });
  const { data: partnersData } = usePartners();
  const { data: postsData } = useBlogPosts({
    lang: isEn ? "en" : "ar",
    limit: 3
  });
  const prefix = isEn ? "/en" : "";
  const whyUsIcons = [
    /* @__PURE__ */ jsx(BadgeCheck, { className: "w-6 h-6 text-brand-600", "aria-hidden": "true" }, "0"),
    /* @__PURE__ */ jsx(ShieldCheck, { className: "w-6 h-6 text-brand-600", "aria-hidden": "true" }, "1"),
    /* @__PURE__ */ jsx(Truck, { className: "w-6 h-6 text-brand-600", "aria-hidden": "true" }, "2"),
    /* @__PURE__ */ jsx(Siren, { className: "w-6 h-6 text-brand-600", "aria-hidden": "true" }, "3"),
    /* @__PURE__ */ jsx(Gauge, { className: "w-6 h-6 text-brand-600", "aria-hidden": "true" }, "4"),
    /* @__PURE__ */ jsx(HardHat, { className: "w-6 h-6 text-brand-600", "aria-hidden": "true" }, "5"),
    /* @__PURE__ */ jsx(Timer, { className: "w-6 h-6 text-brand-600", "aria-hidden": "true" }, "6")
  ];
  const servicesData = [
    {
      key: "maintenance",
      icon: /* @__PURE__ */ jsx(Wrench, { className: "w-6 h-6 text-brand-600", "aria-hidden": "true" }),
      title: t("services.maintenance.title"),
      desc: t("services.maintenance.shortDesc"),
      link: `${prefix}/services/elevator-maintenance`
    },
    {
      key: "modernization",
      icon: /* @__PURE__ */ jsx(Sparkles, { className: "w-6 h-6 text-brand-600", "aria-hidden": "true" }),
      title: t("services.modernization.title"),
      desc: t("services.modernization.shortDesc"),
      link: `${prefix}/services/elevator-modernization`
    },
    {
      key: "installation",
      icon: /* @__PURE__ */ jsx(Building2, { className: "w-6 h-6 text-brand-600", "aria-hidden": "true" }),
      title: t("services.installation.title"),
      desc: t("services.installation.shortDesc"),
      link: `${prefix}/services/elevator-installation`
    },
    {
      key: "spareParts",
      icon: /* @__PURE__ */ jsx(PackageCheck, { className: "w-6 h-6 text-brand-600", "aria-hidden": "true" }),
      title: t("services.spareParts.title"),
      desc: t("services.spareParts.shortDesc"),
      link: `${prefix}/services/elevator-spare-parts`
    },
    {
      key: "escalators",
      icon: /* @__PURE__ */ jsx(ArrowUpDown, { className: "w-6 h-6 text-brand-600", "aria-hidden": "true" }),
      title: t("services.escalators.title"),
      desc: t("services.escalators.shortDesc"),
      link: `${prefix}/services/escalators-moving-walkways`
    }
  ];
  const whyUsPoints = t("home.whyUsPoints", { returnObjects: true }) || [];
  const maintenanceIncluded = t("services.maintenance.included", {
    returnObjects: true
  }) || [];
  const maintenanceIcons = [
    /* @__PURE__ */ jsx(ShieldCheck, { className: "w-4 h-4 text-brand-600 flex-shrink-0", "aria-hidden": "true" }, "0"),
    /* @__PURE__ */ jsx(Timer, { className: "w-4 h-4 text-brand-600 flex-shrink-0", "aria-hidden": "true" }, "1"),
    /* @__PURE__ */ jsx(Wrench, { className: "w-4 h-4 text-brand-600 flex-shrink-0", "aria-hidden": "true" }, "2"),
    /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 text-brand-600 flex-shrink-0", "aria-hidden": "true" }, "3"),
    /* @__PURE__ */ jsx(SlidersVertical, { className: "w-4 h-4 text-brand-600 flex-shrink-0", "aria-hidden": "true" }, "4"),
    /* @__PURE__ */ jsx(Cog, { className: "w-4 h-4 text-brand-600 flex-shrink-0", "aria-hidden": "true" }, "5"),
    /* @__PURE__ */ jsx(DoorOpen, { className: "w-4 h-4 text-brand-600 flex-shrink-0", "aria-hidden": "true" }, "6"),
    /* @__PURE__ */ jsx(Gauge, { className: "w-4 h-4 text-brand-600 flex-shrink-0", "aria-hidden": "true" }, "7")
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: isEn ? "Innovative Elevators Co. | Elevator Installation & Maintenance in Jeddah" : "شركة المصاعد المبتكرة | تركيب وصيانة المصاعد في جدة",
        description: isEn ? "Saudi elevator company in Jeddah specialized in installation, maintenance, modernization and escalators. Civil Defense approved with reliable contracts." : "شركة سعودية متخصصة في توريد وتركيب وصيانة وتحديث المصاعد والسلالم الكهربائية في جدة. معتمدون من الدفاع المدني ونوفر عقود صيانة دورية موثوقة.",
        canonical: isEn ? "/en" : "/",
        hreflang: {
          ar: "https://almubtakirah.com",
          en: "https://almubtakirah.com/en",
          xDefault: "https://almubtakirah.com"
        },
        lang: isEn ? "en" : "ar",
        dir: isRtl ? "rtl" : "ltr",
        jsonLd: [
          getOrganizationSchema(),
          getWebSiteSchema(isEn ? "en" : "ar"),
          getLocalBusinessSchema(isEn ? "en" : "ar")
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "section",
      {
        ref: heroRef,
        className: "relative overflow-hidden bg-brand-900 text-white py-20 sm:py-28 lg:py-36",
        children: [
          /* @__PURE__ */ jsx(BrandPattern, { opacity: 0.08 }),
          /* @__PURE__ */ jsx(Container, { className: "relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
            /* @__PURE__ */ jsx(
              "h1",
              {
                "data-hero-element": true,
                className: "text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white tracking-tight",
                children: t("home.heroTitle")
              }
            ),
            /* @__PURE__ */ jsx(
              "p",
              {
                "data-hero-element": true,
                className: "text-lg sm:text-xl text-brand-100 font-normal leading-relaxed mb-8 max-w-2xl mx-auto",
                children: t("home.heroSubtitle")
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                "data-hero-element": true,
                className: "flex flex-wrap items-center justify-center gap-4",
                children: [
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "hero",
                      size: "lg",
                      to: `${prefix}/contact`,
                      rightIcon: isRtl ? /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" }),
                      children: t("actions.requestQuote")
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "inverse",
                      size: "lg",
                      href: `tel:${settings.contact.unifiedNumber}`,
                      leftIcon: /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5 text-brand-300" }),
                      children: t("actions.callNow")
                    }
                  )
                ]
              }
            )
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(Section, { variant: "white", className: "border-b border-surface-border", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { ref: aboutRef, className: "max-w-4xl", children: [
      /* @__PURE__ */ jsx(
        "span",
        {
          "data-about-reveal": true,
          className: "text-xs md:text-sm font-semibold text-brand-600 tracking-wider uppercase mb-3 block",
          children: t("home.aboutEyebrow")
        }
      ),
      /* @__PURE__ */ jsx(
        "h2",
        {
          "data-about-reveal": true,
          className: "text-2xl sm:text-3xl font-bold text-content-heading mb-5 leading-snug",
          children: t("home.aboutHeading")
        }
      ),
      /* @__PURE__ */ jsx(
        "p",
        {
          "data-about-reveal": true,
          className: "text-content-body text-base sm:text-lg leading-relaxed mb-8",
          children: t("home.aboutText")
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          "data-about-reveal": true,
          className: "flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-surface-border",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-content-muted", children: [
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 font-medium text-content-body", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-feedback-success" }),
                t("brand.cr")
              ] }),
              /* @__PURE__ */ jsx("span", { children: "•" }),
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 font-medium text-content-body", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-feedback-success" }),
                t("brand.accreditation")
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: `${prefix}/about`,
                className: "inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors",
                children: [
                  /* @__PURE__ */ jsx("span", { children: t("home.aboutLink") }),
                  isRtl ? /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                ]
              }
            )
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx(Section, { variant: "soft", className: "border-b border-surface-border", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { ref: servicesRef, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between mb-12", children: [
        /* @__PURE__ */ jsx(
          SectionHeading,
          {
            kicker: t("home.servicesEyebrow"),
            title: t("home.servicesHeading"),
            intro: t("home.servicesSubtitle"),
            className: "max-w-2xl"
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: `${prefix}/services`,
            className: "inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-700 font-semibold text-sm mt-4 md:mt-0 transition-colors",
            children: [
              /* @__PURE__ */ jsx("span", { children: t("actions.viewAllServices") }),
              isRtl ? /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: servicesData.slice(0, 3).map((item) => /* @__PURE__ */ jsxs(
        "article",
        {
          "data-service-card": true,
          className: "card-hover bg-white p-7 rounded-card border border-surface-border flex flex-col justify-between group",
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-control bg-brand-50 flex items-center justify-center mb-6 group-hover:bg-brand-100 transition-colors", children: item.icon }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-content-heading mb-3 group-hover:text-brand-600 transition-colors", children: /* @__PURE__ */ jsx(Link, { to: item.link, children: item.title }) }),
              /* @__PURE__ */ jsx("p", { className: "text-content-body text-sm leading-relaxed mb-6", children: item.desc })
            ] }),
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: item.link,
                className: "inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:text-brand-700 pt-4 border-t border-surface-border",
                children: [
                  /* @__PURE__ */ jsx("span", { children: t("services.cardLearnMore") }),
                  isRtl ? /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                ]
              }
            )
          ]
        },
        item.key
      )) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mt-6", children: servicesData.slice(3).map((item) => /* @__PURE__ */ jsxs(
        "article",
        {
          "data-service-card": true,
          className: "card-hover bg-white p-7 rounded-card border border-surface-border flex flex-col justify-between group",
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-control bg-brand-50 flex items-center justify-center mb-6 group-hover:bg-brand-100 transition-colors", children: item.icon }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-content-heading mb-3 group-hover:text-brand-600 transition-colors", children: /* @__PURE__ */ jsx(Link, { to: item.link, children: item.title }) }),
              /* @__PURE__ */ jsx("p", { className: "text-content-body text-sm leading-relaxed mb-6", children: item.desc })
            ] }),
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: item.link,
                className: "inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:text-brand-700 pt-4 border-t border-surface-border",
                children: [
                  /* @__PURE__ */ jsx("span", { children: t("services.cardLearnMore") }),
                  isRtl ? /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                ]
              }
            )
          ]
        },
        item.key
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsx(Section, { variant: "white", className: "border-b border-surface-border", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { ref: whyUsRef, children: [
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          kicker: t("home.whyUsEyebrow"),
          title: t("home.whyUsHeading"),
          intro: t("home.whyUsIntro"),
          align: "center",
          className: "max-w-2xl mx-auto mb-16"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: whyUsPoints.map((point, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          "data-why-card": true,
          className: "card-hover p-6 rounded-card border border-surface-border bg-surface-subtle/50 hover:bg-white hover:border-brand-200 flex flex-col group",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-control bg-white border border-surface-border flex items-center justify-center mb-4 shadow-sm group-hover:bg-brand-50 group-hover:border-brand-200 transition-colors", children: whyUsIcons[index % whyUsIcons.length] }),
            /* @__PURE__ */ jsx("h3", { className: "text-base font-bold text-content-heading mb-2 group-hover:text-brand-600 transition-colors", children: point.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-content-body leading-relaxed", children: point.description })
          ]
        },
        index
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsx(Section, { variant: "soft", className: "border-b border-surface-border", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { ref: maintRef, children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mb-8", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs md:text-sm font-semibold text-brand-600 tracking-wider uppercase mb-2 block", children: t("home.maintenanceEyebrow") }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-content-heading mb-4 leading-snug", children: t("home.maintenanceHeading") }),
        /* @__PURE__ */ jsx("p", { className: "text-content-body text-base leading-relaxed", children: t("home.maintenanceSubtitle") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 h-full", children: maintenanceIncluded.map((item, idx) => /* @__PURE__ */ jsxs(
          "div",
          {
            "data-maint-item": true,
            className: "flex items-center gap-3 p-3.5 bg-white rounded-card border border-surface-border hover:border-brand-200 text-sm font-medium text-content-body shadow-xs transition-colors",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0", children: maintenanceIcons[idx % maintenanceIcons.length] }),
              /* @__PURE__ */ jsx("span", { children: item })
            ]
          },
          idx
        )) }) }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            "data-maint-item": true,
            className: "lg:col-span-5 bg-brand-900 text-white p-6 sm:p-7 rounded-card relative overflow-hidden shadow-card flex flex-col justify-between h-full",
            children: [
              /* @__PURE__ */ jsx(BrandPattern, { opacity: 0.08 }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col h-full justify-between", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-brand-400 uppercase tracking-wider block mb-2", children: t("services.modernization.title") }),
                  /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold mb-3 text-white", children: t("home.modernizationBoxTitle") }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-brand-100 leading-relaxed mb-6", children: t("home.modernizationBoxText") })
                ] }),
                /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "primary",
                    to: `${prefix}/services/elevator-modernization`,
                    className: "bg-brand-500 hover:bg-brand-400 text-white font-semibold inline-flex",
                    rightIcon: isRtl ? /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" }),
                    children: t("home.modernizationBoxCta")
                  }
                ) })
              ] })
            ]
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx(WorksSection, { works: worksData == null ? void 0 : worksData.works }),
    /* @__PURE__ */ jsx(PartnersSection, { partners: partnersData }),
    /* @__PURE__ */ jsx(LatestPostsSection, { posts: postsData == null ? void 0 : postsData.posts }),
    /* @__PURE__ */ jsx(CtaBand, {})
  ] });
};
(_ga = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ga.call(globalThis, "src/features/about/AboutPage.tsx");
const AboutPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { data: partnersData } = usePartners();
  const isEn = location.pathname.startsWith("/en");
  const isRtl = !isEn;
  const heroRef = useHeroAnimation();
  const pillarsRef = useScrollReveal({
    selector: "[data-pillar-card]",
    distance: 20,
    stagger: 0.08
  });
  const logoRef = useScrollReveal({
    selector: "[data-logo-card]",
    distance: 20,
    stagger: 0.08
  });
  const factsRef = useScrollReveal({
    selector: "[data-fact-card]",
    distance: 16,
    stagger: 0.05
  });
  const breadcrumbsItems = [
    { label: t("common.breadcrumbHome"), to: isEn ? "/en" : "/" },
    { label: t("nav.about") }
  ];
  const facts = t("about.facts", { returnObjects: true }) || [];
  const logoElements = t("about.logoElements", {
    returnObjects: true
  }) || [];
  const logoIcons = [
    /* @__PURE__ */ jsx(TrendingUp, { className: "w-6 h-6 text-brand-600 transition-transform duration-300 group-hover:scale-110", "aria-hidden": "true" }, "0"),
    /* @__PURE__ */ jsx(Hexagon, { className: "w-6 h-6 text-brand-700 transition-transform duration-300 group-hover:scale-110", "aria-hidden": "true" }, "1"),
    /* @__PURE__ */ jsx(Palette, { className: "w-6 h-6 text-brand-600 transition-transform duration-300 group-hover:scale-110", "aria-hidden": "true" }, "2")
  ];
  const logoBadgeStyles = [
    "bg-gradient-to-br from-brand-50 to-brand-100/80 border-brand-200/60 text-brand-600",
    "bg-gradient-to-br from-blue-50 to-indigo-100/70 border-indigo-200/60 text-brand-700",
    "bg-gradient-to-br from-sky-50 to-cyan-100/70 border-sky-200/60 text-brand-600"
  ];
  const factIcons = [
    /* @__PURE__ */ jsx(FileCheck, { className: "w-5 h-5 text-brand-600", "aria-hidden": "true" }, "0"),
    /* @__PURE__ */ jsx(ShieldCheck, { className: "w-5 h-5 text-feedback-success", "aria-hidden": "true" }, "1"),
    /* @__PURE__ */ jsx(Building2, { className: "w-5 h-5 text-brand-600", "aria-hidden": "true" }, "2"),
    /* @__PURE__ */ jsx(Wrench, { className: "w-5 h-5 text-brand-600", "aria-hidden": "true" }, "3"),
    /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-brand-600", "aria-hidden": "true" }, "4"),
    /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-brand-600", "aria-hidden": "true" }, "5")
  ];
  const factBadgeStyles = [
    "bg-brand-50 text-brand-600 border-brand-100",
    "bg-emerald-50 text-feedback-success border-emerald-100",
    "bg-brand-50 text-brand-600 border-brand-100",
    "bg-brand-50 text-brand-600 border-brand-100",
    "bg-brand-50 text-brand-600 border-brand-100",
    "bg-brand-50 text-brand-600 border-brand-100"
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: t("about.pageTitle"),
        description: t("about.pageDescription"),
        canonical: isEn ? "/en/about" : "/about",
        hreflang: {
          ar: "https://almubtakirah.com/about",
          en: "https://almubtakirah.com/en/about",
          xDefault: "https://almubtakirah.com/about"
        },
        lang: isEn ? "en" : "ar",
        dir: isRtl ? "rtl" : "ltr",
        breadcrumbs: [
          { name: t("common.breadcrumbHome"), url: isEn ? "/en" : "/" },
          { name: t("nav.about"), url: isEn ? "/en/about" : "/about" }
        ],
        jsonLd: [getLocalBusinessSchema(isEn ? "en" : "ar")]
      }
    ),
    /* @__PURE__ */ jsxs(
      "section",
      {
        ref: heroRef,
        className: "bg-brand-900 text-white py-14 md:py-20 relative overflow-hidden",
        children: [
          /* @__PURE__ */ jsx(BrandPattern, { opacity: 0.07 }),
          /* @__PURE__ */ jsxs(Container, { className: "relative z-10", children: [
            /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems, className: "mb-6 text-white/80" }),
            /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  "data-hero-element": true,
                  className: "text-xs font-semibold text-brand-300 uppercase tracking-wider block mb-2",
                  children: t("about.eyebrow")
                }
              ),
              /* @__PURE__ */ jsx(
                "h1",
                {
                  "data-hero-element": true,
                  className: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6",
                  children: t("about.heading")
                }
              ),
              /* @__PURE__ */ jsx(
                "p",
                {
                  "data-hero-element": true,
                  className: "text-base sm:text-lg text-brand-100 leading-relaxed font-normal",
                  children: t("about.lead")
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(Section, { variant: "white", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { ref: pillarsRef, className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          "data-pillar-card": true,
          className: "card-hover p-8 rounded-card border border-surface-border bg-white flex flex-col justify-between shadow-xs hover:border-brand-300",
          children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-brand-600 uppercase tracking-wide mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-brand-600 shrink-0" }),
              t("about.visionEyebrow")
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-content-heading mb-4 leading-snug", children: t("about.visionHeading") }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-content-body leading-relaxed", children: t("about.visionText") })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          "data-pillar-card": true,
          className: "card-hover p-8 rounded-card border border-surface-border bg-white flex flex-col justify-between shadow-xs hover:border-brand-300",
          children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-brand-600 uppercase tracking-wide mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Cpu, { className: "w-4 h-4 text-brand-600 shrink-0" }),
              t("about.approachEyebrow")
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-content-heading mb-4 leading-snug", children: t("about.approachHeading") }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-content-body leading-relaxed", children: t("about.approachText") })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          "data-pillar-card": true,
          className: "card-hover p-8 rounded-card border border-surface-border bg-brand-50/50 flex flex-col justify-between shadow-xs hover:border-brand-300",
          children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-feedback-success uppercase tracking-wide mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(ShieldCheck, { className: "w-4 h-4 text-feedback-success shrink-0" }),
              t("about.missionEyebrow")
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-content-heading mb-4 leading-snug", children: t("about.missionHeading") }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-content-body leading-relaxed", children: t("about.missionText") })
          ] })
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx(Section, { variant: "soft", className: "border-t border-b border-surface-border", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { ref: logoRef, children: [
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          kicker: isEn ? "Visual Identity & Philosophy" : "فلسفة الهوية الهندسية",
          title: t("about.logoMeaningTitle"),
          intro: t("about.logoMeaningIntro"),
          className: "max-w-3xl mb-12"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: logoElements.map((elem, idx) => /* @__PURE__ */ jsxs(
        "div",
        {
          "data-logo-card": true,
          className: "group card-hover p-7 rounded-card bg-white border border-surface-border flex flex-col hover:border-brand-300",
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 shadow-xs group-hover:shadow-sm transition-all duration-300 ${logoBadgeStyles[idx % logoBadgeStyles.length]}`,
                children: logoIcons[idx % logoIcons.length]
              }
            ),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-content-heading mb-3 group-hover:text-brand-600 transition-colors duration-200", children: elem.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-content-body leading-relaxed", children: elem.description })
          ]
        },
        idx
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsx(Section, { variant: "white", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          kicker: isEn ? "Official Credentials & Facts" : "اعتمادات رسمية وموثوقية",
          title: t("about.factsTitle"),
          align: "center",
          className: "mb-10 max-w-2xl mx-auto"
        }
      ),
      /* @__PURE__ */ jsx("div", { ref: factsRef, className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: facts.map((fact, idx) => /* @__PURE__ */ jsxs(
        "div",
        {
          "data-fact-card": true,
          className: "card-hover p-5 rounded-control bg-surface-subtle/50 border border-surface-border flex items-start gap-4 hover:border-brand-300 hover:bg-white",
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-xs ${factBadgeStyles[idx % factBadgeStyles.length]}`,
                children: factIcons[idx % factIcons.length]
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-content-muted block mb-1 font-medium", children: fact.label }),
              /* @__PURE__ */ jsx("span", { className: "text-sm sm:text-base font-bold text-content-heading", children: fact.value })
            ] })
          ]
        },
        idx
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsx(PartnersSection, { partners: partnersData, variant: "white" }),
    /* @__PURE__ */ jsx(CtaBand, {})
  ] });
};
(_ha = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ha.call(globalThis, "src/features/services/serviceIcons.ts");
const serviceIncludedIcons = {
  maintenance: [
    ShieldCheck,
    // عقود صيانة دورية معتمدة رسمياً لدى الدفاع المدني
    Siren,
    // فرق طوارئ جاهزة للاستجابة السريعة للأعطال في جدة
    Cpu,
    // فحص وقائي شهري شامل للمحركات والمنظومة الكهربائية
    FileText,
    // تقارير فنية إلكترونية مع تتبع دقيق لكفاءة التشغيل
    DoorClosed,
    // فحص ومعايرة أقفال الأبواب والستائر الضوئية وحساسات الأمان
    AlertOctagon,
    // اختبار كوابح الطوارئ ومنظمات السرعة وأنظمة النزول التلقائي
    Droplets,
    // تزييت وتشحيم مسارات السكك والبكرات والأجزاء المتحركة
    BatteryCharging
    // فحص البطاريات الاحتياطية وأجهزة الإنقاذ الآلي عند انقطاع الكهرباء
  ],
  modernization: [
    Cpu,
    // ترقية لوحات التحكم الذكية بنظام الميكروبروسيسور المتطور
    Zap,
    // خفض استهلاك الطاقة حتى 40% بمحولات التردد VVVF الحديثة
    Sparkles,
    // تجديد ديكورات الكابينة بلمسات عصرية وإضاءة موفرة LED
    ShieldCheck,
    // تحديث مشغلات الأبواب بحساسات أمان مانعة للاحتجاز
    Cog,
    // استبدال ماكينات السحب بمحركات أوروبية بدون تروس Gearless
    Sliders,
    // ترقية أزرار الطوابق وشاشات العرض الرقمية التفاعلية
    Wrench,
    // معايرة وتجديد الصمامات والمكابس الهيدروليكية
    Award
    // اختبارات أحمال متكاملة وإصدار شهادة تشغيل معتمدة
  ],
  installation: [
    PackageCheck,
    // توريد ماكينات ومعدات أوروبية وإيطالية أصلية بضمان شامل
    Maximize2,
    // حلول متطورة للمساحات المحدودة بدون غرفة محرك (MRL)
    CheckCheck,
    // تنفيذ هندسي ليزري دقيق متوافق مع كود البناء والدفاع المدني
    Eye,
    // مصاعد بانورامية وزجاجية فاخرة بتصاميم معمارية خاصة
    FileSpreadsheet,
    // دراسة دقيقة للمخططات الهندسية ومطابقة مواصفات بئر المصعد
    Sliders,
    // تثبيت سكك التوجيه والأبواب بمحاذاة ميكانيكية متطورة
    BatteryCharging,
    // برمجة أجهزة الطوارئ ونظام الهبوط التلقائي عند انقطاع التيار
    Award
    // تسليم معتمد مع اختبارات الأحمال والسرعة وفترة صيانة مجانية
  ],
  spareParts: [
    BadgeCheck,
    // قطع غيار أصلية 100% لكافة الماركات والموديلات المعتمدة
    Clock,
    // توفير فوري من مستودعاتنا في جدة لتقليل فترات التوقف
    Cog,
    // وحدات طاقة ومضخات هيدروليكية ومحركات سحب أصلية
    ShieldCheck,
    // ضمان جودة معتمد ضد عيوب التصنيع وسوء التركيب
    Cpu,
    // لوحات تحكم وكروت إلكترونية وحواسب توقف دقيق
    DoorClosed,
    // مشغلات أبواب وأحزمة وأقفال ميكانيكية وحساسات ليزرية
    Droplets,
    // حبال جر فولاذية وبكرات توجيه وزيوت هيدروليك معتمدة
    ShieldAlert
    // أجهزة سلامة وكوابح باراشوت وستائر حماية إلكترونية
  ],
  escalators: [
    ArrowUpDown,
    // فحص وصيانة دورية دقيقة للدرجات والأمشاط وسلاسل الجر
    Sliders,
    // معايرة واختبار درابزين اليد المتحرك وأجهزة التوقف الطارئ
    Droplets,
    // تشحيم وتزييت مبرمج يمنع الضوضاء والاهتزاز ويطيل عمر السلم
    Users,
    // فحص شامل معتمد يضمن سلامة العائلات والأطفال بالمنشآت
    Cog,
    // صيانة علبة التروس (Gearbox) ومحركات السحب والكوابح الديناميكية
    ScanLine,
    // اختبار حساسات الأمان المانعة لاصطدام الأمشاط وكسر السلاسل
    Activity,
    // اختبارات حركة متواصلة تحت الحمل لضمان ثبات السرعة
    HeartHandshake
    // صيانة مخصصة لرافعات ومصاعد منصات أصحاب الهمم
  ]
};
const serviceEquipmentIcons = {
  maintenance: [
    Building2,
    // مصاعد الركاب السكنية والبرجية
    Home,
    // المصاعد الهيدروليكية ومصاعد الفلل
    Truck,
    // مصاعد الحمولات والبضائع
    Activity,
    // مصاعد المستشفيات والأسرة
    Sparkles
    // مصاعد ذوي الاحتياجات الخاصة والبانوراما
  ],
  modernization: [
    Clock,
    // المصاعد القديمة التي تجاوز عمرها التشغيلي 10 إلى 15 عاماً
    Droplets,
    // المصاعد الهيدروليكية التي تعاني من بطء الحركة أو استهلاك الزيت
    Building2,
    // مصاعد الأبراج التجارية ذات حركة الركاب الكثيفة
    Cpu
    // المصاعد السكنية التي تتكرر أعطال لوحات تحكمها التقليدية
  ],
  installation: [
    Maximize2,
    // مصاعد الركاب بدون غرفة محرك (MRL)
    Building2,
    // مصاعد الركاب بغرفة محرك علوية
    Home,
    // مصاعد الفلل الهيدروليكية ذات المساحات المحدودة
    Eye,
    // مصاعد البانوراما الزجاجية للمولات والمباني الفاخرة
    Package
    // مصاعد الخدمة والبضائع للمستودعات والمطاعم
  ],
  spareParts: [
    Droplets,
    // قطع غيار المصاعد الهيدروليكية بمختلف سعاتها
    Zap,
    // قطع غيار مصاعد الجر الكهربائية العادية وذات السرعات العالية
    DoorClosed,
    // مكونات أبواب المصاعد الأوتوماتيكية والنص أوتوماتيكية
    ShieldAlert
    // أجهزة السلامة والحساسات الضوئية والستائر الإلكترونية
  ],
  escalators: [
    ArrowUpDown,
    // السلالم المتحركة الداخلية في المراكز التجارية والمولات
    Building2,
    // السلالم المتحركة شديدة التحمل للمباني الخدمية ومحطات النقل
    MoveRight,
    // الممرات المتحركة الأفقية والمائلة للمطارات والأسواق الكبرى
    Accessibility
    // رافعات ومصاعد منصات ذوي الاحتياجات الخاصة
  ]
};
const serviceProcessIcons = {
  maintenance: [
    Search,
    // 01 الفحص الهندسي الشامل
    ClipboardCheck,
    // 02 إعداد التقرير التشغيلي
    Wrench,
    // 03 تنفيذ الصيانة الدورية
    Siren
    // 04 الدعم الطارئ المستمر
  ],
  modernization: [
    Scan,
    // 01 تقييم الأنظمة الحالية
    Sliders,
    // 02 تحديد نطاق التحديث
    Cog,
    // 03 التوريد والتركيب المبرمج
    ShieldCheck
    // 04 المعايرة واختبارات السلامة
  ],
  installation: [
    Compass,
    // 01 المعاينة الهندسية للموقع
    PackageCheck,
    // 02 التوريد والمطابقة
    Wrench,
    // 03 التركيب الميكانيكي والكهربائي
    Award
    // 04 الفحص النهائي والتسليم
  ],
  spareParts: [
    Search,
    // 01 فحص وتحديد القطعة المطلوبة
    Truck,
    // 02 المطابقة والتأمين السريع
    Wrench,
    // 03 التركيب والمعايرة الفنية
    BadgeCheck
    // 04 اختبار الأداء والضمان
  ],
  escalators: [
    Eye,
    // 01 الفحص البصري والميكانيكي
    ShieldAlert,
    // 02 اختبار مفاتيح الأمان والحساسات
    Droplets,
    // 03 التزييت والضبط الحركي
    Activity
    // 04 الاختبار الديناميكي تحت الحمل
  ]
};
const processStepIcons = [
  Search,
  // 01 المعاينة والفحص الهندسي
  ClipboardCheck,
  // 02 إعداد التقرير والمطابقة
  Wrench,
  // 03 التنفيذ والتركيب والصيانة
  ShieldCheck
  // 04 التسليم والاختبار والدعم
];
const getServiceIncludedIcon = (serviceKey, index) => {
  const icons = serviceIncludedIcons[serviceKey];
  return icons && icons[index] ? icons[index] : ShieldCheck;
};
const getEquipmentIcon = (serviceKey, index) => {
  const icons = serviceEquipmentIcons[serviceKey];
  return icons && icons[index] ? icons[index] : Building2;
};
const getServiceProcessIcon = (serviceKey, index) => {
  const icons = serviceProcessIcons[serviceKey];
  return icons && icons[index] ? icons[index] : processStepIcons[index] || Wrench;
};
(_ia = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ia.call(globalThis, "src/features/services/ServicesPage.tsx");
const ServicesPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isEn = location.pathname.startsWith("/en");
  const isRtl = !isEn;
  const heroRef = useHeroAnimation();
  const servicesRevealRef = useScrollReveal({
    selector: "[data-service-card]",
    distance: 20,
    stagger: 0.08
  });
  const prefix = isEn ? "/en" : "";
  const breadcrumbsItems = [
    { label: t("common.breadcrumbHome"), to: isEn ? "/en" : "/" },
    { label: t("nav.services") }
  ];
  const services2 = [
    {
      key: "maintenance",
      icon: /* @__PURE__ */ jsx(Wrench, { className: "w-7 h-7 text-brand-600 transition-transform duration-300 group-hover:scale-110", "aria-hidden": "true" }),
      badgeClass: "bg-gradient-to-br from-brand-50 to-brand-100/80 border-brand-200/80",
      title: t("services.maintenance.title"),
      desc: t("services.maintenance.intro"),
      slug: "elevator-maintenance",
      items: t("services.maintenance.included", {
        returnObjects: true
      }).slice(0, 4)
    },
    {
      key: "modernization",
      icon: /* @__PURE__ */ jsx(Sparkles, { className: "w-7 h-7 text-indigo-600 transition-transform duration-300 group-hover:scale-110", "aria-hidden": "true" }),
      badgeClass: "bg-gradient-to-br from-indigo-50 to-blue-100/70 border-indigo-200/80",
      title: t("services.modernization.title"),
      desc: t("services.modernization.intro"),
      slug: "elevator-modernization",
      items: t("services.modernization.included", {
        returnObjects: true
      }).slice(0, 4)
    },
    {
      key: "installation",
      icon: /* @__PURE__ */ jsx(Building2, { className: "w-7 h-7 text-amber-600 transition-transform duration-300 group-hover:scale-110", "aria-hidden": "true" }),
      badgeClass: "bg-gradient-to-br from-amber-50 to-orange-100/70 border-amber-200/80",
      title: t("services.installation.title"),
      desc: t("services.installation.intro"),
      slug: "elevator-installation",
      items: t("services.installation.included", {
        returnObjects: true
      }).slice(0, 4)
    },
    {
      key: "spareParts",
      icon: /* @__PURE__ */ jsx(PackageCheck, { className: "w-7 h-7 text-emerald-600 transition-transform duration-300 group-hover:scale-110", "aria-hidden": "true" }),
      badgeClass: "bg-gradient-to-br from-emerald-50 to-teal-100/70 border-emerald-200/80",
      title: t("services.spareParts.title"),
      desc: t("services.spareParts.intro"),
      slug: "elevator-spare-parts",
      items: t("services.spareParts.included", {
        returnObjects: true
      }).slice(0, 4)
    },
    {
      key: "escalators",
      icon: /* @__PURE__ */ jsx(ArrowUpDown, { className: "w-7 h-7 text-purple-600 transition-transform duration-300 group-hover:scale-110", "aria-hidden": "true" }),
      badgeClass: "bg-gradient-to-br from-purple-50 to-indigo-100/70 border-purple-200/80",
      title: t("services.escalators.title"),
      desc: t("services.escalators.intro"),
      slug: "escalators-moving-walkways",
      items: t("services.escalators.included", {
        returnObjects: true
      }).slice(0, 4)
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: t("services.pageTitle"),
        description: t("services.pageDescription"),
        canonical: isEn ? "/en/services" : "/services",
        hreflang: {
          ar: "https://almubtakirah.com/services",
          en: "https://almubtakirah.com/en/services",
          xDefault: "https://almubtakirah.com/services"
        },
        lang: isEn ? "en" : "ar",
        dir: isRtl ? "rtl" : "ltr",
        breadcrumbs: [
          { name: t("common.breadcrumbHome"), url: isEn ? "/en" : "/" },
          { name: t("nav.services"), url: isEn ? "/en/services" : "/services" }
        ],
        jsonLd: [
          getCollectionPageSchema(
            t("services.pageTitle"),
            t("services.pageDescription"),
            isEn ? "https://almubtakirah.com/en/services" : "https://almubtakirah.com/services"
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "section",
      {
        ref: heroRef,
        className: "bg-brand-900 text-white py-14 md:py-20 relative overflow-hidden",
        children: [
          /* @__PURE__ */ jsx(BrandPattern, { opacity: 0.07 }),
          /* @__PURE__ */ jsxs(Container, { className: "relative z-10", children: [
            /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems, className: "mb-6 text-white/80" }),
            /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  "data-hero-element": true,
                  className: "text-xs font-semibold text-brand-300 uppercase tracking-wider block mb-2",
                  children: t("services.eyebrow")
                }
              ),
              /* @__PURE__ */ jsx(
                "h1",
                {
                  "data-hero-element": true,
                  className: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6",
                  children: t("services.heading")
                }
              ),
              /* @__PURE__ */ jsx(
                "p",
                {
                  "data-hero-element": true,
                  className: "text-base sm:text-lg text-brand-100 leading-relaxed font-normal",
                  children: t("services.intro")
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(Section, { variant: "white", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx("div", { ref: servicesRevealRef, className: "space-y-8", children: services2.map((service, index) => {
      const detailUrl = `${prefix}/services/${service.slug}`;
      return /* @__PURE__ */ jsxs(
        "article",
        {
          "data-service-card": true,
          className: "group card-hover bg-white rounded-card border border-surface-border p-8 md:p-10 hover:border-brand-300 flex flex-col lg:flex-row gap-8 items-start justify-between",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "lg:max-w-2xl flex-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-5", children: [
                /* @__PURE__ */ jsx("div", { className: `w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 shadow-xs group-hover:shadow-sm transition-all duration-300 ${service.badgeClass}`, children: service.icon }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-brand-600 uppercase tracking-wider block mb-1", children: [
                    "0",
                    index + 1
                  ] }),
                  /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-content-heading group-hover:text-brand-600 transition-colors", children: /* @__PURE__ */ jsx(
                    Link,
                    {
                      to: detailUrl,
                      children: service.title
                    }
                  ) })
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-content-body text-base leading-relaxed mb-6 font-normal", children: service.desc }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6", children: service.items.map((item, i) => {
                const ItemIcon = getServiceIncludedIcon(
                  service.key,
                  i
                );
                return /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2.5 text-sm text-content-body font-medium",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-md bg-brand-50 border border-brand-200/80 flex items-center justify-center shrink-0 text-brand-600", children: /* @__PURE__ */ jsx(ItemIcon, { className: "w-3.5 h-3.5" }) }),
                      /* @__PURE__ */ jsx("span", { children: item })
                    ]
                  },
                  i
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-auto lg:self-center flex flex-col sm:flex-row lg:flex-col gap-3", children: [
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: detailUrl,
                  className: "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-control text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-colors shadow-sm",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: t("services.cardLearnMore") }),
                    isRtl ? /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                Link,
                {
                  to: `${prefix}/contact`,
                  className: "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-control text-sm font-semibold bg-surface-subtle hover:bg-surface-border text-content-heading transition-colors border border-surface-border",
                  children: /* @__PURE__ */ jsx("span", { children: t("actions.requestQuote") })
                }
              )
            ] })
          ]
        },
        service.key
      );
    }) }) }) }),
    /* @__PURE__ */ jsx(CtaBand, {})
  ] });
};
(_ja = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ja.call(globalThis, "src/features/services/ServiceDetailPage.tsx");
const ServiceDetailPage = ({
  serviceKey
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const settings = useSiteSettings();
  const isEn = location.pathname.startsWith("/en");
  const isRtl = !isEn;
  const heroRef = useHeroAnimation();
  const includedRef = useScrollReveal({
    selector: "[data-included-item]",
    distance: 16,
    stagger: 0.05,
    dependencies: [serviceKey]
  });
  const processRef = useScrollReveal({
    selector: "[data-process-step]",
    distance: 20,
    stagger: 0.08,
    dependencies: [serviceKey]
  });
  const equipmentRef = useScrollReveal({
    selector: "[data-equipment-card]",
    distance: 16,
    stagger: 0.06,
    dependencies: [serviceKey]
  });
  const relatedWorksRef = useScrollReveal({
    selector: "[data-related-work]",
    distance: 20,
    stagger: 0.08
  });
  const dbServiceTypeMap = {
    maintenance: "maintenance",
    modernization: "modernization",
    installation: "installation",
    spareParts: "spare-parts",
    escalators: "escalators"
  };
  const { data: relatedWorksData } = useWorks({
    serviceType: dbServiceTypeMap[serviceKey],
    limit: 3
  });
  const prefix = isEn ? "/en" : "";
  const serviceData = {
    title: t(`services.${serviceKey}.title`),
    h1: t(`services.${serviceKey}.h1`),
    intro: t(`services.${serviceKey}.intro`),
    included: t(`services.${serviceKey}.included`, {
      returnObjects: true
    }) || [],
    process: t(`services.${serviceKey}.process`, {
      returnObjects: true
    }) || [],
    equipment: t(`services.${serviceKey}.equipment`, {
      returnObjects: true
    }) || [],
    faqs: t(`services.${serviceKey}.faqs`, {
      returnObjects: true
    }) || []
  };
  const serviceSlugMap = {
    maintenance: "elevator-maintenance",
    modernization: "elevator-modernization",
    installation: "elevator-installation",
    spareParts: "elevator-spare-parts",
    escalators: "escalators-moving-walkways"
  };
  const serviceSlug = serviceSlugMap[serviceKey];
  const canonicalUrl = `https://almubtakirah.com${prefix}/services/${serviceSlug}`;
  const breadcrumbsItems = [
    { label: t("common.breadcrumbHome"), to: prefix || "/" },
    { label: t("common.breadcrumbServices"), to: `${prefix}/services` },
    { label: serviceData.title }
  ];
  const serviceSchema = getServiceSchema(
    serviceData.title,
    serviceData.intro,
    canonicalUrl
  );
  const faqSchema = getFaqSchema(serviceData.faqs);
  const accordionItems = serviceData.faqs.map((faq, idx) => ({
    id: `faq-${idx}`,
    title: faq.q,
    content: /* @__PURE__ */ jsx("p", { className: "text-sm text-content-body leading-relaxed py-2", children: faq.a })
  }));
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: `${serviceData.title} | ${t("brand.name")}`,
        description: serviceData.intro.slice(0, 160),
        canonical: canonicalUrl,
        hreflang: {
          ar: `https://almubtakirah.com/services/${serviceSlug}`,
          en: `https://almubtakirah.com/en/services/${serviceSlug}`,
          xDefault: `https://almubtakirah.com/services/${serviceSlug}`
        },
        lang: isEn ? "en" : "ar",
        dir: isRtl ? "rtl" : "ltr",
        breadcrumbs: [
          { name: t("common.breadcrumbHome"), url: isEn ? "/en" : "/" },
          { name: t("common.breadcrumbServices"), url: isEn ? "/en/services" : "/services" },
          { name: serviceData.title, url: canonicalUrl }
        ],
        jsonLd: [serviceSchema, faqSchema].filter(Boolean)
      }
    ),
    /* @__PURE__ */ jsxs(
      "section",
      {
        ref: heroRef,
        className: "bg-brand-900 text-white py-14 md:py-20 relative overflow-hidden",
        children: [
          /* @__PURE__ */ jsx(BrandPattern, { opacity: 0.07 }),
          /* @__PURE__ */ jsxs(Container, { className: "relative z-10", children: [
            /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems, className: "mb-6 text-white/80" }),
            /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  "data-hero-element": true,
                  className: "text-xs font-semibold text-brand-300 uppercase tracking-wider block mb-2",
                  children: t("services.eyebrow")
                }
              ),
              /* @__PURE__ */ jsx(
                "h1",
                {
                  "data-hero-element": true,
                  className: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight",
                  children: serviceData.h1
                }
              ),
              /* @__PURE__ */ jsx(
                "p",
                {
                  "data-hero-element": true,
                  className: "text-base sm:text-lg text-brand-100 leading-relaxed font-normal mb-8",
                  children: serviceData.intro
                }
              ),
              /* @__PURE__ */ jsxs("div", { "data-hero-element": true, className: "flex flex-wrap items-center gap-4", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "hero",
                    size: "lg",
                    to: `${prefix}/contact`,
                    rightIcon: isRtl ? /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" }),
                    children: t("actions.requestQuote")
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "inverse",
                    size: "lg",
                    href: `tel:${settings.contact.unifiedNumber}`,
                    leftIcon: /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5 text-brand-300" }),
                    children: t("actions.callNow")
                  }
                )
              ] })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(Section, { variant: "white", className: "border-b border-surface-border", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl", children: [
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          kicker: isEn ? "Scope of Service" : "نطاق العمل",
          title: t("services.includedTitle"),
          className: "mb-8"
        }
      ),
      /* @__PURE__ */ jsx("div", { ref: includedRef, className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: serviceData.included.map((item, idx) => {
        const IconComponent = getServiceIncludedIcon(serviceKey, idx);
        return /* @__PURE__ */ jsxs(
          "div",
          {
            "data-included-item": true,
            className: "group card-hover p-4 md:p-5 rounded-card border border-surface-border bg-white hover:border-brand-300 flex items-start gap-3.5",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-control bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-200 mt-0.5 shadow-xs", children: /* @__PURE__ */ jsx(IconComponent, { className: "w-5 h-5 transition-transform duration-200 group-hover:scale-105" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-sm md:text-[0.925rem] font-semibold text-content-heading leading-relaxed pt-1 group-hover:text-brand-900 transition-colors", children: item })
            ]
          },
          idx
        );
      }) })
    ] }) }) }),
    /* @__PURE__ */ jsx(Section, { variant: "soft", className: "border-b border-surface-border", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          kicker: isEn ? "Methodology" : "آلية العمل",
          title: t("services.processTitle"),
          align: "center",
          className: "max-w-2xl mx-auto mb-12"
        }
      ),
      /* @__PURE__ */ jsx("div", { ref: processRef, className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: serviceData.process.map((step, idx) => {
        const StepIcon = getServiceProcessIcon(serviceKey, idx);
        return /* @__PURE__ */ jsxs(
          "div",
          {
            "data-process-step": true,
            className: "card-hover p-6 md:p-7 rounded-card bg-white border border-surface-border flex flex-col justify-between shadow-xs hover:border-brand-300 group",
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-brand-50 border border-brand-100/80 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-xs", children: /* @__PURE__ */ jsx(StepIcon, { className: "w-6 h-6" }) }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-bold font-mono tracking-wider px-2.5 py-1 rounded-full bg-brand-50 border border-brand-200/60 text-brand-700 group-hover:bg-brand-600 group-hover:text-white transition-colors", children: isEn ? `Step ${step.step}` : `مرحلة ${step.step}` })
                ] }),
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-content-heading mb-2.5 group-hover:text-brand-900 transition-colors leading-snug", children: step.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-content-body leading-relaxed font-normal", children: step.desc })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "h-1 w-10 group-hover:w-full bg-brand-100 group-hover:bg-brand-500 rounded-full transition-all duration-300 mt-6" })
            ]
          },
          step.step
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsx(Section, { variant: "white", className: "border-b border-surface-border", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl", children: [
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          kicker: isEn ? "Covered Systems" : "الأنظمة المشمولة",
          title: t("services.equipmentTitle"),
          intro: isEn ? "Comprehensive engineering coverage tailored to every elevator system and architectural requirement across Jeddah." : "تغطية هندسية متخصصة لكافة أنواع المصاعد ومنظومات النقل العمودي في مختلف منشآت ومباني جدة.",
          className: "mb-10"
        }
      ),
      /* @__PURE__ */ jsx("div", { ref: equipmentRef, className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5", children: serviceData.equipment.map((rawItem, idx) => {
        const item = typeof rawItem === "string" ? { title: rawItem, desc: "", tag: void 0 } : rawItem;
        const EquipIcon = getEquipmentIcon(serviceKey, idx);
        return /* @__PURE__ */ jsx(
          "div",
          {
            "data-equipment-card": true,
            className: "card-hover p-5 md:p-6 rounded-card border border-surface-border bg-white hover:border-brand-300 flex flex-col justify-between group",
            children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-xl bg-brand-50 border border-brand-100/80 flex items-center justify-center shrink-0 text-brand-600 group-hover:bg-brand-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-xs", children: /* @__PURE__ */ jsx(EquipIcon, { className: "w-5 h-5" }) }),
                item.tag && /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-50/70 border border-brand-100 text-brand-700", children: item.tag })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-base md:text-lg font-bold text-content-heading mb-2 group-hover:text-brand-900 transition-colors leading-snug", children: item.title }),
              item.desc && /* @__PURE__ */ jsx("p", { className: "text-xs md:text-sm text-content-body leading-relaxed font-normal", children: item.desc })
            ] })
          },
          idx
        );
      }) })
    ] }) }) }),
    (relatedWorksData == null ? void 0 : relatedWorksData.works) && relatedWorksData.works.length > 0 && /* @__PURE__ */ jsx(Section, { variant: "white", className: "border-b border-surface-border", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between mb-10", children: [
        /* @__PURE__ */ jsx(
          SectionHeading,
          {
            kicker: isEn ? "Our Portfolio" : "سابقة أعمالنا",
            title: isEn ? "Selected Projects" : "مشاريع منفذة في هذه الخدمة",
            intro: isEn ? "Explore completed projects and engineering implementations in Jeddah." : "نماذج من أعمالنا ومشاريعنا المنجزة في جدة وفق أعلى معايير السلامة."
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: isEn ? `/en/works?service=${dbServiceTypeMap[serviceKey]}` : `/works?service=${dbServiceTypeMap[serviceKey]}`,
            className: "inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-500 font-semibold text-sm mt-4 md:mt-0 transition-colors",
            children: [
              /* @__PURE__ */ jsx("span", { children: t("actions.viewWorks") }),
              isRtl ? /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { ref: relatedWorksRef, className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: relatedWorksData.works.map((w) => /* @__PURE__ */ jsx("div", { "data-related-work": true, children: /* @__PURE__ */ jsx(WorkCard, { work: w }) }, w.id)) })
    ] }) }),
    accordionItems.length > 0 && /* @__PURE__ */ jsx(Section, { variant: "soft", className: "border-b border-surface-border", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsx(
        SectionHeading,
        {
          kicker: isEn ? "Knowledge Base" : "إجابات وتوضيحات",
          title: t("services.faqTitle"),
          align: "center",
          className: "mb-10"
        }
      ),
      /* @__PURE__ */ jsx(Accordion, { items: accordionItems })
    ] }) }) }),
    /* @__PURE__ */ jsx(
      CtaBand,
      {
        title: t("services.ctaTitle"),
        subtitle: t("services.ctaText")
      }
    )
  ] });
};
(_ka = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ka.call(globalThis, "src/features/works/WorksPage.tsx");
const ITEMS_PER_PAGE = 12;
const WorksPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isEn = location.pathname.startsWith("/en");
  const isRtl = !isEn;
  const heroRef = useHeroAnimation();
  const currentServiceFilter = searchParams.get("service") || "all";
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useWorks({
    serviceType: currentServiceFilter,
    limit: ITEMS_PER_PAGE,
    offset: (currentPage - 1) * ITEMS_PER_PAGE
  });
  const works2 = (data == null ? void 0 : data.works) || [];
  const total = (data == null ? void 0 : data.total) || 0;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const worksGridRef = useScrollReveal({
    selector: "[data-work-card]",
    distance: 20,
    stagger: 0.08,
    dependencies: [works2, currentServiceFilter]
  });
  const breadcrumbsItems = [
    { label: t("common.breadcrumbHome"), to: isEn ? "/en" : "/" },
    { label: t("works.heading") }
  ];
  const filterOptions = [
    { id: "all", label: t("works.filters.all") },
    { id: "maintenance", label: t("works.filters.maintenance") },
    { id: "modernization", label: t("works.filters.modernization") },
    { id: "installation", label: t("works.filters.installation") },
    { id: "spare-parts", label: t("works.filters.spareParts") },
    { id: "escalators", label: t("works.filters.escalators") }
  ];
  const handleFilterChange = (serviceId) => {
    setCurrentPage(1);
    if (serviceId === "all") {
      searchParams.delete("service");
      setSearchParams(searchParams);
    } else {
      searchParams.set("service", serviceId);
      setSearchParams(searchParams);
    }
  };
  const canonicalUrl = `https://almubtakirah.com${isEn ? "/en/works" : "/works"}`;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: t("works.pageTitle"),
        description: t("works.pageDescription"),
        canonical: canonicalUrl,
        hreflang: {
          ar: "https://almubtakirah.com/works",
          en: "https://almubtakirah.com/en/works",
          xDefault: "https://almubtakirah.com/works"
        },
        lang: isEn ? "en" : "ar",
        dir: isRtl ? "rtl" : "ltr",
        breadcrumbs: [
          { name: t("common.breadcrumbHome"), url: isEn ? "/en" : "/" },
          { name: t("works.heading"), url: isEn ? "/en/works" : "/works" }
        ],
        jsonLd: [
          getCollectionPageSchema(
            t("works.pageTitle"),
            t("works.pageDescription"),
            canonicalUrl
          )
        ],
        noindex: total === 0
      }
    ),
    /* @__PURE__ */ jsxs(
      "section",
      {
        ref: heroRef,
        className: "bg-brand-900 text-white py-14 md:py-20 relative overflow-hidden",
        children: [
          /* @__PURE__ */ jsx(BrandPattern, { opacity: 0.07 }),
          /* @__PURE__ */ jsxs(Container, { className: "relative z-10", children: [
            /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems, className: "mb-6 text-white/80" }),
            /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  "data-hero-element": true,
                  className: "text-xs font-semibold text-brand-300 uppercase tracking-wider block mb-2",
                  children: t("works.eyebrow")
                }
              ),
              /* @__PURE__ */ jsx(
                "h1",
                {
                  "data-hero-element": true,
                  className: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4",
                  children: t("works.heading")
                }
              ),
              /* @__PURE__ */ jsx(
                "p",
                {
                  "data-hero-element": true,
                  className: "text-base sm:text-lg text-brand-100 leading-relaxed",
                  children: t("works.intro")
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(Section, { variant: "soft", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx("div", { className: "mb-10 flex flex-wrap items-center gap-2", role: "region", "aria-label": t("works.filterLabel"), children: filterOptions.map((opt) => {
        const isActive = currentServiceFilter === opt.id;
        return /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => handleFilterChange(opt.id),
            className: `px-4 py-2 rounded-control text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${isActive ? "bg-brand-900 text-white shadow-xs" : "bg-white text-content-body hover:bg-surface-border/50 border border-surface-border"}`,
            "aria-pressed": isActive,
            children: opt.label
          },
          opt.id
        );
      }) }),
      isLoading && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white rounded-card border border-surface-border overflow-hidden h-96 animate-pulse",
          children: [
            /* @__PURE__ */ jsx("div", { className: "aspect-[16/10] bg-surface-border" }),
            /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "h-4 bg-surface-border rounded-xs w-1/3" }),
              /* @__PURE__ */ jsx("div", { className: "h-6 bg-surface-border rounded-xs w-3/4" }),
              /* @__PURE__ */ jsx("div", { className: "h-4 bg-surface-border rounded-xs w-full" })
            ] })
          ]
        },
        i
      )) }),
      !isLoading && works2.length === 0 && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-card border border-surface-border p-12 text-center max-w-2xl mx-auto my-6 shadow-xs", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center mx-auto mb-5 text-brand-600", children: /* @__PURE__ */ jsx(Briefcase, { className: "w-8 h-8", "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-content-heading mb-3", children: t("works.emptyHeading") }),
        /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-content-body leading-relaxed mb-8", children: t("works.emptyMessage") }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "primary",
            size: "lg",
            to: isEn ? "/en/contact" : "/contact",
            rightIcon: isRtl ? /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" }),
            children: t("works.emptyCta")
          }
        )
      ] }),
      !isLoading && works2.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { ref: worksGridRef, className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: works2.map((work, index) => /* @__PURE__ */ jsx("div", { "data-work-card": true, children: /* @__PURE__ */ jsx(WorkCard, { work, priority: index < 3 }) }, work.id)) }),
        totalPages > 1 && /* @__PURE__ */ jsx("div", { className: "mt-12 flex justify-center", children: /* @__PURE__ */ jsx(
          Pagination,
          {
            currentPage,
            totalPages,
            onPageChange: (page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 400, behavior: "smooth" });
            }
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(CtaBand, {})
  ] });
};
(_la = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _la.call(globalThis, "src/features/home/NotFoundPage.tsx");
const NotFoundPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isEn = location.pathname.startsWith("/en");
  const isRtl = !isEn;
  const heroRef = useHeroAnimation();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: t("notFound.pageTitle"),
        description: t("notFound.pageDescription"),
        lang: isEn ? "en" : "ar",
        dir: isRtl ? "rtl" : "ltr",
        noindex: true
      }
    ),
    /* @__PURE__ */ jsx("main", { ref: heroRef, className: "min-h-[65vh] flex items-center justify-center py-20 bg-surface-soft", children: /* @__PURE__ */ jsxs(Container, { className: "text-center", children: [
      /* @__PURE__ */ jsx("span", { "data-hero-element": true, className: "text-brand-600 font-extrabold text-7xl md:text-9xl tracking-tight block mb-4 font-mono select-none", children: t("notFound.code") }),
      /* @__PURE__ */ jsx("h1", { "data-hero-element": true, className: "text-2xl sm:text-3xl md:text-4xl font-bold text-content-heading mb-4", children: t("notFound.heading") }),
      /* @__PURE__ */ jsx("p", { "data-hero-element": true, className: "text-content-body max-w-md mx-auto mb-8 text-base md:text-lg leading-relaxed", children: t("notFound.description") }),
      /* @__PURE__ */ jsx("div", { "data-hero-element": true, className: "inline-block", children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "primary",
          size: "lg",
          to: isEn ? "/en" : "/",
          className: "bg-brand-600 hover:bg-brand-500 font-semibold",
          rightIcon: isRtl ? /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" }),
          children: t("notFound.backHome")
        }
      ) })
    ] }) })
  ] });
};
(_ma = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ma.call(globalThis, "src/data/seedData.ts");
const fallbackMedia = {
  andalusCover: {
    id: "a0000001-0000-0000-0000-000000000001",
    storage_path: "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?auto=format&fit=crop&w=1200&q=80",
    alt_text: "مصاعد برج الأندلس التجاري في جدة",
    width: 1200,
    height: 800
  },
  rawdahCover: {
    id: "a0000001-0000-0000-0000-000000000002",
    storage_path: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    alt_text: "صيانة مصاعد مجمع الروضة السكني",
    width: 1200,
    height: 800
  },
  tahliaCover: {
    id: "a0000001-0000-0000-0000-000000000003",
    storage_path: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=1200&q=80",
    alt_text: "سلالم كهربائية في مركز التحلية التجاري",
    width: 1200,
    height: 800
  },
  sarayaCover: {
    id: "a0000001-0000-0000-0000-000000000004",
    storage_path: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    alt_text: "تحديث مصاعد فندق سرايا الشاطئ",
    width: 1200,
    height: 800
  },
  nokhbaCover: {
    id: "a0000001-0000-0000-0000-000000000005",
    storage_path: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    alt_text: "مصاعد مجمع النخبة الطبي بجدة",
    width: 1200,
    height: 800
  },
  unitedCover: {
    id: "a0000001-0000-0000-0000-000000000006",
    storage_path: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    alt_text: "مقر الأعمال المتحدة بطريق المدينة",
    width: 1200,
    height: 800
  },
  gallery1: {
    id: "a0000001-0000-0000-0000-000000000011",
    storage_path: "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80",
    alt_text: "التصميم الداخلي لكابينة المصعد",
    width: 1200,
    height: 800
  },
  gallery2: {
    id: "a0000001-0000-0000-0000-000000000012",
    storage_path: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    alt_text: "لوحة تحكم إلكترونية حديثة للمصعد",
    width: 1200,
    height: 800
  },
  gallery3: {
    id: "a0000001-0000-0000-0000-000000000013",
    storage_path: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
    alt_text: "مسار السلالم الكهربائية المتطورة",
    width: 1200,
    height: 800
  },
  gallery4: {
    id: "a0000001-0000-0000-0000-000000000014",
    storage_path: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    alt_text: "منظومة الجر والسكك الحديدية في بئر المصعد",
    width: 1200,
    height: 800
  }
};
const fallbackWorks = [
  {
    id: "e0000001-0000-0000-0000-000000000001",
    slug: "andalus-commercial-tower",
    title_ar: "توريد وتركيب 4 مصاعد ذكية لبرج الأندلس التجاري",
    title_en: "Supply & Installation of 4 Smart Elevators at Al Andalus Commercial Tower",
    description_ar: "إنجاز توريد وتركيب أربعة مصاعد ركاب سريعة بدون غرفة محركات (MRL) مع كبائن ستانلس ستيل مخصصة، وشاشات إشارة رقمية متطورة، ونظام إدارة حركة ذكي للمكاتب والشركات.",
    description_en: "Complete turnkey supply and installation of four machine-room-less (MRL) high-speed passenger elevators with customized stainless-steel cabins, digital signal fixtures, and intelligent traffic management.",
    service_type: "installation",
    location_ar: "طريق الملك عبد العزيز، جدة",
    location_en: "King Abdulaziz Road, Jeddah",
    completed_year: 2024,
    cover_media_id: "a0000001-0000-0000-0000-000000000001",
    gallery_media_ids: [
      "a0000001-0000-0000-0000-000000000011",
      "a0000001-0000-0000-0000-000000000012"
    ],
    seo_title: "مشروع مصاعد برج الأندلس بجدة | شركة المصاعد المبتكرة",
    seo_description: "تفاصيل مشروع توريد وتركيب أربعة مصاعد ركاب سريعة MRL لبرج الأندلس التجاري بطريق الملك في جدة.",
    is_published: true,
    sort_order: 1,
    created_at: new Date(Date.now() - 30 * 864e5).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString(),
    cover_media: fallbackMedia.andalusCover
  },
  {
    id: "e0000001-0000-0000-0000-000000000002",
    slug: "rawdah-residential-complex",
    title_ar: "عقد الصيانة الشاملة لمصاعد مجمع الروضة السكني",
    title_en: "Comprehensive Elevator Maintenance Contract for Al Rawdah Residential Complex",
    description_ar: "تولي إدارة وتشغيل الصيانة الوقائية الشهرية لثمانية مصاعد سكنية مع خدمة طوارئ واستجابة على مدار الساعة، وتوفير قطع الغيار الأصلية والفحص الدوري المعتمد من الدفاع المدني.",
    description_en: "Full preventive monthly maintenance management for eight residential elevators with round-the-clock emergency response, genuine spare parts replacement, and certified Civil Defense inspections.",
    service_type: "maintenance",
    location_ar: "حي الروضة، جدة",
    location_en: "Al Rawdah District, Jeddah",
    completed_year: 2023,
    cover_media_id: "a0000001-0000-0000-0000-000000000002",
    gallery_media_ids: [
      "a0000001-0000-0000-0000-000000000012",
      "a0000001-0000-0000-0000-000000000014"
    ],
    seo_title: "صيانة مصاعد مجمع الروضة بجدة | شركة المصاعد المبتكرة",
    seo_description: "عقد صيانة شاملة دورية لـ 8 مصاعد سكنية في حي الروضة بجدة مع استجابة طوارئ على مدار الساعة.",
    is_published: true,
    sort_order: 2,
    created_at: new Date(Date.now() - 25 * 864e5).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString(),
    cover_media: fallbackMedia.rawdahCover
  },
  {
    id: "e0000001-0000-0000-0000-000000000003",
    slug: "tahlia-shopping-center",
    title_ar: "توريد وتركيب سلالم كهربائية بمركز التحلية للتسوق",
    title_en: "Turnkey Escalators Installation at Tahlia Shopping Center",
    description_ar: "توريد وتركيب ستة سلالم كهربائية تجارية ذات كفاءة طاقة عالية مع حساسات توقف وتوفير حركة تلقائية، وتجهيزات أمان متكاملة مطابقة للمواصفات السعودية.",
    description_en: "Turnkey supply and installation of six energy-efficient commercial escalators with automated standby motion sensors and full safety compliance per Saudi standard regulations.",
    service_type: "escalators",
    location_ar: "شارع التحلية، جدة",
    location_en: "Tahlia Street, Jeddah",
    completed_year: 2024,
    cover_media_id: "a0000001-0000-0000-0000-000000000003",
    gallery_media_ids: ["a0000001-0000-0000-0000-000000000013"],
    seo_title: "تركيب سلالم كهربائية مركز التحلية | شركة المصاعد المبتكرة",
    seo_description: "مشروع تركيب 6 سلالم كهربائية تجارية متطورة بمركز التحلية للتسوق بجدة.",
    is_published: true,
    sort_order: 3,
    created_at: new Date(Date.now() - 20 * 864e5).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString(),
    cover_media: fallbackMedia.tahliaCover
  },
  {
    id: "e0000001-0000-0000-0000-000000000004",
    slug: "saraya-hotel-modernization",
    title_ar: "تحديث وتطوير منظومة مصاعد فندق سرايا الشاطئ",
    title_en: "Modernization of Elevator Systems at Saraya Beach Hotel",
    description_ar: "تحديث شامل لثلاثة مصاعد ركاب قديمة شمل استبدال لوحات التحكم بأنظمة تحكم دقيقة (VVVF)، وتجديد الديكور الداخلي للكبائن، وتحديث مشغلات الأبواب لرفع الأمان وتقليل استهلاك الكهرباء.",
    description_en: "Complete modernization of three legacy passenger elevators including control panel upgrade to microcomputer VVVF drive controllers, cabin interior redesign, and door operator replacement.",
    service_type: "modernization",
    location_ar: "حي الشاطئ، جدة",
    location_en: "Al Shati District, Jeddah",
    completed_year: 2025,
    cover_media_id: "a0000001-0000-0000-0000-000000000004",
    gallery_media_ids: [
      "a0000001-0000-0000-0000-000000000011",
      "a0000001-0000-0000-0000-000000000014"
    ],
    seo_title: "تحديث مصاعد فندق سرايا الشاطئ بجدة | شركة المصاعد المبتكرة",
    seo_description: "مشروع ترقية وتحديث 3 مصاعد فندقية في حي الشاطئ بجدة مع تركيب أنظمة توفير الطاقة VVVF.",
    is_published: true,
    sort_order: 4,
    created_at: new Date(Date.now() - 15 * 864e5).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString(),
    cover_media: fallbackMedia.sarayaCover
  },
  {
    id: "e0000001-0000-0000-0000-000000000005",
    slug: "nokhba-medical-center",
    title_ar: "عقد صيانة وفحص دوري لمصاعد مجمع النخبة الطبي",
    title_en: "Preventive Maintenance for Al Nokhba Medical Center Elevators",
    description_ar: "عقد صيانة تخصصي لمصاعد الأسرة والمصاعد الطبية يضمن أعلى درجات النظافة وسلاسة التوقف والوقوف الدقيق على الطوابق، مع برنامج فحص أسبوعي وتدقيق معايير السلامة الحيوية.",
    description_en: "Specialized maintenance contract for hospital bed elevators ensuring ultra-smooth acceleration, precise floor leveling, weekly mechanical checks, and strict safety audits.",
    service_type: "maintenance",
    location_ar: "حي الحمراء، جدة",
    location_en: "Al Hamra District, Jeddah",
    completed_year: 2024,
    cover_media_id: "a0000001-0000-0000-0000-000000000005",
    gallery_media_ids: ["a0000001-0000-0000-0000-000000000012"],
    seo_title: "صيانة مصاعد مجمع النخبة الطبي بجدة | شركة المصاعد المبتكرة",
    seo_description: "برنامج الصيانة الوقائية المتخصصة لمصاعد المستشفيات والعيادات الطبية في حي الحمراء بجدة.",
    is_published: true,
    sort_order: 5,
    created_at: new Date(Date.now() - 10 * 864e5).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString(),
    cover_media: fallbackMedia.nokhbaCover
  },
  {
    id: "e0000001-0000-0000-0000-000000000006",
    slug: "united-business-headquarters",
    title_ar: "توريد قطع غيار وتجديد ماكينات مقر الأعمال المتحدة",
    title_en: "Spare Parts Supply & Machine Overhaul at United Business Headquarters",
    description_ar: "توريد وتركيب ماكينات سحب إيطالية أصلية، وأحبال جر معتمدة، وأجهزة أمان باراشوت بديلة متوافقة مع متطلبات المبنى العالي وحمولات التشغيل المكثف.",
    description_en: "Supply and installation of certified Italian traction machines, governor ropes, and safety gears suited for high-cycle commercial operations.",
    service_type: "spare-parts",
    location_ar: "طريق المدينة المنورة، جدة",
    location_en: "Madinah Road, Jeddah",
    completed_year: 2023,
    cover_media_id: "a0000001-0000-0000-0000-000000000006",
    gallery_media_ids: ["a0000001-0000-0000-0000-000000000014"],
    seo_title: "توريد قطع غيار مقر الأعمال بجدة | شركة المصاعد المبتكرة",
    seo_description: "مشروع توريد وتجديد ماكينات السحب وأحبال الجر لمقر الأعمال المتحدة بطريق المدينة في جدة.",
    is_published: true,
    sort_order: 6,
    created_at: new Date(Date.now() - 5 * 864e5).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString(),
    cover_media: fallbackMedia.unitedCover
  }
];
const fallbackPartners = [
  {
    id: "f0000001-0000-0000-0000-000000000001",
    name_ar: "فوجي للمصاعد",
    name_en: "Fuji Elevators",
    logo_media_id: "a0000001-0000-0000-0000-000000000031",
    website_url: "https://www.fujielevator.com",
    sort_order: 1,
    is_published: true,
    created_at: (/* @__PURE__ */ new Date()).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString(),
    logo_media: {
      id: "a0000001-0000-0000-0000-000000000031",
      storage_path: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80&brand=fuji",
      alt_text: "شعار فوجي للمصاعد",
      width: 400,
      height: 200
    }
  },
  {
    id: "f0000001-0000-0000-0000-000000000002",
    name_ar: "مونتاناري جوليو",
    name_en: "Montanari Giulio & C.",
    logo_media_id: "a0000001-0000-0000-0000-000000000032",
    website_url: "https://www.montanarigiulio.com",
    sort_order: 2,
    is_published: true,
    created_at: (/* @__PURE__ */ new Date()).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString(),
    logo_media: {
      id: "a0000001-0000-0000-0000-000000000032",
      storage_path: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80&brand=montanari",
      alt_text: "شعار مونتاناري جوليو",
      width: 400,
      height: 200
    }
  },
  {
    id: "f0000001-0000-0000-0000-000000000003",
    name_ar: "سيكور إيطاليا",
    name_en: "Sicor SpA",
    logo_media_id: "a0000001-0000-0000-0000-000000000033",
    website_url: "https://www.sicor-spa.it",
    sort_order: 3,
    is_published: true,
    created_at: (/* @__PURE__ */ new Date()).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString(),
    logo_media: {
      id: "a0000001-0000-0000-0000-000000000033",
      storage_path: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80&brand=sicor",
      alt_text: "شعار سيكور إيطاليا",
      width: 400,
      height: 200
    }
  },
  {
    id: "f0000001-0000-0000-0000-000000000004",
    name_ar: "مجموعة ويتور",
    name_en: "Wittur Group",
    logo_media_id: "a0000001-0000-0000-0000-000000000034",
    website_url: "https://www.wittur.com",
    sort_order: 4,
    is_published: true,
    created_at: (/* @__PURE__ */ new Date()).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString(),
    logo_media: {
      id: "a0000001-0000-0000-0000-000000000034",
      storage_path: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80&brand=wittur",
      alt_text: "شعار مجموعة ويتور",
      width: 400,
      height: 200
    }
  },
  {
    id: "f0000001-0000-0000-0000-000000000005",
    name_ar: "ألبرتو ساسي",
    name_en: "Alberto Sassi S.p.A.",
    logo_media_id: "a0000001-0000-0000-0000-000000000035",
    website_url: "https://www.sassi.it",
    sort_order: 5,
    is_published: true,
    created_at: (/* @__PURE__ */ new Date()).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString(),
    logo_media: {
      id: "a0000001-0000-0000-0000-000000000035",
      storage_path: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80&brand=sassi",
      alt_text: "شعار ألبرتو ساسي",
      width: 400,
      height: 200
    }
  },
  {
    id: "f0000001-0000-0000-0000-000000000006",
    name_ar: "فيرماتور للأبواب",
    name_en: "Fermator Group",
    logo_media_id: "a0000001-0000-0000-0000-000000000036",
    website_url: "https://www.fermator.com",
    sort_order: 6,
    is_published: true,
    created_at: (/* @__PURE__ */ new Date()).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString(),
    logo_media: {
      id: "a0000001-0000-0000-0000-000000000036",
      storage_path: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80&brand=fermator",
      alt_text: "شعار فيرماتور للأبواب",
      width: 400,
      height: 200
    }
  }
];
const fallbackCategories = [
  {
    id: "c1000001-0000-0000-0000-000000000001",
    slug: "elevator-maintenance",
    name_ar: "صيانة المصاعد",
    name_en: "Elevator Maintenance",
    description_ar: "إرشادات ومعايير الصيانة الوقائية والطارئة للمصاعد في جدة.",
    description_en: "Preventive and emergency elevator maintenance guidelines in Jeddah.",
    seo_title: "صيانة المصاعد في جدة | شركة المصاعد المبتكرة",
    seo_description: "دليل شامل عن صيانة المصاعد الدورية واكتشاف الأعطال وعقود الصيانة المعتمدة في جدة.",
    sort_order: 1,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "c1000001-0000-0000-0000-000000000002",
    slug: "elevator-modernization",
    name_ar: "تحديث المصاعد",
    name_en: "Elevator Modernization",
    description_ar: "حلول ترقية وتجديد أنظمة التحكم والمحركات للمباني القائمة.",
    description_en: "Modernization solutions for control panels and traction machines.",
    seo_title: "تحديث وتطوير المصاعد القديمة | شركة المصاعد المبتكرة",
    seo_description: "كل ما تحتاج معرفته حول ترقية مصعدك، تحسين كفاءة الطاقة، وتجديد الديكور الداخلي للكبائن.",
    sort_order: 2,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "c1000001-0000-0000-0000-000000000003",
    slug: "elevator-safety",
    name_ar: "السلامة في المصاعد",
    name_en: "Elevator Safety",
    description_ar: "معايير واشتراطات السلامة واللوائح المعتمدة من الدفاع المدني.",
    description_en: "Civil Defense standards and safety regulations.",
    seo_title: "معايير واشتراطات سلامة المصاعد | شركة المصاعد المبتكرة",
    seo_description: "تعرف على اشتراطات الدفاع المدني السعودي، بطاريات الإنزال الاضطراري، وأجهزة السلامة بالمصاعد.",
    sort_order: 3,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "c1000001-0000-0000-0000-000000000004",
    slug: "spare-parts",
    name_ar: "قطع الغيار",
    name_en: "Spare Parts",
    description_ar: "دليل المكونات الميكانيكية والكهربائية الأصلية.",
    description_en: "Guide to genuine mechanical and electrical components.",
    seo_title: "دليل قطع غيار المصاعد الأصلية | شركة المصاعد المبتكرة",
    seo_description: "طرق تمييز قطع غيار المصاعد الإيطالية واليابانية الأصلية وتجنب أضرار القطع المقلدة.",
    sort_order: 4,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  }
];
const fallbackPosts = [
  {
    id: "d0000001-0000-0000-0000-000000000001",
    lang: "ar",
    translation_key: "b0000001-0000-0000-0000-000000000001",
    slug: "dalil-seyana-dawriah-masaid-jeddah",
    title: "دليل الصيانة الدورية للمصاعد في جدة: حماية المنظومة وسلامة الركاب",
    excerpt: "تعرف على البنود الأساسية لفحص المصاعد الشهري في مدينة جدة وتأثير الرطوبة والغبار على الأجهزة الكهربائية والميكانيكية وكيفية الحفاظ على عمر المصعد الافتراضي.",
    content_html: "<h2>أهمية الصيانة الوقائية المنتظمة لمصاعد المباني</h2><p>تتطلب المصاعد في مدينة جدة عناية تشغيلية خاصة نظراً لارتفاع معدلات الرطوبة الجوية والغبار العالق، مما يسرع من أكسدة المكونات المعدنية وتراكم الأتربة على لوحات التحكم والحساسات الإلكترونية. تعمل الصيانة الدورية المنتظمة على رصد التآكل الطفيف ومعالجته قبل تحوله إلى عطل مفاجئ يوقف المصعد ويسبب إزعاجاً للسكان.</p><h2>البنود الأساسية في الفحص الشهري للمصعد</h2><p>يشمل برنامج الفحص الدوري المعتمد من فرق الصيانة لدينا ثمانية محاور رئيسية تضمن عمل المصعد وفق أعلى معايير الأمان:</p><ul><li>فحص أحبال الجر وقياس نسبة الاستطالة والتآكل.</li><li>تنظيف مجاري الأبواب وتشحيم بكرات الفتح والإغلاق الأوتوماتيكي.</li><li>اختبار جهاز الباراشوت (فرامل الأمان الهبوطية) ومحدد السرعة.</li><li>معايرة دقة توقف الكابينة ومحاذاتها لمستوى أرضية الدور لمنع التعثر.</li><li>فحص بطاريات جهاز الإنزال الاضطراري (ARD) والتأكد من شحنها الكامل.</li><li>قياس مقاومة العزل للمحرك وفحص مستوى الزيت في صندوق التروس للمصاعد الهيدروليكية.</li><li>اختبار إنارة الطوارئ وجرس الإنذار وزر الاتصال الداخلي.</li><li>فحص مفاتيح نهاية المشوار وحساسات تجاوز الحدود العلوية والسفلية.</li></ul><h2>الفرق بين عقود الصيانة الشاملة والصيانة العادية</h2><p>توفر عقود الصيانة الشاملة راحة بال تامة لمديري المباني وملاك العقارات؛ إذ تتضمن الزيارات الشهرية المجدولة، وتغطية استبدال قطع الغيار الاستهلاكية التالفة بدون فواتير إضافية، مع أولوية قصوى لفرق التدخل السريع في حالات الطوارئ والبلاغات الحرجة على مدار الساعة.</p>",
    content_json: null,
    featured_image_id: "a0000001-0000-0000-0000-000000000021",
    featured_image_alt: "فني صيانة يفحص لوحة تحكم المصعد في جدة",
    category_id: "c1000001-0000-0000-0000-000000000001",
    author_id: null,
    status: "published",
    published_at: new Date(Date.now() - 6 * 864e5).toISOString(),
    reading_time_min: 4,
    seo_title: "دليل الصيانة الدورية للمصاعد بجدة | شركة المصاعد المبتكرة",
    seo_description: "دليل تفصيلي حول البنود الأساسية في الفحص الشهري للمصاعد في جدة وأهمية الصيانة الوقائية لتفادي الأعطال المفاجئة.",
    focus_keyword: "صيانة مصاعد في جدة",
    secondary_keywords: ["فحص المصعد الشهري", "عقد صيانة مصاعد", "سلامة المصاعد"],
    canonical_url: null,
    robots_noindex: false,
    robots_nofollow: false,
    og_title: null,
    og_description: null,
    og_image_id: null,
    schema_type: "BlogPosting",
    faq: [
      {
        q: "كم مرة يحتاج المصعد للفحص الدوري؟",
        a: "توصي اشتراطات الدفاع المدني والمواصفات السعودية بإجراء فحص شهري دوري منتظم لجميع المصاعد العاملة في المباني السكنية والتجارية."
      },
      {
        q: "ما هي أبرز أسباب توقف المصاعد المفاجئ في جدة؟",
        a: "تراكم الأتربة في مجاري الأبواب وتأثر لوحات التحكم بالرطوبة وتذبذب التيار الكهربائي هي أكثر العوامل المسببة لتوقف المصاعد."
      },
      {
        q: "هل يتضمن عقد الصيانة خدمة البلاغات الطارئة؟",
        a: "نعم، توفر شركة المصاعد المبتكرة فرق استجابة سريعة على مدار 24 ساعة للبلاغات الحرجة وحالات احتجاز الركاب."
      }
    ],
    seo_score: 92,
    created_at: new Date(Date.now() - 6 * 864e5).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString(),
    category: fallbackCategories[0],
    featured_image: {
      id: "a0000001-0000-0000-0000-000000000021",
      storage_path: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
      alt_text: "فني صيانة يفحص لوحة تحكم المصعد في جدة",
      width: 1200,
      height: 800
    }
  },
  {
    id: "d0000001-0000-0000-0000-000000000002",
    lang: "en",
    translation_key: "b0000001-0000-0000-0000-000000000001",
    slug: "periodic-elevator-maintenance-guide-jeddah",
    title: "Periodic Elevator Maintenance Guide in Jeddah: Protecting Systems & Safety",
    excerpt: "Learn about the essential monthly elevator inspection checkpoints in Jeddah, the impact of coastal humidity, and preventive practices that extend equipment lifespan.",
    content_html: "<h2>The Importance of Preventive Maintenance for Building Elevators</h2><p>Elevators operating in Jeddah require dedicated technical care due to coastal humidity and airborne fine dust. These environmental factors accelerate mechanical wear and dust buildup on delicate microcomputer boards and door tracks. Scheduled preventive inspections detect minor friction and wear before they evolve into unexpected breakdowns.</p><h2>Core Inspection Checkpoints During Monthly Service</h2><p>Our certified elevator service procedure covers eight critical safety and operational checkpoints:</p><ul><li>Inspection of suspension ropes for wear, tension balance, and elongation.</li><li>Cleaning of door landing sills and lubrication of automated door drive pulleys.</li><li>Testing overspeed governors and car safety gear engagement.</li><li>Calibration of precise floor leveling to prevent trip hazards at landings.</li><li>Verification of automatic rescue device (ARD) battery health and charger functionality.</li><li>Motor insulation resistance measurement and hydraulic power unit oil quality checks.</li><li>Testing emergency lighting, car alarm bell, and intercom functions.</li><li>Inspection of terminal limit switches and directional safety buffers in the pit.</li></ul><h2>Choosing the Right Maintenance Contract</h2><p>A comprehensive maintenance agreement provides complete peace of mind for property managers. It includes scheduled monthly inspections, covered replacement of consumable mechanical parts, and immediate round-the-clock priority dispatch for emergency callouts.</p>",
    content_json: null,
    featured_image_id: "a0000001-0000-0000-0000-000000000021",
    featured_image_alt: "Elevator technician inspecting control panel in Jeddah",
    category_id: "c1000001-0000-0000-0000-000000000001",
    author_id: null,
    status: "published",
    published_at: new Date(Date.now() - 6 * 864e5).toISOString(),
    reading_time_min: 4,
    seo_title: "Periodic Elevator Maintenance Guide Jeddah | Innovative Elevators",
    seo_description: "Comprehensive guide on monthly elevator inspection procedures and preventive maintenance standards in Jeddah, Saudi Arabia.",
    focus_keyword: "elevator maintenance jeddah",
    secondary_keywords: ["monthly elevator inspection", "maintenance contract", "elevator safety"],
    canonical_url: null,
    robots_noindex: false,
    robots_nofollow: false,
    og_title: null,
    og_description: null,
    og_image_id: null,
    schema_type: "BlogPosting",
    faq: [
      {
        q: "How often should an elevator be inspected?",
        a: "Civil Defense regulations and Saudi standards mandate monthly scheduled preventive maintenance for all commercial and residential elevators."
      },
      {
        q: "What causes sudden elevator stoppages in coastal areas?",
        a: "Fine dust in door tracks, humidity affecting electronic relay contacts, and electrical fluctuations are the most common causes."
      },
      {
        q: "Does the maintenance agreement include emergency rescue?",
        a: "Yes, Innovative Elevators Co. maintains round-the-clock rapid emergency response teams for urgent issues."
      }
    ],
    seo_score: 90,
    created_at: new Date(Date.now() - 6 * 864e5).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString(),
    category: fallbackCategories[0],
    featured_image: {
      id: "a0000001-0000-0000-0000-000000000021",
      storage_path: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
      alt_text: "Elevator technician inspecting control panel in Jeddah",
      width: 1200,
      height: 800
    }
  },
  {
    id: "d0000001-0000-0000-0000-000000000003",
    lang: "ar",
    translation_key: "b0000001-0000-0000-0000-000000000002",
    slug: "alamat-tahdeeth-al-masaid-al-qadeemah",
    title: "5 علامات تدل على ضرورة تحديث وتطوير مصعدك القديم",
    excerpt: "تعرف على المؤشرات الفنية والاقتصادية التي تحتم الانتقال من مرحلة الصيانة المتكررة إلى ترقية وتحديث أنظمة المصعد لرفع الكفاءة وتوفير الطاقة.",
    content_html: "<h2>متى يصبح المصعد بحاجة إلى التحديث بدلا من الصيانة؟</h2><p>يبلغ العمر الافتراضي لمنظومة المصعد الميكانيكية والكهربائية ما بين 15 إلى 20 عاماً. بعد هذه الفترة، تبدأ تكاليف الصيانة المتكررة في تجاوز الجدوى الاقتصادية، وتصبح قطع الغيار الأصلية للوحات التحكم المتقادمة نادرة أو غير متوفرة في الأسواق، مما يجعل التحديث الجزئي أو الشامل الحل الأمثل والآمن للمبنى.</p><h2>العلامات الخمس الفاصلة لقرار التحديث</h2><p>إذا لاحظت أياً من العلامات التالية في مصعد المبنى لديك، فقد حان الوقت لإجراء تقييم هندسي لترقية المنظومة:</p><ul><li><strong>تكرار التوقف المفاجئ والأعطال:</strong> حدوث أعطال متقاربة شهرياً رغم إجراء الصيانة الدورية.</li><li><strong>عدم دقة الوقوف على الطوابق:</strong> توقف الكابينة بارتفاع أو انخفاض عن مستوى أرضية الدور، مما يشكل خطراً حقيقياً لتعثر الركاب.</li><li><strong>الاهتزاز والصوت المرتفع:</strong> صدور أصوات احتكاك قوية أثناء الحركة أو اهتزاز الكابينة عند التسارع والتباطؤ.</li><li><strong>ارتفاع فاتورة استهلاك الكهرباء:</strong> استهلاك المحركات القديمة غير المزودة بمغير سرعة (Inverter/VVVF) لكميات مضاعفة من الطاقة.</li><li><strong>تقادم المظهر وتلف الديكور:</strong> تآكل أزرار الطلب وشاشات الإشارة وتهالك أرضية وجدران الكابينة الداخلية.</li></ul><h2>مزايا ترقية لوحة التحكم إلى تقنية VVVF الحديثة</h2><p>توفر الترقية إلى لوحات التحكم الإلكترونية الذكية وتقنية التردد المتغير (VVVF) حركة سلسة تماماً عند الانطلاق والتوقف، وتخفض استهلاك الطاقة الكهربائية بنسبة تصل إلى 40%، فضلاً عن رفع موثوقية الأبواب وتقليل معدل الأعطال بنسبة تتجاوز 80%.</p>",
    content_json: null,
    featured_image_id: "a0000001-0000-0000-0000-000000000022",
    featured_image_alt: "تحديث وتطوير مصعد قديم في مبنى تجاري",
    category_id: "c1000001-0000-0000-0000-000000000002",
    author_id: null,
    status: "published",
    published_at: new Date(Date.now() - 4 * 864e5).toISOString(),
    reading_time_min: 5,
    seo_title: "علامات تحديث وتطوير المصاعد القديمة | شركة المصاعد المبتكرة",
    seo_description: "اكتشف العلامات الخمس التي تؤكد ضرورة تحديث مصعدك القديم وكيف تساهم تقنية VVVF في توفير الطاقة ورفع الأمان.",
    focus_keyword: "تحديث المصاعد",
    secondary_keywords: ["تطوير المصاعد القديمة", "لوحة تحكم المصعد", "توفير طاقة المصعد"],
    canonical_url: null,
    robots_noindex: false,
    robots_nofollow: false,
    og_title: null,
    og_description: null,
    og_image_id: null,
    schema_type: "BlogPosting",
    faq: [
      {
        q: "هل يتطلب التحديث استبدال المصعد بالكامل؟",
        a: "ليس بالضرورة؛ إذ يمكن إجراء تحديث جزئي يشمل لوحة التحكم ومحرك الباب والديكور الداخلي مع الإبقاء على سكك التوجيه وهيكل البئر السليم."
      },
      {
        q: "كم تستغرق عملية تحديث المصعد؟",
        a: "تستغرق أعمال التحديث التخصصي في المتوسط من 5 إلى 10 أيام عمل حسب نطاق الترقية وتوافر المكونات."
      },
      {
        q: "ما مقدار الطاقة التي توفرها أنظمة VVVF الحديثة؟",
        a: "تصل نسبة توفير الطاقة إلى نحو 40% مقارنة بالمحركات التقليدية ثنائية السرعة القديمة."
      }
    ],
    seo_score: 88,
    created_at: new Date(Date.now() - 4 * 864e5).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString(),
    category: fallbackCategories[1],
    featured_image: {
      id: "a0000001-0000-0000-0000-000000000022",
      storage_path: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
      alt_text: "تحديث وتطوير مصعد قديم في مبنى تجاري",
      width: 1200,
      height: 800
    }
  },
  {
    id: "d0000001-0000-0000-0000-000000000004",
    lang: "en",
    translation_key: "b0000001-0000-0000-0000-000000000002",
    slug: "signs-your-legacy-elevator-needs-modernization",
    title: "5 Signs Your Legacy Elevator Needs Modernization",
    excerpt: "Discover the key technical indicators and operational signals that show it is time to upgrade your aging elevator system to improve reliability and efficiency.",
    content_html: "<h2>When Does an Elevator Need Modernization Rather Than Repairs?</h2><p>The standard operational lifecycle of elevator mechanical and electrical assemblies ranges between 15 and 20 years. Beyond this milestone, recurrent maintenance expenses often exceed economic sense, and genuine replacement components for obsolete controllers become scarce. Modernization presents a cost-effective, durable path to renew performance without rebuilding the entire shaft.</p><h2>Five Key Signs It Is Time to Upgrade</h2><p>If your building elevator exhibits any of the following symptoms, an engineering assessment for modernization is strongly advised:</p><ul><li><strong>Frequent Unscheduled Downtime:</strong> Recurring service disruptions occurring monthly despite routine upkeep.</li><li><strong>Inaccurate Floor Leveling:</strong> Misalignment between car sill and landing floors, presenting dangerous trip hazards.</li><li><strong>Cabin Vibration and Loud Mechanical Noise:</strong> Excessive shudder during travel or harsh mechanical noises during braking.</li><li><strong>High Electricity Consumption:</strong> Obsolete single-speed or two-speed motors consuming substantial power without regenerative efficiency.</li><li><strong>Outdated Interior and Signal Fixtures:</strong> Worn cabin panels, faded button fixtures, and noisy door operation affecting property value.</li></ul><h2>Operational Benefits of Modern VVVF Controllers</h2><p>Transitioning to microcomputer controllers equipped with Variable Voltage Variable Frequency (VVVF) drives delivers whisper-quiet motion, seamless acceleration, and up to 40% reductions in power consumption while drastically minimizing operational callbacks.</p>",
    content_json: null,
    featured_image_id: "a0000001-0000-0000-0000-000000000022",
    featured_image_alt: "Modernizing elevator components in an office building",
    category_id: "c1000001-0000-0000-0000-000000000002",
    author_id: null,
    status: "published",
    published_at: new Date(Date.now() - 4 * 864e5).toISOString(),
    reading_time_min: 5,
    seo_title: "5 Signs Elevator Needs Modernization | Innovative Elevators",
    seo_description: "Learn the five critical signals indicating your commercial or residential elevator requires modernization and VVVF controller upgrades.",
    focus_keyword: "elevator modernization",
    secondary_keywords: ["modernize old elevator", "elevator controller upgrade", "energy saving elevator"],
    canonical_url: null,
    robots_noindex: false,
    robots_nofollow: false,
    og_title: null,
    og_description: null,
    og_image_id: null,
    schema_type: "BlogPosting",
    faq: [
      {
        q: "Does modernization require replacing the entire elevator?",
        a: "Not necessarily. Modernization can be modular, replacing the controller, door operator, and cabin interior while retaining sound guide rails and counterweights."
      },
      {
        q: "How long does elevator modernization take?",
        a: "A standard modernization project typically takes between 5 to 10 working days depending on project scope."
      },
      {
        q: "How much electricity does a VVVF drive save?",
        a: "Upgrading to a modern VVVF drive can yield up to 40% energy savings compared to obsolete two-speed machines."
      }
    ],
    seo_score: 89,
    created_at: new Date(Date.now() - 4 * 864e5).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString(),
    category: fallbackCategories[1],
    featured_image: {
      id: "a0000001-0000-0000-0000-000000000022",
      storage_path: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
      alt_text: "Modernizing elevator components in an office building",
      width: 1200,
      height: 800
    }
  }
];
const seedData = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fallbackCategories,
  fallbackMedia,
  fallbackPartners,
  fallbackPosts,
  fallbackWorks
}, Symbol.toStringTag, { value: "Module" }));
(_na = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _na.call(globalThis, "src/features/works/WorkDetailPage.tsx");
const WorkDetailPage = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const location = useLocation();
  const isEn = location.pathname.startsWith("/en");
  const isRtl = !isEn;
  const heroRef = useHeroAnimation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const fallbackItem = fallbackWorks.find((w) => w.slug === slug);
  const initialWork = fallbackItem ? {
    ...fallbackItem,
    gallery_media: [fallbackMedia.gallery1, fallbackMedia.gallery2]
  } : void 0;
  const { data: workQuery, isLoading } = useWorkDetail(slug || "");
  const work = workQuery || initialWork;
  const { data: relatedWorks = [] } = useRelatedWorks({
    currentWorkId: (work == null ? void 0 : work.id) || "",
    serviceType: (work == null ? void 0 : work.service_type) || "",
    limit: 3
  });
  if (isLoading && !work) {
    return /* @__PURE__ */ jsx("div", { className: "py-24 text-center", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-xl mx-auto space-y-4 animate-pulse", children: [
      /* @__PURE__ */ jsx("div", { className: "h-8 bg-surface-border rounded-xs w-3/4 mx-auto" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-surface-border rounded-xs w-1/2 mx-auto" }),
      /* @__PURE__ */ jsx("div", { className: "aspect-[16/9] bg-surface-border rounded-card mt-8" })
    ] }) }) });
  }
  if (!work) {
    return /* @__PURE__ */ jsx(NotFoundPage, {});
  }
  const title = isEn && work.title_en ? work.title_en : work.title_ar;
  const description = isEn && work.description_en ? work.description_en : work.description_ar;
  const locationText = isEn && work.location_en ? work.location_en : work.location_ar;
  const serviceLabelMap = {
    installation: t("works.filters.installation"),
    maintenance: t("works.filters.maintenance"),
    modernization: t("works.filters.modernization"),
    "spare-parts": t("works.filters.spareParts"),
    escalators: t("works.filters.escalators")
  };
  const serviceLabel = serviceLabelMap[work.service_type] || work.service_type;
  const breadcrumbsItems = [
    { label: t("common.breadcrumbHome"), to: isEn ? "/en" : "/" },
    { label: t("works.heading"), to: isEn ? "/en/works" : "/works" },
    { label: title }
  ];
  const allImages = [
    ...work.cover_media ? [
      {
        src: getStoragePublicUrl(work.cover_media.storage_path),
        alt: work.cover_media.alt_text || title,
        width: work.cover_media.width ?? void 0,
        height: work.cover_media.height ?? void 0
      }
    ] : [],
    ...(work.gallery_media || []).map((m) => ({
      src: getStoragePublicUrl(m.storage_path),
      alt: m.alt_text || title,
      width: m.width ?? void 0,
      height: m.height ?? void 0
    }))
  ];
  const openLightboxAt = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  const canonicalUrl = `https://almubtakirah.com${isEn ? `/en/works/${work.slug}` : `/works/${work.slug}`}`;
  const coverUrl = work.cover_media ? getStoragePublicUrl(work.cover_media.storage_path) : void 0;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: `${title} | ${t("brand.name")}`,
        description: work.seo_description || description || t("works.pageDescription"),
        canonical: canonicalUrl,
        ogImage: coverUrl,
        ogType: "article",
        hreflang: {
          ar: `https://almubtakirah.com/works/${work.slug}`,
          en: `https://almubtakirah.com/en/works/${work.slug}`,
          xDefault: `https://almubtakirah.com/works/${work.slug}`
        },
        lang: isEn ? "en" : "ar",
        dir: isRtl ? "rtl" : "ltr",
        breadcrumbs: [
          { name: t("common.breadcrumbHome"), url: isEn ? "/en" : "/" },
          { name: t("works.heading"), url: isEn ? "/en/works" : "/works" },
          { name: title, url: canonicalUrl }
        ],
        jsonLd: [
          getWorkSchema(
            title,
            work.seo_description || description || "",
            canonicalUrl,
            coverUrl
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "section",
      {
        ref: heroRef,
        className: "bg-brand-900 text-white py-14 md:py-20 relative overflow-hidden",
        children: [
          /* @__PURE__ */ jsx(BrandPattern, { opacity: 0.07 }),
          /* @__PURE__ */ jsxs(Container, { className: "relative z-10", children: [
            /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems, className: "mb-6 text-white/80" }),
            /* @__PURE__ */ jsxs("div", { className: "max-w-4xl", children: [
              /* @__PURE__ */ jsxs("div", { "data-hero-element": true, className: "flex flex-wrap items-center gap-3 mb-4", children: [
                /* @__PURE__ */ jsx(Badge, { variant: "brand", size: "md", children: serviceLabel }),
                work.completed_year && /* @__PURE__ */ jsxs("span", { className: "text-sm text-brand-200 inline-flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-brand-300", "aria-hidden": "true" }),
                  /* @__PURE__ */ jsx("span", { children: work.completed_year })
                ] }),
                locationText && /* @__PURE__ */ jsxs("span", { className: "text-sm text-brand-200 inline-flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 text-brand-300", "aria-hidden": "true" }),
                  /* @__PURE__ */ jsx("span", { children: locationText })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "h1",
                {
                  "data-hero-element": true,
                  className: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4",
                  children: title
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(Section, { variant: "white", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-12 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-8 space-y-8", children: [
        work.cover_media && /* @__PURE__ */ jsxs(
          "div",
          {
            className: "group relative aspect-[16/10] bg-brand-950 rounded-card overflow-hidden cursor-pointer shadow-md",
            onClick: () => openLightboxAt(0),
            role: "button",
            tabIndex: 0,
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openLightboxAt(0);
              }
            },
            "aria-label": isRtl ? "فتح الصورة بالحجم الكامل" : "Open full image",
            children: [
              /* @__PURE__ */ jsx(
                ResponsiveImage,
                {
                  media: work.cover_media,
                  alt: title,
                  priority: true,
                  className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-control bg-black/60 backdrop-blur-xs text-sm font-medium", children: [
                /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: isRtl ? "تكبير الصورة" : "View full size" })
              ] }) })
            ]
          }
        ),
        description && /* @__PURE__ */ jsxs("div", { className: "bg-surface-subtle p-8 sm:p-10 rounded-card border border-surface-border", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-content-heading mb-4", children: t("works.details.descriptionHeading") }),
          /* @__PURE__ */ jsx("p", { className: "text-base text-content-body leading-relaxed whitespace-pre-line", children: description })
        ] }),
        work.gallery_media && work.gallery_media.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-content-heading mb-6", children: t("works.details.galleryHeading") }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4", children: work.gallery_media.map((mediaItem, gIdx) => {
            const imageIndex = (work.cover_media ? 1 : 0) + gIdx;
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: "group relative aspect-[4/3] bg-brand-950 rounded-control overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all duration-300",
                onClick: () => openLightboxAt(imageIndex),
                role: "button",
                tabIndex: 0,
                onKeyDown: (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightboxAt(imageIndex);
                  }
                },
                "aria-label": `${title} - image ${gIdx + 1}`,
                children: [
                  /* @__PURE__ */ jsx(
                    ResponsiveImage,
                    {
                      media: mediaItem,
                      alt: `${title} - ${gIdx + 1}`,
                      className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white", children: /* @__PURE__ */ jsx(Eye, { className: "w-5 h-5" }) })
                ]
              },
              mediaItem.id || gIdx
            );
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-4 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 sm:p-8 rounded-card border border-surface-border shadow-xs space-y-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-content-heading border-b border-surface-border pb-4", children: isRtl ? "بيانات المشروع" : "Project Facts" }),
        /* @__PURE__ */ jsxs("dl", { className: "space-y-4 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("dt", { className: "text-xs text-content-muted font-medium mb-1", children: t("works.details.serviceType") }),
            /* @__PURE__ */ jsxs("dd", { className: "font-bold text-content-heading flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Wrench, { className: "w-4 h-4 text-brand-600" }),
              /* @__PURE__ */ jsx("span", { children: serviceLabel })
            ] })
          ] }),
          work.completed_year && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("dt", { className: "text-xs text-content-muted font-medium mb-1", children: t("works.details.completedYear") }),
            /* @__PURE__ */ jsxs("dd", { className: "font-bold text-content-heading flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-brand-600" }),
              /* @__PURE__ */ jsx("span", { children: work.completed_year })
            ] })
          ] }),
          locationText && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("dt", { className: "text-xs text-content-muted font-medium mb-1", children: t("works.details.location") }),
            /* @__PURE__ */ jsxs("dd", { className: "font-bold text-content-heading flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 text-brand-600" }),
              /* @__PURE__ */ jsx("span", { children: locationText })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-4 border-t border-surface-border", children: /* @__PURE__ */ jsxs(
          Link,
          {
            to: isEn ? "/en/works" : "/works",
            className: "inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-500 transition-colors",
            children: [
              isRtl ? /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { children: t("works.details.backToWorks") })
            ]
          }
        ) })
      ] }) })
    ] }) }) }),
    relatedWorks.length > 0 && /* @__PURE__ */ jsx(Section, { variant: "soft", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-10 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-content-heading", children: t("works.details.relatedHeading") }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: isEn ? "/en/works" : "/works",
            className: "text-sm font-semibold text-brand-600 hover:text-brand-500 inline-flex items-center gap-1",
            children: [
              /* @__PURE__ */ jsx("span", { children: t("works.details.backToWorks") }),
              isRtl ? /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: relatedWorks.map((relWork) => /* @__PURE__ */ jsx(WorkCard, { work: relWork }, relWork.id)) })
    ] }) }),
    /* @__PURE__ */ jsx(CtaBand, {}),
    /* @__PURE__ */ jsx(
      Lightbox,
      {
        isOpen: lightboxOpen,
        images: allImages,
        currentIndex: lightboxIndex,
        onClose: () => setLightboxOpen(false),
        onNavigate: (newIdx) => setLightboxIndex(newIdx)
      }
    )
  ] });
};
(_oa = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _oa.call(globalThis, "src/features/blog/BlogIndexPage.tsx");
const POSTS_PER_PAGE$1 = 9;
const BlogIndexPage = () => {
  const { t } = useTranslation();
  const { page } = useParams();
  const location = useLocation();
  const isEn = location.pathname.startsWith("/en");
  const heroRef = useHeroAnimation();
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);
  const offset = (currentPage - 1) * POSTS_PER_PAGE$1;
  const currentLang = isEn ? "en" : "ar";
  const prefix = isEn ? "/en" : "";
  const { data: postsData, isLoading } = useBlogPosts({
    lang: currentLang,
    limit: POSTS_PER_PAGE$1,
    offset
  });
  const { data: categories } = useBlogCategories();
  const posts = (postsData == null ? void 0 : postsData.posts) || [];
  const total = (postsData == null ? void 0 : postsData.total) || 0;
  const totalPages = Math.ceil(total / POSTS_PER_PAGE$1);
  const postsRevealRef = useScrollReveal({
    selector: "[data-post-card]",
    distance: 20,
    stagger: 0.08,
    dependencies: [posts, currentPage]
  });
  const breadcrumbs = [
    { label: t("nav.home"), href: isEn ? "/en" : "/" },
    { label: t("nav.blog") }
  ];
  const pageTitle = currentPage > 1 ? `${t("blog.pageTitle")} - ${t("common.page")} ${currentPage}` : t("blog.pageTitle");
  const canonicalPath = currentPage > 1 ? `${prefix}/blog/page/${currentPage}` : `${prefix}/blog`;
  const canonicalUrl = `https://almubtakirah.com${canonicalPath}`;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: pageTitle,
        description: t("blog.pageDescription"),
        canonical: canonicalUrl,
        hreflang: {
          ar: currentPage > 1 ? `https://almubtakirah.com/blog/page/${currentPage}` : "https://almubtakirah.com/blog",
          en: currentPage > 1 ? `https://almubtakirah.com/en/blog/page/${currentPage}` : "https://almubtakirah.com/en/blog",
          xDefault: currentPage > 1 ? `https://almubtakirah.com/blog/page/${currentPage}` : "https://almubtakirah.com/blog"
        },
        lang: isEn ? "en" : "ar",
        dir: isEn ? "ltr" : "rtl",
        breadcrumbs: [
          { name: t("nav.home"), url: isEn ? "/en" : "/" },
          { name: t("nav.blog"), url: canonicalUrl }
        ],
        jsonLd: [
          getCollectionPageSchema(
            pageTitle,
            t("blog.pageDescription"),
            canonicalUrl
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs("section", { ref: heroRef, className: "bg-brand-900 text-white py-14 md:py-20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx(BrandPattern, { opacity: 0.07 }),
      /* @__PURE__ */ jsxs(Container, { className: "relative z-10", children: [
        /* @__PURE__ */ jsx("div", { "data-hero-element": true, children: /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbs, className: "mb-6 text-white/80" }) }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
          /* @__PURE__ */ jsx("span", { "data-hero-element": true, className: "text-xs font-semibold text-brand-300 uppercase tracking-wider block mb-2", children: t("blog.eyebrow") }),
          /* @__PURE__ */ jsx("h1", { "data-hero-element": true, className: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4", children: t("blog.heading") }),
          /* @__PURE__ */ jsx("p", { "data-hero-element": true, className: "text-base sm:text-lg text-brand-100 leading-relaxed font-normal max-w-2xl", children: t("blog.intro") })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Section, { variant: "white", className: "pt-8 pb-16", children: /* @__PURE__ */ jsxs(Container, { children: [
      categories && categories.length > 0 && /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none",
          role: "navigation",
          "aria-label": t("blog.filterLabel"),
          children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                to: `${prefix}/blog`,
                className: "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap bg-brand-600 text-white shadow-xs focus-visible:outline-none",
                children: t("blog.allCategories")
              }
            ),
            categories.map((cat) => {
              const name = isEn && cat.name_en ? cat.name_en : cat.name_ar;
              return /* @__PURE__ */ jsx(
                Link,
                {
                  to: `${prefix}/blog/category/${cat.slug}`,
                  className: "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap bg-surface-soft text-content-body hover:bg-brand-50 hover:text-brand-600 border border-surface-border transition-colors focus-visible:outline-none",
                  children: name
                },
                cat.id
              );
            })
          ]
        }
      ),
      isLoading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: Array.from({ length: 6 }).map((_, idx) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white rounded-card border border-surface-border overflow-hidden animate-pulse h-96 flex flex-col",
          children: [
            /* @__PURE__ */ jsx("div", { className: "aspect-[16/10] bg-surface-border" }),
            /* @__PURE__ */ jsxs("div", { className: "p-6 flex-1 space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "h-4 bg-surface-border rounded w-1/3" }),
              /* @__PURE__ */ jsx("div", { className: "h-6 bg-surface-border rounded w-3/4" }),
              /* @__PURE__ */ jsx("div", { className: "h-4 bg-surface-border rounded w-full" })
            ] })
          ]
        },
        idx
      )) }) : posts.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { ref: postsRevealRef, className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: posts.map((post, index) => /* @__PURE__ */ jsx("div", { "data-post-card": true, className: "h-full", children: /* @__PURE__ */ jsx(
          PostCard,
          {
            post,
            priority: index < 3 && currentPage === 1
          }
        ) }, post.id)) }),
        /* @__PURE__ */ jsx(
          Pagination,
          {
            currentPage,
            totalPages,
            getPageUrl: (p) => p === 1 ? `${prefix}/blog` : `${prefix}/blog/page/${p}`,
            className: "mt-12 pt-8 border-t border-surface-border"
          }
        )
      ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-16 px-6 bg-surface-soft border border-surface-border rounded-card max-w-2xl mx-auto my-8", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(BookOpen, { className: "w-8 h-8", "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-content-heading mb-2", children: t("blog.emptyHeading") }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-content-body leading-relaxed max-w-md mx-auto mb-6", children: t("blog.emptyMessage") }),
        /* @__PURE__ */ jsx(Button, { variant: "secondary", to: `${prefix}/contact`, children: t("actions.contactUs") })
      ] })
    ] }) })
  ] });
};
(_pa = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _pa.call(globalThis, "src/features/blog/BlogCategoryPage.tsx");
const POSTS_PER_PAGE = 9;
const BlogCategoryPage = () => {
  const { t } = useTranslation();
  const { slug, page } = useParams();
  const location = useLocation();
  const isEn = location.pathname.startsWith("/en");
  const heroRef = useHeroAnimation();
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);
  const offset = (currentPage - 1) * POSTS_PER_PAGE;
  const currentLang = isEn ? "en" : "ar";
  const prefix = isEn ? "/en" : "";
  const { data: category, isLoading: isCategoryLoading } = useBlogCategory(
    slug || ""
  );
  const { data: categories } = useBlogCategories();
  const { data: postsData, isLoading: isPostsLoading } = useBlogPosts({
    lang: currentLang,
    categorySlug: slug,
    limit: POSTS_PER_PAGE,
    offset
  });
  const posts = (postsData == null ? void 0 : postsData.posts) || [];
  const total = (postsData == null ? void 0 : postsData.total) || 0;
  const totalPages = Math.ceil(total / POSTS_PER_PAGE);
  const postsRevealRef = useScrollReveal({
    selector: "[data-post-card]",
    distance: 20,
    stagger: 0.08,
    dependencies: [posts, currentPage]
  });
  if (!slug) {
    return /* @__PURE__ */ jsx(Navigate, { to: `${prefix}/blog`, replace: true });
  }
  const categoryName = category ? isEn && category.name_en ? category.name_en : category.name_ar : slug;
  const categoryDescription = category ? isEn && category.description_en ? category.description_en : category.description_ar : void 0;
  const defaultTitle = isEn ? `${categoryName} | Innovative Elevators Co. Blog` : `${categoryName} | مدونة المصاعد المبتكرة`;
  const seoTitle = (category == null ? void 0 : category.seo_title) ? category.seo_title : defaultTitle;
  const pageTitle = currentPage > 1 ? `${seoTitle} - ${t("common.page")} ${currentPage}` : seoTitle;
  const fallbackDesc = isEn ? `Browse articles, case studies, and engineering guides about ${categoryName} from Innovative Elevators Co. in Jeddah.` : `استكشف المقالات والدراسات الهندسية المتخصصة في ${categoryName} من شركة المصاعد المبتكرة في جدة.`;
  const seoDescription = (category == null ? void 0 : category.seo_description) || categoryDescription || fallbackDesc;
  const breadcrumbs = [
    { label: t("nav.home"), href: isEn ? "/en" : "/" },
    { label: t("nav.blog"), href: `${prefix}/blog` },
    { label: categoryName }
  ];
  const basePath = `${prefix}/blog/category/${slug}`;
  const canonicalPath = currentPage > 1 ? `${basePath}/page/${currentPage}` : basePath;
  const canonicalUrl = `https://almubtakirah.com${canonicalPath}`;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: pageTitle,
        description: seoDescription,
        canonical: canonicalUrl,
        hreflang: {
          ar: currentPage > 1 ? `https://almubtakirah.com/blog/category/${slug}/page/${currentPage}` : `https://almubtakirah.com/blog/category/${slug}`,
          en: currentPage > 1 ? `https://almubtakirah.com/en/blog/category/${slug}/page/${currentPage}` : `https://almubtakirah.com/en/blog/category/${slug}`,
          xDefault: currentPage > 1 ? `https://almubtakirah.com/blog/category/${slug}/page/${currentPage}` : `https://almubtakirah.com/blog/category/${slug}`
        },
        lang: isEn ? "en" : "ar",
        dir: isEn ? "ltr" : "rtl",
        breadcrumbs: [
          { name: t("nav.home"), url: isEn ? "/en" : "/" },
          { name: t("nav.blog"), url: `${prefix}/blog` },
          { name: categoryName, url: canonicalUrl }
        ],
        jsonLd: [
          getCollectionPageSchema(
            pageTitle,
            seoDescription,
            canonicalUrl
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(Section, { variant: "white", className: "pt-6 pb-16", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsxs("div", { ref: heroRef, className: "max-w-3xl mb-10", children: [
        /* @__PURE__ */ jsx("div", { "data-hero-element": true, className: "mb-8", children: /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbs }) }),
        /* @__PURE__ */ jsx("div", { "data-hero-element": true, children: /* @__PURE__ */ jsx(
          SectionHeading,
          {
            level: "h1",
            kicker: t("blog.eyebrow"),
            title: categoryName,
            intro: categoryDescription || void 0
          }
        ) })
      ] }),
      categories && categories.length > 0 && /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none",
          role: "navigation",
          "aria-label": t("blog.filterLabel"),
          children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                to: `${prefix}/blog`,
                className: "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap bg-surface-soft text-content-body hover:bg-brand-50 hover:text-brand-600 border border-surface-border transition-colors focus-visible:outline-none",
                children: t("blog.allCategories")
              }
            ),
            categories.map((cat) => {
              const name = isEn && cat.name_en ? cat.name_en : cat.name_ar;
              const isCurrentCategory = cat.slug === slug;
              return /* @__PURE__ */ jsx(
                Link,
                {
                  to: `${prefix}/blog/category/${cat.slug}`,
                  className: `px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-none ${isCurrentCategory ? "bg-brand-600 text-white shadow-xs" : "bg-surface-soft text-content-body hover:bg-brand-50 hover:text-brand-600 border border-surface-border"}`,
                  children: name
                },
                cat.id
              );
            })
          ]
        }
      ),
      isPostsLoading || isCategoryLoading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: Array.from({ length: 6 }).map((_, idx) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white rounded-card border border-surface-border overflow-hidden animate-pulse h-96 flex flex-col",
          children: [
            /* @__PURE__ */ jsx("div", { className: "aspect-[16/10] bg-surface-border" }),
            /* @__PURE__ */ jsxs("div", { className: "p-6 flex-1 space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "h-4 bg-surface-border rounded w-1/3" }),
              /* @__PURE__ */ jsx("div", { className: "h-6 bg-surface-border rounded w-3/4" }),
              /* @__PURE__ */ jsx("div", { className: "h-4 bg-surface-border rounded w-full" })
            ] })
          ]
        },
        idx
      )) }) : posts.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { ref: postsRevealRef, className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: posts.map((post, index) => /* @__PURE__ */ jsx("div", { "data-post-card": true, className: "h-full", children: /* @__PURE__ */ jsx(
          PostCard,
          {
            post,
            priority: index < 3 && currentPage === 1
          }
        ) }, post.id)) }),
        /* @__PURE__ */ jsx(
          Pagination,
          {
            currentPage,
            totalPages,
            getPageUrl: (p) => p === 1 ? basePath : `${basePath}/page/${p}`,
            className: "mt-12 pt-8 border-t border-surface-border"
          }
        )
      ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-16 px-6 bg-surface-soft border border-surface-border rounded-card max-w-2xl mx-auto my-8", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(BookOpen, { className: "w-8 h-8", "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-content-heading mb-2", children: t("blog.emptyHeading") }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-content-body leading-relaxed max-w-md mx-auto mb-6", children: t("blog.emptyMessage") }),
        /* @__PURE__ */ jsx(Button, { variant: "secondary", to: `${prefix}/blog`, children: t("blog.backToBlog") })
      ] })
    ] }) })
  ] });
};
(_qa = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _qa.call(globalThis, "src/lib/blogContent.ts");
function slugifyHeading(text, fallbackIndex = 0) {
  const cleaned = text.trim().toLowerCase().replace(/[^\u0600-\u06FFa-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return cleaned || `section-${fallbackIndex}`;
}
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "").trim();
}
function processArticleHtml(rawHtml) {
  if (!rawHtml) {
    return { sanitizedHtml: "", toc: [] };
  }
  let html = rawHtml;
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
  html = html.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "");
  html = html.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "");
  html = html.replace(/<applet\b[^<]*(?:(?!<\/applet>)<[^<]*)*<\/applet>/gi, "");
  html = html.replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, "");
  html = html.replace(/<meta\b[^>]*>/gi, "");
  html = html.replace(/<link\b[^>]*>/gi, "");
  html = html.replace(/\s+on[a-z]+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, "");
  html = html.replace(
    /(href|src)\s*=\s*(?:'javascript:[^']*'|"javascript:[^"]*"|javascript:[^\s>]+)/gi,
    '$1="#"'
  );
  html = html.replace(
    /(href|src)\s*=\s*(?:'vbscript:[^']*'|"vbscript:[^"]*"|vbscript:[^\s>]+)/gi,
    '$1="#"'
  );
  html = html.replace(/<iframe\b([^>]*)>(.*?)<\/iframe>/gi, (_match, attrs) => {
    const srcMatch = attrs.match(/src\s*=\s*["']([^"']+)["']/i);
    if (!srcMatch) return "";
    const src = srcMatch[1];
    const isAllowedYoutube = /^https:\/\/(www\.)?(youtube\.com|youtube-nocookie\.com)\/embed\/[a-zA-Z0-9_-]+/i.test(
      src
    );
    if (isAllowedYoutube) {
      return `<div class="aspect-video w-full my-6 rounded-card overflow-hidden shadow-xs"><iframe src="${src}" class="w-full h-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
    }
    return "";
  });
  html = html.replace(/<table\b([^>]*)>([\s\S]*?)<\/table>/gi, (_match, attrs, content) => {
    return `<div class="table-wrapper overflow-x-auto my-6 border border-surface-border rounded-card"><table ${attrs} class="w-full text-start text-sm border-collapse">${content}</table></div>`;
  });
  const toc = [];
  const usedIds = /* @__PURE__ */ new Set();
  let headingIndex = 0;
  html = html.replace(
    /<(h[23])(\s+[^>]*)?>(.*?)<\/\1>/gi,
    (_match, tag, existingAttrs = "", content) => {
      headingIndex++;
      const level = tag.toLowerCase() === "h2" ? 2 : 3;
      const plainText = stripHtml(content);
      let id = slugifyHeading(plainText, headingIndex);
      if (usedIds.has(id)) {
        id = `${id}-${headingIndex}`;
      }
      usedIds.add(id);
      toc.push({ id, text: plainText, level });
      const cleanedAttrs = existingAttrs.replace(/\s+id\s*=\s*["'][^"']*["']/i, "");
      return `<${tag} id="${id}" ${cleanedAttrs.trim()}>${content}</${tag}>`;
    }
  );
  return {
    sanitizedHtml: html,
    toc
  };
}
(_ra = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ra.call(globalThis, "src/features/blog/components/ShareButtons.tsx");
const ShareButtons = ({
  url,
  title,
  className = ""
}) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const shareLinks = [
    {
      name: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      ariaLabel: "Share on WhatsApp",
      icon: /* @__PURE__ */ jsx(
        "svg",
        {
          className: "w-4 h-4",
          viewBox: "0 0 24 24",
          fill: "currentColor",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsx("path", { d: "M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.582 1.961.919 3.028.919h.005c3.18 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.07-1.782-.406-1.393-.578-2.316-1.996-2.385-2.088-.069-.093-.564-.75-.564-1.429 0-.679.355-1.013.481-1.144.127-.131.277-.164.37-.164.093 0 .185.002.266.006.086.004.201-.033.315.241.116.275.394.962.428 1.033.034.071.057.155.008.252-.048.098-.073.159-.145.243-.072.085-.152.189-.217.255-.072.072-.147.15-.063.294.084.144.373.615.8 1.002.551.498 1.014.653 1.158.725.144.072.228.06.313-.037.085-.097.362-.423.458-.568.097-.145.193-.12.325-.072.133.048.843.398.988.47.144.072.241.108.277.169.036.06.036.353-.108.758z" })
        }
      ),
      hoverClasses: "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]"
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      ariaLabel: "Share on X (Twitter)",
      icon: /* @__PURE__ */ jsx(
        "svg",
        {
          className: "w-4 h-4",
          viewBox: "0 0 24 24",
          fill: "currentColor",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
        }
      ),
      hoverClasses: "hover:bg-black hover:text-white hover:border-black"
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      ariaLabel: "Share on LinkedIn",
      icon: /* @__PURE__ */ jsx(
        "svg",
        {
          className: "w-4 h-4",
          viewBox: "0 0 24 24",
          fill: "currentColor",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsx("path", { d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" })
        }
      ),
      hoverClasses: "hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5]"
    }
  ];
  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: `flex flex-wrap items-center gap-3 ${className}`, children: [
    /* @__PURE__ */ jsxs("span", { className: "text-xs font-semibold text-content-muted flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsx(Share2, { className: "w-3.5 h-3.5", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("span", { children: t("blog.shareArticle") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: handleCopy,
          className: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${copied ? "bg-feedback-success text-white border-feedback-success" : "bg-white text-content-body border-surface-border hover:bg-surface-soft hover:text-brand-600"}`,
          "aria-label": t("blog.copyLink"),
          children: copied ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("span", { children: t("blog.linkCopied") })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Link2, { className: "w-3.5 h-3.5", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("span", { children: t("blog.copyLink") })
          ] })
        }
      ),
      shareLinks.map((item) => /* @__PURE__ */ jsx(
        "a",
        {
          href: item.href,
          target: "_blank",
          rel: "noopener noreferrer",
          className: `w-8 h-8 rounded-full border border-surface-border bg-white text-content-body flex items-center justify-center transition-all ${item.hoverClasses}`,
          "aria-label": item.ariaLabel,
          children: item.icon
        },
        item.name
      ))
    ] })
  ] });
};
(_sa = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _sa.call(globalThis, "src/features/blog/BlogPostPage.tsx");
const BlogPostPage = () => {
  var _a2, _b2, _c2;
  const { t } = useTranslation();
  const { slug } = useParams();
  const location = useLocation();
  const isEn = location.pathname.startsWith("/en");
  const isRtl = !isEn;
  const currentLang = isEn ? "en" : "ar";
  const targetLang = isEn ? "ar" : "en";
  const prefix = isEn ? "/en" : "";
  const targetPrefix = isEn ? "" : "/en";
  const { data: post, isLoading } = useBlogPost(currentLang, slug || "");
  const { data: translationTwin } = usePostTranslation(
    post == null ? void 0 : post.translation_key,
    targetLang
  );
  const { data: prevNext } = usePrevNextPosts(
    (post == null ? void 0 : post.published_at) || null,
    currentLang
  );
  const { data: relatedPosts } = useRelatedPosts({
    categoryId: (post == null ? void 0 : post.category_id) || null,
    currentPostId: (post == null ? void 0 : post.id) || "",
    lang: currentLang,
    limit: 3
  });
  const heroRef = useHeroAnimation({ dependencies: [post == null ? void 0 : post.id] });
  const relatedRevealRef = useScrollReveal({
    selector: "[data-related-card]",
    distance: 20,
    stagger: 0.08,
    dependencies: [relatedPosts]
  });
  const { sanitizedHtml } = useMemo(() => {
    if (!(post == null ? void 0 : post.content_html)) {
      return { sanitizedHtml: "", toc: [] };
    }
    return processArticleHtml(post.content_html);
  }, [post == null ? void 0 : post.content_html]);
  if (!slug) {
    return /* @__PURE__ */ jsx(Navigate, { to: `${prefix}/blog`, replace: true });
  }
  if (!isLoading && !post) {
    return /* @__PURE__ */ jsx(Section, { variant: "white", className: "py-20 text-center", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-content-heading mb-4", children: isEn ? "Article Not Found" : "المقال غير موجود" }),
      /* @__PURE__ */ jsx("p", { className: "text-content-body mb-8", children: isEn ? "The requested article could not be found or has not been published." : "المقال المطلوب غير موجود أو لم يتم نشره بعد." }),
      /* @__PURE__ */ jsx(Button, { variant: "primary", to: `${prefix}/blog`, children: t("blog.backToBlog") })
    ] }) });
  }
  if (isLoading || !post) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("section", { className: "bg-brand-900 text-white py-14 md:py-20 relative overflow-hidden", children: [
        /* @__PURE__ */ jsx(BrandPattern, { opacity: 0.07 }),
        /* @__PURE__ */ jsx(Container, { className: "relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl space-y-4 animate-pulse", children: [
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-white/20 rounded w-1/4" }),
          /* @__PURE__ */ jsx("div", { className: "h-10 bg-white/20 rounded w-3/4" }),
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-white/20 rounded w-1/2" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Section, { variant: "white", className: "py-12", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-6 animate-pulse", children: [
        /* @__PURE__ */ jsx("div", { className: "aspect-[16/9] bg-surface-border rounded-card" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-6", children: [
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-surface-border rounded w-full" }),
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-surface-border rounded w-5/6" }),
          /* @__PURE__ */ jsx("div", { className: "h-4 bg-surface-border rounded w-4/6" })
        ] })
      ] }) }) })
    ] });
  }
  const categoryName = post.category ? isEn && post.category.name_en ? post.category.name_en : post.category.name_ar : null;
  const categoryUrl = post.category ? `${prefix}/blog/category/${post.category.slug}` : null;
  const breadcrumbs = [
    { label: t("nav.home"), href: isEn ? "/en" : "/" },
    { label: t("nav.blog"), href: `${prefix}/blog` },
    ...categoryName && categoryUrl ? [{ label: categoryName, href: categoryUrl }] : [],
    { label: post.title }
  ];
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const faqAccordionItems = post.faq && Array.isArray(post.faq) && post.faq.length > 0 ? post.faq.map((item, idx) => ({
    id: `faq-${idx}`,
    title: item.q,
    content: /* @__PURE__ */ jsx("p", { className: "text-content-body leading-relaxed", children: item.a })
  })) : [];
  const postCanonical = `https://almubtakirah.com${prefix}/blog/${post.slug}`;
  const coverImageUrl = ((_a2 = post.featured_image) == null ? void 0 : _a2.storage_path) ? getStoragePublicUrl(post.featured_image.storage_path) : void 0;
  const hreflang = {
    ar: isEn ? translationTwin ? `https://almubtakirah.com/blog/${translationTwin.slug}` : void 0 : postCanonical,
    en: isEn ? postCanonical : translationTwin ? `https://almubtakirah.com/en/blog/${translationTwin.slug}` : void 0,
    xDefault: isEn ? translationTwin ? `https://almubtakirah.com/blog/${translationTwin.slug}` : postCanonical : postCanonical
  };
  const tagNames = (post.tags || []).map((tg) => isEn && tg.name_en ? tg.name_en : tg.name_ar);
  const blogPostingSchema = getBlogPostingSchema({
    schemaType: post.schema_type,
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    url: postCanonical,
    imageUrl: coverImageUrl,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    authorName: ((_b2 = post.author) == null ? void 0 : _b2.full_name) || "شركة المصاعد المبتكرة",
    lang: currentLang
  });
  const faqSchema = getFaqSchema(post.faq || []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: post.seo_title || `${post.title} | ${t("brand.name")}`,
        description: post.seo_description || post.excerpt || void 0,
        canonical: postCanonical,
        ogImage: coverImageUrl,
        ogType: "article",
        hreflang,
        lang: currentLang,
        dir: isRtl ? "rtl" : "ltr",
        article: {
          publishedTime: post.published_at,
          modifiedTime: post.updated_at || post.published_at,
          section: categoryName || void 0,
          tags: tagNames,
          author: ((_c2 = post.author) == null ? void 0 : _c2.full_name) || "شركة المصاعد المبتكرة"
        },
        breadcrumbs: [
          { name: t("nav.home"), url: isEn ? "/en" : "/" },
          { name: t("nav.blog"), url: `${prefix}/blog` },
          ...categoryName && categoryUrl ? [{ name: categoryName, url: categoryUrl }] : [],
          { name: post.title, url: postCanonical }
        ],
        jsonLd: [blogPostingSchema, faqSchema].filter(Boolean)
      }
    ),
    /* @__PURE__ */ jsxs("article", { children: [
      /* @__PURE__ */ jsxs("header", { ref: heroRef, className: "bg-brand-900 text-white py-14 md:py-20 relative overflow-hidden", children: [
        /* @__PURE__ */ jsx(BrandPattern, { opacity: 0.07 }),
        /* @__PURE__ */ jsxs(Container, { className: "relative z-10", children: [
          /* @__PURE__ */ jsx("div", { "data-hero-element": true, children: /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbs, className: "mb-6 text-white/80" }) }),
          /* @__PURE__ */ jsxs("div", { className: "max-w-4xl", children: [
            /* @__PURE__ */ jsxs("div", { "data-hero-element": true, className: "flex flex-wrap items-center gap-3 mb-4", children: [
              categoryName && categoryUrl && /* @__PURE__ */ jsx(Link, { to: categoryUrl, children: /* @__PURE__ */ jsx(
                Badge,
                {
                  variant: "brand",
                  size: "md",
                  className: "bg-brand-800 text-brand-100 border-brand-700 hover:bg-brand-700 transition-colors",
                  children: categoryName
                }
              ) }),
              /* @__PURE__ */ jsxs("span", { className: "text-xs text-brand-200 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-brand-300", "aria-hidden": "true" }),
                /* @__PURE__ */ jsx("span", { children: t("blog.readTime", { count: post.reading_time_min || 5 }) })
              ] })
            ] }),
            /* @__PURE__ */ jsx("h1", { "data-hero-element": true, className: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight", children: post.title }),
            post.excerpt && /* @__PURE__ */ jsx("p", { "data-hero-element": true, className: "text-base sm:text-lg text-brand-100 leading-relaxed font-normal max-w-3xl mb-4", children: post.excerpt }),
            translationTwin && /* @__PURE__ */ jsxs("div", { "data-hero-element": true, className: "mt-6 p-4 rounded-card bg-brand-800/80 border border-brand-700/80 flex items-center justify-between gap-4 text-xs sm:text-sm text-white", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 font-medium text-brand-100", children: [
                /* @__PURE__ */ jsx(Languages, { className: "w-4 h-4 text-brand-300 shrink-0", "aria-hidden": "true" }),
                /* @__PURE__ */ jsx("span", { children: t("blog.translationTwinNotice") })
              ] }),
              /* @__PURE__ */ jsx(
                Link,
                {
                  to: `${targetPrefix}/blog/${translationTwin.slug}`,
                  className: "font-bold text-accent-400 hover:text-accent-300 underline shrink-0 transition-colors",
                  children: t("blog.readInOtherLang")
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "py-12 sm:py-16", children: /* @__PURE__ */ jsxs(Container, { children: [
        post.featured_image && /* @__PURE__ */ jsxs("figure", { className: "max-w-4xl mx-auto mb-12", children: [
          /* @__PURE__ */ jsx("div", { className: "aspect-[16/9] w-full overflow-hidden rounded-card border border-surface-border bg-brand-950 shadow-sm", children: /* @__PURE__ */ jsx(
            ResponsiveImage,
            {
              media: post.featured_image,
              alt: post.featured_image_alt || post.title,
              priority: true,
              className: "w-full h-full object-cover",
              sizes: "(max-width: 896px) 100vw, 896px"
            }
          ) }),
          post.featured_image_alt && /* @__PURE__ */ jsx("figcaption", { className: "text-center text-xs text-content-muted mt-2", children: post.featured_image_alt })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-10", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "prose-article",
              dangerouslySetInnerHTML: { __html: sanitizedHtml }
            }
          ),
          faqAccordionItems.length > 0 && /* @__PURE__ */ jsxs(
            "section",
            {
              className: "pt-8 border-t border-surface-border",
              "aria-labelledby": "post-faq-heading",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
                  /* @__PURE__ */ jsx(HelpCircle, { className: "w-5 h-5 text-brand-600", "aria-hidden": "true" }),
                  /* @__PURE__ */ jsx(
                    "h2",
                    {
                      id: "post-faq-heading",
                      className: "text-xl font-bold text-content-heading",
                      children: t("blog.faqTitle")
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(Accordion, { items: faqAccordionItems })
              ]
            }
          ),
          post.tags && post.tags.length > 0 && /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-surface-border flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-xs font-semibold text-content-muted flex items-center gap-1 me-2", children: [
              /* @__PURE__ */ jsx(Tag, { className: "w-3.5 h-3.5", "aria-hidden": "true" }),
              /* @__PURE__ */ jsx("span", { children: t("blog.tags") })
            ] }),
            post.tags.map((tag) => {
              const tagName = isEn && tag.name_en ? tag.name_en : tag.name_ar;
              return /* @__PURE__ */ jsxs(
                "span",
                {
                  className: "px-3 py-1 bg-surface-soft border border-surface-border rounded-full text-xs text-content-body font-medium",
                  children: [
                    "#",
                    tagName
                  ]
                },
                tag.id
              );
            })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pt-6 border-t border-surface-border", children: /* @__PURE__ */ jsx(ShareButtons, { url: currentUrl, title: post.title }) }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white border border-surface-border rounded-card p-6 shadow-xs flex flex-col sm:flex-row items-center gap-6", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                to: `${prefix}/about`,
                className: "w-14 h-14 rounded-full overflow-hidden bg-brand-900 flex items-center justify-center p-1 shrink-0 shadow-xs border border-brand-800 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600",
                "aria-label": t("brand.name"),
                children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: logoDarkSquare,
                    alt: t("brand.name"),
                    className: "w-full h-full object-contain",
                    width: 56,
                    height: 56,
                    loading: "lazy",
                    decoding: "async"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center sm:text-start space-y-1", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-content-heading text-sm", children: t("brand.name") }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-brand-600 font-medium", children: t("brand.accreditation") }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-content-body leading-relaxed", children: isEn ? "Expert elevator engineering, maintenance, and modernization certified by Civil Defense in Jeddah." : "شركة سعودية متخصصة في توريد وتركيب وتحديث وصيانة المصاعد والسلالم الكهربائية في جدة، معتمدين في الدفاع المدني." })
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "secondary",
                size: "sm",
                to: `${prefix}/about`,
                className: "text-xs shrink-0 whitespace-nowrap",
                children: t("nav.about")
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-card bg-brand-900 text-white p-8 sm:p-12 text-center shadow-card border border-brand-800", children: [
            /* @__PURE__ */ jsx(BrandPattern, { opacity: 0.07 }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-2xl mx-auto", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4", children: t("home.ctaBandHeading") }),
              /* @__PURE__ */ jsx("p", { className: "text-base text-brand-100 max-w-xl mx-auto mb-8 font-normal leading-relaxed", children: t("home.ctaBandSubtitle") }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3 sm:gap-4", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "hero",
                    size: "lg",
                    to: `${prefix}/contact`,
                    rightIcon: isRtl ? /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" }),
                    children: t("actions.requestQuote")
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "inverse",
                    size: "lg",
                    to: `${prefix}/contact?service=consultation`,
                    leftIcon: /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-brand-300" }),
                    className: "font-semibold",
                    children: t("actions.bookConsultation")
                  }
                )
              ] })
            ] })
          ] }),
          ((prevNext == null ? void 0 : prevNext.prev) || (prevNext == null ? void 0 : prevNext.next)) && /* @__PURE__ */ jsxs(
            "nav",
            {
              "aria-label": "Article navigation",
              className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-surface-border",
              children: [
                prevNext.prev ? /* @__PURE__ */ jsxs(
                  Link,
                  {
                    to: `${prefix}/blog/${prevNext.prev.slug}`,
                    className: "group p-4 rounded-card border border-surface-border bg-white hover:border-brand-400 hover:shadow-xs transition-all flex flex-col justify-between",
                    children: [
                      /* @__PURE__ */ jsxs("span", { className: "text-xs font-semibold text-content-muted flex items-center gap-1 mb-2", children: [
                        isRtl ? /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
                        /* @__PURE__ */ jsx("span", { children: t("blog.prevPost") })
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-content-heading group-hover:text-brand-600 transition-colors line-clamp-2", children: prevNext.prev.title })
                    ]
                  }
                ) : /* @__PURE__ */ jsx("div", {}),
                prevNext.next ? /* @__PURE__ */ jsxs(
                  Link,
                  {
                    to: `${prefix}/blog/${prevNext.next.slug}`,
                    className: "group p-4 rounded-card border border-surface-border bg-white hover:border-brand-400 hover:shadow-xs transition-all flex flex-col justify-between text-end",
                    children: [
                      /* @__PURE__ */ jsxs("span", { className: "text-xs font-semibold text-content-muted flex items-center justify-end gap-1 mb-2", children: [
                        /* @__PURE__ */ jsx("span", { children: t("blog.nextPost") }),
                        isRtl ? /* @__PURE__ */ jsx(ArrowLeft, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-content-heading group-hover:text-brand-600 transition-colors line-clamp-2", children: prevNext.next.title })
                    ]
                  }
                ) : /* @__PURE__ */ jsx("div", {})
              ]
            }
          )
        ] })
      ] }) })
    ] }),
    relatedPosts && relatedPosts.length > 0 && /* @__PURE__ */ jsx(Section, { variant: "soft", className: "py-16 border-t border-surface-border", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-content-heading", children: t("blog.relatedPosts") }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: `${prefix}/blog`,
            className: "inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-500",
            children: [
              /* @__PURE__ */ jsx("span", { children: t("blog.backToBlog") }),
              isRtl ? /* @__PURE__ */ jsx(ArrowLeft, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { ref: relatedRevealRef, className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: relatedPosts.map((relatedPost) => /* @__PURE__ */ jsx("div", { "data-related-card": true, className: "h-full", children: /* @__PURE__ */ jsx(PostCard, { post: relatedPost }) }, relatedPost.id)) })
    ] }) })
  ] });
};
(_ta = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ta.call(globalThis, "src/features/contact/ContactPage.tsx");
const contactSchema = z.object({
  name: z.string().min(2, { message: "nameTooShort" }).max(100),
  phone: z.string().min(7, { message: "phoneInvalid" }).max(20),
  email: z.string().email({ message: "emailInvalid" }).max(255).optional().or(z.literal("")),
  service_interest: z.string().optional(),
  message: z.string().min(5, { message: "messageTooShort" }).max(2e3),
  website: z.string().max(0).optional()
  // Honeypot field for bot detection
});
const ContactPage = () => {
  var _a2, _b2, _c2, _d2;
  const { t } = useTranslation();
  const location = useLocation();
  const settings = useSiteSettings();
  const isEn = location.pathname.startsWith("/en");
  const isRtl = !isEn;
  const heroRef = useHeroAnimation();
  const contentRevealRef = useScrollReveal({
    selector: "[data-contact-reveal]",
    distance: 24,
    stagger: 0.1
  });
  const formMountTime = useRef(Date.now());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const breadcrumbsItems = [
    { label: t("common.breadcrumbHome"), to: isEn ? "/en" : "/" },
    { label: t("nav.contact") }
  ];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: async (values) => {
      const result = contactSchema.safeParse(values);
      if (result.success) {
        return { values: result.data, errors: {} };
      }
      const formErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (!formErrors[field]) {
          formErrors[field] = { type: "manual", message: issue.message };
        }
      }
      return { values: {}, errors: formErrors };
    },
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service_interest: "",
      message: "",
      website: ""
    }
  });
  const onSubmit = async (data) => {
    if (data.website) {
      setIsSubmitted(true);
      return;
    }
    const elapsedMs = Date.now() - formMountTime.current;
    if (elapsedMs < 2500) {
      setIsSubmitted(true);
      return;
    }
    try {
      setSubmitError(null);
      const { error } = await supabase.from("contact_submissions").insert({
        name: data.name.trim(),
        phone: data.phone.trim(),
        email: data.email ? data.email.trim() : null,
        service_interest: data.service_interest || null,
        message: data.message.trim(),
        source_page: location.pathname,
        status: "new"
      });
      if (error) {
        setSubmitError(
          isEn ? "Failed to send your message. Please try again or call us directly." : "تعذر إرسال رسالتك حالياً. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة عبر الهاتف."
        );
        return;
      }
      if (typeof window !== "undefined" && window.dataLayer) {
        ;
        window.dataLayer.push({
          event: "contact_form_submit",
          service_interest: data.service_interest || "general"
        });
      }
      setIsSubmitted(true);
      reset();
    } catch {
      setSubmitError(
        isEn ? "An unexpected error occurred. Please call us directly." : "حدث خطأ غير متوقع. يرجى الاتصال بنا مباشرة."
      );
    }
  };
  const serviceOptions = [
    { value: "", label: t("contact.serviceSelectPlaceholder") },
    { value: "maintenance", label: t("services.maintenance.title") },
    { value: "modernization", label: t("services.modernization.title") },
    { value: "installation", label: t("services.installation.title") },
    { value: "spare-parts", label: t("services.spareParts.title") },
    { value: "escalators", label: t("services.escalators.title") }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: t("contact.pageTitle"),
        description: t("contact.pageDescription"),
        canonical: isEn ? "/en/contact" : "/contact",
        hreflang: {
          ar: "https://almubtakirah.com/contact",
          en: "https://almubtakirah.com/en/contact",
          xDefault: "https://almubtakirah.com/contact"
        },
        lang: isEn ? "en" : "ar",
        dir: isRtl ? "rtl" : "ltr",
        breadcrumbs: [
          { name: t("common.breadcrumbHome"), url: isEn ? "/en" : "/" },
          { name: t("nav.contact"), url: isEn ? "/en/contact" : "/contact" }
        ],
        jsonLd: [getLocalBusinessSchema()]
      }
    ),
    /* @__PURE__ */ jsxs("section", { ref: heroRef, className: "bg-brand-900 text-white py-14 md:py-20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx(BrandPattern, { opacity: 0.07 }),
      /* @__PURE__ */ jsxs(Container, { className: "relative z-10", children: [
        /* @__PURE__ */ jsx("div", { "data-hero-element": true, children: /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems, className: "mb-6 text-white/80" }) }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
          /* @__PURE__ */ jsx("span", { "data-hero-element": true, className: "text-xs font-semibold text-brand-300 uppercase tracking-wider block mb-2", children: t("contact.eyebrow") }),
          /* @__PURE__ */ jsx("h1", { "data-hero-element": true, className: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6", children: t("contact.heading") }),
          /* @__PURE__ */ jsx("p", { "data-hero-element": true, className: "text-base sm:text-lg text-brand-100 leading-relaxed font-normal", children: t("contact.subtitle") })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Section, { variant: "white", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { ref: contentRevealRef, className: "grid grid-cols-1 lg:grid-cols-12 gap-12 items-start", children: [
      /* @__PURE__ */ jsxs("div", { "data-contact-reveal": true, className: "lg:col-span-7 bg-white p-8 sm:p-10 rounded-card border border-surface-border shadow-xs", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-content-heading mb-2", children: t("contact.formTitle") }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-content-muted mb-8 leading-relaxed", children: t("contact.formSubtitle") }),
        isSubmitted ? /* @__PURE__ */ jsxs(
          "div",
          {
            className: "p-8 rounded-control bg-feedback-success-light border border-feedback-success/30 text-center",
            role: "status",
            children: [
              /* @__PURE__ */ jsx(CheckCircle2, { className: "w-12 h-12 text-feedback-success mx-auto mb-4" }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-content-heading mb-2", children: t("contact.successHeading") }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-content-body max-w-md mx-auto mb-6", children: t("contact.successMessage") }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "secondary",
                  onClick: () => {
                    setIsSubmitted(false);
                    formMountTime.current = Date.now();
                  },
                  className: "border-feedback-success text-feedback-success hover:bg-feedback-success/10 font-medium",
                  children: t("contact.sendAnother")
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", noValidate: true, children: [
          /* @__PURE__ */ jsxs("div", { className: "hidden", "aria-hidden": "true", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "website", children: "Website" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "website",
                type: "text",
                tabIndex: -1,
                autoComplete: "off",
                ...register("website")
              }
            )
          ] }),
          submitError && /* @__PURE__ */ jsxs(
            "div",
            {
              className: "p-4 rounded-control bg-feedback-error-light border border-feedback-error/30 text-feedback-error text-sm flex items-center gap-2",
              role: "alert",
              children: [
                /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 flex-shrink-0" }),
                /* @__PURE__ */ jsx("span", { children: submitError })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsx(
              FormField,
              {
                label: t("contact.nameLabel"),
                required: true,
                error: ((_a2 = errors.name) == null ? void 0 : _a2.message) ? t(`contact.validation.${errors.name.message}`) : void 0,
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    placeholder: t("contact.namePlaceholder"),
                    error: Boolean(errors.name),
                    ...register("name")
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              FormField,
              {
                label: t("contact.phoneLabel"),
                required: true,
                error: ((_b2 = errors.phone) == null ? void 0 : _b2.message) ? t(`contact.validation.${errors.phone.message}`) : void 0,
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "tel",
                    dir: "ltr",
                    placeholder: t("contact.phonePlaceholder"),
                    error: Boolean(errors.phone),
                    ...register("phone")
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsx(
              FormField,
              {
                label: t("contact.emailLabel"),
                optionalLabel: `(${t("common.optional")})`,
                error: ((_c2 = errors.email) == null ? void 0 : _c2.message) ? t(`contact.validation.${errors.email.message}`) : void 0,
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "email",
                    dir: "ltr",
                    placeholder: t("contact.emailPlaceholder"),
                    error: Boolean(errors.email),
                    ...register("email")
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(FormField, { label: t("contact.serviceLabel"), children: /* @__PURE__ */ jsx(
              Select,
              {
                options: serviceOptions,
                ...register("service_interest")
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(
            FormField,
            {
              label: t("contact.messageLabel"),
              required: true,
              error: ((_d2 = errors.message) == null ? void 0 : _d2.message) ? t(`contact.validation.${errors.message.message}`) : void 0,
              children: /* @__PURE__ */ jsx(
                Textarea,
                {
                  rows: 5,
                  placeholder: t("contact.messagePlaceholder"),
                  error: Boolean(errors.message),
                  ...register("message")
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "submit",
              variant: "primary",
              size: "lg",
              isLoading: isSubmitting,
              className: "w-full sm:w-auto bg-brand-600 hover:bg-brand-500 font-semibold",
              leftIcon: /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" }),
              children: isSubmitting ? t("contact.submitting") : t("contact.submitButton")
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { "data-contact-reveal": true, className: "lg:col-span-5 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-surface-subtle p-8 rounded-card border border-surface-border", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-content-heading mb-6", children: t("contact.infoTitle") }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 group", children: [
            /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-xl bg-brand-50 border border-brand-200/80 text-brand-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200", children: /* @__PURE__ */ jsx(Headset, { className: "w-5 h-5", "aria-hidden": "true" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-content-muted font-medium block mb-1", children: t("contact.unifiedNumberTitle") }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: `tel:${settings.contact.unifiedNumber}`,
                  dir: "ltr",
                  className: "text-base font-bold text-content-heading hover:text-brand-600 transition-colors inline-block",
                  children: settings.contact.unifiedDisplay
                }
              )
            ] })
          ] }),
          settings.contact.phones[1] && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 group", children: [
            /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200/80 text-[#25D366] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200", children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-5 h-5 fill-current",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-content-muted font-medium block mb-1", children: t("contact.mobileWhatsAppTitle") }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `tel:${settings.contact.phones[1]}`,
                    dir: "ltr",
                    className: "text-sm font-bold text-content-heading hover:text-brand-600 transition-colors inline-block",
                    children: settings.contact.phoneDisplay[1] || settings.contact.phones[1]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `https://wa.me/${settings.contact.whatsapp}`,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-xs font-semibold text-[#25D366] hover:text-[#20BD5A] inline-flex items-center gap-1.5 transition-colors",
                    children: /* @__PURE__ */ jsx("span", { children: "WhatsApp" })
                  }
                )
              ] })
            ] })
          ] }),
          settings.contact.phones[0] && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 group", children: [
            /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-xl bg-sky-50 border border-sky-200/80 text-sky-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200", children: /* @__PURE__ */ jsx(PhoneCall, { className: "w-5 h-5", "aria-hidden": "true" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-content-muted font-medium block mb-1", children: t("contact.phoneTitle") }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: `tel:${settings.contact.phones[0]}`,
                  dir: "ltr",
                  className: "text-sm font-bold text-content-heading hover:text-brand-600 transition-colors inline-block",
                  children: settings.contact.phoneDisplay[0] || settings.contact.phones[0]
                }
              )
            ] })
          ] }),
          settings.contact.email && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 group", children: [
            /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-200/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200", children: /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5", "aria-hidden": "true" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-content-muted font-medium block mb-1", children: t("contact.emailTitle") }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: `mailto:${settings.contact.email}`,
                  dir: "ltr",
                  className: "text-sm font-bold text-content-heading hover:text-brand-600 transition-colors inline-block",
                  children: settings.contact.email
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 group", children: [
            /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200", children: /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5", "aria-hidden": "true" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs text-content-muted font-medium block mb-1", children: t("contact.locationTitle") }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-content-heading block", children: isEn ? settings.contact.cityEn : settings.contact.cityAr }),
              settings.contact.mapUrl && /* @__PURE__ */ jsx(
                "a",
                {
                  href: settings.contact.mapUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-xs text-brand-600 hover:underline mt-1 inline-block",
                  children: isEn ? "View on Google Maps" : "عرض على خرائط Google"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 pt-6 border-t border-surface-border space-y-3 text-xs text-content-muted", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-lg bg-white border border-surface-border flex items-center justify-center shrink-0 shadow-2xs", children: /* @__PURE__ */ jsx(Building2, { className: "w-3.5 h-3.5 text-brand-600" }) }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-content-body", children: isEn ? `CR: ${settings.company.crNumber}` : `السجل التجاري رقم ${settings.company.crNumber}` })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200/70 flex items-center justify-center shrink-0 shadow-2xs", children: /* @__PURE__ */ jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-600" }) }),
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-content-body", children: isEn ? settings.company.accreditationEn : settings.company.accreditationAr })
          ] })
        ] })
      ] }) })
    ] }) }) })
  ] });
};
(_ua = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _ua.call(globalThis, "src/features/privacy/PrivacyPage.tsx");
const PrivacyPage = () => {
  const { t } = useTranslation();
  const settings = useSiteSettings();
  const location = useLocation();
  const isEn = location.pathname.startsWith("/en");
  const isRtl = !isEn;
  const heroRef = useHeroAnimation();
  const contentRevealRef = useScrollReveal({
    selector: "[data-privacy-reveal]",
    distance: 20,
    stagger: 0.1
  });
  const breadcrumbsItems = [
    { label: t("common.breadcrumbHome"), to: isEn ? "/en" : "/" },
    { label: t("privacy.heading") }
  ];
  const sections = t("privacy.sections", { returnObjects: true }) || [];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: t("privacy.pageTitle"),
        description: t("privacy.pageDescription"),
        canonical: isEn ? "/en/privacy" : "/privacy",
        hreflang: {
          ar: "https://almubtakirah.com/privacy",
          en: "https://almubtakirah.com/en/privacy",
          xDefault: "https://almubtakirah.com/privacy"
        },
        lang: isEn ? "en" : "ar",
        dir: isRtl ? "rtl" : "ltr",
        breadcrumbs: [
          { name: t("common.breadcrumbHome"), url: isEn ? "/en" : "/" },
          { name: t("privacy.heading"), url: isEn ? "/en/privacy" : "/privacy" }
        ]
      }
    ),
    /* @__PURE__ */ jsxs("section", { ref: heroRef, className: "bg-brand-900 text-white py-14 md:py-20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx(BrandPattern, { opacity: 0.07 }),
      /* @__PURE__ */ jsxs(Container, { className: "relative z-10", children: [
        /* @__PURE__ */ jsx("div", { "data-hero-element": true, children: /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems, className: "mb-6 text-white/80" }) }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
          /* @__PURE__ */ jsx("span", { "data-hero-element": true, className: "text-xs font-semibold text-brand-300 uppercase tracking-wider block mb-2", children: t("privacy.eyebrow") }),
          /* @__PURE__ */ jsx("h1", { "data-hero-element": true, className: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4", children: t("privacy.heading") }),
          /* @__PURE__ */ jsx("p", { "data-hero-element": true, className: "text-sm text-brand-200", children: t("privacy.lastUpdated") })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Section, { variant: "white", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { ref: contentRevealRef, className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          "data-privacy-reveal": true,
          className: "p-5 rounded-control bg-brand-50 border border-brand-200 flex items-start gap-3.5 mb-10 text-xs sm:text-sm text-brand-900 leading-relaxed",
          role: "note",
          children: [
            /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("div", { children: t("privacy.reviewNotice") })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { "data-privacy-reveal": true, className: "space-y-8 bg-white p-8 sm:p-12 rounded-card border border-surface-border", children: [
        sections.map((sec, idx) => /* @__PURE__ */ jsxs("section", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg sm:text-xl font-bold text-content-heading", children: sec.title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-content-body leading-relaxed", children: sec.content })
        ] }, idx)),
        /* @__PURE__ */ jsxs("div", { className: "pt-8 border-t border-surface-border flex items-center gap-3 text-sm text-content-muted", children: [
          /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4 text-brand-600 flex-shrink-0" }),
          /* @__PURE__ */ jsxs("span", { children: [
            isEn ? "Official privacy inquiries:" : "للاستفسارات والطلبات المتعلقة بالخصوصية:",
            " ",
            /* @__PURE__ */ jsx(
              "a",
              {
                href: `mailto:${settings.contact.email}`,
                className: "font-bold text-brand-600 hover:underline",
                children: settings.contact.email
              }
            )
          ] })
        ] })
      ] })
    ] }) }) })
  ] });
};
(_va = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _va.call(globalThis, "src/routes.tsx");
const AdminRoot = React.lazy(
  () => {
    var _a2;
    return ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/app/layouts/AdminRoot.tsx"), import("./assets/AdminRoot-BMHpytIx.js")).then((m) => ({ default: m.AdminRoot }));
  }
);
const AdminLayout = React.lazy(
  () => {
    var _a2;
    return ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/app/layouts/AdminLayout.tsx"), import("./assets/AdminLayout-FEhyIBSM.js")).then((m) => ({ default: m.AdminLayout }));
  }
);
const AdminLoginPage = React.lazy(
  () => {
    var _a2;
    return ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/features/auth/AdminLoginPage.tsx"), import("./assets/AdminLoginPage-7hMQol2z.js")).then((m) => ({
      default: m.AdminLoginPage
    }));
  }
);
const AdminResetPasswordPage = React.lazy(
  () => {
    var _a2;
    return ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/features/auth/AdminResetPasswordPage.tsx"), import("./assets/AdminResetPasswordPage-C7yCgmhx.js")).then((m) => ({
      default: m.AdminResetPasswordPage
    }));
  }
);
const DashboardPage = React.lazy(
  () => {
    var _a2;
    return ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/features/admin/DashboardPage.tsx"), import("./assets/DashboardPage-CcXBc-IF.js")).then((m) => ({
      default: m.DashboardPage
    }));
  }
);
const MediaPage = React.lazy(
  () => {
    var _a2;
    return ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/features/admin/MediaPage.tsx"), import("./assets/MediaPage-C9IJhtqj.js")).then((m) => ({
      default: m.MediaPage
    }));
  }
);
const WorksListPage = React.lazy(
  () => {
    var _a2;
    return ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/features/admin/works/WorksListPage.tsx"), import("./assets/WorksListPage-iyr4RhKU.js")).then((m) => ({
      default: m.WorksListPage
    }));
  }
);
const WorkEditPage = React.lazy(
  () => {
    var _a2;
    return ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/features/admin/works/WorkEditPage.tsx"), import("./assets/WorkEditPage-D-XIpODL.js")).then((m) => ({
      default: m.WorkEditPage
    }));
  }
);
const PartnersPage = React.lazy(
  () => {
    var _a2;
    return ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/features/admin/partners/PartnersPage.tsx"), import("./assets/PartnersPage-C_dCNEqD.js")).then((m) => ({
      default: m.PartnersPage
    }));
  }
);
const MessagesPage = React.lazy(
  () => {
    var _a2;
    return ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/features/admin/messages/MessagesPage.tsx"), import("./assets/MessagesPage-BUhSyN9q.js")).then((m) => ({
      default: m.MessagesPage
    }));
  }
);
const SettingsPage = React.lazy(
  () => {
    var _a2;
    return ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/features/admin/settings/SettingsPage.tsx"), import("./assets/SettingsPage-CRjkFXh1.js")).then((m) => ({
      default: m.SettingsPage
    }));
  }
);
const UsersPage = React.lazy(
  () => {
    var _a2;
    return ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/features/admin/users/UsersPage.tsx"), import("./assets/UsersPage-Eb8JdtDU.js")).then((m) => ({
      default: m.UsersPage
    }));
  }
);
const PostsListPage = React.lazy(
  () => {
    var _a2;
    return ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/features/admin/blog/PostsListPage.tsx"), import("./assets/PostsListPage-y1x8v3AY.js")).then((m) => ({
      default: m.PostsListPage
    }));
  }
);
const PostEditPage = React.lazy(
  () => {
    var _a2;
    return ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/features/admin/blog/PostEditPage.tsx"), import("./assets/PostEditPage-D-2bo2Yk.js")).then((m) => ({
      default: m.PostEditPage
    }));
  }
);
const CategoriesPage = React.lazy(
  () => {
    var _a2;
    return ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/features/admin/blog/CategoriesPage.tsx"), import("./assets/CategoriesPage-Bi0p6hj6.js")).then((m) => ({
      default: m.CategoriesPage
    }));
  }
);
const TagsPage = React.lazy(
  () => {
    var _a2;
    return ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/features/admin/blog/TagsPage.tsx"), import("./assets/TagsPage-C7AXv42m.js")).then((m) => ({
      default: m.TagsPage
    }));
  }
);
const routes = [
  // 1. Public Website Layout (Static SSG Prerendered)
  {
    path: "/",
    element: /* @__PURE__ */ jsx(PublicLayout, {}),
    children: [
      // Arabic routes (default root)
      { index: true, element: /* @__PURE__ */ jsx(HomePage, {}) },
      { path: "about", element: /* @__PURE__ */ jsx(AboutPage, {}) },
      { path: "services", element: /* @__PURE__ */ jsx(ServicesPage, {}) },
      {
        path: "services/elevator-maintenance",
        element: /* @__PURE__ */ jsx(ServiceDetailPage, { serviceKey: "maintenance" })
      },
      {
        path: "services/elevator-modernization",
        element: /* @__PURE__ */ jsx(ServiceDetailPage, { serviceKey: "modernization" })
      },
      {
        path: "services/elevator-installation",
        element: /* @__PURE__ */ jsx(ServiceDetailPage, { serviceKey: "installation" })
      },
      {
        path: "services/elevator-spare-parts",
        element: /* @__PURE__ */ jsx(ServiceDetailPage, { serviceKey: "spareParts" })
      },
      {
        path: "services/escalators-moving-walkways",
        element: /* @__PURE__ */ jsx(ServiceDetailPage, { serviceKey: "escalators" })
      },
      { path: "works", element: /* @__PURE__ */ jsx(WorksPage, {}) },
      { path: "works/:slug", element: /* @__PURE__ */ jsx(WorkDetailPage, {}) },
      { path: "blog", element: /* @__PURE__ */ jsx(BlogIndexPage, {}) },
      { path: "blog/page/:page", element: /* @__PURE__ */ jsx(BlogIndexPage, {}) },
      { path: "blog/category/:slug", element: /* @__PURE__ */ jsx(BlogCategoryPage, {}) },
      { path: "blog/category/:slug/page/:page", element: /* @__PURE__ */ jsx(BlogCategoryPage, {}) },
      { path: "blog/:slug", element: /* @__PURE__ */ jsx(BlogPostPage, {}) },
      { path: "contact", element: /* @__PURE__ */ jsx(ContactPage, {}) },
      { path: "privacy", element: /* @__PURE__ */ jsx(PrivacyPage, {}) },
      // English routes (/en prefix)
      { path: "en", element: /* @__PURE__ */ jsx(HomePage, {}) },
      { path: "en/about", element: /* @__PURE__ */ jsx(AboutPage, {}) },
      { path: "en/services", element: /* @__PURE__ */ jsx(ServicesPage, {}) },
      {
        path: "en/services/elevator-maintenance",
        element: /* @__PURE__ */ jsx(ServiceDetailPage, { serviceKey: "maintenance" })
      },
      {
        path: "en/services/elevator-modernization",
        element: /* @__PURE__ */ jsx(ServiceDetailPage, { serviceKey: "modernization" })
      },
      {
        path: "en/services/elevator-installation",
        element: /* @__PURE__ */ jsx(ServiceDetailPage, { serviceKey: "installation" })
      },
      {
        path: "en/services/elevator-spare-parts",
        element: /* @__PURE__ */ jsx(ServiceDetailPage, { serviceKey: "spareParts" })
      },
      {
        path: "en/services/escalators-moving-walkways",
        element: /* @__PURE__ */ jsx(ServiceDetailPage, { serviceKey: "escalators" })
      },
      { path: "en/works", element: /* @__PURE__ */ jsx(WorksPage, {}) },
      { path: "en/works/:slug", element: /* @__PURE__ */ jsx(WorkDetailPage, {}) },
      { path: "en/blog", element: /* @__PURE__ */ jsx(BlogIndexPage, {}) },
      { path: "en/blog/page/:page", element: /* @__PURE__ */ jsx(BlogIndexPage, {}) },
      { path: "en/blog/category/:slug", element: /* @__PURE__ */ jsx(BlogCategoryPage, {}) },
      { path: "en/blog/category/:slug/page/:page", element: /* @__PURE__ */ jsx(BlogCategoryPage, {}) },
      { path: "en/blog/:slug", element: /* @__PURE__ */ jsx(BlogPostPage, {}) },
      { path: "en/contact", element: /* @__PURE__ */ jsx(ContactPage, {}) },
      { path: "en/privacy", element: /* @__PURE__ */ jsx(PrivacyPage, {}) },
      // 404 Page (Prerendered for Vercel/Static Hosting)
      { path: "404", element: /* @__PURE__ */ jsx(NotFoundPage, {}) },
      // Catch-all 404
      { path: "*", element: /* @__PURE__ */ jsx(NotFoundPage, {}) }
    ]
  },
  // 2. Admin Dashboard Layout (Client-side Only, Lazy-loaded, Excluded from SSG)
  {
    path: "admin/login",
    element: /* @__PURE__ */ jsx(AdminRoot, { children: /* @__PURE__ */ jsx(AdminLoginPage, {}) })
  },
  {
    path: "admin/reset-password",
    element: /* @__PURE__ */ jsx(AdminRoot, { children: /* @__PURE__ */ jsx(AdminResetPasswordPage, {}) })
  },
  {
    path: "admin",
    element: /* @__PURE__ */ jsx(AdminRoot, { children: /* @__PURE__ */ jsx(AdminLayout, {}) }),
    children: [
      { index: true, element: /* @__PURE__ */ jsx(DashboardPage, {}) },
      {
        path: "posts",
        element: /* @__PURE__ */ jsx(PostsListPage, {})
      },
      {
        path: "posts/new",
        element: /* @__PURE__ */ jsx(PostEditPage, {})
      },
      {
        path: "posts/:id",
        element: /* @__PURE__ */ jsx(PostEditPage, {})
      },
      {
        path: "categories",
        element: /* @__PURE__ */ jsx(CategoriesPage, {})
      },
      {
        path: "tags",
        element: /* @__PURE__ */ jsx(TagsPage, {})
      },
      {
        path: "works",
        element: /* @__PURE__ */ jsx(WorksListPage, {})
      },
      {
        path: "works/new",
        element: /* @__PURE__ */ jsx(WorkEditPage, {})
      },
      {
        path: "works/:id",
        element: /* @__PURE__ */ jsx(WorkEditPage, {})
      },
      {
        path: "partners",
        element: /* @__PURE__ */ jsx(PartnersPage, {})
      },
      {
        path: "media",
        element: /* @__PURE__ */ jsx(MediaPage, {})
      },
      {
        path: "messages",
        element: /* @__PURE__ */ jsx(MessagesPage, {})
      },
      {
        path: "settings",
        element: /* @__PURE__ */ jsx(SettingsPage, {})
      },
      {
        path: "users",
        element: /* @__PURE__ */ jsx(UsersPage, {})
      }
    ]
  }
];
const brand$1 = { "name": "شركة المصاعد المبتكرة", "slogan": "ابتكار يرتفع بك", "tagline": "صيانة – تحديث – تركيب – قطع غيار", "cr": "السجل التجاري رقم 4030227058", "accreditation": "معتمدين في الدفاع المدني", "city": "جدة" };
const nav$1 = { "home": "الرئيسية", "about": "من نحن", "services": "خدماتنا", "works": "أعمالنا", "blog": "المدونة", "contact": "تواصل معنا", "servicesMenu": { "maintenance": "صيانة المصاعد", "modernization": "تحديث المصاعد", "installation": "تركيب المصاعد", "spareParts": "قطع غيار المصاعد", "escalators": "السلالم والممرات المتحركة" } };
const actions$1 = { "requestQuote": "اطلب عرض سعر", "callNow": "اتصل الآن", "bookConsultation": "احجز استشارتك", "readMore": "اقرأ المزيد", "contactUs": "تواصل معنا", "viewWorks": "مشاهدة الأعمال", "sendMessage": "إرسال الرسالة", "close": "إغلاق", "openMenu": "فتح القائمة", "switchLanguage": "English", "skipToContent": "الانتقال إلى المحتوى الرئيسي", "backHome": "العودة للرئيسية", "viewAllServices": "استعراض جميع الخدمات", "scrollToTop": "العودة إلى أعلى الصفحة" };
const footer$1 = { "aboutTitle": "عن الشركة", "aboutText": "شريكك الهندسي الرائد في جدة.. نبتكر حلولاً متكاملة لتوريد وتركيب وتحديث وصيانة المصاعد، معتمدون في الدفاع المدني لنمنح مبناك أعلى درجات الأمان والاعتمادية.", "quickLinks": "روابط سريعة", "servicesTitle": "خدماتنا", "contactTitle": "معلومات التواصل", "rights": "جميع الحقوق محفوظة", "unifiedPhoneLabel": "الرقم الموحد", "mobilePhoneLabel": "الجوال والواتساب", "emailLabel": "البريد الإلكتروني", "crLabel": "السجل التجاري", "followUs": "تابعنا على", "nationalAddress": "العنوان الوطني", "nationalAddressVerified": "العنوان الوطني المعتمد", "viewNationalAddressPdf": "عرض وثيقة العنوان الوطني (PDF)", "crModalTitle": "بيانات السجل التجاري", "crModalDesc": "شركة المصاعد المبتكرة شركة سعودية رسمية معتمدة ومسجلة في وزارة التجارة والدفاع المدني.", "crNumberVal": "رقم السجل التجاري: 4030227058", "crCivilDefense": "معتمدون في المديرية العامة للدفاع المدني", "crCity": "المركز الرئيسي: جدة، المملكة العربية السعودية", "shortAddressLabel": "العنوان المختصر", "viewAddressProof": "عرض وثيقة إثبات العنوان الوطني", "addressProofAlt": "شهادة إثبات العنوان الوطني - شركة المصاعد المبتكرة", "copyShortAddress": "نسخ العنوان المختصر", "copied": "تم النسخ", "viewProof": "عرض الوثيقة", "splBadge": "البريد السعودي SPL", "streetAddress": "شارع نهضة الشرق، حي السلامة، مبنى 2523", "cityCountry": "جدة، المملكة العربية السعودية", "social": { "whatsapp": "واتساب", "tiktok": "تيك توك", "instagram": "إنستغرام", "snapchat": "سناب شات", "x": "منصة إكس", "linkedin": "لينكد إن" } };
const common$1 = { "loading": "جاري التحميل...", "error": "حدث خطأ غير متوقع", "success": "تمت العملية بنجاح", "emptyState": "لا توجد عناصر لعرضها حالياً", "previous": "السابق", "next": "التالي", "page": "صفحة", "of": "من", "required": "مطلوب", "optional": "اختياري", "cityJeddah": "جدة، المملكة العربية السعودية", "breadcrumbHome": "الرئيسية", "breadcrumbServices": "الخدمات" };
const home$1 = { "heroTitle": "ابتكارٌ يرتفع بك.. وهندسةٌ تصعد بأمانك", "heroSubtitle": "حلول هندسية متكاملة لتركيب وتحديث وصيانة المصاعد في جدة بأعلى معايير الجودة والسلامة", "heroBadges": "صيانة · تحديث · تركيب · قطع غيار", "aboutEyebrow": "عن المصاعد المبتكرة", "aboutHeading": "نبني الثقة طابقاً تلو الآخر.. بخبرة هندسية ترتقي بمبناك", "aboutText": "شركة سعودية تأسست في جدة وتعمل في مجال توريد وتركيب وصيانة وتطوير وتحديث المصاعد بكافة أحجامها وأشكالها، معتمدة في الدفاع المدني لضمان أعلى معايير الأمان والسلامة التشغيلية.", "aboutLink": "تعرف على مسيرة الشركة ورؤيتنا", "servicesEyebrow": "خدماتنا المتخصصة", "servicesHeading": "هندسة ترتقي بحركتك.. وحلول تُبقي مصعدك في القمة", "servicesSubtitle": "منظومة متكاملة لتركيب وتحديث وصيانة المصاعد، مع خطط خدمة مرنة نُفصّلها بدقة لتلائم طبيعة مبناك واحتياجاتك الفعلية.", "whyUsEyebrow": "معايير التميز الهندسي", "whyUsHeading": "معاييرٌ تصعد بك.. وثقةٌ لا تقبل المساومة", "whyUsIntro": "لأن سلامة ركابك واستمرارية تشغيل مبناك لا تحتمل التهاون؛ نلتزم بأعلى معايير الأمان والاستجابة السريعة في جدة.", "whyUsPoints": [{ "title": "خدمات إصلاح عالية الجودة", "description": "تنفيذ أعمال الفحص والإصلاح بدقة هندسية عالية لضمان عمل المصعد بكفاءة متواصلة." }, { "title": "سجل قوي للسلامة ورضا العملاء", "description": "التزام صارم باشتراطات الدفاع المدني والمعايير الهندسية لسلامة الركاب." }, { "title": "شبكة موردين واسعة للتنفيذ بشكل أسرع", "description": "تأمين قطع الغيار الأصلية والمكونات الميكانيكية والكهربائية دون تأخير." }, { "title": "فرق الاستجابة للطوارئ للحالات الحرجة", "description": "جاهزية مستمرة للتعامل مع الأعطال المفاجئة وحالات التوقف الطارئة." }, { "title": "حلول سريعة لتشغيل المعدات بأفضل أداء", "description": "تشخيص فوري للأعطال واستعادة الكفاءة التشغيلية للمصاعد بأقصر مدة توقف." }, { "title": "فنيون مدربون وذوو خبرة متاحون", "description": "طواقم فنية متخصصة تمتلك الخبرة الميدانية في صيانة مختلف الموديلات." }, { "title": "وقت استجابة في نفس اليوم", "description": "مباشرة البلاغات والطلبات التشغيلية في مدينة جدة بكفاءة وسرعة." }], "whyUsBadges": { "safety": "معتمدون في الدفاع المدني", "safetyExtra1": "كود البناء السعودي", "safetyExtra2": "شهادات سلامة دورية معتمدة", "emergency": "طوارئ على مدار 24 ساعة", "emergencyCall": "الخط المباشر للطوارئ", "speed": "سرعة الإنجاز", "speedExtra": "تغطية شاملة لأحياء جدة", "precision": "دقة هندسية", "precisionExtra": "فحص بأجهزة رقمية دقيقة", "expertise": "كوادر معتمدة", "expertiseExtra": "خبرة ميدانية لكافة الموديلات", "performance": "كفاءة تشغيلية", "performanceExtra": "حركة سلسة ومحركات بأعلى أداء", "suppliers": "قطع غيار أصلية", "suppliersExtra": "سلاسل إمداد أوروبية موثوقة" }, "maintenanceEyebrow": "هندسة الصيانة الاستباقية", "maintenanceHeading": "ابتكارٌ يحمي حركتك.. وصيانةٌ هندسية تتوقع العطل قبل حدوثه", "maintenanceSubtitle": "من أدق الحساسات إلى أقوى المحركات؛ نعتني بكل تفصيلة ميكانيكية وكهربائية وفق جداول فحص معتمدة تضمن لك أعلى معايير السلامة واستمرارية التشغيل في جدة.", "modernizationBoxTitle": "حوّل مصعدك القديم إلى منظومة عصرية ذكية", "modernizationBoxText": "نمنح مصعدك عمراً تشغيلياً جديداً بأحدث تقنيات التحكم وتوفير الطاقة مع تجديد متكامل للكابينة يرفع قيمة عقارك ويضمن سلاسة الحركة القصوى.", "modernizationBoxCta": "استكشف حلول التحديث", "worksEyebrow": "سابقة أعمالنا وإنجازاتنا", "worksHeading": "بصمتنا في كل طابق.. مشاريعٌ ترتقي بمستقبل الحركة في جدة", "worksSubtitle": "من الأبراج التجارية الشاهقة إلى المجمعات السكنية الراقية؛ نفخر بتنفيذ وتحديث وصيانة منظومات حركة متطورة تخدم آلاف المستخدمين يومياً بأعلى درجات الأمان والاعتمادية.", "partnersEyebrow": "تحالفات الثقة والتميز", "partnersHeading": "ثقةٌ تصعد معنا.. وشراكاتٌ تصنع الريادة", "partnersSubtitle": "نعتز بالثقة المتبادلة مع كبرى الشركات والمطورين والمؤسسات الرائدة في جدة، الذين جعلوا من المصاعد المبتكرة خيارهم الأول في الأمان والكفاءة.", "blogEyebrow": "نافذة المعرفة والأمان", "blogHeading": "معرفةٌ تصعد بك.. ودليلك الهندسي لأعلى درجات الأمان", "blogSubtitle": "إرشادات عملية ومعلومات تقنية نشاركك فيها أسرار الصيانة الوقائية، واشتراطات الدفاع المدني، وأحدث حلول المصاعد في جدة.", "blogViewAll": "استعراض كافة المقالات", "ctaBandHeading": "دعنا نرتقي بمبناك.. أمانٌ يدوم، وهندسةٌ تصنع الفارق", "ctaBandSubtitle": "سواء كنت تبحث عن صيانة دورية معتمدة، أو تحديث شامل، أو استشارة فنية دقيقة لمشروعك؛ فريقنا الهندسي في جدة جاهز لمعاينة موقعك فوراً." };
const about$1 = { "pageTitle": "من نحن | شركة المصاعد المبتكرة في جدة", "pageDescription": "تعرف على شركة المصاعد المبتكرة بجدة، رؤيتنا في تقديم خدمات الصيانة والتحديث والتركيب، ورسالتنا المرتكزة على سلامة المستخدمين.", "eyebrow": "عن المصاعد المبتكرة", "heading": "نبني الثقة طابقاً تلو الآخر.. بخبرة هندسية ترتقي بمبناك", "lead": "شركة سعودية تأسست في جدة بموجب السجل التجاري رقم 4030227058 وتعمل في مجال توريد وتركيب وصيانة وتطوير وتحديث المصاعد بكافة أحجامها وأشكالها.", "visionEyebrow": "طموحٌ يعانق المستقبل", "visionHeading": "استدامةٌ وكفاءة.. نواكب بها طموحات رؤية 2030", "visionText": "نبتكر حلول حركة ذكية ومستدامة توفر الطاقة وترتقي بجاهزية المبنى، مع التزام صارم بتقديم أعلى مستويات الدعم الفني لكافة طرازات المصاعد والسلالم الكهربائية في جدة.", "approachEyebrow": "دقة التنفيذ والهندسة", "approachHeading": "حلولٌ دقيقة تُفصَّل هندسياً لتناسب احتياج مبناك", "approachText": "نتبنى منهجية عمل استباقية ترتكز على التشخيص الدقيق ومنع الأعطال قبل حدوثها، مع خطط صيانة مرنة تضمن أعلى معدلات الجاهزية وانسيابية الحركة على مدار الساعة.", "missionEyebrow": "ميثاق الأمان المطلق", "missionHeading": "سلامة الركاب خطٌ أحمر.. معايير لا تقبل المساومة", "missionText": "نلتزم بأعلى اشتراطات كود البناء السعودي ومعايير الدفاع المدني، ونخضع كل مكون ميكانيكي وكهربائي لاختبارات فحص صارمة تضمن أماناً تاماً وراحة بال في كل رحلة صعود.", "logoMeaningTitle": "فلسفة الهوية.. دقةٌ هندسية تروي قصة التميز والأمان", "logoMeaningIntro": "لم يكن تصميم هويتنا مجرد خطوط وألوان، بل تجسيداً حياً لالتزامنا بأعلى معايير السلامة، والدقة الهندسية الصارمة، وحركة الصعود المستمرة نحو مستقبل أكثر تطوراً:", "logoElements": [{ "title": "الخطوط الصاعدة والانسيابية", "description": "ترمز إلى حركة الارتقاء الدائم وانسيابية التنقل، وتجسد سعينا المستمر لتقديم حلول ترتقي بتجربة ركاب المبنى طابقاً تلو الآخر." }, { "title": "الهيكل الهندسي المتماسك", "description": "يعبر عن الأمان الميكانيكي الفائق والدقة المتناهية في الحسابات الهندسية، مما يضمن أعلى درجات الثبات والاعتمادية في كل مشروع." }, { "title": "التدرجات والتناغم اللوني", "description": "تجسد الاحترافية والابتكار التكنولوجي، وتؤكد رسوخ ثقة عملائنا في جدة تماشياً مع طموحات رؤية المملكة 2030." }], "factsTitle": "حقائق وأرقام ترسم ثقتك.. جاهزية معتمدة لخدمتك في جدة", "facts": [{ "label": "السجل التجاري", "value": "4030227058 (سجل رسمي سارٍ وموثق)" }, { "label": "الاعتماد الرسمي", "value": "معتمدون لدى المديرية العامة للدفاع المدني" }, { "label": "المدينة والمقر الرئيسي", "value": "جدة، المملكة العربية السعودية" }, { "label": "نطاق الخدمات الهندسية", "value": "توريد، تركيب، صيانة، وتحديث شامل لكافة المصاعد" }, { "label": "العلامات والموديلات المدعومة", "value": "كافة الماركات العالمية والموديلات الحديثة" }, { "label": "نطاق التغطية والاستجابة", "value": "تغطية ميدانية شاملة لكافة أحياء جدة" }] };
const services$1 = /* @__PURE__ */ JSON.parse('{"pageTitle":"خدمات المصاعد والسلالم المتحركة في جدة | المصاعد المبتكرة","pageDescription":"خدمات متكاملة تشمل صيانة المصاعد، التحديث، التركيب، قطع الغيار، وصيانة السلالم المتحركة بجدة وفق اشتراطات الدفاع المدني.","eyebrow":"خدماتنا المتخصصة","heading":"هندسة ترتقي بحركتك.. وحلول تُبقي مصعدك في القمة","intro":"منظومة متكاملة لتركيب وتحديث وصيانة المصاعد، مع خطط خدمة مرنة نُفصّلها بدقة لتلائم طبيعة مبناك واحتياجاتك الفعلية في المباني السكنية والتجارية بجدة.","cardLearnMore":"تفاصيل الخدمة ومراحل العمل","includedTitle":"ما تشمله الخدمة","processTitle":"مراحل وخطوات التنفيذ","equipmentTitle":"المعدات والأنظمة المشمولة","faqTitle":"الأسئلة الشائعة حول الخدمة","ctaTitle":"هل تحتاج إلى استشارة فنية أو عرض سعر لهذه الخدمة؟","ctaText":"تواصل معنا مباشرة لنرتب معاينة فنية دقيقة لموقعك وتزويدك بالحلول الهندسية المناسبة.","maintenance":{"title":"صيانة المصاعد","h1":"صيانة المصاعد في جدة: عقود دورية معتمدة واستجابة طارئة 24/7","shortDesc":"عقود صيانة دورية معتمدة لدى الدفاع المدني واستجابة طارئة سريعة تضمن استمرارية تشغيل مصعدك بأعلى معايير الأمان.","intro":"نوفر برامج صيانة دورية ووقائية متقدمة معتمدة رسمياً لدى الدفاع المدني لكافة أنواع وماركات المصاعد في جدة. ترتكز عقودنا على زيارات شهرية منتظمة وفحص استباقي شامل للمنظومات الميكانيكية والكهربائية، مدعومة بفرق طوارئ سريعة الاستجابة على مدار الساعة لضمان استمرارية التشغيل وانعدام الأعطال وسلامة وأمان الركاب.","included":["عقود صيانة دورية معتمدة رسمياً لدى الدفاع المدني","فرق طوارئ جاهزة للاستجابة السريعة للأعطال في جدة","فحص وقائي شهري شامل للمحركات والمنظومة الكهربائية","تقارير فنية إلكترونية مع تتبع دقيق لكفاءة التشغيل","فحص ومعايرة أقفال الأبواب والستائر الضوئية وحساسات الأمان","اختبار كوابح الطوارئ ومنظمات السرعة وأنظمة النزول التلقائي","تزييت وتشحيم مسارات السكك والبكرات والأجزاء المتحركة","فحص البطاريات الاحتياطية وأجهزة الإنقاذ الآلي عند انقطاع الكهرباء"],"process":[{"step":"01","title":"الفحص الهندسي الشامل","desc":"معاينة كاملة للكابينة، محرك المصعد، حبال الجر أو الأسطوانات، ولوحة التحكم الكهربائية."},{"step":"02","title":"إعداد التقرير التشغيلي","desc":"تحديد حالة القطع والمكونات التي تتطلب ضبطاً أو استبدالاً وقائياً قبل حدوث الأعطال."},{"step":"03","title":"تنفيذ الصيانة الدورية","desc":"تزييت الأجزاء المتحركة، ضبط حساسات الأبواب، واختبار أنظمة التوقف والكوابح ومولدات الطوارئ."},{"step":"04","title":"الدعم الطارئ المستمر","desc":"جاهزية طواقم الفنيين لمباشرة أي بلاغ طارئ وإعادة المصعد للخدمة فوراً."}],"equipment":[{"title":"مصاعد الركاب السكنية والبرجية","desc":"برامج صيانة وقائية شاملة لكافة مصاعد الأبراج والعمائر السكنية بجدة تضمن استمرارية التشغيل وانعدام الأعطال.","tag":"سكني وأبراج"},{"title":"المصاعد الهيدروليكية ومصاعد الفلل","desc":"معايرة دقيقة لوحدات الضخ والمكابس وصمامات الضغط لضمان انسيابية الحركة وأقصى درجات الهدوء بالفلل والمنازل.","tag":"فلل ومنازل"},{"title":"مصاعد الحمولات والبضائع","desc":"فحص دوري للمحركات عالية العزم والأرضيات المقاومة للصدمات بالمستودعات والمراكز التجارية والصناعية.","tag":"تجاري وصناعي"},{"title":"مصاعد المستشفيات والأسرة","desc":"ضبط دقيق لنظام التوقف المليمتري لضمان راحة المرضى وسلامة حركة الأسرة الطبية والأجهزة الحساسة.","tag":"مراكز طبية"},{"title":"مصاعد ذوي الاحتياجات الخاصة والبانوراما","desc":"عناية هندسية دورية برافعات منصات أصحاب الهمم والمصاعد الزجاجية البانورامية للمولات والقصور.","tag":"وصول وبانوراما"}],"faqs":[{"q":"كم مرة يتم إجراء الفحص الدوري للمصعد ضمن عقد الصيانة؟","a":"تتم الزيارات الدورية بشكل شهري منتظم لفحص واختبار كافة المكونات الميكانيكية والكهربائية وضبط التزييت والكوابح وحساسات الأمان."},{"q":"ما هو وقت الاستجابة المعتاد عند تسجيل بلاغ عطل طارئ؟","a":"نلتزم بوقت استجابة في نفس اليوم لجميع البلاغات داخل مدينة جدة، مع أولوية قصوى فورية لحالات الاحتجاز أو التوقف الحرج."},{"q":"هل عقود الصيانة لديكم معتمدة لدى الدفاع المدني؟","a":"نعم، شركة المصاعد المبتكرة معتمدة رسمياً في الدفاع المدني وتصدر شهادات وعقود الصيانة المتوافقة مع متطلبات التراخيص والسلامة."},{"q":"هل تقدمون عقود صيانة لمختلف ماركات المصاعد؟","a":"نعم، فنيونا مدربون ومجهزون لخدمة جميع ماركات وموديلات المصاعد المتوفرة في السوق السعودي سواء الإيطالية أو الألمانية أو اليابانية أو غيرها."}]},"modernization":{"title":"تحديث المصاعد","h1":"تحديث وتطوير المصاعد في جدة: ترقية شاملة للأداء والأمان والجماليات","shortDesc":"ترقية شاملة للمصاعد القديمة لرفع كفاءة الحركة وخفض استهلاك الطاقة بنسبة 40% بتكلفة اقتصادية ذكية.","intro":"حلول هندسية متكاملة لتجديد وتطوير المصاعد القديمة وترقيتها لأحدث التقنيات دون الحاجة لاستبدال الهيكل الإنشائي بالكامل. نرفع كفاءة المصعد ونخفض استهلاك الطاقة الكهربائية بنسبة تفوق 40%، مع ترقية لوحات التحكم الذكية وتجديد الكابينات بأحدث التصاميم العصرية وبتكلفة اقتصادية مدروسة.","included":["ترقية لوحات التحكم الذكية بنظام الميكروبروسيسور المتطور","خفض استهلاك الطاقة حتى 40% بمحولات التردد VVVF الحديثة","تجديد ديكورات الكابينة بلمسات عصرية وإضاءة موفرة LED","تحديث مشغلات الأبواب بحساسات أمان مانعة للاحتجاز","استبدال ماكينات السحب بمحركات أوروبية بدون تروس Gearless","ترقية أزرار الطوابق وشاشات العرض الرقمية التفاعلية","معايرة وتجديد الصمامات والمكابس الهيدروليكية","اختبارات أحمال متكاملة وإصدار شهادة تشغيل معتمدة"],"process":[{"step":"01","title":"تقييم الأنظمة الحالية","desc":"فحص حالة الهيكل الميكانيكي، الكهرباء، المحرك، وقياس كفاءة التشغيل الحالية."},{"step":"02","title":"تحديد نطاق التحديث","desc":"اقتراح حزمة التحديث الملائمة للميزانية والأداء المطلوب مع توفير جدول زمني محدد."},{"step":"03","title":"التوريد والتركيب المبرمج","desc":"تركيب المكونات الحديثة بأيدي مهندسين متخصصين مع تقليل فترة توقف المصعد لأدنى حد."},{"step":"04","title":"المعايرة واختبارات السلامة","desc":"اختبار الأحمال وسرعات التوقف وأنظمة الأمان وإصدار محضر التشغيل النهائي."}],"equipment":[{"title":"المصاعد القديمة التي تجاوز عمرها 10 إلى 15 عاماً","desc":"تجديد هندسي شامل للمنظومة الميكانيكية والكهربائية يرفع كفاءة المصعد ويعيده لحالة الجديد.","tag":"تجديد شامل"},{"title":"المصاعد الهيدروليكية ذات بطء الحركة أو استهلاك الزيت","desc":"ترقية الصمامات والمضخات ومكابس الرفع لتسريع زمن الرحلة وخفض استهلاك الطاقة والزيوت.","tag":"أنظمة هيدروليكية"},{"title":"مصاعد الأبراج التجارية ذات الحركة الكثيفة","desc":"تركيب لوحات تحكم ذكية بنظام الميكروبروسيسور تبرمج أوقات الذروة وتخفض فترات انتظار الركاب.","tag":"أبراج ومكاتب"},{"title":"المصاعد السكنية متكررة الأعطال والتوقف المفاجئ","desc":"استبدال التوصيلات واللوحات القديمة بأخرى حديثة تقضي نهائياً على الأعطال المزعجة للملاك.","tag":"مباني سكنية"}],"faqs":[{"q":"ما الفرق بين تحديث المصعد واستبداله بالكامل؟","a":"التحديث يركز على استبدال الأنظمة الكهربائية والمحركات وأجهزة التحكم مع الإبقاء على سكك التوجيه وهيكل البئر سليمين، مما يوفر حتى 50% من التكلفة ويختصر مدة التوقف بشكل كبير مقارنة بالاستبدال الكامل."},{"q":"كم تستغرق عملية تحديث المصعد عادة؟","a":"تعتمد المدة على نطاق الأعمال؛ تحديث لوحة التحكم وأجهزة الباب يستغرق غالباً بين 3 إلى 7 أيام عمل، بينما التحديث الشامل مع الديكورات قد يستغرق بين أسبوع إلى أسبوعين."},{"q":"هل يساهم تحديث المصعد في خفض فاتورة الكهرباء؟","a":"نعم، المحركات الحديثة ومحولات التردد VVVF تقلل استهلاك الطاقة الكهربائية بنسب تصل إلى 40% مقارنة بالمحركات واللوحات القديمة."}]},"installation":{"title":"تركيب المصاعد","h1":"توريد وتركيب المصاعد في جدة: تنفيذ هندسي موثوق وضمان شامل","shortDesc":"توريد وتركيب أحدث مصاعد الركاب والفلل بمحركات أوروبية فائقة الهدوء والأمان وفق الكود السعودي.","intro":"توريد وتركيب مصاعد الركاب والفلل والأبراج السكنية والتجارية في جدة وفق اشتراطات كود البناء السعودي ومعايير الدفاع المدني. نعتمد على محركات ومعدات أوروبية أصلية تضمن انسيابية فائقة وتشغيلاً هادئاً، مع حلول مخصصة للمساحات المحدودة والمصاعد البانورامية الزجاجية الفاخرة.","included":["توريد ماكينات ومعدات أوروبية وإيطالية أصلية بضمان شامل","حلول متطورة للمساحات المحدودة بدون غرفة محرك (MRL)","تنفيذ هندسي ليزري دقيق متوافق مع كود البناء والدفاع المدني","مصاعد بانورامية وزجاجية فاخرة بتصاميم معمارية خاصة","دراسة دقيقة للمخططات الهندسية ومطابقة مواصفات بئر المصعد","تثبيت سكك التوجيه والأبواب بمحاذاة ميكانيكية متطورة","برمجة أجهزة الطوارئ ونظام الهبوط التلقائي عند انقطاع التيار","تسليم معتمد مع اختبارات الأحمال والسرعة وفترة صيانة مجانية"],"process":[{"step":"01","title":"المعاينة الهندسية للموقع","desc":"فحص أبعاد البئر، العمق السفلي (الحفرة)، والارتفاع العلوي لمطابقة المخططات."},{"step":"02","title":"التوريد والمطابقة","desc":"توريد المكونات المطابقة للمواصفات المتفق عليها وتجهيز جدول أعمال التركيب."},{"step":"03","title":"التركيب الميكانيكي والكهربائي","desc":"تثبيت السكك، تجميع الكابينة، تركيب الماكينة، والربط الكهربائي للأجهزة الحركية."},{"step":"04","title":"الفحص النهائي والتسليم","desc":"تشغيل تجريبي، فحص أجهزة الأمان، وتسليم العميل كتيب التشغيل وضمان الصيانة."}],"equipment":[{"title":"مصاعد الركاب بدون غرفة محرك (MRL)","desc":"حلول معمارية ذكية توفر المساحة وتلغي الحاجة لغرفة علوية بأعلى مستويات الهدوء وكفاءة الطاقة.","tag":"توفير المساحة"},{"title":"مصاعد الركاب بغرفة محرك علوية","desc":"الخيار الهندسي التقليدي المعتمد للأبراج والمباني العالية ذات سرعات السحب العالية والأداء الشاق.","tag":"أبراج عالية"},{"title":"مصاعد الفلل الهيدروليكية المدمجة","desc":"تركيب مرن يتطلب حفرة دنيا وارتفاع علوي منخفض مع إمكانية التركيب داخل هياكل زجاجية داخلية وخارجية.","tag":"فلل وقصور"},{"title":"مصاعد البانوراما الزجاجية الفاخرة","desc":"إطلالات معمارية مذهلة للمولات والفنادق والقصور بواجهات زجاجية دائرية أو مضلعة فائقة الأناقة.","tag":"تصاميم فاخرة"},{"title":"مصاعد الخدمة والبضائع الثقيلة","desc":"تصميم متين ومقاوم للصدمات للمطاعم والمستودعات والمطارات بقدرات حمولة من 500 كجم حتى 5 أطنان.","tag":"أحمال ثقيلة"}],"faqs":[{"q":"هل يمكن تركيب مصعد في فيلا قائمة لا تحتوي على بئر خرساني جاهز؟","a":"نعم، نوفر حلول مصاعد هيدروليكية ومصاعد بدون غرفة محرك يمكن تركيبها داخل هياكل معدنية وزجاجية خارجية أو داخلية مع متطلبات حفرة وارتفاعات علوية دنيا."},{"q":"ما هي معايير السلامة المتبعة أثناء عملية التركيب؟","a":"نطبق اشتراطات كود البناء السعودي ومتطلبات السلامة المعتمدة لدى الدفاع المدني بما يشمل كوابح الأمان الباراشوت، أجهزة منع سقوط الكابينة، ومنظم السرعة."},{"q":"ما مدة الضمان المقدمة على أعمال التركيب والمعدات؟","a":"نقدم ضماناً شاملاً على المعدات الميكانيكية والكهربائية مع فترة صيانة مجانية مرفقة بعقد التركيب لضمان راحة بال العميل."}]},"spareParts":{"title":"قطع غيار المصاعد","h1":"قطع غيار المصاعد الأصلية في جدة: توريد سريع ومطابقة معتمدة 100%","shortDesc":"تأمين فوري لقطع الغيار الأصلية والمكونات الهندسية المعتمدة لكافة موديلات المصاعد في جدة.","intro":"نؤمن كافة قطع الغيار الأصلية والمكونات الميكانيكية والهيدروليكية والكهربائية لمختلف ماركات وموديلات المصاعد في جدة عبر شبكة موردين معتمدين. نضمن سرعة التوريد والتركيب والمعايرة الفنية الدقيقة لتقليل فترات التوقف العرضية وضمان أعلى مستويات الأمان والاعتمادية.","included":["قطع غيار أصلية 100% لكافة الماركات والموديلات المعتمدة","توفير فوري من مستودعاتنا في جدة لتقليل فترات التوقف","وحدات طاقة ومضخات هيدروليكية ومحركات سحب أصلية","ضمان جودة معتمد ضد عيوب التصنيع وسوء التركيب","لوحات تحكم وكروت إلكترونية وحواسب توقف دقيق","مشغلات أبواب وأحزمة وأقفال ميكانيكية وحساسات ليزرية","حبال جر فولاذية وبكرات توجيه وزيوت هيدروليك معتمدة","أجهزة سلامة وكوابح باراشوت وستائر حماية إلكترونية"],"process":[{"step":"01","title":"فحص وتحديد القطعة المطلوبة","desc":"معاينة فنية مباشرة لقراءة الأرقام التسلسلية والمواصفات الفنية للقطعة التالفة."},{"step":"02","title":"المطابقة والتأمين السريع","desc":"التحقق من توافر القطعة الأصلية في مستودعاتنا أو طلبها عبر شبكة الموردين المعتمدين."},{"step":"03","title":"التركيب والمعايرة الفنية","desc":"تركيب القطعة بأيدي فنيين متخصصين وضبط عيارات التشغيل وفق المعايير القياسية."},{"step":"04","title":"اختبار الأداء والضمان","desc":"تشغيل تجريبي للتأكد من زوال العطل وتقديم ضمان الجودة على القطعة المستبدلة."}],"equipment":[{"title":"قطع غيار المصاعد الهيدروليكية","desc":"مضخات ضغط الزيت الأصلية، الأسطوانات والمكابس، صمامات الأمان الهيدروليكية، وأطقم العزل المانعة للتسريب.","tag":"هيدروليك"},{"title":"قطع غيار مصاعد الجر والسرعات العالية","desc":"حبال جر فولاذية معتمدة، بكرات توجيه، محركات سحب أوروبية Gearless، وكوابح فرملة طارئة.","tag":"محركات وجر"},{"title":"مكونات الأبواب الأوتوماتيكية والنص أوتوماتيكية","desc":"مشغلات أبواب متطورة، أحزمة مسننة، كروت تحكم ذكية، ستائر حماية ليزرية، وأقفال ميكانيكية معتمدة.","tag":"أنظمة الأبواب"},{"title":"أجهزة السلامة والحساسات الرقمية","desc":"منظمات سرعة (Governor)، أجهزة هبوط تلقائي للطوارئ (ARD)، حساسات توقف ليزري، ومفاتيح نهاية الشوط.","tag":"أنظمة الأمان"}],"faqs":[{"q":"هل توفرون قطع غيار أصلية للموديلات القديمة أو النادرة؟","a":"نعم، بفضل شبكة موردينا المعتمدة نتمكن من توفير القطع الأصلية أو البدائل الهندسية المعتمدة التي تتوافق مع نظام تشغيل المصعد بشكل كامل."},{"q":"هل تقتصر خدمة قطع الغيار على عملاء عقود الصيانة فقط؟","a":"نقدم خدمات فحص واستبدال قطع الغيار لجميع ملاك ومديري المباني في جدة سواء بعقد صيانة سنوي أو بناء على طلب إصلاح فردي."},{"q":"هل تشمل قطع الغيار ضماناً بعد التركيب؟","a":"نعم، تخضع جميع قطع الغيار المستبدلة لضمان الجودة ضد عيوب التصنيع وسوء التركيب لضمان استقرار أداء المصعد."}]},"escalators":{"title":"السلالم والممرات المتحركة","h1":"صيانة السلالم والممرات المتحركة في جدة: كفاءة وانسيابية وأمان دائم","shortDesc":"صيانة هندسية دقيقة وفحص وقائي منتظم للسلالم والممرات المتحركة لضمان أمان وانسيابية الحركة.","intro":"خدمات متخصصة لفحص واختبار وصيانة السلالم والممرات المتحركة في المراكز التجارية والمباني الإدارية ومصاعد أصحاب الهمم بجدة. نضمن انسيابية الحركة العالية وأمان المرتادين من خلال معايرة مستمرة لدرابزين اليد، فحص أمشاط الأمان، والتزييت المبرمج لسلاسل الجر وفق اشتراطات السلامة القياسية.","included":["فحص وصيانة دورية دقيقة للدرجات والأمشاط وسلاسل الجر","معايرة واختبار درابزين اليد المتحرك وأجهزة التوقف الطارئ","تشحيم وتزييت مبرمج يمنع الضوضاء والاهتزاز ويطيل عمر السلم","فحص شامل معتمد يضمن سلامة العائلات والأطفال بالمنشآت","صيانة علبة التروس (Gearbox) ومحركات السحب والكوابح الديناميكية","اختبار حساسات الأمان المانعة لاصطدام الأمشاط وكسر السلاسل","اختبارات حركة متواصلة تحت الحمل لضمان ثبات السرعة","صيانة مخصصة لرافعات ومصاعد منصات أصحاب الهمم"],"process":[{"step":"01","title":"الفحص البصري والميكانيكي","desc":"معاينة الدرجات، محاذاة الأمشاط، وضغط درابزين اليد للتأكد من انسيابية الحركة."},{"step":"02","title":"اختبار مفاتيح الأمان والحساسات","desc":"التحقق من عمل حساسات اصطدام الأمشاط وحساسات كسر السلسلة ومفاتيح الطوارئ."},{"step":"03","title":"التزييت والضبط الحركي","desc":"تزويد السلاسل بالزيوت المخصصة وضبط الشد الميكانيكي لمنع الاهتزاز أو الضوضاء."},{"step":"04","title":"الاختبار الديناميكي تحت الحمل","desc":"تشغيل تجريبي متواصل للتأكد من ثبات السرعة واستقرار الفرملة عند التوقف."}],"equipment":[{"title":"السلالم المتحركة الداخلية بالمراكز التجارية","desc":"فحص دوري وضبط مستمر للدرجات والدرابزين وأجهزة التوقف في المولات والمتاجر الكبرى في جدة.","tag":"مولات ومتاجر"},{"title":"السلالم شديدة التحمل لمراكز النقل والمباني الخدمية","desc":"صيانة هندسية قوية مصممة لتحمل كثافة الاستخدام القصوى لساعات عمل متواصلة 24/7.","tag":"استخدام مكثف"},{"title":"الممرات المتحركة الأفقية والمائلة","desc":"صيانة مسارات الحركة والسيور في المطارات والهايبرماركت لراحة المتسوقين والمسافرين وحقائبهم.","tag":"مطارات وأسواق"},{"title":"رافعات ومصاعد منصات أصحاب الهمم","desc":"حلول معتمدة للوصول الشامل تضمن استقلالية وأمان تام لمستخدمي الكراسي المتحركة وفق كود البناء.","tag":"وصول شامل"}],"faqs":[{"q":"ما هي أهمية الصيانة الدورية للسلالم المتحركة؟","a":"السلالم المتحركة تعمل لساعات طويلة دون توقف وتتطلب صيانة دورية للحفاظ على كفاءة أجهزة الأمان وتفادي انحشار الأحذية أو الملابس وضمان سلامة العائلات والأطفال."},{"q":"ما هي إجراءات الطوارئ عند صدور صوت غير طبيعي من السلم المتحرك؟","a":"يجب إيقاف السلم فوراً عبر الضغط على زر التوقف الطارئ الموجود في بداية أو نهاية السلم، والتواصل معنا لمباشرة الفحص الفني قبل إعادة التشغيل."},{"q":"هل توفرون الصيانة لجميع موديلات السلالم والممرات المتحركة؟","a":"نعم، نقدم خدمات الفحص والدعم الفني لكافة العلامات التجارية المعتمدة في المملكة مع توفير قطع الغيار المتوافقة."}]}}');
const contact$1 = { "pageTitle": "تواصل معنا | شركة المصاعد المبتكرة في جدة", "pageDescription": "تواصل مع شركة المصاعد المبتكرة بجدة لطلب عروض الأسعار، صيانة المصاعد، أو الاستجابة للأعطال الطارئة. الرقم الموحد 920016876.", "eyebrow": "استجابة سريعة ودعم هندسي متواصل", "heading": "أمان مبناك يبدأ من هنا.. تواصل مع خبرائنا الهندسيين في جدة", "subtitle": "سواء كنت بحاجة إلى استجابة فورية، أو طلب عرض سعر لصيانة وتحديث مصعدك، أو استشارة فنية لموقعك؛ طواقمنا الهندسية جاهزة لخدمتك على مدار الساعة.", "formTitle": "أرسل طلبك أو استفسارك", "formSubtitle": "يرجى تعبئة النموذج وسيقوم مسؤول خدمة العملاء بالتواصل معك في أقرب وقت.", "nameLabel": "الاسم الكامل", "namePlaceholder": "أدخل اسمك الكريم", "phoneLabel": "رقم الجوال", "phonePlaceholder": "05X XXX XXXX", "emailLabel": "البريد الإلكتروني", "emailPlaceholder": "name@example.com", "serviceLabel": "نوع الخدمة المطلوبة", "serviceSelectPlaceholder": "اختر الخدمة المطلوبة", "messageLabel": "تفاصيل الرسالة أو الطلب", "messagePlaceholder": "اذكر تفاصيل المصعد، نوع المبنى، وطبيعة الخدمة أو العطل...", "submitButton": "إرسال الطلب الآن", "submitting": "جاري الإرسال...", "successHeading": "تم استلام رسالتك بنجاح", "successMessage": "شكراً لتواصلك مع المصاعد المبتكرة. سيقوم فريقنا الهندسي بالتواصل معك عبر الهاتف قريباً.", "sendAnother": "إرسال طلب آخر", "infoTitle": "بيانات الاتصال الرسمية", "unifiedNumberTitle": "الرقم الموحد", "mobileWhatsAppTitle": "الجوال والواتساب", "phoneTitle": "الهاتف الثابت", "emailTitle": "البريد الإلكتروني", "crTitle": "السجل التجاري", "accreditationTitle": "الاعتماد الحكومي", "locationTitle": "المدينة ونطاق التغطية", "locationValue": "جدة، المملكة العربية السعودية", "validation": { "nameRequired": "يرجى إدخال الاسم", "nameTooShort": "يجب أن يتكون الاسم من حرفين على الأقل", "phoneRequired": "يرجى إدخال رقم الجوال", "phoneInvalid": "يرجى إدخال رقم جوال صحيح", "emailInvalid": "يرجى إدخال بريد إلكتروني صحيح", "messageRequired": "يرجى كتابة نص الرسالة", "messageTooShort": "يجب أن تحتوي الرسالة على 5 أحرف على الأقل" } };
const privacy$1 = { "pageTitle": "سياسة الخصوصية | شركة المصاعد المبتكرة", "pageDescription": "سياسة الخصوصية وحماية البيانات الشخصية لشركة المصاعد المبتكرة بجدة وفقاً لنظام حماية البيانات الشخصية السعودي (PDPL).", "eyebrow": "الشفافية وحماية البيانات", "heading": "سياسة الخصوصية وحماية البيانات", "lastUpdated": "آخر تحديث: 2026", "reviewNotice": "ملاحظة: هذه الوثيقة تمثل مسودة السياسة المعتمدة لموقع شركة المصاعد المبتكرة وتخضع للمراجعة والاعتماد النهائي من إدارة الشركة وفق الأنظمة المعمول بها في المملكة العربية السعودية.", "sections": [{ "title": "1. المقدمة والالتزام", "content": "تلتزم شركة المصاعد المبتكرة بحماية خصوصية بيانات زوار الموقع وعملائها في المملكة العربية السعودية، والتعامل مع أي معلومات يتم جمعها بمسؤولية وشفافية كاملة وفقاً للأنظمة واللوائح المعتمدة بما في ذلك نظام حماية البيانات الشخصية السعودي (PDPL)." }, { "title": "2. البيانات التي يتم جمعها", "content": "نقوم بجمع البيانات الشخصية التي يزودنا بها المستخدم طواعية عند تعبئة نموذج التواصل أو طلب عرض سعر عبر الموقع، وتشمل: الاسم الكامل، رقم الجوال، البريد الإلكتروني (إن وجد)، ونوع الخدمة المطلوبة وتفاصيل الاستفسار." }, { "title": "3. الغرض من جمع البيانات", "content": "تُستخدم البيانات التي يتم جمعها للأغراض التشغيلية المباشرة فقط، وتحديداً: التواصل مع العميل للرد على استفساراته، تقديم عروض الأسعار والدراسات الفنية المطلوبة، وترتيب زيارات المعاينة الهندسية لخدمات الصيانة والتركيب والتحديث." }, { "title": "4. حماية البيانات والاحتفاظ بها", "content": "نطبق تدابير وإجراءات أمنية صارمة على قواعد بياناتنا لمنع الوصول غير المصرح به أو التعديل أو الإفصاح عن البيانات الشخصية. ولا يتم الاحتفاظ بالبيانات إلا للمدة اللازمة لتحقيق الأغراض التشغيلية الموضحة أو بما تقتضيه الالتزامات النظامية." }, { "title": "5. مشاركة البيانات مع أطراف ثالثة", "content": "لا نقوم ببيع أو تأجير أو مشاركة البيانات الشخصية للعملاء مع أي أطراف ثالثة لأغراض تجارية أو تسويقية على الإطلاق. ولا يتم الإفصاح عن البيانات إلا للجهات الرسمية إذا كان ذلك مطلوباً بموجب الأنظمة والقوانين المعمول بها في المملكة." }, { "title": "6. ملفات تعريف الارتباط وتحليلات التصفح", "content": "قد يستخدم الموقع ملفات تعريف ارتباط (Cookies) وتقنيات إحصائية قياسية لقياس أداء التصفح وتحسين تجربة المستخدم الإجمالية دون ربط هذه الإحصاءات بالهوية الشخصية للمستخدم." }, { "title": "7. حقوق أصحاب البيانات والتواصل", "content": "يحق لأي مستخدم التواصل معنا للاستفسار عن بياناته الشخصية المسجلة لدينا أو طلب تصحيحها أو حذفها عبر مراسلتنا مباشرة على البريد الإلكتروني الرسمي: info@almubtakirah.com." }] };
const notFound$1 = { "pageTitle": "الصفحة غير موجودة | شركة المصاعد المبتكرة", "pageDescription": "عذراً، الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.", "code": "404", "heading": "الصفحة غير موجودة", "description": "عذراً، الرابط الذي اتبعته غير صحيح أو ربما تم تغيير مسار الصفحة.", "backHome": "العودة إلى الصفحة الرئيسية" };
const styleguide$1 = { "title": "دليل الهوية ومكتبة المكونات", "subtitle": "نظام التصميم الخاص بموقع شركة المصاعد المبتكرة", "colorTokens": "لوحة الألوان", "typography": "الطباعة والخطوط", "buttons": "الأزرار التفاعلية", "formControls": "عناصر الإدخال والنماذج", "feedbackComponents": "الشارات والتنبيهات", "disclosureComponents": "الأكورديون وعلامات التبويب", "layoutComponents": "الأقسام والحاويات", "brandAssets": "الأشكال البصرية وشعار الشركة" };
const works$1 = { "pageTitle": "أعمالنا ومشاريعنا | شركة المصاعد المبتكرة في جدة", "pageDescription": "استعرض سابقة أعمال ومشاريع شركة المصاعد المبتكرة في تركيب وتحديث وصيانة المصاعد والسلالم الكهربائية في جدة.", "eyebrow": "سابقة أعمالنا وإنجازاتنا", "heading": "بصمتنا في كل طابق.. مشاريعٌ ترتقي بمستقبل الحركة في جدة", "intro": "من الأبراج التجارية الشاهقة إلى المجمعات السكنية الراقية؛ نفخر بتنفيذ وتحديث وصيانة منظومات حركة متطورة تخدم آلاف المستخدمين يومياً بأعلى درجات الأمان والاعتمادية.", "filters": { "all": "جميع المشاريع", "maintenance": "صيانة المصاعد", "modernization": "تحديث المصاعد", "installation": "توريد وتركيب", "spareParts": "قطع الغيار", "escalators": "السلالم والممرات" }, "filterLabel": "تصفية المشاريع حسب الخدمة", "cardViewDetails": "تفاصيل المشروع", "emptyHeading": "مشاريعنا قيد التوثيق والتحديث", "emptyMessage": "يجري حالياً توثيق سابقة أعمالنا في جدة وإضافتها إلى معرض المشاريع الرقمي. يسعدنا تواصلكم المباشر لتزويدكم بنماذج وسابقة أعمالنا في منطقتكم.", "emptyCta": "تواصل معنا للاستفسار", "details": { "serviceType": "نوع الخدمة", "completedYear": "سنة الإنجاز", "location": "الموقع", "galleryHeading": "معرض صور المشروع", "descriptionHeading": "عن المشروع والحل الهندسي", "relatedHeading": "مشاريع أخرى ذات صلة", "backToWorks": "العودة إلى كافة المشاريع" } };
const blog$1 = { "pageTitle": "المدونة الهندسية والمعلومات التقنية | شركة المصاعد المبتكرة", "pageDescription": "مقالات وإرشادات فنية متخصصة حول صيانة وتركيب وتحديث المصاعد والسلالم الكهربائية واشتراطات الدفاع المدني في جدة.", "eyebrow": "نافذة المعرفة والأمان", "heading": "معرفةٌ تصعد بك.. ودليلك الهندسي لأعلى درجات الأمان", "intro": "إرشادات عملية ومعلومات تقنية نشاركك فيها أسرار الصيانة الوقائية، واشتراطات الدفاع المدني، وأحدث حلول وتكنولوجيا المصاعد في جدة.", "allCategories": "جميع التصنيفات", "filterLabel": "تصفية المقالات حسب التصنيف", "readTime": "{{count}} دقائق قراءة", "publishedAt": "تاريخ النشر:", "updatedAt": "آخر تحديث:", "byAuthor": "بقلم:", "tableOfContents": "محتويات المقال", "shareArticle": "مشاركة المقال", "copyLink": "نسخ الرابط", "linkCopied": "تم نسخ الرابط بنجاح", "tags": "الوسوم:", "relatedPosts": "مقالات ذات صلة", "prevPost": "المقال السابق", "nextPost": "المقال التالي", "faqTitle": "الأسئلة الشائعة حول هذا المقال", "emptyHeading": "المقالات قيد الإعداد والنشر", "emptyMessage": "يعمل فريقنا الهندسي حالياً على إعداد ونشر محتوى تقني متخصص لإثراء المحتوى الفني. تابعونا قريباً للمزيد.", "backToBlog": "العودة إلى كافة المقالات", "translationTwinNotice": "This article is also available in English", "readInOtherLang": "Read in English", "ctaTitle": "هل تبحث عن استشارة هندسية أو عقد صيانة لمصعدك؟", "ctaText": "فريقنا الهندسي المعتمد في الدفاع المدني بجدة جاهز للمعاينة الفنية وتقديم أفضل الحلول المناسبة لمبناك.", "ctaButton": "اطلب استشارة مجانية الآن" };
const ar = {
  brand: brand$1,
  nav: nav$1,
  actions: actions$1,
  footer: footer$1,
  common: common$1,
  home: home$1,
  about: about$1,
  services: services$1,
  contact: contact$1,
  privacy: privacy$1,
  notFound: notFound$1,
  styleguide: styleguide$1,
  works: works$1,
  blog: blog$1
};
const brand = { "name": "Al-Masaed Al-Mubtakirah Co.", "slogan": "Innovation that elevates you", "tagline": "Maintenance · Modernization · Installation · Spare Parts", "cr": "Commercial Registration No. 4030227058", "accreditation": "Civil Defense Accredited", "city": "Jeddah" };
const nav = { "home": "Home", "about": "About Us", "services": "Services", "works": "Works", "blog": "Blog", "contact": "Contact", "servicesMenu": { "maintenance": "Elevator Maintenance", "modernization": "Elevator Modernization", "installation": "Elevator Installation", "spareParts": "Spare Parts", "escalators": "Escalators & Moving Walkways" } };
const actions = { "requestQuote": "Request a Quote", "callNow": "Call Now", "bookConsultation": "Book Consultation", "readMore": "Read More", "contactUs": "Contact Us", "viewWorks": "View Works", "sendMessage": "Send Message", "close": "Close", "openMenu": "Open Menu", "switchLanguage": "العربية", "skipToContent": "Skip to main content", "backHome": "Back to Home", "viewAllServices": "View All Services", "scrollToTop": "Back to top" };
const footer = { "aboutTitle": "About the Company", "aboutText": "Your premier engineering partner in Jeddah.. We deliver innovative, end-to-end solutions for elevator supply, installation, modernization, and maintenance, certified by Civil Defense to guarantee peak safety and reliability.", "quickLinks": "Quick Links", "servicesTitle": "Our Services", "contactTitle": "Contact Information", "rights": "All rights reserved", "unifiedPhoneLabel": "Unified Number", "mobilePhoneLabel": "Mobile & WhatsApp", "emailLabel": "Email", "crLabel": "Commercial Registry", "followUs": "Follow Us", "nationalAddress": "National Address", "nationalAddressVerified": "Verified National Address", "viewNationalAddressPdf": "View National Address Certificate (PDF)", "crModalTitle": "Commercial Registration Details", "crModalDesc": "Al-Masaed Al-Mubtakirah is an officially accredited Saudi company registered with the Ministry of Commerce and Civil Defense.", "crNumberVal": "Commercial Registry No.: 4030227058", "crCivilDefense": "Accredited by Civil Defense for Elevator Safety", "crCity": "Headquarters: Jeddah, Kingdom of Saudi Arabia", "shortAddressLabel": "Short Address", "viewAddressProof": "View National Address Proof Certificate", "addressProofAlt": "National Address Proof Certificate - Al-Masaed Al-Mubtakirah", "copyShortAddress": "Copy Short Address", "copied": "Copied", "viewProof": "View Proof", "splBadge": "SPL Saudi Post", "streetAddress": "Nahdah East St., As Salamah Dist., Bldg 2523", "cityCountry": "Jeddah, Kingdom of Saudi Arabia", "social": { "whatsapp": "WhatsApp", "tiktok": "TikTok", "instagram": "Instagram", "snapchat": "Snapchat", "x": "X (Twitter)", "linkedin": "LinkedIn" } };
const common = { "loading": "Loading...", "error": "An unexpected error occurred", "success": "Operation completed successfully", "emptyState": "No items to display at this time", "previous": "Previous", "next": "Next", "page": "Page", "of": "of", "required": "Required", "optional": "Optional", "cityJeddah": "Jeddah, Saudi Arabia", "breadcrumbHome": "Home", "breadcrumbServices": "Services" };
const home = { "heroTitle": "Innovation That Elevates You.. Engineering That Rises With Your Safety", "heroSubtitle": "Comprehensive engineering solutions for elevator installation, modernization, and maintenance in Jeddah with the highest safety standards.", "heroBadges": "Maintenance · Modernization · Installation · Spare Parts", "aboutEyebrow": "About Al-Masaed Al-Mubtakirah", "aboutHeading": "Building Trust Floor by Floor.. Engineering That Elevates Your Space", "aboutText": "A Saudi company established in Jeddah operating in the field of supplying, installing, maintaining, developing, and modernizing elevators of all sizes and shapes, accredited by the Civil Defense to maintain the highest standards of operational safety.", "aboutLink": "Learn more about our journey and vision", "servicesEyebrow": "Specialized Services", "servicesHeading": "Engineering That Elevates Your Movement.. Solutions That Keep You at the Top", "servicesSubtitle": "An integrated suite of elevator installation, modernization, and maintenance services, with flexible plans tailored precisely to your building's needs.", "whyUsEyebrow": "Engineering Excellence", "whyUsHeading": "Standards That Elevate You.. Trust Without Compromise", "whyUsIntro": "Because passenger safety and building continuity allow no compromise; we deliver certified safety standards and rapid response in Jeddah.", "whyUsPoints": [{ "title": "High-quality repair services", "description": "Carrying out technical inspections and repairs with precision to ensure continuous operation." }, { "title": "Strong safety record and client satisfaction", "description": "Strict compliance with Civil Defense requirements and engineering passenger safety standards." }, { "title": "Wide supplier network for rapid turnaround", "description": "Sourcing original spare parts and mechanical components without unnecessary delays." }, { "title": "Emergency response teams for critical situations", "description": "Continuous readiness to manage sudden stoppages and critical breakdowns." }, { "title": "Prompt solutions for optimal equipment performance", "description": "Immediate fault diagnosis and restoration of operational efficiency with minimal downtime." }, { "title": "Trained and experienced technicians available", "description": "Specialized technical crews with extensive field experience across diverse models." }, { "title": "Same-day response time", "description": "Prompt dispatch and technical follow-up for notifications within Jeddah." }], "whyUsBadges": { "safety": "Civil Defense Accredited", "safetyExtra1": "Saudi Building Code", "safetyExtra2": "Periodic Safety Audits", "emergency": "24/7 Emergency Dispatch", "emergencyCall": "Direct Emergency Line", "speed": "Fast Turnaround", "speedExtra": "Full Jeddah Coverage", "precision": "Engineering Precision", "precisionExtra": "Advanced Digital Diagnostics", "expertise": "Certified Crews", "expertiseExtra": "Multi-brand Field Experience", "performance": "Operational Efficiency", "performanceExtra": "Smooth & Silent Motion", "suppliers": "Original Spare Parts", "suppliersExtra": "Trusted Global Supply Chains" }, "maintenanceEyebrow": "Predictive Maintenance Engineering", "maintenanceHeading": "Innovation That Safeguards Your Flow.. Engineering That Anticipates Every Need", "maintenanceSubtitle": "From precision sensors to heavy-duty drive units; we oversee every mechanical and electrical detail with rigorous certified protocols to ensure continuous uptime and safety in Jeddah.", "modernizationBoxTitle": "Transform Your Legacy Elevator into an Advanced Smart System", "modernizationBoxText": "We grant your elevator a new lifecycle with state-of-the-art energy-efficient controllers and bespoke cabin upgrades that elevate property value and ride comfort.", "modernizationBoxCta": "Explore Modernization Solutions", "worksEyebrow": "Proven Track Record", "worksHeading": "Our Mark on Every Floor.. Projects Elevating the Future of Movement in Jeddah", "worksSubtitle": "From prestigious commercial towers to modern residential complexes; we take pride in delivering, modernizing, and maintaining state-of-the-art mobility systems that safely move thousands daily.", "partnersEyebrow": "Alliances of Trust", "partnersHeading": "Trust That Elevates with Us.. Partnerships That Drive Leadership", "partnersSubtitle": "We take pride in our enduring partnerships with premier developers and commercial leaders across Jeddah, who rely on us for uncompromised safety and efficiency.", "blogEyebrow": "Engineering Insights", "blogHeading": "Knowledge That Elevates.. Your Guide to Peak Safety & Performance", "blogSubtitle": "Practical guidelines and technical insights on preventive maintenance, civil defense codes, and modern elevator technology in Jeddah.", "blogViewAll": "View all articles", "ctaBandHeading": "Let Us Elevate Your Building.. Enduring Safety & Distinction on Every Floor", "ctaBandSubtitle": "Whether you need certified periodic maintenance, comprehensive modernization, or technical consultation for your project in Jeddah; our engineering team is ready to inspect your site." };
const about = { "pageTitle": "About Us | Al-Masaed Al-Mubtakirah in Jeddah", "pageDescription": "Learn about Al-Masaed Al-Mubtakirah in Jeddah, our vision in providing elevator maintenance, modernization and installation, and our commitment to user safety.", "eyebrow": "About Innovative Elevators", "heading": "Building Trust Floor by Floor.. Engineering That Elevates Your Premises", "lead": "A Saudi company established in Jeddah under Commercial Registration No. 4030227058, operating in supplying, installing, maintaining, developing, and modernizing elevators of all sizes and types.", "visionEyebrow": "Future Ambition & Vision", "visionHeading": "Sustainability & Efficiency Aligned with Saudi Vision 2030", "visionText": "Pioneering smart, energy-efficient vertical mobility solutions that enhance building performance, providing continuous engineering support and maintenance across all elevator and escalator models in Jeddah.", "approachEyebrow": "Precision Engineering Approach", "approachHeading": "Tailored Engineering Solutions for Every Architectural Need", "approachText": "Employing proactive diagnostics to prevent downtime before it occurs, backed by customized maintenance schedules that guarantee uninterrupted, whisper-quiet operation around the clock.", "missionEyebrow": "Uncompromised Safety Protocol", "missionHeading": "Passenger Safety Above All.. Zero-Compromise Standards", "missionText": "Fully compliant with Saudi Building Code standards and Civil Defense requirements, conducting rigorous multi-point mechanical inspections so every single ride is safe, reliable, and smooth.", "logoMeaningTitle": "Brand Identity & Philosophy.. Precision Engineering That Inspires Trust", "logoMeaningIntro": "Our visual identity is far more than aesthetic curves — it is a living expression of our strict safety standards, rigorous mechanical precision, and relentless ascent toward engineering excellence:", "logoElements": [{ "title": "Rising Dynamic Lines", "description": "Symbolizing upward momentum and seamless vertical mobility, reflecting our continuous dedication to elevating passenger experience floor after floor." }, { "title": "Cohesive Geometric Structure", "description": "Representing uncompromised mechanical safety, structural rigidity, and exacting engineering standards that ensure absolute reliability in every installation." }, { "title": "Harmonious Color Gradients", "description": "Reflecting corporate integrity, deep technological expertise, and an innovative forward-looking vision aligned with Saudi Vision 2030." }], "factsTitle": "Verified Credentials & Official Facts.. Engineering You Can Rely On", "facts": [{ "label": "Commercial Registration", "value": "4030227058 (Fully Verified & Active)" }, { "label": "Official Accreditation", "value": "Accredited by General Directorate of Civil Defense" }, { "label": "Headquarters Location", "value": "Jeddah, Kingdom of Saudi Arabia" }, { "label": "Engineering Service Scope", "value": "Full supply, installation, maintenance & modernization" }, { "label": "Supported Brands & Models", "value": "All international manufacturers & contemporary models" }, { "label": "Coverage & Field Reach", "value": "Comprehensive rapid coverage across all Jeddah districts" }] };
const services = /* @__PURE__ */ JSON.parse('{"pageTitle":"Elevator & Escalator Services in Jeddah | Al-Masaed Al-Mubtakirah","pageDescription":"Comprehensive services including elevator maintenance, modernization, installation, spare parts, and escalator maintenance in Jeddah.","eyebrow":"Specialized Services","heading":"Engineering That Elevates Your Motion.. Solutions Keeping Your Elevator at Its Peak","intro":"Comprehensive systems for elevator installation, modernization, and maintenance, with flexible service plans tailored to the exact demands of your residential or commercial property in Jeddah.","cardLearnMore":"Service Details & Process","includedTitle":"What Is Included","processTitle":"Execution Steps & Process","equipmentTitle":"Equipment & Systems Covered","faqTitle":"Frequently Asked Questions","ctaTitle":"Need a Technical Consultation or Service Quote?","ctaText":"Contact us directly to arrange a site inspection and receive the suitable engineering plan for your facility.","maintenance":{"title":"Elevator Maintenance","h1":"Elevator Maintenance in Jeddah: Certified Contracts & 24/7 Rapid Response","shortDesc":"Civil Defense-accredited periodic maintenance contracts and rapid emergency dispatch ensuring continuous uptime and absolute passenger safety.","intro":"We provide advanced scheduled and preventive elevator maintenance officially certified by Saudi Civil Defense across all brands and models in Jeddah. Our contracts are built around regular monthly inspections, proactive mechanical and electrical diagnostics, and 24/7 emergency response crews to guarantee continuous uptime, zero unexpected shutdowns, and passenger peace of mind.","included":["Certified periodic maintenance contracts accredited by Civil Defense","24/7 rapid emergency response teams across all Jeddah districts","Comprehensive monthly mechanical, hydraulic, and electrical inspections","Automated digital service reports and proactive equipment health tracking","Door interlocks, safety light curtains, and landing sensor testing","Emergency brake calibration and overspeed governor compliance audits","Guide rail lubrication and mechanical component alignment check","Battery backup and automatic emergency rescue device verification"],"process":[{"step":"01","title":"Comprehensive Engineering Inspection","desc":"Detailed check of the cabin, traction machine, hoist cables or cylinders, and electrical control panels."},{"step":"02","title":"Operational Assessment Report","desc":"Identifying component conditions requiring adjustment or proactive replacement prior to faults."},{"step":"03","title":"Routine Maintenance Execution","desc":"Lubricating moving assemblies, adjusting door sensors, and testing emergency brakes and power backups."},{"step":"04","title":"Continuous Emergency Support","desc":"Ready dispatch crews to attend to sudden stoppages and return the unit to active service promptly."}],"equipment":[{"title":"Residential and High-Rise Elevators","desc":"Comprehensive scheduled maintenance programs for tower and residential building elevators in Jeddah, ensuring continuous uptime.","tag":"Residential & Towers"},{"title":"Hydraulic Elevators & Villa Lifts","desc":"Precision calibration of hydraulic pumping units, cylinders, and valves for whisper-quiet travel in private villas.","tag":"Villas & Homes"},{"title":"Freight & Cargo Elevators","desc":"Proactive inspection of heavy-duty car flooring, traction drives, and safety gear for industrial warehouses and commercial centers.","tag":"Commercial & Cargo"},{"title":"Hospital & Bed Elevators","desc":"Accurate millimeter leveling calibration and safety door sensors ensuring utmost patient and stretcher comfort.","tag":"Healthcare"},{"title":"Accessibility & Panoramic Glass Lifts","desc":"Specialized engineering care for accessibility platform lifts and glass scenic shafts compliant with universal accessibility standards.","tag":"Accessibility & Scenic"}],"faqs":[{"q":"How frequently are routine inspections performed under the maintenance contract?","a":"Scheduled maintenance visits occur on a monthly basis to inspect, test, and adjust mechanical and electrical safety devices, lubrication, and brakes."},{"q":"What is the typical response time for an emergency service call?","a":"We are committed to same-day response for all notifications within Jeddah, with immediate priority given to passenger entrapment cases."},{"q":"Are your maintenance contracts approved by the Civil Defense?","a":"Yes, Al-Masaed Al-Mubtakirah is officially accredited by the Civil Defense and provides accredited maintenance contracts compliant with municipal and safety licensing."},{"q":"Do you provide maintenance for different international brands?","a":"Yes, our technicians are trained and equipped to service all elevator brands and models commonly installed in the Saudi market."}]},"modernization":{"title":"Elevator Modernization","h1":"Elevator Modernization in Jeddah: Complete Performance & Aesthetic Upgrade","shortDesc":"Comprehensive elevator renewal improving ride smoothness and cutting energy consumption by 40% at economical rates.","intro":"Turnkey engineering solutions to renew and modernize aging elevators with state-of-the-art technologies without replacing the structural shaft. We enhance operating efficiency and reduce electrical power consumption by over 40% through intelligent microprocessor controllers, energy-efficient gearless machines, and luxury modern cabin interiors.","included":["Intelligent microprocessor-based control panel upgrades","Up to 40% power reduction using modern VVVF drive technology","Luxury cabin interior renovations with energy-efficient LED lighting","Modern door operator mechanisms with anti-entrapment sensors","European gearless traction machine upgrades for whisper-quiet rides","Interactive digital floor displays and contemporary landing fixtures","Precision hydraulic valve and cylinder overhauls","Comprehensive load testing and official safety certification"],"process":[{"step":"01","title":"System Audit & Assessment","desc":"Inspecting existing rails, wiring, machinery, and evaluating operating efficiency."},{"step":"02","title":"Modernization Scope & Proposal","desc":"Formulating the upgrade package aligned with technical objectives and operational budgets."},{"step":"03","title":"Scheduled Replacement","desc":"Installing modernized equipment systematically to keep building downtime minimal."},{"step":"04","title":"Calibration & Commissioning","desc":"Testing load capacity, leveling accuracy, and safety gear before final handover."}],"equipment":[{"title":"Legacy Elevators Over 10-15 Years Old","desc":"Complete mechanical and electrical overhaul restoring aging elevators to factory-fresh efficiency and safety.","tag":"Comprehensive Upgrade"},{"title":"Sluggish Hydraulic Elevators","desc":"Upgrading control valves, pumps, and thermal controls to accelerate travel times and cut electrical usage.","tag":"Hydraulic Systems"},{"title":"Commercial Tower Elevators","desc":"Installing micro-processor destination dispatching to optimize rush-hour traffic and slash passenger wait times.","tag":"Commercial & Offices"},{"title":"Troublesome Residential Elevators","desc":"Replacing outdated electromechanical panels with modern solid-state controllers that end frequent breakdowns.","tag":"Residential Buildings"}],"faqs":[{"q":"What is the primary difference between modernization and full replacement?","a":"Modernization replaces critical mechanical drives, control electronics, and doors while preserving sound guide rails and structural brackets, saving up to 50% in cost and drastically reducing shutdown time."},{"q":"How long does elevator modernization typically take?","a":"A control system and door operator upgrade generally requires 3 to 7 working days, while a comprehensive modernization package takes between 1 and 2 weeks."},{"q":"Does modernization reduce electrical power consumption?","a":"Yes, modern regenerative drives and VVVF frequency inverters reduce electrical energy usage by up to 40% compared to traditional legacy motors."}]},"installation":{"title":"Elevator Installation","h1":"Elevator Installation in Jeddah: Trusted Engineering Delivery & Full Warranty","shortDesc":"Turnkey supply and installation of passenger, residential, and villa elevators with genuine European equipment.","intro":"Complete supply and turnkey installation of residential, villa, commercial, and tower elevators in Jeddah adhering to Saudi Building Code guidelines and Civil Defense approvals. We deploy genuine European machinery to deliver whisper-quiet travel, with specialized space-saving Machine-Room-Less (MRL) and luxury glass panoramic configurations.","included":["Certified original European and Italian equipment with full warranty","Advanced Machine-Room-Less (MRL) and compact villa lift solutions","Laser-aligned engineering execution strictly compliant with Saudi codes","Architectural luxury glass panoramic cabin designs","Comprehensive shaft drawings review and architectural verification","Precision laser-guided guide rail and door frame installation","Emergency automatic lowering devices and seismic sensor integrations","Certified load commissioning, speed testing, and included maintenance period"],"process":[{"step":"01","title":"Site & Shaft Verification","desc":"Checking pit depth, overhead clearances, and vertical tolerances against specifications."},{"step":"02","title":"Equipment Sourcing","desc":"Procuring certified equipment packages and staging the installation program."},{"step":"03","title":"Mechanical & Electrical Erection","desc":"Fixing guide rails, assembling cabin sling, mounting machine, and connecting power systems."},{"step":"04","title":"Commissioning & Handover","desc":"Trial runs, safety testing, client operational briefing, and warranty documentation."}],"equipment":[{"title":"Machine-Room-Less (MRL) Elevators","desc":"Space-saving architectural layouts that eliminate the overhead penthouse machine room with ultra-quiet performance.","tag":"Space Saving"},{"title":"Overhead Machine-Room Elevators","desc":"The trusted engineering choice for high-rise towers requiring high speeds, heavy duty cycles, and intense traffic capacity.","tag":"High-Rise Towers"},{"title":"Compact Hydraulic Villa Lifts","desc":"Flexible configurations requiring minimal pit depth and low headroom, easily integrated into glass or steel enclosures.","tag":"Villas & Homes"},{"title":"Panoramic Scenic Glass Lifts","desc":"Stunning architectural showcases for shopping centers, hotels, and luxury residences with circular or polygonal glass shafts.","tag":"Scenic & Luxury"},{"title":"Heavy-Duty Cargo & Service Lifts","desc":"Impact-resistant structures engineered for commercial kitchens, warehouses, and logistics centers from 500kg up to 5 tons.","tag":"Heavy Freight"}],"faqs":[{"q":"Can an elevator be installed in an existing villa without a concrete shaft?","a":"Yes, we provide hydraulic and MRL lift packages that can be installed inside custom steel and glass structures with minimal pit and headroom requirements."},{"q":"What safety codes are enforced during installation?","a":"We apply Saudi Building Code guidelines and Civil Defense requirements, including overspeed governors, progressive safety gear, and emergency lowering devices."},{"q":"What warranty terms accompany new installations?","a":"We provide comprehensive equipment warranties alongside a complimentary preventive maintenance period included in the contract."}]},"spareParts":{"title":"Spare Parts","h1":"Original Elevator Spare Parts in Jeddah: Rapid Supply & 100% Genuine Compatibility","shortDesc":"Direct supply of 100% genuine manufacturer parts and components for all elevator makes in Jeddah.","intro":"Uninterrupted elevator performance depends on 100% genuine components matching original manufacturer engineering specifications. Al-Masaed Al-Mubtakirah maintains extensive local inventory and an accredited supplier network across Jeddah to provide rapid dispatch of mechanical, hydraulic, and electrical parts, minimizing unplanned downtime.","included":["100% genuine factory-certified parts for all international elevator makes","Immediate local stock dispatch in Jeddah to eliminate prolonged downtime","Original hydraulic power units, pumps, and heavy-duty traction motors","Comprehensive parts quality warranties against defects and faults","Microprocessor controller boards, inverters, and leveling sensors","Door drive operators, mechanical interlocks, belts, and safety switches","Certified steel traction cables, diverter sheaves, and hydraulic oils","Photoelectric light curtains, overspeed governors, and safety contact switches"],"process":[{"step":"01","title":"Part Identification & Inspection","desc":"Technical check to record manufacturer part numbers and physical specifications."},{"step":"02","title":"Procurement & Matching","desc":"Verifying stock or dispatching through our accredited vendor network."},{"step":"03","title":"Installation & Calibration","desc":"Fitting by qualified technicians followed by factory adjustment procedures."},{"step":"04","title":"Functional Verification","desc":"Testing operation under load and issuing standard parts quality warranty."}],"equipment":[{"title":"Hydraulic Lift Components","desc":"Original oil pumps, cylinders, pressure relief valves, seal kits, and hydraulic power units for all load capacities.","tag":"Hydraulics"},{"title":"Traction & High-Speed Gearless Parts","desc":"Certified steel hoist cables, deflection sheaves, European gearless traction motors, and emergency brake assemblies.","tag":"Traction Drives"},{"title":"Automatic & Semi-Automatic Door Systems","desc":"Advanced door operators, toothed drive belts, smart controller cards, optical infrared curtains, and mechanical interlocks.","tag":"Door Systems"},{"title":"Safety Devices & Digital Sensors","desc":"Overspeed governors, automatic rescue devices (ARD), laser landing sensors, and limit directional switches.","tag":"Safety Systems"}],"faqs":[{"q":"Can you source original parts for older or discontinued models?","a":"Yes, through our verified supplier network we source original components or approved engineering replacements compatible with your existing equipment."},{"q":"Are spare parts available to non-contracted building owners?","a":"Yes, we provide diagnostic and replacement parts services for all property managers across Jeddah on an on-demand basis."},{"q":"Do supplied parts carry a performance warranty?","a":"Yes, all replacement components are backed by quality warranties against manufacturing defects."}]},"escalators":{"title":"Escalators & Moving Walkways","h1":"Escalator & Moving Walkway Services in Jeddah: Continuous Safety & Peak Efficiency","shortDesc":"Precision preventive maintenance and rigorous safety inspections for escalators and moving walkways.","intro":"Escalators and moving walkways form the critical pedestrian backbone of commercial centers, airports, and administrative complexes in Jeddah. We provide scheduled preventive maintenance, testing, and overhaul services across all makes and models of escalators, moving walkways, and accessibility platform lifts to guarantee seamless traffic flow and passenger safety.","included":["Thorough periodic inspection of step assemblies, comb plates, and chains","Moving handrail synchronization and emergency stop button audits","Automated lubrication systems servicing to eliminate noise and wear","Rigorous safety testing ensuring complete protection for families and children","Main drive gearbox, heavy-duty traction machine, and brake servicing","Comb impact safety switches and drive chain breakage sensors audit","Continuous dynamic motion testing under load for speed stability","Dedicated maintenance for accessibility platform and wheelchair lifts"],"process":[{"step":"01","title":"Visual & Mechanical Inspection","desc":"Examining steps, comb alignment, and handrail tension for smooth motion."},{"step":"02","title":"Safety Contact & Interlock Tests","desc":"Verifying comb impact switches, drive chain breakage sensors, and emergency stops."},{"step":"03","title":"Lubrication & Running Adjustments","desc":"Servicing chains and drive units with specified lubricants to reduce friction and noise."},{"step":"04","title":"Dynamic Testing Under Load","desc":"Continuous trial running to verify speed consistency and smooth braking deceleration."}],"equipment":[{"title":"Commercial Indoor Escalators","desc":"Scheduled servicing and alignment of steps, handrails, and safety devices across shopping malls and retail centers in Jeddah.","tag":"Malls & Retail"},{"title":"Heavy-Duty Transit Escalators","desc":"Robust engineering servicing designed for continuous, high-volume passenger loads operating 24/7 in public facilities.","tag":"Intensive Transit"},{"title":"Horizontal & Inclined Moving Walkways","desc":"Servicing passenger moving walks in airports and hypermarkets for seamless traveler and shopping cart transit.","tag":"Airports & Markets"},{"title":"Accessibility Platform Lifts","desc":"Certified accessibility solutions ensuring absolute safety, independence, and smooth transit for wheelchair users.","tag":"Universal Access"}],"faqs":[{"q":"Why is routine preventative care critical for escalators?","a":"Escalators operate for prolonged periods under heavy continuous traffic; regular servicing ensures safety devices prevent accidental entrapment and maintain reliable transit."},{"q":"What action should be taken if an escalator produces unusual noise?","a":"Immediately stop the equipment using the emergency stop button located at the entry or exit, and contact our team for technical evaluation before restarting."},{"q":"Do you service all international escalator manufacturers?","a":"Yes, our technicians support all major escalator and passenger conveyor models operating throughout the Kingdom."}]}}');
const contact = { "pageTitle": "Contact Us | Al-Masaed Al-Mubtakirah in Jeddah", "pageDescription": "Contact Al-Masaed Al-Mubtakirah in Jeddah for service quotes, elevator maintenance, or emergency response. Unified number 920016876.", "eyebrow": "Rapid Response & Continuous Support", "heading": "Your Building's Safety Starts Here.. Connect with Our Engineering Experts in Jeddah", "subtitle": "Whether you require urgent emergency response, a tailored quotation for maintenance or modernization, or a comprehensive site survey; our dedicated engineering team is here to assist you 24/7.", "formTitle": "Send Your Request or Inquiry", "formSubtitle": "Please fill out the form below and our customer service representative will contact you shortly.", "nameLabel": "Full Name", "namePlaceholder": "Enter your full name", "phoneLabel": "Mobile Number", "phonePlaceholder": "05X XXX XXXX", "emailLabel": "Email Address", "emailPlaceholder": "name@example.com", "serviceLabel": "Requested Service", "serviceSelectPlaceholder": "Select requested service", "messageLabel": "Message or Requirement Details", "messagePlaceholder": "Describe the elevator, building type, and nature of service or fault...", "submitButton": "Submit Request Now", "submitting": "Submitting...", "successHeading": "Message Received Successfully", "successMessage": "Thank you for contacting Al-Masaed Al-Mubtakirah. Our technical team will reach out to you by phone shortly.", "sendAnother": "Send Another Request", "infoTitle": "Official Contact Details", "unifiedNumberTitle": "Unified Number", "mobileWhatsAppTitle": "Mobile & WhatsApp", "phoneTitle": "Direct Phone", "emailTitle": "Official Email", "crTitle": "Commercial Registration", "accreditationTitle": "Official Accreditation", "locationTitle": "City & Service Area", "locationValue": "Jeddah, Saudi Arabia", "validation": { "nameRequired": "Please enter your name", "nameTooShort": "Name must be at least 2 characters", "phoneRequired": "Please enter your phone number", "phoneInvalid": "Please enter a valid phone number", "emailInvalid": "Please enter a valid email address", "messageRequired": "Please enter your message", "messageTooShort": "Message must be at least 5 characters" } };
const privacy = { "pageTitle": "Privacy Policy | Al-Masaed Al-Mubtakirah", "pageDescription": "Privacy policy and personal data protection principles for Al-Masaed Al-Mubtakirah in compliance with the Saudi Personal Data Protection Law (PDPL).", "eyebrow": "Transparency & Data Protection", "heading": "Privacy Policy & Personal Data Protection", "lastUpdated": "Last updated: 2026", "reviewNotice": "Note: This document represents the current draft policy for Al-Masaed Al-Mubtakirah website and is subject to final administrative review and adoption under applicable regulations of the Kingdom of Saudi Arabia.", "sections": [{ "title": "1. Introduction & Commitment", "content": "Al-Masaed Al-Mubtakirah is committed to safeguarding the privacy of website visitors and clients in the Kingdom of Saudi Arabia, managing all collected data with full responsibility and transparency in compliance with established regulations, including the Saudi Personal Data Protection Law (PDPL)." }, { "title": "2. Data Collected", "content": "We collect personal information voluntarily provided by users when submitting a contact inquiry or quote request through the website, including: full name, mobile number, email address (if provided), requested service type, and technical message details." }, { "title": "3. Purpose of Processing", "content": "Collected data is used strictly for direct operational purposes: communicating with the client to respond to inquiries, preparing requested technical quotes and engineering studies, and arranging site inspection visits for installation, maintenance, or modernization." }, { "title": "4. Data Security & Retention", "content": "We implement robust technical and organizational security controls across our databases to prevent unauthorized access, modification, or disclosure of personal data. Data is retained only for the duration required to fulfill operational purposes or meet legal requirements." }, { "title": "5. Third-Party Sharing", "content": "We do not sell, rent, or disclose client personal data to third parties for commercial or promotional purposes. Information is disclosed solely to authorized regulatory bodies when required by applicable laws of the Kingdom." }, { "title": "6. Cookies & Site Analytics", "content": "The website may utilize standard technical cookies and aggregated analytics to assess browsing performance and enhance the overall user experience without associating statistical trends with personal identities." }, { "title": "7. Data Subject Rights & Contact", "content": "Users may contact us to review, update, or request deletion of their personal records by emailing directly: info@almubtakirah.com." }] };
const notFound = { "pageTitle": "Page Not Found | Al-Masaed Al-Mubtakirah", "pageDescription": "The page you are looking for is unavailable or has been moved.", "code": "404", "heading": "Page Not Found", "description": "The link you followed may be incorrect, or the page address has changed.", "backHome": "Return to Home Page" };
const styleguide = { "title": "Design System & Component Library", "subtitle": "UI architecture and brand guidelines for Al-Masaed Al-Mubtakirah", "colorTokens": "Color Palette", "typography": "Typography", "buttons": "Action Buttons", "formControls": "Form Controls", "feedbackComponents": "Feedback & Badges", "disclosureComponents": "Accordions & Tabs", "layoutComponents": "Layouts & Containers", "brandAssets": "Brand Assets & Logo" };
const works = { "pageTitle": "Our Works & Projects | Al-Masaed Al-Mubtakirah in Jeddah", "pageDescription": "Browse our portfolio of elevator installation, modernization, and maintenance projects executed across Jeddah.", "eyebrow": "Proven Track Record", "heading": "Our Mark on Every Floor.. Projects Elevating the Future of Movement in Jeddah", "intro": "From prestigious commercial towers to modern residential complexes; we take pride in delivering, modernizing, and maintaining state-of-the-art mobility systems that safely move thousands daily.", "filters": { "all": "All Projects", "maintenance": "Elevator Maintenance", "modernization": "Modernization", "installation": "Supply & Installation", "spareParts": "Spare Parts", "escalators": "Escalators & Walkways" }, "filterLabel": "Filter projects by service", "cardViewDetails": "View Project Details", "emptyHeading": "Projects Being Documented", "emptyMessage": "Our digital project portfolio is currently being curated and updated with completed works in Jeddah. Please contact us directly for references and case studies.", "emptyCta": "Contact Us for Inquiries", "details": { "serviceType": "Service Type", "completedYear": "Year Completed", "location": "Location", "galleryHeading": "Project Photo Gallery", "descriptionHeading": "Project Overview & Engineering Solution", "relatedHeading": "Related Projects", "backToWorks": "Back to All Projects" } };
const blog = { "pageTitle": "Engineering Blog & Technical Insights | Al-Masaed Al-Mubtakirah", "pageDescription": "Specialized articles and technical guidelines on elevator maintenance, installation, modernization, and Civil Defense standards in Jeddah.", "eyebrow": "Engineering Insights", "heading": "Knowledge That Elevates.. Your Guide to Peak Safety & Performance", "intro": "Practical guidelines and technical insights on preventive maintenance, civil defense codes, and modern elevator technology in Jeddah.", "allCategories": "All Categories", "filterLabel": "Filter articles by category", "readTime": "{{count}} min read", "publishedAt": "Published:", "updatedAt": "Updated:", "byAuthor": "By:", "tableOfContents": "Table of Contents", "shareArticle": "Share Article", "copyLink": "Copy link", "linkCopied": "Link copied to clipboard", "tags": "Tags:", "relatedPosts": "Related Articles", "prevPost": "Previous Article", "nextPost": "Next Article", "faqTitle": "Frequently Asked Questions", "emptyHeading": "Articles in Preparation", "emptyMessage": "Our engineering team is currently authoring comprehensive technical articles. Please check back soon for fresh updates.", "backToBlog": "Back to All Articles", "translationTwinNotice": "هذا المقال متوفر باللغة العربية أيضاً", "readInOtherLang": "اقرأ بالعربية", "ctaTitle": "Looking for engineering advice or a maintenance contract?", "ctaText": "Our Civil Defense certified engineering team in Jeddah is ready to inspect your elevator and recommend tailored technical solutions.", "ctaButton": "Request a Free Consultation" };
const en = {
  brand,
  nav,
  actions,
  footer,
  common,
  home,
  about,
  services,
  contact,
  privacy,
  notFound,
  styleguide,
  works,
  blog
};
(_wa = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _wa.call(globalThis, "src/i18n/config.ts");
const resources = {
  ar: { common: ar },
  en: { common: en }
};
i18n.use(initReactI18next).init({
  lng: "ar",
  fallbackLng: "ar",
  defaultNS: "common",
  resources,
  interpolation: {
    escapeValue: false
  }
});
(_xa = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _xa.call(globalThis, "src/main.tsx");
const createRoot = ViteReactSSG({
  routes,
  basename: "/"
});
export {
  AppProviders as A,
  Button as B,
  Dialog as D,
  FormField as F,
  Logo as L,
  Seo as S,
  ToastProvider as T,
  siteConfig as a,
  stripHtml as b,
  createRoot,
  getStoragePublicUrl as g,
  processArticleHtml as p,
  supabase as s,
  useToast as u
};
