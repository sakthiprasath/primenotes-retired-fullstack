
var code_mirror_editor='';

function removeCurrentTab(ele) {
  $(ele).parent().remove();
};

function get_editor_file(curr){
                $('.file-get-section').removeClass('tab-active');
                $(curr).addClass('tab-active');
                file_name = $(curr).text();
                console.log(file_name)
                file_name ='separate_project-'+ file_name ;
                $.when(getComponentHtmlFromServer(file_name)).done(function(res){
                                _fill_test_area(res);
                });

}

function save_editor_file(curr){
        file_name = 'separate_project-'+ $(curr).parent().text();
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

    var resultHtml= "<div class='tab' ";
    if (display == 'none'){
        resultHtml += " style='display:none;' ";
    }
          resultHtml+= "><div class='file-get-section' onclick='get_editor_file(this);' style='width: 61px;'>"+ file_name;//$(this).text();
         resultHtml+="</div> <div class='save-editor-file' onclick='save_editor_file(this);'>    <img class='save-editor-img-icon' src='https://img.icons8.com/dusk/64/000000/save.png' />          </div> <div class='close-tab' onclick='removeCurrentTab(this)'> <img  class='close-tab-img' src='https://img.icons8.com/color/48/000000/close-window.png'></img></div></div>";
             $('.tab-container').append($(resultHtml));

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

//	for(let i=0;i<1;i++){
//	    alert();
//	   buildTab('summa_for_creating_eventlistner');
//	}



	

	$('.file-click').on('click',function(){
	file_name = $(this).attr('filename');
	buildTab(file_name);

	});
	
});
