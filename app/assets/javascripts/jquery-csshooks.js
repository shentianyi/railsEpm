(function( $ ) {

// First, check to see if cssHooks are supported
    if ( !$.cssHooks ) {
        // If not, output an error message
        throw( new Error( "jQuery 1.4.3 or above is required for this plugin to work" ) );
    }

// Wrap in a document ready call, because jQuery writes
// cssHooks at this time and will blow away your functions
// if they exist.
    $.cssHooks.backgroundColor = {
        get: function(elem) {
            if (elem.currentStyle)
                var bg = elem.currentStyle["backgroundColor"];
            else if (window.getComputedStyle)
                var bg = document.defaultView.getComputedStyle(elem,
                    null).getPropertyValue("background-color");
            if (bg.search("rgb") == -1)
                return bg;
            else {
                bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                function hex(x) {
                    return ("0" + parseInt(x).toString(16)).slice(-2);
                }
                return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
            }
        }
    }

})( jQuery );