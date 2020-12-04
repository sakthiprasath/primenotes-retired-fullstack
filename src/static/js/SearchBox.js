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
            },
            {
              name: "Category 2",
              results: [
                {
                  title: "result Title",
                  description: "Optional Description"
                }
              ]
            },
            {
              name: "sasasa 2",
              results: [
                {
                  title: "resuRETRETRETERTEle",
                  description: "sADREWTRETEion"
                }
              ]
            },
            {
              name: "Cat234543TSRT",
              results: [
                {
                  title: "result Title",
                  description: "Optional Description"
                }
              ]
            },
            {
              name: "CaDASSDA",
              results: [
                {
                  title: "resuWETRWTERe",
                  description: "2324314234on"
                }
              ]
            },

        ];
    }
    _events(){
        let self = this;
        $('#searchInput').search({
            apiSettings: {
                'response': function (e) {
                    var searchTerm = e.urlData.query;

                    var result = self.searchItems.map(function (cat) {

                        var items = cat.results.filter(function (item) {
                          return item.title.toLowerCase().includes(searchTerm.toLowerCase());
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
            type: 'category'
          });
    }

    init(tsp, to_return_values){
        let def = $.Deferred();
        let self = this;
        tsp.SearchBox = this;
        this.tsp = tsp;

        this._build_searchbox();
        this._events();

        def.resolve(tsp, to_return_values);
        return def.promise();
    }

}
