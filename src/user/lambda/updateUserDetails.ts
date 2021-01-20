import { USER_TABLE } from '@app/constant';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { apiResponse } from 'src/utils/apiResponse';
import { db } from '../../../src';

export async function updateDetailsHandler(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  const username = event.requestContext.authorizer.principalId;
  const incomingUser = JSON.parse(event.body);
  try {
    await db(USER_TABLE).where({ username }).update(incomingUser);
  } catch (err) {
    return apiResponse._400({
      message: 'There was an error updating user details',
      error: err,
    });
  }
  return apiResponse._200({
    message: 'User updated successfully',
  });
}
