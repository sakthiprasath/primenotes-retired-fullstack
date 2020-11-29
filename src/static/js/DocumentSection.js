




export default class SourceCodeSection{
    code_mirror_editor='';

    removeCurrentTab(ele) {
      $(ele).parent().parent().remove();
    };
     _tabs_dropdown_click(){
        let self = this;
        self.tabs_dropdown_click_flag = 0;

        $('#tabs-list-drop-down').on('click',function(){
            let action_obj = self.tsp.DomActions;
            action_obj._tabs_drop_down_click(self);
        });

    }
    _move_tabs_for_source_code_section(){
        /*move tabs left right */
            $('#move-tabs-right').on('click',function(){
                let curr_target = $('#tab-container');
                let tabs_container_left = parseInt(curr_target.css('left'));
                curr_target.css('left', tabs_container_left + 100);
            });
            $('#move-tabs-left').on('click',function(){
                let curr_target = $('#tab-container');
                let tabs_container_left = parseInt(curr_target.css('left'));
                curr_target.css('left', tabs_container_left - 100);
            });
    }
    _highlight_and_fetch(tab_elem){
        if($(tab_elem).parent().hasClass('tab-active')){
            return false;
        }
        $('.file-get-section').parent().removeClass('tab-active');
        $(tab_elem).parent().addClass('tab-active');
    }
    get_editor_file(curr,type, flag, file_path){
            let self = this;
            $('.file-get-section').parent().removeClass('tab-active');
                if (flag == true){
                    if(this._highlight_and_fetch($(curr)) == false){

                        return;

                    }
                }
                $(curr).parent().addClass('tab-active');
                let file_name = $(curr).text();
                $.when(this.getComponentHtmlFromServer(file_path)).done(function(res){
                                self._fill_test_area(res, type);
                });

    }

    save_editor_file(file_path, type, new_file_Flag){
//       let text_ele = $(curr).parent();
//       if ( text_ele.parent().hasClass('tab-active') == false ) {
//            return;
//       }

//        let file_name = text_ele.parent().children()[0].textContent;
        let savable_data = ''
//        file_name = 'separate_project-'+ file_name;
        if (new_file_Flag != true && type == 'document')
            savable_data =  $('#summer-note').summernote('code');
        else if(new_file_Flag != true){
            savable_data = this.code_mirror_editor.getValue();
        }

        var defObj=$.Deferred();
                var promise =
                    $.ajax
                    ({
                        url: 'http://localhost:5000/api/individual-component-fetch/save-file?file_path=' + (file_path),
                        data: JSON.stringify(savable_data),
                        type : "POST",
                        contentType: 'application/json;charset=UTF-8',
                        success : function(response){
                            return defObj.resolve(response);
                        }
                    });
        return defObj.promise();
}

    buildTab(file_name, type, file_path){

        /*Build a tab on file-tree click*/

        /*find the to-build-tab filename is already present in tab container*/
        let tab_elems = $('.file-get-section');
        let len =tab_elems.length;
        for(let i=0;i < len ;i++){
            let curr_file_name = $(tab_elems[i]).text();
            if(curr_file_name === file_name){
                this._highlight_and_fetch(tab_elems[i]);
                this.get_editor_file(tab_elems[i], type, 'false', file_path);
                this.events();
                return;
            }
        }

        var resultHtml= `<div class='tab' `;

        resultHtml += `><div class='file-get-section' file-type=${type} file-path='${file_path}'  title='${file_name}'>${file_name}`;//$(this).text();
        resultHtml +=`</div> <div class='save-close-for-tab'>   <div class='close-tab' > X </div></div> </div>`;
        let curr = $(resultHtml);
    //    $('#tab-container').append(curr);
        $('#create-new-project-note').before(curr);
        this.get_editor_file(curr.children()[0], type, false, file_path);

        this.events();
        return this;
    }

    _fill_test_area(general_Text, type){

        if( type == 'document'){
            $('#code-editor').css('display', 'none');
            $('#summer-note').css('display', 'block');
            $('.note-editor').css('display', 'block');



            $('#summer-note').summernote('code', general_Text);

            return;
        }

        $('#code-editor').css('display', 'block');
        $('#summer-note').css('display', 'none');
        $('.note-editor').css('display', 'none');

        $('.cm-s-material').remove();
        $('#js').text(general_Text);
        this.code_mirror_editor = CodeMirror.fromTextArea(document.getElementById('js'), {
            lineNumbers: true,
            mode: 'javascript',
            theme: 'material'
          });

          this.code_mirror_editor.setSize(null,535);
          this.code_mirror_editor.focus();
          this.code_mirror_editor.on('blur',function(){
                let active_file_name =  $('.tab-active').children()[0].textContent;
                console.log(active_file_name);
                this.save_editor_file(active_file_name);
            });



    }

    getComponentHtmlFromServer(file_path){

        var defObj=$.Deferred();
            var promise =
                $.ajax
                ({
                    url:'http://localhost:5000/api/individual-component-fetch/general_files/separate_project?file_path='+ JSON.stringify(file_path),
                    type : "GET",
                    contentType:'application/x-www-form-urlencoded',
                    success : function(response){
                        return defObj.resolve(response);
                    }
                });
            return defObj.promise();
        };

    _initialise_summer_note(){
        $('#summer-note').summernote({
                      placeholder: 'Write Your Document here...',
                      height: 500,                 // set editor height
                      minHeight: null,             // set minimum height of editor
                      maxHeight: null,             // set maximum height of editor
                      focus: true                  // set focus to editable area after initializing summernote

                });
    }

    events(){
        let self = this;

        $('.file-get-section').off('click');
        $('.file-get-section').on('click', function(){
            if ( $(this).attr('file-type') == 'document' ){
                //save_file_func = "this.save_editor_file(this,'document');"
                self.get_editor_file(this, 'document', false,  $(this).attr('file-path'));
            }
            else{
                type = 'code'
                //save_file_func = "this.save_editor_file(this);";
                self.get_editor_file(this, 'code', false,  $(this).attr('file-path'));
            }
        });

        $('.close-tab').off('click');
        $('.close-tab').on('click', function(){
            self.removeCurrentTab(this);

        });

        $('.file-click').off('click');
        $('.file-click').on('click',function(){
            $('.file-click.project-file-active').removeClass('project-file-active');
            $(this).addClass('project-file-active');
            let file_name = $(this).attr('filename');
            let file_path = $(this).attr('file-path');
            let type =  $(this).attr('file-type');
            if( type  == 'document'){

                self.buildTab(file_name, type, file_path);
                self._initialise_summer_note();
            }
            else{
                    self.buildTab(file_name, type, file_path);
            }
        });

        $("#summer-note").off("summernote.blur");
        $("#summer-note").on("summernote.blur", function(){

            var markupStr = $('#summer-note').summernote('code');

    //    	console.log(markupStr);

            let active_file_path = $($('.tab-active').children()[0]).attr('file-path');
            self.save_editor_file(active_file_path, 'document', false);

        });

        let untitled = 1;
        $('#add-new-file-in-project-notes').on('click', function(){
            self.save_editor_file('untitled_' + untitled,'document', true);
            self.buildTab('untitled_' + untitled, 'document')
            untitled++;
        });

    }//end of events

    init(tsp, to_return_values){
//        this._initialise_summer_note();
        tsp.SourceCodeSection = this;
        this.tsp = tsp;
        this.events(); //this might be called more than once ondemand
        this._tabs_dropdown_click();
        this._move_tabs_for_source_code_section();
        return $.Deferred().resolve(tsp, to_return_values);
    }



}