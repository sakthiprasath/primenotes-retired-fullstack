
export default class Dialog {
    cache_elems() {
        let self = this;
        self.cache = {
            modal_ele: $("#modal-id"),
            modal_header_ele: $('.modal .header'),
            dialog_button: $('.dialog-button')
        }
        self.button_map = {
            'component-text-editor': 'Ok',
            'create-new-quick-file-form': 'Create',
        }
    }
    launch_dialog(form_id, header, id, html) {
        let self = this;
        self.current_dialog = form_id;
        self.current_ele_id = id;
        $('#modal-id').modal('show');
        $('.inner-item-form').hide();
        $('#' + form_id).show();
        if(header !== undefined)
            self.cache.modal_header_ele.empty().append(`<h2>${header}</h2>`);
        self.cache.dialog_button.show();
        switch (self.current_dialog) {
            /*if the dialog is for renaming file, then fill the dialog text box with current file name */
            case 'component-text-editor':
                {
                    $('#component-text-editor-textarea').summernote('code', html);
                    break;
                }
            case 'add-image-for-card':
                {
                    break;
                }
        }
        $('.dialog-button').text(self.button_map[self.current_dialog]);
    }
    close_dialog_action() {
        let self = this;
        self.cache.modal_ele.css("display", "none");

        $('.modal-content').removeClass('model-content-on-tree-clone');
    }
    events() {
        let self = this;
        let event_map = {
            boot_tree_note_dialog: function() {
                self.cache.dialog_button.hide();
                $('.dialog-button').click(function() { // on OK
                    switch (self.current_dialog) {
                        case 'component-text-editor':
                            {
                                let modified_html = $('#component-text-editor-textarea').summernote('code');
                                self.tsp.Accordion.action_map.on_component_text_edit_dialog_ok(self.current_ele_id, modified_html);
                                break;
                            }
                        case 'add-image-for-card':{
                                let url = $("#add-image-for-card-input").val();
                                self.tsp.Slate.action_map.on_add_image_with_url_dialog_ok(url, self.current_ele_id);
                                break;
                        }
                    }
                });
            },
            full_screen: () => {
                $('.ui.modal > .plus.icon').click(()=>{
                    self.cache.modal_ele.toggleClass('modal-full-screen');
                });
            },
            close_dialog: function() {
                $('.close-modal').click(function() {
                    self.close_dialog_action();
                });
            }
        }

        /* initializing eventlistners by calling above event_map in a loop*/
        for (let key in event_map) {
            //          console.log(event_map[key]);
            event_map[key]();
        }
    }
    actions(){
        //default on load action 1:
        let self = this;
         self.cache.modal_ele.modal({ closable: true });
    }
    init(tsp, to_return_Values) {
        tsp.Dialog = this;
        this.tsp = tsp;
        this.event_map = {};
        this.current_dialog = undefined;
        this.cache_elems();
        this.events();
        this.actions();
        return $.Deferred().resolve(tsp, to_return_Values);
    }

}