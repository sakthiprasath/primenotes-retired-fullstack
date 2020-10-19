class Tree{
    _build_file(){

    }
    _build_nested_section(file_map){

    }
    _build_folder_section(name){
        let html = `<div class='folder-section' folder-name=${name}>`
			html +=				`<span class="folder">`
			html +=				  `<span class='open-close-folder'> > </span>`
			html +=				  `${name}`
			html +=				`</span>`
			html +=				`<span class='three-dots'>...</span>`
			html +=			`</div>`;
	return html;
    }
    _build_html(){
        _build_folder_section('sakthi_folder');

    }
    _get_tree_structure(){
        let temp_map = {};
         var defObj=$.Deferred();
            var promise =
                $.ajax
                ({
                    url:"http://localhost:5000/api/individual-component-fetch/tree/",
                    type : "GET",
                    contentType:'application/x-www-form-urlencoded',
                    success : function(response){

                        return defObj.resolve(response);
                    }
                });
            return defObj.promise();
    }
    init(){
//        this.build_html
        return (this._get_tree_structure())
    }

}

