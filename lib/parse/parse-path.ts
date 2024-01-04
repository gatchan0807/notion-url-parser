import { NotionUrl, parsePath as parsePathFunction } from "../notion-url/types";
import { validate } from "../validation/validation";

/**
 * URLを解析し、NotionUrlオブジェクトを返します。
 * @param rawUrl - 解析するURL。
 * @returns 解析されたNotionUrlオブジェクト。
 * @throws URLが無効な場合はエラーが throw されます。
 */
export const parsePath: parsePathFunction = (rawUrl: string) => {
	if (!validate(rawUrl)) {
		throw new Error("Invalid URL");
	}

	const url = new URL(rawUrl);
	const path = separatePathName(url.pathname);

	const notionUrl: NotionUrl = {
		raw: rawUrl,
		rawPageId: path.rawPageId,
		workspaceId: path.workspaceId ?? "",
	};

	return notionUrl;
};

/**
 * パス名をワークスペースとページIDに分割します。
 * @param path - 分割するパス名。
 * @returns ワークスペースとページIDが含まれるオブジェクト（利用可能な場合）。
 */
const separatePathName = (path: string) => {
	const pathArray = path.split("/").filter((item) => item !== "");
	if (pathArray.length >= 2) {
		return { workspaceId: pathArray[0], rawPageId: pathArray[1] };
	}

	return { rawPageId: pathArray[0] };
};