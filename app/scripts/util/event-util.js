/**
 * Created by mrcode on 16-4-24.
 */
var EventUtil = {
    addHandler(element, type, handler) {

    },

    getTarget(event) {
        return event.target || event.srcElement;
    },

    preventDefault(event) {
        if(typeof event.preventDefault === 'function') {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    stopPropagation(event){
        if (typeof event.stopPropagation === 'function') {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};