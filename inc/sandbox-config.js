function sandbox_config_save(config_info) {
    config_info['action'] = 'sandbox_config_cb'
    console.log("Saving config data to wordpress via URL: ")
    console.log(ajax_url)
    console.log(config_info)
    jQuery(document).ready(function($){
        $.ajax({
            url: ajax_url, 
            type: 'POST', 
            data: config_info, 
            success: function(results) {
                console.log('sandbox_config_save: user meta updated!')
            },
            error: function(data) {
                console.log("sandbox_config_save: request failed: ")
                console.log("response text: " + data.responseText)
                console.log("status text: " + data.statusText)
            }
        })
    })
}