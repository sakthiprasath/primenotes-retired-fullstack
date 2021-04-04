

export default class Dialog{
    cache_elems(){
        let self = this;
        self.cache = {
            modal : $("#modal-id"),
            modal_header : $('#modal-header')
        }
    }
    _create_new_project_file_form(form_id){
         let self = this;
         self.current_dialog = form_id;
         self.cache.modal.css("display", "block");
         $('.inner-item-form').hide();
         $('#' + form_id).show();
         self.cache.modal_header.empty().append('<h2>New File</h2>');
    }
    events(){
        let self = this;
        let event_map ={
            boot_tree_note_dialog : function(){
                 $('#create-new-file-submit-btn').click(function(){
                    switch( self.current_dialog ){
                        case 'new-project-file-create-form':{
                            self.tsp.TreeClass.action_function_map.create_new_tree_note_submit();
                            break;
                        }
                        case 'create-new-quick-file-form':{
                            self.tsp.loadComponentsContainer.action_function_map['create-new-file-submit-btn']();
                            break;
                        }
                    }
                 });
            },
            close_dialog : function(){
                $('.close-modal').click(function(){
                    self.cache.modal.css("display", "none");
                    if(self.tsp.TreeClass.cloned_folder_parent_in_tree !== null){
                       let q1 = $('#folder-clone-section').children().get(0);
                       let q2 = $('#folder-clone-section').children().get(1);
                       $(self.tsp.TreeClass.cloned_folder_parent_in_tree).empty().append(q1);
                       $(self.tsp.TreeClass.cloned_folder_parent_in_tree).append(q2);
                       self.tsp.TreeClass._events();
                       self.tsp.SourceCodeSection.events();
                       self.tsp.TreeClass.cloned_folder_parent_in_tree = null;
                    }
                });
            }
        }

        /* initializing eventlistners by calling above event_map in a loop*/
        for (let key in event_map) {
//          console.log(event_map[key]);
          event_map[key]();
        }
    }
    init(tsp, to_return_Values){
        tsp.Dialog = this;
        this.tsp = tsp;
        this.event_map = {};
        this.current_dialog = undefined;
        this.cache_elems();
        this.events();
        return $.Deferred().resolve(tsp, to_return_Values);
    }

}

