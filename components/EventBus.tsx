const EventBus = {
    on(event : any, callback : any) {
        document.addEventListener(event, callback);
    },
    off(event : any, callback : any) {
        document.removeEventListener(event, callback);
    },
    emit(event : any, data : any) {
        document.dispatchEvent(new CustomEvent(event, { detail: data }));
    }
};

export default EventBus;