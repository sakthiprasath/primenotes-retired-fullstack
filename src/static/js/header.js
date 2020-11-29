

export default class Header{
        _header_left_orientation(){
               $('#top-header').removeClass('top-header-right-margin')
                                .removeClass('top-header-top-margin')
                                .removeClass('top-header-bottom-margin')
                                .addClass('top-header-left-margin');

                $('#logo-section').removeClass('logo-section-top-margin')
                                  .addClass('logo-section-right-margin');

                $('.open-close').addClass('tab-option-buttons-right-in-margin');
                $('#top-header-tab-options').addClass('top-header-right-margin-tab-options');

                $('#destination-container').css({'top':'0',
                                                 'width':'calc(100% - 125px)',
                                                 'left':'125px'
                                                });
             }
     _header_orientation_events(){
              let self = this;


            $('#right-header-id').on('click',function(){

                $('#top-header').removeClass('top-header-top-margin');
                $('#top-header').removeClass('top-header-left-margin');
                $('#top-header').removeClass('top-header-bottom-margin');

                $('#top-header').addClass('top-header-right-margin');

                $('#logo-section').removeClass('logo-section-top-margin');
                $('#logo-section').addClass('logo-section-right-margin');

                $('.open-close').addClass('tab-option-buttons-right-in-margin');
                $('#top-header-tab-options').addClass('top-header-right-margin-tab-options');

                $('#destination-container').css('top',0);
                $('#destination-container').css('left',0);
                $('#destination-container').css('width','calc(100% - 125px)');
            });
            $('#top-header-id').on('click',function(){

                $('#top-header').removeClass('top-header-right-margin');
                $('#top-header').removeClass('top-header-left-margin');
                $('#top-header').removeClass('top-header-bottom-margin');
                $('#top-header').addClass('top-header-top-margin');

                $('#logo-section').removeClass('logo-section-right-margin');
                $('#logo-section').addClass('logo-section-top-margin');

                $('.open-close').removeClass('tab-option-buttons-right-in-margin');
                $('#top-header-tab-options').removeClass('top-header-right-margin-tab-options');

                $('#destination-container').css('top',50);
                $('#destination-container').css('left',0);
                $('#destination-container').css('width','100%');

            });

            $('#left-header-id').on('click',function(){
                self._header_left_orientation();
            });

            $('#bottom-header-id').on('click',function(){

                $('#top-header').removeClass('top-header-right-margin');
                $('#top-header').removeClass('top-header-left-margin');
                $('#top-header').removeClass('top-header-top-margin');
                $('#top-header').addClass('top-header-bottom-margin');

                $('#logo-section').removeClass('logo-section-right-margin');
                $('#logo-section').addClass('logo-section-top-margin');

                $('.open-close').removeClass('tab-option-buttons-right-in-margin');
                $('#top-header-tab-options').removeClass('top-header-right-margin-tab-options');

                $('#destination-container').css('top',0);
                $('#destination-container').css('left',0);
                $('#destination-container').css('width','100%');
            });
        }

    _open_close_main_section_wrapper(){
        let self = this;
        let tree_navigation_open_close = 0;
        self.active_css = { 'background-color': 'rgb(73 117 152)'};
        self.inactive_css = { 'background-color': '#2d5779'};

        function _hide_all_main_section_wrapper_class(){
            $('.main-section-wrapper-class').css('display','none');
            $('.button-with-icon-in-header').css(self.inactive_css);
        }
        $('#close-editor-button').on('click',function(){
            _hide_all_main_section_wrapper_class();
            $('#pane').css({'display':'block'});
            $(this).css(self.active_css);

         });

        $('#open-close-overlay').on('click',function(){
            _hide_all_main_section_wrapper_class();
            $('#pane').css({'display':'block'});
            $('#overlay').css('display','block');
            $(this).css(self.active_css);
        });


        $('#main-section-button').on('click',function(){
            _hide_all_main_section_wrapper_class();
            $('#main-sections').css('display','block');
            $(this).css(self.active_css);
            if(tree_navigation_open_close === 0){
                $('#closebtn').click();
                tree_navigation_open_close = 1;
            }
            else{
                $('#sidenav-button-id').click();
                tree_navigation_open_close = 0;
            }
        });

        $('#html-renderer').on('click',function(){
            _hide_all_main_section_wrapper_class();
            $('#html-renderer-section').css('display','block');
            $(this).css(self.active_css);
        });

    }
    _header_drag_bar_events(){
        var top_header_flag = 0;
        $('.top-header-drag-bar').on('click',function(){
           if(top_header_flag === 0 ){
            $('#top-header').width('50px');
            $('#destination-container').css({
                'left':'50px',
                'width':'calc(100% - 53px)'
            });
            $('#pane').css({
                'left':'20px',
                'width':'calc(100% - 20px)'
            });

            $('.logo-quotes').hide();
            $('#prime-notes-logo').css('left','0px')
            $('.open-close').hide();
            top_header_flag = 1;
        }
        else{
            $('#top-header').width('125px');
            $('#destination-container').css({
                'left':'125px',
                'width':'calc(100% - 125px)'
            });
            $('#pane').css({
                'left':'98px',
                'width':'calc(100% - 90px)'
            });
            $('.logo-quotes').show();
            $('#prime-notes-logo').css('left','40px')
            $('.open-close').show();
            top_header_flag = 0;
        }
      });
    }
    init(tsp, to_return_Values){
        tsp.Header = this;
        this.tsp = tsp;
        this._header_orientation_events();
        this._open_close_main_section_wrapper();
        this._header_drag_bar_events()
        this._header_left_orientation();
        return $.Deferred().resolve(tsp, to_return_Values);
    }

}

