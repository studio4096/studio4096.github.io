import{d as E,r,c as o,a,F,b as y,w as C,i as c,o as i,n as g,e as m,v as D,f as _,g as w,t as p}from"./index.d0af4b89.js";const x={class:"contents-text"},A=a("h2",null,"studio4096",-1),B=a("p",null,"\u6771\u4EAC\u3067\u6D3B\u52D5\u4E2D\u306E\u30A4\u30E9\u30B9\u30C8\u30EC\u30FC\u30BF\u30FC\uFF0F\u30D7\u30ED\u30B0\u30E9\u30DE\u30FC\u3067\u3059\u3002",-1),V=a("h2",null,"Contact",-1),b=["onSubmit"],q=["type","id","required","onUpdate:modelValue"],T=["id","required","onUpdate:modelValue"],f=["for"],k=a("div",{class:"form-buttons col-d-3"},[a("input",{type:"submit",value:"Send Message"})],-1),R=E({name:"ContactView",setup(M){const s=c("$config"),h=c("$axios"),l=r([]),u=r({}),v=()=>{let d=l.value.map(t=>({id:t.id,value:u.value[t.id]}));h.post(s.contactForm.url,{id:s.contactForm.id,items:d}).then(t=>t.data).then(t=>{if(t.status>0)throw console.error(t),new Error(t.data&&t.data.message?t.data.message:null);alert("\u9001\u4FE1\u3057\u307E\u3057\u305F\u3002")}).catch(t=>{alert("\u9001\u4FE1\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002"),console.error(t)})};return l.value=s.contactForm.items,(d,t)=>(i(),o("article",x,[A,B,V,a("form",{action:"",class:"contact-form grid-d-3",onSubmit:C(v,["prevent"])},[(i(!0),o(F,null,y(l.value,e=>(i(),o("div",{class:g(["form-field",{"col-d-3":e.type=="PARAGRAPH_TEXT"}]),key:e.id},[e.type=="TEXT"?m((i(),o("input",{key:0,type:e.title.toLowerCase().match(/mail/)?"email":"text",id:"field-"+e.id,placeholder:" ",required:e.required,"onUpdate:modelValue":n=>u.value[e.id]=n},null,8,q)),[[D,u.value[e.id]]]):_("",!0),e.type=="PARAGRAPH_TEXT"?m((i(),o("textarea",{key:1,id:"field-"+e.id,placeholder:" ",required:e.required,"onUpdate:modelValue":n=>u.value[e.id]=n},null,8,T)),[[w,u.value[e.id]]]):_("",!0),a("label",{class:"label",for:"field-"+e.id},p(e.title)+p(e.required?"(*)":null),9,f)],2))),128)),k],40,b)]))}});export{R as default};
