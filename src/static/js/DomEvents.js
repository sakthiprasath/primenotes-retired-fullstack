import DomActions from './DomActions.js';
import loadComponentsContainer from './ComponentsContainer.js';
import SourceCodeSection from './DocumentSection.js';

export default class DomEvents{
    components_list= [];
    active_component_dialog_elements = [];

       _button_clicks(){

//        $('#add-new-file-in-project-notes').click();
        /*initial clicks for file*/
            setTimeout( function(){
            ($('.file-click')[0]).click()
            $('#stream-youtube-video').click();
            $('.top-header-drag-bar').click();
               ($('.individual-search')[0]).click();
            },1500);
        /*password validate for drowssap
            $('#password-validate-dialog').dialog({
                autoOpen: false,
                width:'90%',
                height:'700'
            });*/
        /*close File container*/
//        $('#close-component-results-container').click();

    }
    static _get_action_object(){
        return new DomActions()
    }
    static _get_components_container_object(){
        return new loadComponentsContainer()
    }


    _initialize_tool_tips(){
       $('[data-toggle="tooltip"]').tooltip();
    }




    _download_video_click_event(){
        /*download youtube video*/
        self = this;
        $('#download-video-button').on('click',function(){
            self.action_obj.download_video_click_action();
        });
    }








//    this._create_event_listeners_for_dragbar('.split__left','.split__bar','#source-code-main-div', 'destimation-container');

    _create_event_listeners_for_dragbar(){
        const bar = $('.split__bar');
        const left_part = $('.split__left');
        const right_part = $('#parent-source-code-main-div');
        let self = this;
        self.mouse_is_down = false;

        bar.on('mousedown', function(e){
          $(this).css({
            'width':'5px'
          });
          self.mouse_is_down = true;
        });

        $(document).on('mousemove', (e) => {
          let header_width = $('#top-header').width();
          if (!self.mouse_is_down) return;
          let screenWidth = screen.width;
          let q1 = screenWidth - parseInt(`${e.clientX}px`);
          let q2 =  parseInt(`${e.clientX}px`);
          left_part.css('width', `${e.clientX}px`);
          right_part.css('width',q1 - header_width);
          right_part.css('left',q2 - header_width);
          bar.css('left',q2 - header_width);
        })

        document.addEventListener('mouseup', () => {
          self.mouse_is_down = false;
        })
    }




    _initialize_local_video_Stream(){
        (function localFileVideoPlayer() {
          'use strict'
          var URL = window.URL || window.webkitURL
          var displayMessage = function (message, isError) {
            var element = document.querySelector('#message')
            element.innerHTML = message
            element.className = isError ? 'error' : 'info'
          }
          var playSelectedFile = function (event) {
            var file = this.files[0]
            var type = file.type
            var videoNode = document.getElementById('local-stream-video-node')
            var canPlay = videoNode.canPlayType(type)
            if (canPlay === '') canPlay = 'no'
            var message = 'Can play type "' + type + '": ' + canPlay
            var isError = canPlay === 'no'
            displayMessage(message, isError)

            if (isError) {
              return
            }

            var fileURL = URL.createObjectURL(file)
            videoNode.src = fileURL;

            videoNode.style.width = '400px';
            videoNode.style.height = '300px';
          }
          var inputNode = document.getElementById('local-stream')
          inputNode.addEventListener('change', playSelectedFile, false);

//          $('#local-stream').on('change', function(){
//            playSelectedFile();
//          });
        })()

    }

//    _delete_file_in_the_backend()
//    _mark_favourite_in_the_backend()




    init(tsp, label_map){
        this.super_parent = tsp;
        this.label_map = label_map;
        let self = this;
        tsp.DomEvents = this;
        this.action_obj = new DomActions();

        this._download_video_click_event();
        this._initialize_tool_tips();
        this._create_event_listeners_for_dragbar();
        this._initialize_local_video_Stream();
        this._button_clicks();
        return $.Deferred().resolve(tsp, label_map);
    }

}


