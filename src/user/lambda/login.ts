import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { db } from 'src';
import { USER_TABLE } from 'src/constant';
import { apiResponse } from 'src/utils/apiResponse';
import { signToken } from 'src/auth/helpers';

// TODO: 1. Password Hashing 2. Fields Validation
export async function loginHandler(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  const incomingUser = JSON.parse(event.body);
  let user;
  try {
    user = await db(USER_TABLE).where({ email: incomingUser.email });
    if (!user) {
      return apiResponse._404({
        message: 'User with the given email not found',
      });
    }
    if (user[0].password != incomingUser.password) {
      return apiResponse._403({
        message: 'Password incorrect',
      });
    } else {
      return apiResponse._200({
        message: 'Login Successfull',
        token: signToken(user[0].id),
      });
    }
  } catch (err) {
    return apiResponse._400({
      message: 'There was an error logging in',
    });
  }
  return null;
}
