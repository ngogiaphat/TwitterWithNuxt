import {prisma} from ".";
export const createMediaFile = (mediaFileData) => {
	return prisma.mediaFile.create({
		data: mediaFile,
	});
};