#!/usr/bin/env node
// run 5 nodes in the local environment and display trace info

var crypto = require('crypto'),
    Discover = require('../index.js'),
    TcpTransport = require('discover-tcp-transport'),
    util = require('util');

// TODO: maybe fix flow control, being really really lazy here with code layout :)
var transport1, transport2, transport3, transport4, transport5;
var discover1, discover2, discover3, discover4, discover5;
var id1, id2, id3, id4, id5;

transport1 = TcpTransport.listen({port: 6741}, function () {
    transport2 = TcpTransport.listen({port: 6742}, function () {
        transport3 = TcpTransport.listen({port: 6743}, function () {
            transport4 = TcpTransport.listen({port: 6744}, function () {
                transport5 = TcpTransport.listen({port: 6745}, function () {
                    startLocalTest();
                });
            });
        });
    });
});

function startLocalTest() {

    id1 = crypto.createHash('sha1').update('' + new Date().getTime() + process.hrtime()[1]).digest("base64");
    id2 = crypto.createHash('sha1').update('' + new Date().getTime() + process.hrtime()[1]).digest("base64");
    id3 = crypto.createHash('sha1').update('' + new Date().getTime() + process.hrtime()[1]).digest("base64");
    id4 = crypto.createHash('sha1').update('' + new Date().getTime() + process.hrtime()[1]).digest("base64");
    id5 = crypto.createHash('sha1').update('' + new Date().getTime() + process.hrtime()[1]).digest("base64");

    discover1 = new Discover({
        inlineTrace: true, 
        seeds: [
            {
                id: id1,
                data: 'discover1',
                host: 'localhost',
                port: 6741
            },
            {
                id: id2,
                data: 'discover2',
                host: 'localhost',
                port: 6742
            },
            {
                id: id3,
                data: 'discover3',
                host: 'localhost',
                port: 6743
            }
        ],
        transport: transport1});
    discover2 = new Discover({
        inlineTrace: true, 
        seeds: [
            {
                id: id1,
                data: 'discover1',
                host: 'localhost',
                port: 6741
            },
            {
                id: id2,
                data: 'discover2',
                host: 'localhost',
                port: 6742
            },
            {
                id: id3,
                data: 'discover3',
                host: 'localhost',
                port: 6743
            }
        ],
        transport: transport2
    });
    discover3 = new Discover({
        inlineTrace: true, 
        seeds: [
            {
                id: id1,
                data: 'discover1',
                host: 'localhost',
                port: 6741
            },
            {
                id: id2,
                data: 'discover2',
                host: 'localhost',
                port: 6742
            },
            {
                id: id3,
                data: 'discover3',
                host: 'localhost',
                port: 6743
            }
        ],
        transport: transport3
    });
    discover4 = new Discover({
        inlineTrace: true, 
        seeds: [
            {
                id: id1,
                data: 'discover1',
                host: 'localhost',
                port: 6741
            },
            {
                id: id2,
                data: 'discover2',
                host: 'localhost',
                port: 6742
            },
            {
                id: id3,
                data: 'discover3',
                host: 'localhost',
                port: 6743
            }
        ],
        transport: transport4
    });
    discover5 = new Discover({
        inlineTrace: true, 
        seeds: [
            {
                id: id1,
                data: 'discover1',
                host: 'localhost',
                port: 6741
            },
            {
                id: id2,
                data: 'discover2',
                host: 'localhost',
                port: 6742
            },
            {
                id: id3,
                data: 'discover3',
                host: 'localhost',
                port: 6743
            }
        ],
        transport: transport5
    });

    console.log('~script five discover instances running');
    console.log('~script starting self-registrations');

    var node1 = {id: id1, data: 'discover1'};
    var node2 = {id: id2, data: 'discover2'};
    var node3 = {id: id3, data: 'discover3'};
    var node4 = {id: id4, data: 'discover4'};
    var node5 = {id: id5, data: 'discover5'};

    discover1.register(node1);
    discover2.register(node2);
    discover3.register(node3);
    discover4.register(node4);
    discover5.register(node5);

    console.log('~script self-registrations complete');
    console.log('~script allowing nodes to communicate and settle');

    setTimeout(continueLocalTest, 2000);
};

function continueLocalTest() {
    console.log('~script listing node contents');

    console.log('~script discover1:', util.inspect(discover1, false, null));
    console.log('~script discover2:', util.inspect(discover2, false, null));
    console.log('~script discover3:', util.inspect(discover3, false, null));
    console.log('~script discover4:', util.inspect(discover4, false, null));
    console.log('~script discover5:', util.inspect(discover5, false, null));

    console.log('~script listing of node contents complete');

    console.log('~script discover5 is asked to find discover4');

    discover5.find(id4, function (error, contact) {

        console.log('~script find id4 response');
        console.log('~script', error, util.inspect(contact, false, null));

        console.log('~script listing node contents');

        console.log('~script discover1:', util.inspect(discover1, false, null));
        console.log('~script discover2:', util.inspect(discover2, false, null));
        console.log('~script discover3:', util.inspect(discover3, false, null));
        console.log('~script discover4:', util.inspect(discover4, false, null));
        console.log('~script discover5:', util.inspect(discover5, false, null));

        console.log('~script listing of node contents complete');
    });
};