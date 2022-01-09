

export default class SettingsSideBar{
    constructor(){
        let self = this;
        this.action_map = {};
        self.event_map ={
            "init_settings_event": ()=>{

            },

        }
    }
    cache_elems(){
        let self = this;
        self.side_bar = $('.ui.sidebar.right.menu');
    }
    build_dependent_css(){
        let self = this;
        let css_urls=  [`https://semantic-ui.com/dist/semantic.min.css`,
                        `https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.css`
        ];
        self.tsp.HtmlTagBuilder.build_tags(css_urls);
    }
    build_outer_part(args){
        let self = this;
        let html = `
               <div class="ui sidebar inverted right vertical menu">
                    <div class="close icon"></div>
                    <a class="item">
                      ${args}
                    </a>
                    <a class="item">
                      2
                    </a>
                    <a class="item">
                      3
                    </a>
                  </div>
                  <div class="pusher">
                    <!-- Site content !-->
              </div>
        `;
        $("body").append($(html));
    }
    load_settings(html){
        let self = this;
        self.side_bar.empty().html(html);
        //$('.ui.sidebar').sidebar('toggle');
        self.side_bar.sidebar('toggle');
    }
    events(){
        let self = this;


        /* initializing eventlistners by calling above event_map in a loop*/
        for (let key in self.event_map) {
          self.event_map[key]();
        }
    }
    actions(){
        let self = this;
        self.action_map = {
            "load_settings": () => {

            },
        }
    }

    init(tsp, to_return_Values){
        tsp.SettingsSideBar = this;
        this.tsp = tsp;
        this.build_dependent_css();
//        this.actions();
        this.build_outer_part();
        this.cache_elems();
//        this.events();
        return $.Deferred().resolve(tsp, to_return_Values);
    }

}
