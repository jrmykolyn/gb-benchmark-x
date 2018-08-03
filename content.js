try {
    // --------------------------------------------------
    // DECLARE FUNCTIONS
    // --------------------------------------------------
    const parseQueryString = (str = '') => {
        return str.substring( 1 )
        .split( '&' )
        .map( str => str.split( '=' ) )
        .map( arr => ({ [ arr[ 0 ] ]: arr[ 1 ] || true }) )
        .reduce( (acc, o ) => ({ ...acc, ...o}), {} );
    };

    const log = (msg) => {
        if ( settings.isDebug ) {
            console.log( `[${config.namespace}]${msg}` );
        }
    }

    // --------------------------------------------------
    // CONFIG
    // --------------------------------------------------
    const qs = parseQueryString( window.location.search || '' );
    const config = {
        namespace: 'BENCHX',
    };
    const settings = {
        isDebug: !!qs.__DEBUG__,
    };

    // --------------------------------------------------
    // INIT
    // --------------------------------------------------
    // Assemble
    log( 'SCRIPT:ELEM:CREATE:START' );
    const s = document.createElement( 'script' );
    s.innerHTML = `window.__BENCHMARK__ = new Date().getTime();`;
    log( 'SCRIPT:ELEM:CREATE:END.' );

    // Inject
    log( 'SCRIPT:ELEM:INJECT:START.' );
    document.head.appendChild( s );
    log( 'SCRIPT:ELEM:INJECT:END.' );
} catch ( err ) {
    console.error( 'Failed to initialize GroupBy Benchmark Chrome Extension' );
    console.error( err.message );
}
