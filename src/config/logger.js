import bunyan from 'bunyan';
import moment from 'moment';
import bformat from 'bunyan-format'

//Options
//simple, short, long, inspect, bunyan, { outputMode: 'json', jsonIndent: 2}, 
const formatOut = bformat({ outputMode: 'short', levelInString: true})

const reqSerializer = req => {
    return {
        method: req.method,
        url: req.url,
        headers: req.headers
    };
}

const dbSerializer = data => {
    const query = JSON.stringify(data.query)
    const options = JSON.stringify(data.options || {})
  
    return `db.${data.coll}.${data.method}(${query}, ${options})`
  }

export default bunyan.createLogger({
    name: `Template-API`,
    src: false,
    streams: [
        {
          level: 'debug',
          stream: formatOut     
        },
        {
            type: 'rotating-file',
            level: 'debug', //TODO: Change log levels 
            path: `./log/${moment(new Date()).format('YYYY-MM-DD')}.log`,
            period: '1d',   // daily rotation 
            count: 5        // keep 5 back copies 
        }
      ],
      serializers: {
        // Serializers
        // req: reqSerializer,
        dbQuery: dbSerializer

        // req: bunyan.stdSerializers.req,
        // res: bunyan.stdSerializers.res,
        
        // Examples 
        // logger.debug({req: req})
        // logger.debug({res: res})
      }
})
