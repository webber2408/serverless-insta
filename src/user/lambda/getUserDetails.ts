import { USER_TABLE } from '@app/constant';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { apiResponse } from 'src/utils/apiResponse';
import { db } from '../../../src';

export async function userDetailsHandler(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  const username = event.pathParameters.username;
  try {
    const user = await db(USER_TABLE)
      .where({ username })
      .select(['name', 'email', 'username', 'bio']);
    return apiResponse._200({
      user,
    });
  } catch (err) {
    return apiResponse._400({
      message: 'There was an error getting user details',
      error: err,
    });
  }
}
