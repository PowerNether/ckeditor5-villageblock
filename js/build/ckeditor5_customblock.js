!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.ckeditor5_customblock=t())}(self,(()=>(()=>{var e={"ckeditor5/src/core.js":(e,t,o)=>{e.exports=o("dll-reference CKEditor5.dll")("./src/core.js")},"ckeditor5/src/ui.js":(e,t,o)=>{e.exports=o("dll-reference CKEditor5.dll")("./src/ui.js")},"ckeditor5/src/widget.js":(e,t,o)=>{e.exports=o("dll-reference CKEditor5.dll")("./src/widget.js")},"dll-reference CKEditor5.dll":e=>{"use strict";e.exports=CKEditor5.dll}},t={};function o(l){var s=t[l];if(void 0!==s)return s.exports;var i=t[l]={exports:{}};return e[l](i,i.exports,o),i.exports}o.d=(e,t)=>{for(var l in t)o.o(t,l)&&!o.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var l={};return(()=>{"use strict";o.d(l,{default:()=>c});var e=o("ckeditor5/src/core.js"),t=o("ckeditor5/src/ui.js"),s=o("ckeditor5/src/widget.js");class i{id="";disableScroll=!1;openClass="customblockmodal__slide__opened";trigger="";constructor({id:e,disableScroll:t,openClass:o}){this.id=e||"",this.disableScroll=t||!1,this.openClass=o||"customblockmodal__slide__opened",this.modal=document.getElementById(this.id),null!==this.modal?(this.modal.classList.add("init"),document.body.addEventListener("click",(e=>{this.showHandler(e)}),{passive:!0}),document.body.addEventListener("mousedown",(e=>{this.hideHandler(e)}),{passive:!0})):console.error("Modal ID not found.")}disabledScroll(){if(this.disableScroll){let e=document.body;window.innerWidth>768&&(this.modal.querySelector(".customblockmodal__overlay").style.paddingRight="15px",e.style.transition="unset"),e.style.overflow="hidden",window.innerWidth>768&&(e.style.paddingRight="15px")}}activateScroll(){if(this.disableScroll){let e=document.body;window.innerWidth>768&&(this.modal.querySelector(".customblockmodal__overlay").style.paddingRight=null),e.style.overflow=null,window.innerWidth>768&&(e.style.paddingRight=null,setTimeout((()=>{e.style.transition=null}),1))}}escapeHandler(){27===event.keyCode&&this.hide()}showHandler(){if(event.target.closest(`[data-customblockmodal-trigger="${this.id}"]`)){if(this.trigger=event.target,event.target.classList.contains("actions-item")){let e=event.target.closest(".favoriteControl").getAttribute("data-object_id");this.modal.setAttribute("data-object-id",e)}this.modal.style.display="block",setTimeout((()=>{this.modal.classList.add(this.openClass),this.disabledScroll()}),1),document.addEventListener("keydown",(e=>{this.escapeHandler(e)}))}}hideHandler(){if(null!==event.target.getAttribute("data-customblockmodal-close")&&1===event.which){if(event.target.closest(".customblockmodal__slide").getAttribute("id")!==this.id)return;this.modal.classList.remove(this.openClass),setTimeout((()=>{this.modal.style.display="none"}),350),this.activateScroll(),document.removeEventListener("keydown",this.escapeHandler)}}show(){this.modal.style.display="block",setTimeout((()=>{this.modal.classList.add(this.openClass),this.disabledScroll()}),350)}hide(){this.modal.classList.remove(this.openClass),this.activateScroll(),setTimeout((()=>{this.modal.style.display="none"}),350)}}class d extends e.Plugin{init(){this._defineSchema(),this._defineConverters(),this.editor.editing.mapper.on("viewToModelPosition",(0,s.viewToModelPositionOutsideModelElement)(this.editor.model,(e=>e.hasClass("customBlock")))),this._defineToolbarButton(),this._createModal()}_defineSchema(){this.editor.model.schema.register("placeholder",{inheritAllFrom:"$blockObject",allowAttributes:["name"]})}_defineConverters(){const e=this.editor.conversion;function t(e,t){const o=e.getAttribute("name"),l=t.createContainerElement("div",{class:"customBlock"}),s=t.createText("{{"+o+"}}");return t.insert(t.createPositionAt(l,0),s),l}e.for("upcast").elementToElement({view:{name:"div",classes:["customBlock"]},model:(e,{writer:t})=>t.createElement("placeholder",{name:e.getChild(0).data.slice(2,-2)})}),e.for("editingDowncast").elementToElement({model:"placeholder",view:(e,{writer:o})=>(0,s.toWidget)(t(e,o),o)}),e.for("dataDowncast").elementToElement({model:"placeholder",view:(e,{writer:o})=>t(e,o)})}_defineToolbarButton(){this.editor.ui.componentFactory.add("customBlock",(()=>{const e=new t.ButtonView;return e.set({label:"Добавить блок ЖК/КП",icon:'<?xml version="1.0" encoding="UTF-8"?><svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m3 19v-13.3c-6e-5 -0.20528 0.06305-0.4056 0.18077-0.57377 0.11772-0.16816 0.28433-0.29603 0.47723-0.36623l9.671-3.516c0.0755-0.0275 0.1566-0.03637 0.2363-0.02587s0.1557 0.04007 0.2216 0.08619c0.0658 0.04612 0.1196 0.10744 0.1567 0.17876 0.0371 0.07131 0.0564 0.15053 0.0564 0.23092v4.953l6.316 2.105c0.1992 0.06635 0.3725 0.19371 0.4952 0.36405 0.1228 0.17033 0.1889 0.37498 0.1888 0.58495v9.279h2v2h-22v-2h2zm2 0h7v-15.144l-7 2.544v12.6zm14 0v-8.558l-5-1.667v10.225h5z" fill="#000"/></svg>',tooltip:!0}),e.on("execute",(()=>{this.customBlockModal.show()})),e}))}_createModal(){let e=document.createElement("div");e.classList.add("customblockmodal__slide"),e.id="customBlock__modal",e.innerHTML='<div class="customblockmodal__overlay" data-customblockmodal-close><div class="customblockmodal__container"><div class="customblockmodal__header"><p class="customblockmodal__title">Добавить блок ЖК/КП</p><span class="customblockmodal__close" data-customblockmodal-close></span></div><div class="customblockmodal__content"><input hidden="hidden" name="customblocknid" type="text"><div class="customblockmodal__field"><input placeholder="Название ЖК или КП" name="customblockname" type="text"><label for="customblockname">Название ЖК или КП</label></div></div><div class="customblockmodal__footer"><button disabled class="customblockmodal__button">Добавить блок</button></div></div></div>',document.body.append(e),this.customBlockModal=new i({id:"customBlock__modal",disableScroll:!0});let t=e.querySelector('input[name="customblockname"]'),o=e.querySelector('input[name="customblocknid"]'),l=e.querySelector(".customblockmodal__button");t.addEventListener("input",(async()=>{let e=await async function(e){if(!e||e.length<2)return{};let t=new URLSearchParams;t.set("data",JSON.stringify(e)),t.set("type",JSON.stringify("ckeditor5_customblock"));let o=await fetch("/system/search",{method:"POST",headers:{"X-Requested-With":"XMLHttpRequest"},body:t});if(o.ok)return(await o.json()).val;console.log(o)}(t.value);if(0===Object.keys(e).length)return;let l=t.parentNode,s=l.querySelector(".customblockmodal__field__result");s||(s=document.createElement("div"),s.classList.add("customblockmodal__field__result"),l.append(s)),s.innerHTML=e,s.querySelectorAll(".line[data-sid]").forEach((e=>{e.addEventListener("click",(()=>{let t=e?.dataset?.sid;if(!t)return;o.value=t;let l=new Event("change");o.dispatchEvent(l),s.remove()}))}))})),o.addEventListener("change",(()=>{""!==o.value?l.disabled=!1:l.disabled=!0}));let s=document.querySelector(".customblockmodal__container");s.addEventListener("click",(()=>{if(!event.target.closest(".customblockmodal__field")){let e=s.querySelector(".customblockmodal__field__result");e&&e.remove()}})),l.addEventListener("click",(()=>{this._insertComplexModal(o.value),this.customBlockModal.hide(),t.value="",o.value="";let e=new Event("change");o.dispatchEvent(e)}))}_insertComplexModal(e){const t=this.editor.model;t.change((o=>{const l=this.editor.model.document.selection,s=o.createElement("placeholder",{...Object.fromEntries(l.getAttributes()),name:" parentObjectInfo("+e+") "});t.insertObject(s,null,null,{setSelection:"on"})}))}}const c={CustomBlock:d}})(),l=l.default})()));