

function sandbox_config_save(config_info) {
    console.log(config_info)
    $.ajax({
        url: ajax_url, 
        type: 'POST', 
        data: config_info
    })
    .success( function(results) {
        console.log('sandbox_config_save: user meta updated!')
    })
    .fail(function(data) {
        console.log(data.responseText)
        console.log("sandbox_config_save: request failed: ")
        console.log(data.statusText)
    })
}