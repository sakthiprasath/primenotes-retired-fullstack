

export default class Header{

     _header_orientation_events(){
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

                $('#top-header').removeClass('top-header-right-margin');
                $('#top-header').removeClass('top-header-top-margin');
                $('#top-header').removeClass('top-header-bottom-margin');
                $('#top-header').addClass('top-header-left-margin');

                $('#logo-section').removeClass('logo-section-top-margin');
                $('#logo-section').addClass('logo-section-right-margin');

                $('.open-close').addClass('tab-option-buttons-right-in-margin');
                $('#top-header-tab-options').addClass('top-header-right-margin-tab-options');

                $('#destination-container').css('top',0);
                $('#destination-container').css('width','calc(100% - 125px)');
                $('#destination-container').css('left','125px');

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
        self.active_bg_color = '#3d3f57';
        self.inactive_bg_color = '#7ebdd2';
        function _hide_all_main_section_wrapper_class(){
            $('.main-section-wrapper-class').css('display','none');
            let css_map = {'background':self.inactive_bg_color,
                            'color': 'black'};
            $('.open-close').css(css_map);


        }
        $('#open-close-overlay').on('click',function(){
            _hide_all_main_section_wrapper_class();
            $('#overlay').css('display','block');
            let css_map = {'background':'rgb(20 222 92)',
                            'color': 'black'};
            $(this).css(css_map);
            self.tsp.DomActions._create_new_project_file_form(self, 'right-side-section');
        });

        $('#html-renderer').on('click',function(){
            _hide_all_main_section_wrapper_class();
            $('#html-renderer-section').css('display','block');
            let css_map = {'background':'rgb(20 222 92)',
                            'color': 'black'};
            $(this).css(css_map);
        });

        $('#main-section-button').on('click',function(){
            _hide_all_main_section_wrapper_class();
            $('#main-sections').css('display','block');
            let css_map = {'background':'rgb(20 222 92)',
                            'color': 'black'};
            $(this).css(css_map);
        });


    }
    init(tsp, to_return_Values){
        tsp.Header = this;
        this.tsp = tsp;
        this._header_orientation_events();
        this._open_close_main_section_wrapper();
        return $.Deferred().resolve(tsp, to_return_Values);
    }

}

