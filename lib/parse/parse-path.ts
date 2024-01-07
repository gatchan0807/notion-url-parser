import { parsePath as parsePathFunction } from "../notion-url/types";
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
	const pageId = separatePageId(path.rawPageId);

	return {
		raw: rawUrl,
		rawPageId: path.rawPageId,
		pageId: pageId ?? "",
		workspaceId: path.workspaceId ?? "",
	};
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

/**
 * ページIDを生のページIDから分離します。
 *
 * @param rawPageId - 生のページID。
 * @returns 分離されたページID。
 */
const separatePageId = (rawPageId: string) => {
	const pageId = rawPageId.match(/[a-z0-9]{32}$/);
	if (!pageId || pageId[0] === "") {
		return null;
	}
	return pageId[0];
};
