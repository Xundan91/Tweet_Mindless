

import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';

dotenv.config(); 

const twitterClient = new TwitterApi({
  appKey : process.env.APPKEY,
  appSecret: process.env.APPSECRET,
  accessToken: process.env.ACCESSTOKEN,
  accessSecret: process.env.ACCESSSECRET,
});

async function run() {
  try {
    const user = await twitterClient.v2.userByUsername('kundan_singh91');
    console.log(user);
    const tweet = await twitterClient.v2.tweet('Hello, this is  tweeet bot.');
    console.log('Tweet posted successfully!', tweet);

  } catch (error) {
    console.error('Error posting tweet:', error);
  }
}

run();
