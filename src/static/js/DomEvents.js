import DomActions from './DomActions.js';
import loadComponentsContainer from './ComponentsContainer.js';
import SourceCodeSection from './DocumentSection.js';

export default class DomEvents {
    components_list = [];
    active_component_dialog_elements = [];
    _triggerClick(selector) {
        $(selector).click();
    }
    _button_clicks() {
        /*initial clicks for file*/
        let self = this;
        setTimeout(function() {

            $($('.ui.tabular.menu').children().get(0)).click()
            $($('.folder-section')[0]).hide().click();
            $($('.individual-search')[2]).click();
            //            ($('.file-click')[0]).click();
            self.tsp.DetailsPanel.close_details();
            $('#sidenav-button-id1').click();
            self.tsp.loadComponentsContainer.split_and_full_screen_UI();
            self.tsp.GlobalConstants.current_window = 1; //golbal declaration
            $('#close-editor-button').addClass('top-header-highlighter').click();
            setTimeout(function(){
                $('#close-editor-button').click();
            },100)
            $('#stream-youtube-video').click();
            self._triggerClick('#main-section-button');
        }, 1500);




        /*password validate for drowssap
            $('#password-validate-dialog').dialog({
                autoOpen: false,
                width:'90%',
                height:'700'
            });*/
        /*close File container*/
        //$('#close-component-results-container').click();

    }
    static _get_action_object() {
        return new DomActions()
    }
    static _get_components_container_object() {
        return new loadComponentsContainer()
    }


    _initialize_tool_tips() {
        //       $('[data-toggle="tooltip"]').tooltip();
    }




    _download_video_click_event() {
        /*download youtube video*/
        self = this;
        $('#download-video-button').on('click', function() {
            self.action_obj.download_video_click_action();
        });
    }








    //    this._create_event_listeners_for_dragbar('.split__left','.split__bar','#source-code-main-div', 'destimation-container');

    _create_event_listeners_for_dragbar() {
        const bar = $('.split__bar');
        const left_part = $('.split__left');
        const right_part = $('#parent-source-code-main-div');
        let self = this;
        self.mouse_is_down = false;
        const split_bar_width = 3;
        bar.on('mousedown', function(e) {
            $('#display-tab-setting-backdrop').show()
            $(this).css({
                'width': split_bar_width
            });
            self.mouse_is_down = true;
        });

        $(document).on('mousemove', (e) => {
            let header_width = $('#top-header').width();
            let screenWidth = screen.width;
            let q1 = screenWidth - parseInt(`${e.clientX}px`);
            let q2 = parseInt(`${e.clientX}px`);
            if (!self.mouse_is_down || q2 >= (screenWidth / 2)) return;
            left_part.css('width', q2 - 53);
            right_part.css('width', q1 - header_width + 50); // +50 is for top-header
            right_part.css('left', q2 - header_width);
            bar.css('left', q2 - header_width - split_bar_width);
        })

        document.addEventListener('mouseup', () => {
            self.mouse_is_down = false;
            $('#display-tab-setting-backdrop').hide()
        })
    }




    _initialize_local_video_Stream() {
        (function localFileVideoPlayer() {
            'use strict'
            var URL = window.URL || window.webkitURL
            var displayMessage = function(message, isError) {
                var element = document.querySelector('#message')
                element.innerHTML = message
                element.className = isError ? 'error' : 'info'
            }
            var playSelectedFile = function(event) {
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

    keyboard_events() {
        let self = this;
        // When the user clicks anywhere outside of the modal, close it

        $(document).on('keyup', function(e) {
            if (self.tsp.current_window === undefined)
                self.tsp.current_window = 1;
            switch (self.tsp.current_window) {
                case 1:
                case 3:
                    {
                        if (e.keyCode === 187) { // shift + '+'
                            self.tsp.loadComponentsContainer.action_function_map.create_new_file();
                        } else if (e.keyCode === 46) {
                            self.tsp.loadComponentsContainer._delete_file_in_the_backend();
                        } else if (e.keyCode === 27) {
                            $('#modal-id').hide();
                        }
                        break;
                    }
                case 2:
                    {
                        if (e.keyCode === 27) {
                            $('#modal-id').hide();
                        }
                        break;
                    }
            }
        });



        $('input').keypress(function(e) {
            let target_id = e.target.id;

            if (e.keyCode === 13) {
                if (target_id === "create-file-text-box") {
                    self.tsp.loadComponentsContainer.action_function_map.create_new_file_submit_btn();
                }
            }
        });

    }

    prompt_before_refresh() {
        window.addEventListener("beforeunload", function(e) {
            var confirmationMessage = "\o/";

            (e || window.event).returnValue = confirmationMessage; //Gecko + IE
            return confirmationMessage; //Webkit, Safari, Chrome
        });
    }

    init(tsp, label_map) {
        this.tsp = tsp;
        this.label_map = label_map;
        let self = this;
        tsp.DomEvents = this;
        this.action_obj = new DomActions();

        this._download_video_click_event();
        this._initialize_tool_tips();
        this._create_event_listeners_for_dragbar();
        //        this._initialize_local_video_Stream();
        this._button_clicks();
        this.keyboard_events();
        this.prompt_before_refresh();
        return $.Deferred().resolve(this.tsp, label_map);
    }

}