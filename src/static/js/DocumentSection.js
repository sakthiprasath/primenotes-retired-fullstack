
var code_mirror_editor='';

function removeCurrentTab(ele) {
  $(ele).parent().parent().remove();
};

function _highlight_and_fetch(tab_elem){
    if($(tab_elem).parent().hasClass('tab-active')){
        return false;
    }
    $('.file-get-section').parent().removeClass('tab-active');
    $(tab_elem).parent().addClass('tab-active');
}
function get_editor_file(curr,type, flag){
            $('.file-get-section').parent().removeClass('tab-active');
                if (flag == true){
                    if(_highlight_and_fetch($(curr)) == false){

                        return;

                    }
                }
                $(curr).parent().addClass('tab-active');
                file_name = $(curr).text();
                $.when(getComponentHtmlFromServer(file_name)).done(function(res){
                                _fill_test_area(res, type);
                });

}

function save_editor_file(file_name, type, new_file_Flag){
//       let text_ele = $(curr).parent();
//       if ( text_ele.parent().hasClass('tab-active') == false ) {
//            return;
//       }

//        let file_name = text_ele.parent().children()[0].textContent;
        let savable_data = ''
        file_name = 'separate_project-'+ file_name;
        if (new_file_Flag != true && type == 'document')
            savable_data =  $('#summer-note').summernote('code');
        else if(new_file_Flag != true){
            savable_data = code_mirror_editor.getValue();
        }

        var defObj=$.Deferred();
                var promise =
                    $.ajax
                    ({
                        url: 'http://localhost:5000/api/individual-component-fetch/save-file/'+file_name,
                        data: JSON.stringify(savable_data),
                        type : "POST",
                        contentType: 'application/json;charset=UTF-8',
                        success : function(response){
                            return defObj.resolve(response);
                        }
                    });
        return defObj.promise();
}

function buildTab(file_name, type){

    /*Build a tab on file-tree click*/

    /*find the to-build-tab filename is already present in tab container*/
    let tab_elems = $('.file-get-section');
    let len =tab_elems.length;
    for(let i=0;i < len ;i++){
        let curr_file_name = $(tab_elems[i]).text();
        if(curr_file_name === file_name){
            _highlight_and_fetch(tab_elems[i]);
            get_editor_file(tab_elems[i],type,'false');
            return;
        }
    }

    var resultHtml= `<div class='tab' `;
//    if (display == 'none'){
//        resultHtml += " style='display:none;' ";
//    }
    let get_file_func = '';
    let save_file_func = '';
    if ( type == 'document' ){
        get_file_func = "get_editor_file(this,'document');"
//        save_file_func = "save_editor_file(this,'document');"
    }
    else{
        type = 'code'
        get_file_func =  "get_editor_file(this);";
//        save_file_func = "save_editor_file(this);";

    }

    resultHtml+= `><div class='file-get-section' type=${type} onclick=${get_file_func} title=${file_name}>${file_name}`;//$(this).text();
    resultHtml+=`</div> <div class='save-close-for-tab'>   <div class='close-tab' onclick='removeCurrentTab(this)'> X </div></div> </div>`;
    let curr = $(resultHtml);
//    $('#tab-container').append(curr);
    $('#create-new-project-note').before(curr);
    get_editor_file(curr.children()[0], type);

}

function _fill_test_area(general_Text, type){

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
    code_mirror_editor = CodeMirror.fromTextArea(document.getElementById('js'), {
        lineNumbers: true,
        mode: 'javascript',
        theme: 'material'
      });

      code_mirror_editor.setSize(null,535);
      code_mirror_editor.focus();
      code_mirror_editor.on('blur',function(){
            let active_file_name =  $('.tab-active').children()[0].textContent;
            console.log(active_file_name);
            save_editor_file(active_file_name);
        });



}

function getComponentHtmlFromServer(componentClassName){

var defObj=$.Deferred();
	var promise =
		$.ajax
		({
			url:'http://localhost:5000/api/individual-component-fetch/general_files/separate_project/'+componentClassName,
			type : "GET",
			contentType:'application/x-www-form-urlencoded',
			success : function(response){
				return defObj.resolve(response);
			}
		});
	return defObj.promise();
};
$(document).ready(function(){

	$('.file-click').on('click',function(){
	let file_name = $(this).attr('filename');
	let type =  $(this).attr('file-type');
	if( type  == 'document'){

        buildTab(file_name, type);
         $('#summer-note').summernote({
              placeholder: 'ssasasaa',
              height: 500,                 // set editor height
              minHeight: null,             // set minimum height of editor
              maxHeight: null,             // set maximum height of editor
              focus: true                  // set focus to editable area after initializing summernote

        });

    }
    else{
            buildTab(file_name, type);
    }

	});


	$("#summer-note").on("summernote.blur", function(){

		var markupStr = $('#summer-note').summernote('code');

//    	console.log(markupStr);
    	let active_file_name =  $('.tab-active').children()[0].textContent;
        console.log(active_file_name);
        save_editor_file(active_file_name, 'document');

    });
    let untitled = 1;
    $('#add-new-file-in-project-notes').on('click', function(){
        save_editor_file('untitled_' + untitled,'document', true);
        buildTab('untitled_' + untitled, 'document')
        untitled++;
    });

});
