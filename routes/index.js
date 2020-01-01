const express = require('express');
const AWS = require('aws-sdk');
const Shopify = require('shopify-api-node');
const app = express();
const router = express.Router();


const AWSaccessKeyId = 'AKIAJD63A3BR7DH2QTZQ';
const AWSsecretAccessKey = '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';
const AWSregion = 'us-east-2';
AWS.config.update({
    accessKeyId: AWSaccessKeyId,
    secretAccessKey: AWSsecretAccessKey,
    region: AWSregion
});


var docClient = new AWS.DynamoDB.DocumentClient();
const table = 'GoIntegrationsTest';
const key = "edd7fd7dac31cb81df28f91455649911";
const pass = "330c304080eb8a70845b94ad0269bc50";

const shopify = new Shopify({
    shopName: 'gointegrations-devtest.myshopify.com',
    apiKey: key,
    password: pass
});


/* GET home page. */
router.get('/', function (req, res, next) {
    app.use(express.static(__dirname + '/public'));
});

router.get('/products', function (req, res, next) {
    docClient.scan({TableName: table}, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.json(data);
        }
    })
});

router.get('/products/:id', function (req, res, next) {
    const id = {"id": parseInt(req.params.id)};
    let params = {};
    params.TableName = table;
    params.Key = id;
    docClient.get(params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.json(data);
        }
    });


});

router.post('/buy', function (req, res) {
    const data = req.body;


    let draftParams = {
        "line_items": [
            {
                "title": data.title,
                "product_id": data.id,
                "price": data.variants[0].price,
                "quantity": 1,

            }
        ],

        "applied_discount": {
            "title": "Test Discount",
            "description": "To test discounting",
            "value": "25",
            "value_type": "percentage",
            "amount": (Math.floor(data.variants[0].price * 25) / 100)
        }

    };
    shopify.draftOrder.create(draftParams)
        .then((response) => console.log(response))
        .then(() => res.send("success"))
        .catch((err) => console.error(err.response.body));


});


module.exports = router;
