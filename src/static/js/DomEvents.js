import DomActions from './DomActions.js';
//import tsp from './ComponentsContainer.js';

export default class DomEvents{
    components_list= [];
    static _get_action_object(){
        return new DomActions()
    }

    _initialize_file_chat_switches_events(){//component container left-corner
        self = this;
        self.action_obj._initialize_file_chat_switches_actions();
    }
    _component_container_open_close(){
        /*component container open-close */
         $('#close-editor-button').on('click',function(){
          $('#pane').css('display','block');
         });
    }

    _create_component_open_close(){
       /*component create dialog open close*/
        var self = this;//this event obj
        $('.create-component').on('click',function(){
            let action_obj = DomEvents._get_action_object(self, this);
            action_obj._create_component_open_close(self,this);
        });
    }

    _download_video_click_event(){
        /*download youtube video*/
        self = this;
        $('#download-video-button').on('click',function(){
            self.action_obj.download_video_click_action();
        });
    }

    _maximize_icon_click_event(){
        self = this;
        self.prev_width = 0;
        self.prev_height = 0;
        $('.maximize-icon').on('click',function(){
            DomEvents._get_action_object().maximize_icon_click_action(self);
        });
    }
    _tabs_dropdown_click(){
        self = this;
        self.tabs_dropdown_click = 0;
        
        $('#tabs-list-drop-down').on('click',function(){
            let action_obj = DomEvents._get_action_object()
            action_obj._tabs_drop_down_click(self);
        });
        $('.tab').on('click',function(){

        });
    }
    _get_components_list(){
            let compo_names = [];
            let elems = $('.create-component');
            for (let i=0; i< elems.length;i++){
                compo_names.push(elems[i].title.toLowerCase());
            }
            return compo_names;
    }
    _create_component_form(){
        let self = this;
        $('#create-component-submit-btn').on('click',function(){
            let new_component_name = $('#create-component-text-box').val()
            if(new_component_name == ''){
                return;
            }
            let component_list = self._get_components_list();
            if(component_list.indexOf(new_component_name.toLowerCase()) < 0){
                /*create a new component button, building the same in current DOM and also in the backend;*/

                //building the DOM Button
                let new_component_button = `<button class='create-component create-component button tab-options-button' title='`+
                                        new_component_name + `' class="button tab-options-button">` +
			                            new_component_name + `</button>`;
                $('#component-tabs').append($(new_component_button));

                //building the component in DOM
                let action_obj = DomEvents._get_action_object();
                let ele = action_obj._build_new_component(new_component_name);
                $('#destination-container').append($(ele));
                $('#'+new_component_name).dialog();
                self._create_component_open_close();
            }
            else{
                 alert('Component Exists with the same name : '+ new_component_name);
            }
		});

		$('#close-create-component-form').on('click', function(){
				$('#create-component-form').css('display','none')
		});

        $('#create-component-add-btn').on('click',function(){
			$('#create-component-form').css('display','block');

		});
    }


    init(){
        this.action_obj = new DomActions();
        this._download_video_click_event();
        this._component_container_open_close();
        this._maximize_icon_click_event();
        this._initialize_file_chat_switches_events();
        this._create_component_open_close();
        this._create_component_form()
        this._tabs_dropdown_click();
    }

}


