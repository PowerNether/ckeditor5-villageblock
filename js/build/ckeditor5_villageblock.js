!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.ckeditor5_villageblock=t())}(self,(()=>(()=>{var e={"ckeditor5/src/core.js":(e,t,l)=>{e.exports=l("dll-reference CKEditor5.dll")("./src/core.js")},"ckeditor5/src/ui.js":(e,t,l)=>{e.exports=l("dll-reference CKEditor5.dll")("./src/ui.js")},"ckeditor5/src/widget.js":(e,t,l)=>{e.exports=l("dll-reference CKEditor5.dll")("./src/widget.js")},"dll-reference CKEditor5.dll":e=>{"use strict";e.exports=CKEditor5.dll}},t={};function l(i){var o=t[i];if(void 0!==o)return o.exports;var a=t[i]={exports:{}};return e[i](a,a.exports,l),a.exports}l.d=(e,t)=>{for(var i in t)l.o(t,i)&&!l.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var i={};return(()=>{"use strict";l.d(i,{default:()=>d});var e=l("ckeditor5/src/core.js"),t=l("ckeditor5/src/ui.js"),o=l("ckeditor5/src/widget.js");class a{id="";disableScroll=!1;openClass="villageblockmodal__slide__opened";trigger="";constructor({id:e,disableScroll:t,openClass:l}){this.id=e||"",this.disableScroll=t||!1,this.openClass=l||"villageblockmodal__slide__opened",this.modal=document.getElementById(this.id),null!==this.modal?(this.modal.classList.add("init"),document.body.addEventListener("click",(e=>{this.showHandler(e)}),{passive:!0}),document.body.addEventListener("mousedown",(e=>{this.hideHandler(e)}),{passive:!0})):console.error("Modal ID not found.")}disabledScroll(){if(this.disableScroll){let e=document.body;window.innerWidth>768&&(this.modal.querySelector(".villageblockmodal__overlay").style.paddingRight="15px",e.style.transition="unset"),e.style.overflow="hidden",window.innerWidth>768&&(e.style.paddingRight="15px")}}activateScroll(){if(this.disableScroll){let e=document.body;window.innerWidth>768&&(this.modal.querySelector(".villageblockmodal__overlay").style.paddingRight=null),e.style.overflow=null,window.innerWidth>768&&(e.style.paddingRight=null,setTimeout((()=>{e.style.transition=null}),1))}}escapeHandler(){27===event.keyCode&&this.hide()}showHandler(){if(event.target.closest(`[data-villageblockmodal-trigger="${this.id}"]`)){if(this.trigger=event.target,event.target.classList.contains("actions-item")){let e=event.target.closest(".favoriteControl").getAttribute("data-object_id");this.modal.setAttribute("data-object-id",e)}this.modal.style.display="block",setTimeout((()=>{this.modal.classList.add(this.openClass),this.disabledScroll()}),1),document.addEventListener("keydown",(e=>{this.escapeHandler(e)}))}}hideHandler(){if(null!==event.target.getAttribute("data-villageblockmodal-close")&&1===event.which){if(event.target.closest(".villageblockmodal__slide").getAttribute("id")!==this.id)return;this.modal.classList.remove(this.openClass),setTimeout((()=>{this.modal.style.display="none"}),350),this.activateScroll(),document.removeEventListener("keydown",this.escapeHandler)}}show(){this.modal.style.display="block",setTimeout((()=>{this.modal.classList.add(this.openClass),this.disabledScroll()}),350)}hide(){this.modal.classList.remove(this.openClass),this.activateScroll(),setTimeout((()=>{this.modal.style.display="none"}),350)}}class s extends e.Plugin{init(){this._defineSchema(),this._defineConverters(),this.editor.editing.mapper.on("viewToModelPosition",(0,o.viewToModelPositionOutsideModelElement)(this.editor.model,(e=>e.hasClass("villageBlock")))),this._defineToolbarButton(),this._createModal()}_defineSchema(){this.editor.model.schema.register("placeholder",{inheritAllFrom:"$blockObject",allowAttributes:["name"]})}_defineConverters(){const e=this.editor.conversion;function t(e,t){const l=e.getAttribute("name"),i=t.createContainerElement("div",{class:"villageBlock"}),o=t.createText("{{"+l+"}}");return t.insert(t.createPositionAt(i,0),o),i}e.for("upcast").elementToElement({view:{name:"div",classes:["villageBlock"]},model:(e,{writer:t})=>t.createElement("placeholder",{name:e.getChild(0).data.slice(2,-2)})}),e.for("editingDowncast").elementToElement({model:"placeholder",view:(e,{writer:l})=>(0,o.toWidget)(t(e,l),l)}),e.for("dataDowncast").elementToElement({model:"placeholder",view:(e,{writer:l})=>t(e,l)})}_defineToolbarButton(){this.editor.ui.componentFactory.add("villageBlock",(()=>{const e=new t.ButtonView;return e.set({label:"Добавить карточку КП",icon:'<?xml version="1.0" encoding="UTF-8"?><svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m3 19v-13.3c-6e-5 -0.20528 0.06305-0.4056 0.18077-0.57377 0.11772-0.16816 0.28433-0.29603 0.47723-0.36623l9.671-3.516c0.0755-0.0275 0.1566-0.03637 0.2363-0.02587s0.1557 0.04007 0.2216 0.08619c0.0658 0.04612 0.1196 0.10744 0.1567 0.17876 0.0371 0.07131 0.0564 0.15053 0.0564 0.23092v4.953l6.316 2.105c0.1992 0.06635 0.3725 0.19371 0.4952 0.36405 0.1228 0.17033 0.1889 0.37498 0.1888 0.58495v9.279h2v2h-22v-2h2zm2 0h7v-15.144l-7 2.544v12.6zm14 0v-8.558l-5-1.667v10.225h5z" fill="#000"/></svg>',tooltip:!0}),e.on("execute",(()=>{this.villageBlockModal.show()})),e}))}_createModal(){let e=document.createElement("div");e.classList.add("villageblockmodal__slide"),e.id="villageBlock__modal",e.innerHTML='<div class="villageblockmodal__overlay" data-villageblockmodal-close><div class="villageblockmodal__container"><div class="villageblockmodal__header"><p class="villageblockmodal__title">Добавить карточку КП</p><span class="villageblockmodal__close" data-villageblockmodal-close></span></div><div class="villageblockmodal__content"><input hidden="hidden" name="villageblocknid" type="text"><div class="villageblockmodal__field"><input placeholder="Название КП" name="villageblockname" type="text"><label for="villageblockname">Название КП</label></div></div><div class="villageblockmodal__footer"><button disabled class="villageblockmodal__button">Добавить КП</button></div></div></div>',document.body.append(e),this.villageBlockModal=new a({id:"villageBlock__modal",disableScroll:!0});let t=e.querySelector('input[name="villageblockname"]'),l=e.querySelector('input[name="villageblocknid"]'),i=e.querySelector(".villageblockmodal__button");t.addEventListener("input",(async()=>{let e=await async function(e){if(!e||e.length<2)return{};let t=new URLSearchParams;t.set("data",JSON.stringify(e));let l=await fetch("/system/search",{method:"POST",headers:{"X-Requested-With":"XMLHttpRequest"},body:t});if(l.ok)return(await l.json()).val;console.log(l)}(t.value);if(0===Object.keys({}).length)return;let i=t.parentNode,o=i.querySelector(".villageblockmodal__field__result");o||(o=document.createElement("div"),o.classList.add("villageblockmodal__field__result"),i.append(o)),o.innerHTML=e,o.querySelectorAll(".line[data-sid]").forEach((e=>{e.addEventListener("click",(()=>{let t=e?.dataset?.sid;if(!t)return;l.value=t;let i=new Event("change");l.dispatchEvent(i),o.remove()}))}))})),l.addEventListener("change",(()=>{""!==l.value?i.disabled=!1:i.disabled=!0})),i.addEventListener("click",(()=>{this._insertComplexModal(l.value),this.villageBlockModal.hide(),t.value="",l.value="";let e=new Event("change");l.dispatchEvent(e)}))}_insertComplexModal(e){const t=this.editor.model;t.change((l=>{const i=this.editor.model.document.selection,o=l.createElement("placeholder",{...Object.fromEntries(i.getAttributes()),name:" complexInfo("+e+") "});t.insertObject(o,null,null,{setSelection:"on"})}))}}const d={VillageBlock:s}})(),i=i.default})()));