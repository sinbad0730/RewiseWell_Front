import mixpanel from "mixpanel-browser";
import trackingEvent from "./tracking-events.enum";

export class MixpanelTracking {
    private static _instance: MixpanelTracking;

    public static getInstance(): MixpanelTracking {
        if (MixpanelTracking._instance == null)
            return (MixpanelTracking._instance = new MixpanelTracking());
        return this._instance;
    }

    public constructor(){
        if (MixpanelTracking._instance)
            throw new Error('Error: Instance creation of MixpanelTranking is not allowed. Use mixpanel.hetInstance instead.'
        );

        mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_ID || "", {
            debug: true,
            ignore_dnt: true,
        });
    }

    public track(name: string, data: object = {}){
        // mixpanel.track(name, data)
    }

    public pageViewed(namePage: string){
        console.log(trackingEvent.PageViewed + namePage)
        this.track(trackingEvent.PageViewed + namePage)
    }

    public Clicked(location: string){
        console.log(trackingEvent.Clicked + location)
        this.track(trackingEvent.Clicked + location)
    }

    // exemple
    // public productViewed(product: any){
    //     this.track('product_viewed', {
    //         productId: product.id,
    //         productName: product.title,
    //     })

    // }


}