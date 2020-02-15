const {FCM_KEY} = require('../configs/config');
const Notification = require('../models/notification');
const Por = require('../models/por');
const request = require('request');
const key = 'key=' + FCM_KEY;

module.exports = {

    sendNotification: async (req, res, next) => {

        const currUser = req.user._id;
        const clubId = req.value.body.club;

        const currPor = await Por.findOne({club: clubId, user: currUser._id});

        if (currPor && currPor.access > 0) {

            const notification = new Notification(req.value.body);
            notification.sender = currUser;

            const audience = [];
            notification.audience.forEach(element => {
                audience.push("'" + element + "' in topics")
            });

            const n = {
                condition: audience.join(' || '),
                priority: 2,
                data: {
                    title: notification.title,
                    body: notification.body,
                    description: notification.description,
                    image_uri: notification.image_uri,
                    notify: '1',
                    link: notification.link
                }
            }

            const options = {
                url: 'https://fcm.googleapis.com/fcm/send',
                headers: {
                    'Content-Type': ' application/json',
                    'Authorization': key
                },
                method: 'POST',
                body: JSON.stringify(n)
            };

            request(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {

                    notification.message_id = JSON.parse(body).message_id;
                    notification.save();

                    res.status(200).send({
                        message: "Notification sent."
                    });
                } else {
                    res.status(421).send({
                        message: "Notification send failed!"
                    });
                }
            })
        } else {
            res.status(421).send({
                message: "Not authorised to send notifications!"
            });
        }
    },

}