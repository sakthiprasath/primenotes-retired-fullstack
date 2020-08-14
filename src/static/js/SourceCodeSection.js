
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
function get_editor_file(curr, flag){
            $('.file-get-section').parent().removeClass('tab-active');
                if (flag == true){
                    if(_highlight_and_fetch($(curr)) == false){

                        return;
                    }
                }
                $(curr).parent().addClass('tab-active');
                file_name = $(curr).text();
                console.log(file_name)
                file_name ='separate_project-'+ file_name ;
                $.when(getComponentHtmlFromServer(file_name)).done(function(res){
                                _fill_test_area(res);
                });

}

function save_editor_file(curr){
       let text_ele = $(curr).parent();
       if ( text_ele.parent().hasClass('tab-active') == false ) {
            return;
       }
        let file_name = text_ele.parent().children()[0].textContent;
        file_name = 'separate_project-'+ file_name;
        savable_data = code_mirror_editor.getValue();
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

function buildTab(file_name, display){

    /*Build a tab on file-tree click*/

    /*find the to-build-tab filename is already present in tab container*/
    let tab_elems = $('.file-get-section');
    for(let i=0;i < tab_elems.length;i++){
        let curr_file_name = $(tab_elems[i]).text();
        if(curr_file_name === file_name){
            _highlight_and_fetch(tab_elems[i]);
            get_editor_file(tab_elems[i]);
            return;
        }
    }

    var resultHtml= "<div class='tab' ";
    if (display == 'none'){
        resultHtml += " style='display:none;' ";
    }
    resultHtml+= "><div class='file-get-section' onclick='get_editor_file(this);'   title='" + file_name +"'>"+ file_name;//$(this).text();
    resultHtml+="</div> <div class='save-close-for-tab'>  <div class='save-editor-file' onclick='save_editor_file(this);'>    <img class='save-editor-img-icon' src='https://img.icons8.com/dusk/64/000000/save.png' />          </div> <div class='close-tab' onclick='removeCurrentTab(this)'> X </div></div> </div>";
    let curr = $(resultHtml);
    $('.tab-container').append(curr);
    get_editor_file(curr.children()[0]);

}

function _fill_test_area(general_Text){
console.log(general_Text);
$('.cm-s-material').remove();
$('#js').text(general_Text);
code_mirror_editor = CodeMirror.fromTextArea(document.getElementById('js'), {
    lineNumbers: true,
    mode: 'javascript',
	theme: 'material'
  });
  code_mirror_editor.setSize(null,535);
}

function getComponentHtmlFromServer(componentClassName){

var defObj=$.Deferred();
	var promise =
		$.ajax
		({
			url:'http://localhost:5000/api/individual-component-fetch/general_files/'+componentClassName,
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
	buildTab(file_name);

	});












	
});
