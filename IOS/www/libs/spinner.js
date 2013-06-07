// If you want to prevent dragging, uncomment this section
/*
 function preventBehavior(e) {
 e.preventDefault();
 };
 document.addEventListener("touchmove", preventBehavior, false);
 */

/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
 see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
 for more details -jm */
/*
 function handleOpenURL(url) {
 // TODO: do something with the url passed in.
 }
 */

function doThisIn5Secs() {
    window.wizSpinner.hide();
}

function showHideSpinner() {
    var options = {
        customSpinner : false,
        position : "middle",
        label : "A new label :)",
    bgColor: "#000",
    opacity:0.5,
    color: "#000"
    };
    alert("The Spinner will show for 5 seconds and then will be hidden.");
    window.wizSpinner.show(options);
    setTimeout(function() { doThisIn5Secs() }, 5000);
}

function showCustomSpinner() {
    var options = {
        customSpinner : true,
        position : "low",
        label : "Your label here :)",
    bgColor: "#000",
    opacity:0.5,
    color: "#000",
    spinLoops: 0,
    spinDuration: 0.15
    };
    alert("The Spinner will show for 5 seconds and then will be hidden.");
    window.wizSpinner.show( options );
    setTimeout(function() { doThisIn5Secs() }, 5000);
}
