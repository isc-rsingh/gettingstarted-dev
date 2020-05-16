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
        let waitingcontent = '<video autoplay="true" height="360" width="640" src="/wp-content/themes/isctwentyeleven/assets/images/sandbox_launch.mp4" type="video/mp4">'
        $('#isc-waiting-area').html(waitingcontent)

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

function testloading() {
    setTimeout(testloading, 2000)
}


function testwaitingcontent() {
    jQuery(document).ready(function($){ 
        $('#isc-launch-eval-btn').hide()
        let waitingcontent = "<table id='waitingtable'><tr><td style='width:50%;vertical-align:top'>"
        waitingcontent += '<video autoplay="true" width="500" src="/wp-content/uploads/2020/03/tryiris-640x360_2.mp4" type="video/mp4">'
        waitingcontent += "</td><td style='vertical-align:top;font-size:67%'>"
        waitingcontent += "<p><b>What's going on?</b><br/>"
        waitingcontent += "We're starting up two docker containers just for you. One is the server – a full version of InterSystems IRIS&reg; data platform. The other is your cloud-based development machine.</p>"
        waitingcontent += "<p><b>Is the IDE part of InterSystems IRIS?</b><br/>"
        waitingcontent += "Nope! You'll be using the open source, web-based Theia IDE to work with InterSystems IRIS. As with most back-end technologies, you'll see the IDE more than the server, but rest assured you can use any IDE to work with InterSystems IRIS.</p>"
        waitingcontent += "<p><b>How long will I have this free sandbox to experiment with?</b><br/>"
        waitingcontent += "This one will last for 3 days, so feel free to come back to finish something up later. And you can always spin up a new sandbox after this one expires.</p>"         
        waitingcontent += "<p><b>How long is this going to take?</b><br/>"
        waitingcontent += "Less than two minutes, and in the meantime, you can read ahead in the exercise to see what's coming. In fact, if youve read this far you should be seeing “Sandbox settings” any second now…</p>"
        waitingcontent += "</td>"

        waitingcontent = "<table id='waitingtable'><tr><td>"
        waitingcontent += '<video autoplay="true" width="500" src="/assets/images/sandbox_launch.mp4" type="video/mp4">'
        waitingcontent += "</td></tr></table>"

        $('#isc-waiting-area').html(waitingcontent)
        setTimeout(testloading, 2000)
    })
}