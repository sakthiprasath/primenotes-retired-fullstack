

export default class DetailsPanel{


    build_details_header_html(data_obj){
        let html  = `<div class="row11">`
            html +=     `<span class="details-close">${data_obj['label']}</span>`;
            html +=     `<span class="details-name">${data_obj['data']}</span>`;
            html += `</div>`;

        return html;
    }

    build_label_data_html(data_obj){
        let html  = `<div class="row1">`
            html +=     `<span class="details-label">${data_obj['label']}</span>`;
            html +=     `<span>${data_obj['data']}</span>`;
            html += `</div>`;

        return html;
    }

    close_details(curr){
            $('#destination-container').css('width','100%');
            $('#pane').css('width','99%');
            $('#right-side-panel').css('z-index','0');
    }
    open_details(curr){
         $('#destination-container').css('width','calc(100% - 315px)');
         $('#pane').css('width','78.6%');
         $('#right-side-panel').css('z-index','1');

    }

    launch_details_data(path){
        let self = this;
        self.open_details();
        let metadata = self.tsp.TreeClass.metadata_map[path];

        let html = self.build_details_header_html({
            'label' :  'X',
            'data' :  metadata['name']
        });
        html += self.build_label_data_html({
            'label' :  'Date Created',
            'data' :  metadata['date_created']
        });

        html += self.build_label_data_html({
            'label' :  'Last Updated',
            'data' :  metadata['last_updated']
        });

        html += self.build_label_data_html({
            'label' :  `${ metadata['folder_type'].charAt(0).toUpperCase() + metadata['folder_type'].slice(1)}` + ' Path',
            'data' :  metadata['path']
        });

        html += self.build_label_data_html({
            'label' :  'Link',
            'data' :  `<a href="#"> app.preimenotes.app/sakthi25/${metadata['uuid']}</a>`
        });

        html += self.build_label_data_html({
            'label' :  'Starred',
            'data' :  `<label class="switch"><input type="checkbox" checked="true"></label>`
        });

        $('.details-section').empty().html(html);
        self.events();
    }
    events(){
        let self = this;
        $('.details-close').off('click');
        $('.details-close').on('click', function(){
            self.close_details($(this));
        });
    }
    init(tsp, to_return_values){
        tsp.DetailsPanel = this;
        this.tsp = tsp;
//        this.build_right_side_panel();
        this.events();
        return $.Deferred().resolve(this.tsp, to_return_values);

    }
}