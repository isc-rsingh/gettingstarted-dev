function sandbox_config_save(config_info) {
    config_info['action'] = 'sandbox_config_cb'
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

function launcheval(sandbox_meta_url, token) {
    jQuery(document).ready(function($){ 
        $('#isc-launch-eval-btn').html('Launching...')
        // @TODO this is where we can put something interesting to watch for the minute it takes for the containers to spin up...
        $.ajax(sandbox_meta_url, {
            type: 'POST', 
            data: {}, 
            dataType: 'json', 
            timeout: 500000, 
            headers: {
                "Authorization": token
            },
            success: function(data, status, xhr) {
                console.log("Sending config data to sandbox_config_save()...")
                console.log(data)
                sandbox_config_save(data)
                location.reload()
            },
            error: function(jqXhr, textStatus, errorMessage) {
                var emsg = 'Error: <b>' + errorMessage + '</b>'
                emsg += '<br/>' + textStatus
                $('#isc-waiting-area').html(emsg)
            }
        })
    });
}