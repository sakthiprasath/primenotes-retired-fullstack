import DomActions from './DomActions.js';
//import tsp from './ComponentsContainer.js';

export default class DomEvents{

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
        $('#create-component').on('click',function(){
            $('#create-component-dialog').dialog();
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

    init(){
        this.action_obj = new DomActions();
        this._download_video_click_event();
        this._component_container_open_close();
        this._maximize_icon_click_event();
        this._initialize_file_chat_switches_events();
        this._create_component_open_close();
    }

}


