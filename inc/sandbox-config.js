

function sandbox_config_save(config_info) {
    alert("call me: "+config_info.IDE)
    $.ajax({
        url: ajax_url, 
        type: 'POST', 
        data: {
            action: 'sandbox_config_cb', 
            'ide': config_info.IDE
        }
    })
    .success( function(results) {
        console.log('user meta updated!')
    })
    .fail(function(data) {
        console.log(data.responseText)
        console.log("request failed: "+data.statusText)
    })
}