import {sendError} from 'h3';
import {getUserById} from '../../db/users.js';
import {getRefreshTokenByToken} from '../../db/refreshToken.js';
import {generateTokens, decodeRefreshToken} from '../../utils/jwt.js';
export default defineEventHandler(async(event) => {
	const cookies = useCookies(event);
	const refreshToken = cookies.refresh_token;
	if(!refreshToken){
		return sendError(event, createError({
			statusCode: 401,
			statusMessage: 'Refresh token is invalid !',
		}));
	};
	const rToken = await getRefreshTokenByToken(refreshToken);
	if(!rToken){
		return sendError(event, createError({
			statusCode: 401,
			statusMessage: 'Refresh token is invalid !',
		}));
	};
	const token = decodeRefreshToken(refreshToken);
	try {
		const user = await getUserById(token.userId);
		const {accessToken} = generateTokens(user);
		return {
			access_token: accessToken,
		};
	}
	catch(error){
		return sendError(event, createError({
			statusCode: 500,
			statusMessage: 'Something went wrong !!!',
		}));
	};
});