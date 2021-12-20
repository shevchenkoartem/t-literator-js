class DefaultConfigReaderFromGitHub{static#PROJECT_HOME_LINK="https://raw.githubusercontent.com/shevchenkoartem/t-literator-configs/master/";getConfigObject(t){if(null==t||!t.length)return{};let e=DefaultConfigReaderFromGitHub.#httpGet(DefaultConfigReaderFromGitHub.#PROJECT_HOME_LINK+`src/${t}.config`);return e=e.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm,"$1"),e=e.replace(/[\u202F\u00A0]/g," "),JSON.parse(e)}static#httpGet(t){const e="undefined"==typeof window?require("xmlhttprequest").XMLHttpRequest:XMLHttpRequest,i=new e;return i.open("GET",t,!1),i.send(null),i.responseText}}"undefined"==typeof window&&(module.exports=DefaultConfigReaderFromGitHub);class StringValueOrArrayHelpers{static toTitleCase(e){if(null==e)return null;if(Array.isArray(e)){const s=[...e];for(let t=0;t<s.length;++t)s[t]=StringValueOrArrayHelpers.toTitleCase(s[t]);return s}var i;for(let t=0;t<e.length;++t)if(null!=(i=e.charAt(t))&&i.toLowerCase()!==i.toUpperCase())return e.slice(0,t+1).toUpperCase()+e.slice(t+1);return e}static toUpperCase(t,e){if(null==t)return null;if(Array.isArray(t)){const o=[...t];for(let t=0;t<o.length;++t)o[t]=StringValueOrArrayHelpers.toUpperCase(o[t]);return o}let i=t;for(var[s,r]of Object.entries(e??{}))i=i.replaceAll(s,r);return i.toUpperCase()}static toDiacriticless(t){if(null==t)return null;if(Array.isArray(t)){const i=[...t];for(let t=0;t<i.length;++t)i[t]=StringValueOrArrayHelpers.toDiacriticless(i[t]);return i}var e={"ł":"l","Ł":"L","ı":"i","İ":"I"};return null!=e[t]?e[t]:t.normalize("NFD").replace(/\p{Diacritic}/gu,"")}}"undefined"==typeof window&&(module.exports=StringValueOrArrayHelpers);const Helpers="undefined"==typeof window?require("./string-value-or-array-helpers"):StringValueOrArrayHelpers,FromGitHubReader="undefined"==typeof window?require("./default-config-reader-from-github"):DefaultConfigReaderFromGitHub;class Transliterator{static#AFFECTING="affecting";static#AFFECTED="affected";#WORD_START="【⟨";#WORD_END="⟩】";static#UPPER_TECH_LETER="Ꙍ";static#LOWER_TECH_LETER="ꙍ";#config={};#implementingGetConfigObject;#useDiacritics=!0;constructor(t,e){this.#implementingGetConfigObject=null!=t?t:new FromGitHubReader,null!=e&&this.useConfig(e)}get config(){return{...this.#config}}transliterate(t,e){this.#useDiacritics=!e;var i,s,r,o,n=this.#useDiacritics?0:1;let a=t;this.#config.useLocationInWordAlgo&&(a=this.#markStartingPositions(a)),a=this.#replaceAllByDict(a,this.#config.beforeStartDict,this.#config.useLocationInWordAlgo);const l=Object.keys(this.#config.apostrophesSingleKeyDict)[0];for(const d of l.split(""))a=a.replaceAll(d,"⟨≀⟩");for([i,s]of Object.entries(this.#config.softingVowelsMultiDict)){for(const b of this.#config.unsoftableConsonants){var c,f=s[Transliterator.#AFFECTED];this.#config.useLocationInWordAlgo&&Array.isArray(f[n])&&(c=Transliterator.#getPositionalValue(f[n],2),a=a.replaceAll(b+i+this.#WORD_END,b+c+this.#WORD_END));f=Transliterator.#getPositionalValue(f[n]);a=a.replaceAll(b+i,b+f)}for(var[u,g]of Object.entries(this.#config.softableConsonantsDict)){g=this.#config.affectVowelNotConsonantWhenSofting?u:Transliterator.#getPositionalValue(g[n]);this.#config.useLocationInWordAlgo&&Array.isArray(s[Transliterator.#AFFECTING][n])&&(h=Transliterator.#getPositionalValue(s[Transliterator.#AFFECTING][n],2),a=a.replaceAll(u+i+this.#WORD_END,g+h+this.#WORD_END));var h=Transliterator.#getPositionalValue(s[Transliterator.#AFFECTING][n]);a=a.replaceAll(u+i,g+h)}}for([r,o]of Object.entries(this.#config.softingSignsMultiDict)){for(const T of this.#config.unsoftableConsonants)a=a.replaceAll(T+r,T+o[Transliterator.#AFFECTED][n]);for(var[p,D]of Object.entries(this.#config.softableConsonantsDict)){D=Transliterator.#getPositionalValue(D[n]);this.#config.useLocationInWordAlgo&&Array.isArray(o[Transliterator.#AFFECTING][n])&&(A=Transliterator.#getPositionalValue(o[Transliterator.#AFFECTING][n],2),a=a.replaceAll(p+r+this.#WORD_END,D+A+this.#WORD_END));var A=Transliterator.#getPositionalValue(o[Transliterator.#AFFECTING][n]);a=a.replaceAll(p+r,D+A)}a=a.replaceAll(r,o[Transliterator.#AFFECTED][n])}return a=a.replaceAll("⟨≀⟩",this.#config.apostrophesSingleKeyDict[l]),a=this.#replaceAllByDict(a,this.#config.dict,this.#config.useLocationInWordAlgo),a=this.#replaceAllByDict(a,this.#config.otherLanguagesLettersDict,this.#config.useLocationInWordAlgo),a=this.#replaceAllByDict(a,this.#config.specSymbolsDict,this.#config.useLocationInWordAlgo),this.#config.useLocationInWordAlgo&&(a=a.replaceAll(this.#WORD_START,""),a=a.replaceAll(this.#WORD_END,"")),a=this.#detectAndFixCapsLocked(a),a=this.#replaceAllByDict(a,this.#config.afterFinishDict,this.#config.useLocationInWordAlgo),null!=this.#config.substitutionForUndefinedResult&&(a=a.replaceAll("undefined",this.#config.substitutionForUndefinedResult)),a}useConfig(t){this.#config={...this.#implementingGetConfigObject.getConfigObject(t)},this.#ensureConfigCompleted()}getConfigTransliterationInfo(i,s){const r={};var o=this.getSourceAlphabet(!1,!1),t=this.#useDiacritics?0:1;const n=Object.keys(this.#config.softableConsonantsDict).find(t=>t.toLocaleUpperCase()===t),a=Object.keys(this.#config.softableConsonantsDict).find(t=>t.toLocaleLowerCase()===t),l=this.#config.unsoftableConsonants.find(t=>t.toLocaleUpperCase()===t),c=this.#config.unsoftableConsonants.find(t=>t.toLocaleLowerCase()===t);let f,u,g,h;null!=n&&null!=a&&(f=Transliterator.#getPositionalValue(this.#config.softableConsonantsDict[n][t],2),u=Transliterator.#getPositionalValue(this.#config.softableConsonantsDict[a][t],2)),null!=l&&null!=c&&(g=this.transliterate(l),h=this.transliterate(c));var p=Object.keys(this.#config.softingSignsMultiDict).find(t=>t.toLocaleUpperCase()===t),D=Object.keys(this.#config.softingSignsMultiDict).find(t=>t.toLocaleLowerCase()===t);let A,d;null!=p&&null!=D&&(A=Transliterator.#getPositionalValue(this.#config.softingSignsMultiDict[p][Transliterator.#AFFECTING][t],2),d=Transliterator.#getPositionalValue(this.#config.softingSignsMultiDict[D][Transliterator.#AFFECTING][t],2));const b=this.#getSourceVowels(!0);for(let t=0,e=1;t<o.length-1;t+=2,e+=2){var T=o[t],C=o[e];const m=[];if(Object.keys(this.#config.softingSignsMultiDict).includes(T)){const R=this.transliterate(n+T)+" "+this.transliterate(a+C);var y=R.replaceAll(f,"").replaceAll(u,"");m.push(y);const V=this.transliterate(l+T)+" "+this.transliterate(c+C);y=V.replaceAll(g,"").replaceAll(h,""),m.push(y)}else{var O,S=this.transliterate(T)+" "+this.transliterate(C);if(m.push(S),i||(O=(y=this.transliterate(Transliterator.#LOWER_TECH_LETER+C+Transliterator.#LOWER_TECH_LETER))+" "+y,y=(S=this.transliterate(Transliterator.#LOWER_TECH_LETER+C))+" "+S,O=(S=function(t){return t.replaceAll(Transliterator.#UPPER_TECH_LETER,"").replaceAll(Transliterator.#LOWER_TECH_LETER,"")})(O),m.push(O),O=S(y),m.push(O)),!s)if(b.includes(T)){const F=this;function E(t){return t.replaceAll(F.transliterate(n),"").replaceAll(F.transliterate(a),"").replaceAll(F.transliterate(l),"").replaceAll(F.transliterate(c),"")}this.#config.affectVowelNotConsonantWhenSofting&&null!=n&&null!=a&&(O=E((O=this.transliterate(a+C))+" "+O),m.push(O)),null!=l&&null!=c&&(L=E((L=this.transliterate(c+C))+" "+L),m.push(L))}else if(Object.keys(this.#config.softableConsonantsDict).includes(T)&&null!=p&&null!=D){const N=this.transliterate(T+p)+" "+this.transliterate(C+D);var L=N.replaceAll(A,"").replaceAll(d,"");m.push(L)}}r[T+" "+C]=m.filter((t,e,i)=>i.map(t=>t.split(" ").at(-1).toLocaleUpperCase()).indexOf(t.split(" ").at(-1).toLocaleUpperCase())===e).map(t=>t.length&&null!=t.match(/\S.*/)?t:"—").map(t=>function(t){const e=t.split(" ");if(2===e.length){var i=e[0]===e[1],s=1<Helpers.toDiacriticless(e[0]).length&&e[0]===e[1].toLocaleUpperCase();if(i||s)return e[1]}return t}(t)).join(", ")}const e=Object.values(r).join(", ");t=this.getTransliteratedAlphabet(!0).filter(t=>!e.includes(t)).join(", ");return t.length&&(r._others_=t),r}getSourceAlphabet(e,i){const s=[];for(const r of this.#config.unsoftableConsonants.concat(Object.keys(this.#config.softingSignsMultiDict)).concat(Object.keys(this.#config.dict)).concat(Object.keys(this.#config.softableConsonantsDict)).concat(Object.keys(this.#config.softingVowelsMultiDict)).concat(Object.keys(this.#config.beforeStartDict)).concat(i?Object.keys(this.#config.otherLanguagesLettersDict):[])){let t=r.length;if(1!==t){if(1<t)for(;t--;)s.push(e?r.charAt(t).toLowerCase():r.charAt(t))}else s.push(e?r.toLowerCase():r)}return s.filter((t,e,i)=>i.indexOf(t)===e).filter(t=>!!i||!Object.keys(this.#config.otherLanguagesLettersDict).includes(t)).sort(Transliterator.#alphabetOrderComparator)}getTransliteratedAlphabet(e,t){let i=[...this.#flatValuesAt(this.#config.beforeStartDict).map(t=>this.transliterate(t))];for(const n of this.#flatValuesAt(this.#config.dict).concat(this.#flatValuesAt(this.#config.apostrophesSingleKeyDict)).concat(this.#flatValuesAt(this.#config.softableConsonantsDict)).concat(this.#flatValuesAt(this.#config.softingVowelsMultiDict)).concat(this.#flatValuesAt(this.#config.softingSignsMultiDict)).concat(t?this.#flatValuesAt(this.#config.otherLanguagesLettersDict):[]))if(null!=n){let t=n;for(var[s,r]of Object.entries(this.#config.afterFinishDict))t=t.replaceAll(s,r);i.push(t)}i=i.concat(this.#flatValuesAt(this.#config.afterFinishDict));const o=[];for(const a of i)if(null!=a){let t=Helpers.toDiacriticless(a).length;if(1!==t){if(1<t)for(;t--;)o.push(e?a.charAt(t).toLowerCase():a.charAt(t))}else e&&a!==a.toLowerCase()||o.push(a)}return o.filter((t,e,i)=>i.indexOf(t)===e).sort(Transliterator.#alphabetOrderComparator)}#getDigraphs(){const t=[];for(const e of this.#flatValuesAt(this.#config.beforeStartDict).concat(this.#flatValuesAt(this.#config.dict)).concat(this.#flatValuesAt(this.#config.apostrophesSingleKeyDict)).concat(this.#flatValuesAt(this.#config.softableConsonantsDict)).concat(this.#flatValuesAt(this.#config.softingVowelsMultiDict)).concat(this.#flatValuesAt(this.#config.softingSignsMultiDict)).concat(this.#flatValuesAt(this.#config.otherLanguagesLettersDict)).concat(this.#flatValuesAt(this.#config.afterFinishDict)))null!=e&&1<e.length&&t.push(e.toLowerCase());return t.filter((t,e,i)=>i.indexOf(t)===e)}#ensureConfigCompleted(){this.#config.code=this.#config.code??"code"+Math.floor(1e3*Math.random()),this.#config.name=this.#config.name??"Unnamed",this.#config.desc=this.#config.desc??"",this.#config.link=this.#config.link??"",this.#config.from=this.#config.from??"",this.#config.to=this.#config.to??"",this.#config.exceptionalCaseRules=this.#config.exceptionalCaseRules??{},this.#config.affectVowelNotConsonantWhenSofting=this.#config.affectVowelNotConsonantWhenSofting??!1,this.#config.useLocationInWordAlgo=this.#config.useLocationInWordAlgo??!1,this.#config.unsoftableConsonants=this.#config.unsoftableConsonants??[],this.#config.softableConsonantsDict=Transliterator.#getNormalizedDictStructure(this.#config.softableConsonantsDict),this.#config.dict=Transliterator.#getNormalizedDictStructure(this.#config.dict),this.#config.otherLanguagesLettersDict=Transliterator.#getNormalizedDictStructure(this.#config.otherLanguagesLettersDict),this.#config.specSymbolsDict=Transliterator.#getNormalizedDictStructure(this.#config.specSymbolsDict),this.#config.beforeStartDict=Transliterator.#getNormalizedDictStructure(this.#config.beforeStartDict),this.#config.afterFinishDict=Transliterator.#getNormalizedDictStructure(this.#config.afterFinishDict),this.#config.softingSignsMultiDict=Transliterator.#getNormalizedMultiDictStructure(this.#config.softingSignsMultiDict),this.#config.softingVowelsMultiDict=Transliterator.#getNormalizedMultiDictStructure(this.#config.softingVowelsMultiDict),this.#normalizeApostrophesSingleKeyDict(),Transliterator.#completeByUpperAndTitleCased(this.#config.beforeStartDict),this.#useDiacritics||Transliterator.#completeByNonDiacritics(this.#config.beforeStartDict,!0);for(const t of[this.#config.unsoftableConsonants,this.#config.softableConsonantsDict,this.#config.dict,this.#config.otherLanguagesLettersDict,this.#config.softingSignsMultiDict,this.#config.softingVowelsMultiDict,this.#config.afterFinishDict])Transliterator.#completeByUpperAndTitleCased(t),this.#useDiacritics||Transliterator.#completeByNonDiacritics(t)}#markStartingPositions(t){var e=this.getSourceAlphabet(!1,!0).concat([Transliterator.#UPPER_TECH_LETER,Transliterator.#LOWER_TECH_LETER]).join(""),i=new RegExp(`(?<a>^|[^${e}]+)(?<b>[${e}])`,"gu");let s=t.replaceAll(i,`$<a>${this.#WORD_START}$<b>`);return i=new RegExp(`(?<b>[${e}])(?<c>$|[^${e}]+)`,"gu"),s=s.replaceAll(i,`$<b>${this.#WORD_END}$<c>`),i=new RegExp(`(?<a>${this.#WORD_END})(?<b>['\`‘’])(?<c>${this.#WORD_START})`,"gu"),s=s.replaceAll(i,"$<b>"),s}#detectAndFixCapsLocked(t,e){let i=t;e=e??2;const s={a:1,b:2,c:3,q:4,d:5},r=[...i.matchAll(/(?<a>\p{Lu}\p{Ll}+)(?<b>\p{Lu}+)|(?<c>\p{Lu}+)(?<q>['"]*)(?<d>\p{Lu}\p{Ll}+)/gu)];var o,n,a,t=r.map(t=>({probablyIssue:null!=t[s.a]?t[s.a]:t[s.d],after:null!=t[s.b]?t[s.b]:"",before:null!=t[s.c]?t[s.c]:"",specSymb2:null!=t[s.q]?t[s.q]:"",index:t.index}));const l=this.#getDigraphs();for(const c of t)l.includes(c.probablyIssue.toLowerCase())&&(i=(o=i,n=c.index,a=c.before+c.specSymb2+Helpers.toUpperCase(c.probablyIssue,this.#config.exceptionalCaseRules)+c.after,o.substr(0,n)+a+o.substr(n+a.length)));return 0===e?i:this.#detectAndFixCapsLocked(i,e-1)}#replaceAllByDict(t,e,i){var s,r,o=this.#useDiacritics?0:1;let n=t;for([s,r]of Object.entries(e)){var a=r[o];i&&Array.isArray(a)&&(n=n.replaceAll(this.#WORD_START+s,this.#WORD_START+Transliterator.#getPositionalValue(a,0)),n=n.replaceAll(s+this.#WORD_END,Transliterator.#getPositionalValue(a,2)+this.#WORD_END)),n=n.replaceAll(s,Transliterator.#getPositionalValue(a))}return n}#normalizeApostrophesSingleKeyDict(){let t;if(null!=this.#config.apostrophesSingleKeyDict&&(t=Object.keys(this.#config.apostrophesSingleKeyDict)),null!=t&&t.length){let e=0;t.forEach(t=>0==e++||delete this.#config.apostrophesSingleKeyDict[t])}else this.#config.apostrophesSingleKeyDict={"":""}}#flatValuesAt(t){const e=this.#useDiacritics?0:1;return Object.values(t).flatMap(t=>t.constructor===Object?this.#flatValuesAt(t):t[e])}#getSourceVowels(t){const e=["А","а","Е","е","Ё","ё","Є","є","И","и","І","і","Ї","ї","О","о","У","у","Ы","ы","Э","э","Ю","ю","Я","я"],i=this.getSourceAlphabet(!1,t);return i.filter(t=>e.includes(t))}#getSourceConsonants(t){const e=["Б","б","В","в","Г","г","Ґ","ґ","Д","д","Ѓ","ѓ","Ђ","ђ","Ж","ж","З","з","З́","з́","Ѕ","ѕ","Й","й","Ј","ј","К","к","Л","л","Љ","љ","М","м","Н","н","Њ","њ","П","п","Р","р","С","с","С́","с́","Т","т","Ћ","ћ","Ќ","ќ","Ў","ў","Ф","ф","Х","х","Ц","ц","Ч","ч","Џ","џ","Ш","ш","Щ","щ"],i=this.getSourceAlphabet(!1,t);return i.filter(t=>e.includes(t))}#getSourceSpecialSigns(t){const e=["Ъ","ъ","Ь","ь","'","’"],i=this.getSourceAlphabet(!1,t);return i.filter(t=>e.includes(t))}static#getNormalizedDictStructure(t){const e={};if(null==t)return e;for(const o of Object.keys(t)){var i=!Array.isArray(t[o]),s=Array.isArray(t[o])&&0===t[o].length,r=Array.isArray(t[o])&&3===t[o].length;e[o]=i||r?[t[o]]:s?[""]:t[o]}return e}static#getNormalizedMultiDictStructure(t){const e={};if(null==t)return e;for(const s of Object.keys(t))if(t[s].constructor!==Object){var i=t[s];const r={};r[Transliterator.#AFFECTED]=i,r[Transliterator.#AFFECTING]=i,e[s]=Transliterator.#getNormalizedDictStructure(r)}else e[s]=Transliterator.#getNormalizedDictStructure(t[s]);return e}static#getPositionalValue(t,e){return null==e&&(e=1),Array.isArray(t)?t.length>e?t[e]:t[t.length-1]:t}static#completeByNonDiacritics(t,e){if(t.constructor===Object)for(const i of Object.values(t))i.constructor!==Object?i.length&&(1===i.length?i.push(Helpers.toDiacriticless(i[0])):e||(i[1]=Helpers.toDiacriticless(i[1]))):Transliterator.#completeByNonDiacritics(i)}static#completeByUpperAndTitleCased(e){var t=[Helpers.toTitleCase,Helpers.toUpperCase];if(Array.isArray(e)){const l=[];for(const c of e)for(const f of t){var i=f(c);e.includes(i)||l.includes(i)||l.push(i)}l.forEach(t=>e.push(t))}else for(var[s,r]of Object.entries(e))for(const u of t){var o=u(s);if(!e.hasOwnProperty(o))if(Array.isArray(r)){const g=[];for(const h of r)g.push(u(h));e[o]=g}else{const p={};for(var[n,a]of Object.entries(r)){const D=[];for(const A of a)D.push(u(A));p[n]=D}e[o]=p}}}static#alphabetOrderComparator(t,e){var i="'’*";let s=1;(i.includes(t)&&!i.includes(e)||i.includes(e)&&!i.includes(t))&&(s=-1);for(const r of["AaȦȧÄä","EeĖėËë","IıİiÏï","OoȮȯÖö","UuU̇u̇Üü","YyẎẏŸÿ"])if(r.includes(t)||r.includes(e)){if(r.includes(t)&&r.includes(e))return r.indexOf(t).toString().localeCompare(r.indexOf(e).toString());if(r.includes(t)){t=r[0];break}e=r[0];break}return s*t.localeCompare(e,"uk",{caseFirst:"upper"})}}"undefined"==typeof window&&(module.exports=Transliterator);