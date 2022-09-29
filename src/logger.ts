/**
 * Simple logger class overriding console.log
 * - it supports a global level to toggle various logging level on/off
 * - it can be initialized with a custom prefix or with an automatic prefix derived from error stack trace
 * - it defines a logger.s() method which is at the same level as console.log but it also renders the full stack trace
 * @version 3.0.0
* */

class logger  {

    ASSERT;
    ERROR;
    WARN;
    INFO;
    DEBUG;
    VERBOSE;
    prefix = [''];
    prefixStack = [''];
    level = 6;
    a(val1:any, val2?:any):void{};
    e(val1:any, val2?:any):void{};
    w(val1:any, val2?:any):void{};
    i(val1:any, val2?:any):void{};
    d(val1:any, val2?:any):void{};
    v(val1:any, val2?:any):void{};
    s(val1:any, val2?:any):void{};
    chalkColors: string[]


    constructor(prefix: string = ''){
        this.ASSERT = 1;
        this.ERROR = 2;
        this.WARN = 3;
        this.INFO = 4;
        this.DEBUG = 5;
        this.VERBOSE = 6

        this.chalkColors = [
            'yellow',
            'cyan',
            'green',
            'magenta',
            'red',
            'white',
            'orange',
            'pink'
        ]

        this.setPrefix(prefix);

        /*TODO: cannot work like this, async setLevel will make setBind() to be called to late */
        // let constants
        // import('./constants')
        //     .then( constants => this.setLevel(constants.logLevel) )
        //     .catch((e) =>  this.setLevel(6) )
        // const initLogLevel = (typeof process.env.LOG_LEVEL !== 'undefined') ? parseInt( (process.env.LOG_LEVEL as string) ) : this.level


        let initLogLevel;
        const env = (typeof window === 'undefined')?'process':'window';

        switch (env){
            case 'window':
                // @ts-ignore
                initLogLevel = window?.env?.LOG_LEVEL;
                // console.log('initLogLevel window',initLogLevel);
                break;
            case 'process':
                initLogLevel = process?.env?.LOG_LEVEL;
                // console.log('initLogLevel process',initLogLevel);
                break;
        }

        if(typeof initLogLevel === 'undefined'){
            initLogLevel = this.level;
            // console.log('initLogLevel fallback',initLogLevel);
        }

        this.setLevel( initLogLevel );
    }

    setPrefix(prefix:string){

        const sColor = this.shuffle(this.chalkColors)[0];

        if(prefix){
            this.prefix = [ `%c[${prefix}]`,`color: ${sColor}` ];
            this.prefixStack = [ `%c[${prefix}] ${this.getMyName(true)}`,`color: ${sColor}` ];
        } else {
            this.prefix = [ `%c[${this.getMyName()}]`,`color: ${sColor}` ];
            this.prefixStack = [ `%c[${this.getMyName()}] ${this.getMyName(true)}`,`color: ${sColor}` ];
        }



    }

    setLevel(level:number|string){
        this.level = (typeof level === 'string')?parseInt(level):level;
        this.setBind();
    }

    setBind(){

        if (this.level >= this.ASSERT) {
            this.a = console.assert.bind(console);
        } else {
            this.a = function() {};
        }
        if (this.level >= this.ERROR) this.e = console.error.bind(console,...this.prefix);
        else this.e = function() {};
        if (this.level >= this.WARN) this.w = console.warn.bind(console,...this.prefix);
        else this.w = function() {};
        if (this.level >= this.INFO) this.i = console.info.bind(console,...this.prefix);
        else this.i = function() {};
        if (this.level >= this.DEBUG) this.d = console.debug.bind(console,...this.prefix);
        else this.d = function() {};
        if (this.level >= this.VERBOSE) {
            this.v = console.log.bind(console,...this.prefix);
            this.s = console.log.bind(console,...this.prefixStack);
        } else {
            this.v = function() {};
            this.s = function() {};
        }

    }

    getMyName(showStack = false) {
        const e = new Error('stack');
        const stack = (e.stack as string)
        if( showStack ){
            return  stack;
        } else {
            return stack.split('\n')[4]
                // " at functionName ( ..." => "functionName"
                .replace(/^\s+at\s+(.+?)\s.+/g, '$1' );
        }


    }

    shuffle(array:string[]) {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

}


export default logger;
