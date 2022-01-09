

export default class Dialog{
    constructor(){
        this.action_map = {};
        this.event_map = {};
    }
    build_dependent_css(){
        let self = this;
        let css_urls=  [`https://semantic-ui.com/dist/semantic.min.css`,
                        `https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.css`
        ];
        self.tsp.HtmlTagBuilder.build_tags(css_urls);
    }
    build_outer_part(header, content, footer){
        let self = this;
        let html = `
                <div class="ui modal">
                  <i class="close icon"></i>
                  <div class="header">
                    ${header}
                  </div>
                  <div class="content">
                    ${content}
                  </div>
                  <div class="actions">
                    <div class="ui black deny button">
                      Nope
                    </div>
                    <div class="ui positive right labeled icon button">
                      Yep, that's me
                      <i class="checkmark icon"></i>
                    </div>
                  </div>
                </div>
        `;
//        $("body").append($(self.html));
        return html;
    }

    events(){
        let self = this;
        let event_map ={
            "init_modal_properties": ()=>{
//                $(".ui.modal").modal({ closable: true });
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
            "load_dialog": (header, content, footer) => {
                let html_ele = $(self.build_outer_part(header, content, footer));
                html_ele.modal({ closable: true });
                $('body').append(html_ele);
                html_ele.modal('show');
                return html_ele;
            },
        }
    }

    init(tsp){
        tsp.Dialog = this;
        this.tsp = tsp;
        this.build_dependent_css()
        this.actions();
//        this.build_outer_part();
//        this.events();
        return $.Deferred().resolve(tsp);
    }

}
