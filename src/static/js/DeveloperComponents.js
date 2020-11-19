

export default class DeveloperComponents{
    _create_component_form(){
        let self = this;
        $('#create-component-submit-btn').on('click',function(){
            self.tsp.DomActions._create_component_submit_execution(self)
        });

		$('#close-create-component-form').on('click', function(){
				$('#create-component-form').css('display','none')
		});

        $('#create-component-add-btn').on('click',function(){
			$('#create-component-form').css('display','block');

		});
    }

    _create_component_buttons_generation(file_type){

         var defObj=$.Deferred();
            var promise =
                $.ajax
                ({
                    url:"http://localhost:5000/api/individual-component-fetch/get-all-files/" + file_type,
                    type : "GET",
                    contentType:'application/x-www-form-urlencoded',
                    success : function(response){
                        let files = {};
                        files = response;
                        for(let i in files){
                            let file = files[i];
                            let button_html = `<button class="create-component create-component button tab-options-button" title="` + file +`">`+
				                                file+ `</button>`;
                            $('#component-tabs').append($(button_html))
                        }

                        return defObj.resolve(response);
                    }
                });
            return defObj.promise();

    }

    _create_component_open_close(){
        let self = this;
       /*component create dialog open close*/

        this.active_component_dialog_element = '';

        self.tsp.DomActions._build_new_component().then(function(){
            self.dialog_component = self.tsp.DomActions._build_component_dialog().parent();
            $(self.dialog_component).css('display', 'none');
        });

        $('.create-component').on('click',function(){
            $(self.dialog_component).css('display', 'block');
            self.tsp.DomActions._create_component_open_close(self,this);
        });
    }


    init(tsp, to_return_values){
        this.tsp = tsp;
        let self = this;
        let def =  $.Deferred();
        this._create_component_form();
        this._create_component_buttons_generation('html_components').then(function(){
            self._create_component_open_close();

            def.resolve(self.tsp, to_return_values);
        });

        return def.promise();

    }
}