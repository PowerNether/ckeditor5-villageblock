import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import { toWidget, viewToModelPositionOutsideModelElement } from "ckeditor5/src/widget";

const VillageBlockIcon = '<?xml version="1.0" encoding="UTF-8"?><svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m3 19v-13.3c-6e-5 -0.20528 0.06305-0.4056 0.18077-0.57377 0.11772-0.16816 0.28433-0.29603 0.47723-0.36623l9.671-3.516c0.0755-0.0275 0.1566-0.03637 0.2363-0.02587s0.1557 0.04007 0.2216 0.08619c0.0658 0.04612 0.1196 0.10744 0.1567 0.17876 0.0371 0.07131 0.0564 0.15053 0.0564 0.23092v4.953l6.316 2.105c0.1992 0.06635 0.3725 0.19371 0.4952 0.36405 0.1228 0.17033 0.1889 0.37498 0.1888 0.58495v9.279h2v2h-22v-2h2zm2 0h7v-15.144l-7 2.544v12.6zm14 0v-8.558l-5-1.667v10.225h5z" fill="#000"/></svg>';
class VillageBlockModal {
    id = '';
    disableScroll = false;
    openClass = 'villageblockmodal__slide__opened';
    trigger = '';

    constructor ({ id, disableScroll, openClass }) {
        this.id = id || '';
        this.disableScroll = disableScroll || false;
        this.openClass = openClass || 'villageblockmodal__slide__opened';

        this.modal = document.getElementById(this.id);

        if (this.modal !== null) {
            this.modal.classList.add('init');

            document.body.addEventListener('click', (event) => { this.showHandler(event) }, { passive: true });

            document.body.addEventListener('mousedown', (event) => { this.hideHandler(event) }, { passive: true });
        } else {
            console.error('Modal ID not found.');
        }
    }

    disabledScroll () {
        if (this.disableScroll) {
            let body = document.body;

            if (window.innerWidth > 768) {
                this.modal.querySelector('.villageblockmodal__overlay').style.paddingRight = '15px';
                body.style.transition = 'unset';
            }
            body.style.overflow = 'hidden';
            if (window.innerWidth > 768) body.style.paddingRight = '15px';
        }
    }

    activateScroll () {
        if (this.disableScroll) {
            let body = document.body;

            if (window.innerWidth > 768) {
                this.modal.querySelector('.villageblockmodal__overlay').style.paddingRight = null;
            }

            body.style.overflow = null;
            if (window.innerWidth > 768) {
                body.style.paddingRight = null;
                setTimeout(() => {
                    body.style.transition = null;
                }, 1);
            }
        }
    }

    escapeHandler () {
        if (event.keyCode === 27) {
            this.hide();
        }
    }

    showHandler () {
        if (event.target.closest(`[data-villageblockmodal-trigger="${ this.id }"]`)) {
            this.trigger = event.target;
            if (event.target.classList.contains('actions-item')) {
                let object__id = event.target.closest('.favoriteControl').getAttribute('data-object_id');
                this.modal.setAttribute('data-object-id', object__id);
            }
            this.modal.style.display = 'block';
            setTimeout(() => {
                this.modal.classList.add(this.openClass);
                this.disabledScroll();
            }, 1);

            document.addEventListener('keydown', (event) => { this.escapeHandler(event) });
        }
    }

    hideHandler () {
        if (event.target.getAttribute('data-villageblockmodal-close') !== null && event.which === 1) {
            if (event.target.closest('.villageblockmodal__slide').getAttribute('id') !== this.id) return;

            this.modal.classList.remove(this.openClass);
            setTimeout(() => {
                this.modal.style.display = 'none';
            }, 350);

            this.activateScroll();

            document.removeEventListener('keydown', this.escapeHandler);
        }
    }

    show () {
        this.modal.style.display = 'block';
        setTimeout(() => {
            this.modal.classList.add(this.openClass);
            this.disabledScroll();
        }, 350);
    }

    hide () {
        this.modal.classList.remove(this.openClass);
        this.activateScroll();
        setTimeout(() => {
            this.modal.style.display = 'none';
        }, 350);
    }

}


export default class VillageBlock extends Plugin {
    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.editing.mapper.on( 'viewToModelPosition', viewToModelPositionOutsideModelElement( this.editor.model, viewElement => viewElement.hasClass( 'villageBlock' ) ) );

