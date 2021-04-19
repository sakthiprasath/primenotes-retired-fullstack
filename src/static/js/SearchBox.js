import SourceCodeSection from './DocumentSection.js';



export default class TreeClass{

    _build_searchbox(){
    // Add your javascript here
        let self = this;
        self.searchItems = [
            {
              name: "Category 1",
              results: [
                {
                  title: "result Title",
                  description: "Optional Description"
                },
                {
                  title: "result Title",
                  description: "Optional Description"
                }
              ]
            }];
    }
    _events(){
        let self = this;
        $('#searchInput').search({

              apiSettings: {
                'response': function (e) {
                    var searchTerm = e.urlData.query;

                    var result = self.tsp.TreeClass.file_folder_list.map(function (cat) {

                        var items = cat.results.filter(function (item) {
                          console.log(item);
                          return item.title.toLowerCase().includes(searchTerm.toLowerCase())
                        });
                       if(items !== null)
                        {
                            var category = {'name' : cat.name};
                            category.results = items;
                            return category;
                        }
                    });

                    return {'results' : result };
                }
            },
//            source: self.tsp.TreeClass.file_folder_list,
            type: "category",
            duration: 100,
            maxResults: 50,
            showNoResults: true,
            fullTextSearch: 'exact',
            searchFields: ['title'],
            onSelect: function(result, response){
                let folder_type = self.tsp.TreeClass.metadata_map[result.description]['folder_type'];
                if( folder_type === "folder"){
                    self.tsp.TreeClass.clone_folder_into_dialog(result.description);
                }
                else{
                    self.tsp.SourceCodeSection._highlight_in_tree(result.description);
                    self.tsp.SourceCodeSection.buildTab(result.title, 'document', result.description);
                    self.tsp.TreeClass._build_breadcrumb(result.description);
                }
            }
          });


          $('.prompt').on('focus',function(){

            $('.sidenav').css('z-index',7);
          });

          $('.prompt').on('blur',function(){
            $('.sidenav').css('z-index',5);
          });

        $('.tab-container-setting')
          .dropdown({
            on :
                "hover",
            keepOnScreen: true,
            context: window
          });
        $('.tab-container-setting').on('click', function(){
             self.tsp.DomActions._tabs_drop_down_click();
        });




    }

    init(tsp, to_return_values){
        let def = $.Deferred();
        let self = this;
        tsp.SearchBox = this;
        this.tsp = tsp;

        this._build_searchbox();
        this._events();

        return def.resolve(tsp, to_return_values);
//        return def.promise();
    }


}
