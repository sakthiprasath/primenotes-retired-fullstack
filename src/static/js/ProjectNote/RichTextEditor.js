

export default class SideComponentsSection{
    constructor(){
        this.action_map = {};
        this.event_map = {};
    }
    build_dependent_css(){
        let self = this;
        let urls=  [
            `https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.css`
        ];
        self.tsp.HtmlTagBuilder.build_tags(urls);
    }
    build_outer_part(){
        let self = this;
        let html = ``;
        $('#summer-note').summernote({
                      height: 500,                 // set editor height
                      minHeight: null,             // set minimum height of editor
                      maxHeight: null,             // set maximum height of editor
                      focus: true,                  // set focus to editable area after initializing summernote
                      hint: {
                            match: /:([\-+\w]+)$/,
                            search: function (keyword, callback) {
                              callback($.grep(emojis, function (item) {
                                return item.indexOf(keyword)  === 0;
                              }));
                            },
                            template: function (item) {
                              var content = emojiUrls[item];
                              return '<img src="' + content + '" width="20" /> :' + item + ':';
                            },
                            content: function (item) {
                              var url = emojiUrls[item];
                              if (url) {
                                return $('<img />').attr('src', url).css('width', 20)[0];
                              }
                              return '';
                            }
                          }
                });

        /* important part the defines the restructures the editor region*/
//        html = `<div class="container"></div>`;
//        $(".note-editable").append($(html));
        $('.note-editable').attr('contenteditable', "false");
        self.action_map.load_emojis();

    }

    events(){
        let self = this;
        let event_map ={
            "create_new_component": ()=>{

            }
        }

        /* initializing eventlistners by calling above event_map in a loop*/
        for (let key in event_map) {
          event_map[key]();
        }
    }
    actions(){
        let self = this;
        self.action_map = {
            "load_emojis": () => {
                $.ajax({
                  url: 'https://api.github.com/emojis',
                  async: false
                }).then(function(data) {
                    window.emojis = Object.keys(data);
                    window.emojiUrls = data;
                });
            },
        }
    }

    init(tsp, to_return_Values){
        tsp.SideComponentsSection = this;
        this.tsp = tsp;
        this.actions();
        this.build_dependent_css();
        this.build_outer_part();
        this.events();
        return $.Deferred().resolve(tsp, to_return_Values);
    }

}