        this._defineToolbarButton();
        this._createModal();
    }

    _defineSchema () {
        const schema = this.editor.model.schema;

        schema.register( 'placeholder', { inheritAllFrom: '$blockObject', allowAttributes: [ 'name' ] } );
    }

    _defineConverters () {
        const conversion = this.editor.conversion;

        conversion.for( 'upcast' ).elementToElement( {
            view: { name: 'div', classes: [ 'villageBlock' ] },
            model: ( viewElement, { writer: modelWriter } ) => { return modelWriter.createElement( 'placeholder', { name: viewElement.getChild( 0 ).data.slice( 2, -2 ) } ) }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'placeholder',
            view: ( modelItem, { writer: viewWriter } ) => { return toWidget( createPlaceholderView( modelItem, viewWriter ), viewWriter ) }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'placeholder',
            view: ( modelItem, { writer: viewWriter } ) => createPlaceholderView( modelItem, viewWriter )
        } );

        function createPlaceholderView( modelItem, viewWriter ) {
            const name = modelItem.getAttribute( 'name' );
            const placeholderView = viewWriter.createContainerElement( 'div', { class: 'villageBlock' } );
            const innerText = viewWriter.createText( '{{' + name + '}}' );

            viewWriter.insert( viewWriter.createPositionAt( placeholderView, 0 ), innerText );

            return placeholderView;
        }
    }

    _defineToolbarButton () {
        const componentFactory = this.editor.ui.componentFactory;

        componentFactory.add( 'villageBlock', () => {
            const button = new ButtonView();

            button.set( { label: 'Добавить блок ЖК/КП', icon: VillageBlockIcon, tooltip: true } );
            button.on( 'execute', () => { this.villageBlockModal.show() } );

            return button;
        } );
    }

    _createModal () {
        let modal__element = document.createElement('div');
        modal__element.classList.add('villageblockmodal__slide');
        modal__element.id = 'villageBlock__modal';

        modal__element.innerHTML = `<div class="villageblockmodal__overlay" data-villageblockmodal-close><div class="villageblockmodal__container"><div class="villageblockmodal__header"><p class="villageblockmodal__title">Добавить блок ЖК/КП</p><span class="villageblockmodal__close" data-villageblockmodal-close></span></div><div class="villageblockmodal__content"><input hidden="hidden" name="villageblocknid" type="text"><div class="villageblockmodal__field"><input placeholder="Название ЖК или КП" name="villageblockname" type="text"><label for="villageblockname">Название ЖК или КП</label></div></div><div class="villageblockmodal__footer"><button disabled class="villageblockmodal__button">Добавить блок</button></div></div></div>`;

        document.body.append(modal__element);

        this.villageBlockModal = new VillageBlockModal({
            id: 'villageBlock__modal',
            disableScroll: true,
        })

        let field_name = modal__element.querySelector('input[name="villageblockname"]');
        let field_nid = modal__element.querySelector('input[name="villageblocknid"]');
        let button = modal__element.querySelector('.villageblockmodal__button');

        async function search ( value ) {
          if (!value || value.length < 2) return {};

          let params = new URLSearchParams();
          params.set('data', JSON.stringify(value));
          params.set('type', JSON.stringify('ckeditor5_villageblock'));

          let response = await fetch('/system/search', { method: 'POST', headers: { 'X-Requested-With': 'XMLHttpRequest' }, body: params });

          if (response.ok) {
            let json = await response.json();

            return json['val']
          } else {
             console.log(response);
          }
        }

        field_name.addEventListener('input', async () => {
            let response = await search( field_name.value );
            if (Object.keys({}).length === 0) return;

            let parent = field_name.parentNode;
            let search__result = parent.querySelector('.villageblockmodal__field__result');

            if (!search__result) {
              search__result = document.createElement('div');
              search__result.classList.add('villageblockmodal__field__result');

              parent.append(search__result);
            }
            search__result.innerHTML = response;

            let lines = search__result.querySelectorAll('.line[data-sid]')
            lines.forEach(line => {
              line.addEventListener('click', () => {
                let nid = line?.dataset?.sid;
                if (!nid) return;

                field_nid.value = nid;

                let event = new Event('change')
                field_nid.dispatchEvent(event);

                search__result.remove();
              })
            })
        });
        field_nid.addEventListener('change', () => {
            (field_nid.value !== '') ? button.disabled = false : button.disabled = true;
        });
        button.addEventListener('click', () => {
            this._insertComplexModal(field_nid.value);

            this.villageBlockModal.hide();

            field_name.value = '';
            field_nid.value = '';

            let event = new Event('change')
            field_nid.dispatchEvent(event);
        });
    }

    _insertComplexModal ( id ) {
        const model = this.editor.model;

        model.change( writer => {
            const selection = this.editor.model.document.selection;
            const placeholder = writer.createElement( 'placeholder', { ...Object.fromEntries( selection.getAttributes() ), name: ' complexInfo(' + id + ') ' } );
            model.insertObject( placeholder, null, null, { setSelection: 'on' } );
        } );
    }
}
