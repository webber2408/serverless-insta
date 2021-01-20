import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { db } from 'src';
import { USER_TABLE } from 'src/constant';
import { v4 as uuidv4 } from 'uuid';
import { apiResponse } from 'src/utils/apiResponse';

// TODO: 1. Validation 2. User already present check 3. Entity Transformer
export async function registerHandler(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  const user = JSON.parse(event.body);
  try {
    user.uuid = uuidv4();
    return await db(USER_TABLE)
      .insert(user)
      .then(async (id) => {
        const user = await db(USER_TABLE)
          .where({ id: id })
          .select(['username', 'name', 'email', 'bio']);
        return apiResponse._200({ user });
      });
  } catch (err) {
    return apiResponse._400({
      message: 'There was an error registering user',
    });
  }
}
