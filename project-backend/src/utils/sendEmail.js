import ElasticEmail from '@elasticemail/elasticemail-client';
import 'dotenv/config';

const { ELASTICEMAIL_API_KEY, ELASTICEMAIL_FROM } = process.env;

const defaultClient = ElasticEmail.ApiClient.instance;

const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTICEMAIL_API_KEY;

const api = new ElasticEmail.EmailsApi();

const email = ElasticEmail.EmailMessageData.constructFromObject({
  Recipients: [new ElasticEmail.EmailRecipient(ELASTICEMAIL_FROM)],
  Content: {
    Body: [
      ElasticEmail.BodyPart.constructFromObject({
        ContentType: 'HTML',
        Content: '<strong> Testing the email ;)</strong>',
      }),
    ],
    Subject: 'Test email ;)',
    From: ELASTICEMAIL_FROM,
  },
});

const callback = function (error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
api.emailsPost(email, callback);
