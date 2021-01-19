import { USER_TABLE } from '@app/constant';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { apiResponse } from 'src/utils/apiResponse';
import { db } from '../../../src';

export async function updateDetailsHandler(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  const userId = event.requestContext.authorizer.principalId;
  const incomingUser = JSON.parse(event.body);
  try {
    await db(USER_TABLE).where({ id: userId }).update(incomingUser);
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
