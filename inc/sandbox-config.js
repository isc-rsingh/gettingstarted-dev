function sandbox_config_save(config_info) {
    config_info['action'] = 'sandbox_config_cb'
    jQuery(document).ready(function($){
        $.ajax({
            url: ajax_url, 
            type: 'POST', 
            async: true, 
            data: config_info, 
            success: function(results) {
                console.log('sandbox_config_save: user meta updated!')
                location.reload()
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("sandbox_config_save: request failed: ")
                if (textStatus==="timeout") {
                    console.log("Call has timed out")
                } else {
                    console.log("response text: " + errorThrown)
                }
            }
        })
    })
}

function sandbox_build_progress(pollurl, token) {
    jQuery(document).ready(function($){
        $.ajax({
            dataType: "json", 
            url: pollurl, 
            type: 'GET', 
            headers: {
                "Authorization": token, 
            },
            success: function(response, status, xhr) {
                resp = response['state']
                console.log("Polling response: " + resp)
                if ( resp == "BUILDING" ) {
                    setTimeout(sandbox_build_progress, 2000, pollurl, token)
                } else if ( resp == "SUCCESS" ) {
                    console.log("Polling done, saving config info")
                    console.log(response.data)
                    sandbox_config_save(response.data)
                } else {
                    console.log("ERROR IN POLLING...")
                }
            },
            error: function(jqXhr, textStatus, errorMessage) {
                var emsg = '<code>Error: <b>' + errorMessage + '</b>'
                emsg += '<br/>' + textStatus + '</code>'
                $('#isc-waiting-area').html(emsg)
            }
        })
    })
}

function launcheval(sandbox_meta_url, token) {
    jQuery(document).ready(function($){ 
        $('#isc-launch-eval-btn').hide()
        $('#isc-waiting-area').html('<video autoplay="true" height="360" width="640" src="/wp-content/uploads/2020/03/tryiris-640x360_2.mp4" type="video/mp4">')
        $.ajax({
            url: sandbox_meta_url, 
            data: {}, 
            type: 'GET', 
            headers: {
                "Authorization": token, 
                // "Access-Control-Allow-Origin": "https://lsiris.intersystems.com/*"
            },
            // crossDomain: true, 
            // xhrFields: {
            //     withCredentials: true
            // }, 
            success: function(data, status, xhr) {
                var pollurl = xhr.getResponseHeader("Location")
                console.log("Success getting polling URL:")
                console.log(pollurl)
                sandbox_build_progress(pollurl, token)
            },
            error: function(jqXhr, textStatus, errorMessage) {
                var emsg = '<code>' + textStatus + ': <b>' + errorMessage + '</b>'
                $('#isc-waiting-area').html(emsg)
            }
        })
    })
}