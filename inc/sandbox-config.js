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
        $('#isc-launch-eval-btn').hide()
        // @TODO this is where we can put something interesting to watch for the minute it takes for the containers to spin up...
        $('#isc-waiting-area').html('<video autoplay="true" height="360" width="640" src="/wp-content/uploads/2020/03/tryiris-640x360_2.mp4" type="video/mp4">')
        $.ajax(sandbox_meta_url, {
            type: 'POST', 
            data: {}, 
            dataType: 'json', 
            timeout: 5000000, 
            headers: {
                "Authorization": token, 
                // "Access-Control-Allow-Origin": "https://lsiris.intersystems.com/*"
            },
            success: function(data, status, xhr) {
                console.log("Sending config data to sandbox_config_save()...")
                console.log(data)
                sandbox_config_save(data)
                location.reload()
            },
            error: function(jqXhr, textStatus, errorMessage) {
                var emsg = '<code>Error: <b>' + errorMessage + '</b>'
                emsg += '<br/>' + textStatus + '</code>'
                $('#isc-waiting-area').html(emsg)
            }
        })
    });
}