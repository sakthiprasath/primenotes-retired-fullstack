$(document).ready(function(){

function myGeeks() {
            var t = document.getElementsByTagName("template")[0];
            var clone = t.content.cloneNode(true);
            document.body.appendChild(clone);
        }
myGeeks();



function get_file_from_server(componentClassName){

var defObj=$.Deferred();
componentClassName = 'html_components-' + componentClassName;
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

function revert_data(component_name){
get_file_from_server(component_name).done(function(data){
        document.getElementById("textareaCode").value=data;
        window.editor.getDoc().setValue(data);
        submitTryit(1);
});
}

function save_action(file_name){
            var savable_data = window.editor.getDoc().getValue();
            file_name = 'html_components-' + file_name;
            var defObj=$.Deferred();
                var promise =
                    $.ajax
                    ({
                        url: 'http://localhost:5000/api/individual-component-fetch/save-file/'+file_name,
                        data: JSON.stringify(savable_data),
                        type : "POST",
                        contentType: 'application/json;charset=UTF-8',
                        success : function(response){``
                            return defObj.resolve(response);
                        }
                    });
                return defObj.promise();
}

$('.code-save').on('click',function(){

save_action(component_name);
submitTryit(1);

});

$('.code-revert').on('click',function (){
revert_data(component_name);
});
var url =  window.url;
var component_name = url.split('?')[1].split('=')[1]
revert_data(component_name);

});

