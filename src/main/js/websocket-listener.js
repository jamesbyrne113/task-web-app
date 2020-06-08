'use strict';

const SockJS = require('sockjs-client');
require('stompjs');

export function register(registrations) {
    const socket = SockJS('tasks');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        registrations.forEach(function (registration) {
            stompClient.subscribe(registration.route, registration.callback);
        });
    });
}