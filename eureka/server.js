const _ = require("lodash");

const express = require("express");
const bodyParser = require("body-parser");
const Eureka = require('eureka-js-client').Eureka;
const debug = require('debug')('eureka-debug');

var app = express();
var port = 3000;
var cors = require("cors");
app.use(cors());

app.use(bodyParser.json());

debug('debug eureka client');

// eureka configuration
const client = new Eureka({
  instance: {
    app: 'eurekaService',
    hostName: 'localhost',
    ipAddr: '127.0.01',
    // port: 3000,
    port: {
      $: 3000,
      '@enabled': 'true'
    },
    vipAddress: 'jq.test.something.com',
    statusPageUrl: 'http://localhost:3000/info',
    // healthCheckUrl: 'http://localhost:3000',
    // homePageUrl: 'http://localhost:3000',
    dataCenterInfo: {
      // '@class': 'com.netflix.appinfo.AmazonInfo',
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn'
    }
  },
  eureka: {
    // useLocalMetadata: true,
    // ssl: true,
    host: 'localhost',
    port: 8070,
    // serviceUrls: {
    //   default: ['http://localhost:3000/eureka/apps']
    // },
    servicePath: '/eureka/apps/'
  }
});

function connectToEureka() {
  client.logger.level('debug');
  client.start(function(error){
    debug('###########################################');
    debug(JSON.stringify(error) || 'Eureka registration complete');
  });
}

connectToEureka();

app.get('/info', (req, res) => {
  // res.sendFile('views/info.html', { root: __dirname })
  res.send('info message');
});

app.listen(port, () => {
  debug(`Started up at port ${port}`);
});

module.exports = { app };
