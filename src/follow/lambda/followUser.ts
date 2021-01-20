import { FOLLOW_TABLE } from '@app/constant';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { apiResponse } from 'src/utils/apiResponse';
import { db } from '../../../src';
import { isEmpty } from 'lodash';

export async function followUserHandler(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  const follower_username = event.requestContext.authorizer.principalId;
  const followed_username = event.pathParameters.username;
  let followString;
  try {
    const follow = await db(FOLLOW_TABLE).where({
      followed_id: followed_username,
    });
    if (!isEmpty(follow)) {
      await db(FOLLOW_TABLE).where({ followed_id: followed_username }).del();
      followString = 'unfollowed';
    } else {
      await db(FOLLOW_TABLE).insert({
        follower_id: follower_username,
        followed_id: followed_username,
      });
      followString = 'followed';
    }
  } catch (err) {
    return apiResponse._400({
      message: 'There was an error toggling follow for the given user',
      error: err,
    });
  }
  return apiResponse._200({
    message: `User ${followString} successfully`,
  });
}
