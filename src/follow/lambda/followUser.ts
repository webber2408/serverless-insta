import { FOLLOW_TABLE, USER_TABLE } from '@app/constant';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { apiResponse } from 'src/utils/apiResponse';
import { db } from '../../../src';

export async function followUserHandler(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  const follower_id = event.requestContext.authorizer.principalId;
  const followed_id = event.pathParameters.userId;
  try {
    const id = await db(USER_TABLE).where({ uuid: followed_id }).select('id');
    await db(FOLLOW_TABLE).insert({
      follower_id,
      followed_id: id,
    });
  } catch (err) {
    return apiResponse._400({
      message: 'There was an error following the given user',
      error: err,
    });
  }
  return apiResponse._200({
    message: 'User followed successfully',
  });
}
