
type TimestampProvider = ()=>number;


class Cache<T> {

    private data: T|undefined = undefined;
    private refreshTimestamp: number;
    private timestampProvider: TimestampProvider;

    /** Cache duration in milliseconds */
    duration: number = 60*1000;

    private src: (()=> Promise<T>); 

    constructor( retrieval: (()=> Promise<T>), timestampProvider: TimestampProvider = Date.now ) {
        this.src = retrieval;
        this.refreshTimestamp = 0;
        this.timestampProvider = timestampProvider;
    }

    async getData(): Promise<T> {
        const n = this.timestampProvider();
        
        if ( n > this.refreshTimestamp + this.duration || this.data == undefined ) {
            this.data = await this.src();
            this.refreshTimestamp = n;
            return this.data;
        } else {
            return this.data;
        } 
    }

};

export default Cache;