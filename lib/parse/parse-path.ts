import { NotionUrl } from "../notion-url/types";
import { validate } from "../validation/validation";


/**
 * URLを解析し、NotionUrlオブジェクトを返します。
 * @param rawUrl - 解析するURL。
 * @returns 解析されたNotionUrlオブジェクト。
 * @throws URLが無効な場合はエラーが throw されます。
 */
export const parsePath: (rawUrl: string) => NotionUrl = (rawUrl: string) => {
	if (!validate(rawUrl)) {
		throw new Error("Invalid URL");
	}

	const url = new URL(rawUrl);
	const path = separatePathName(url.pathname);

	const notionUrl: NotionUrl = {
		raw: rawUrl,
		rawPageId: path.pageId,
		workspaceId: path.workspace ?? "",
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
        return { workspace: pathArray[0], pageId: pathArray[1] };
    }

    return { pageId: pathArray[0] };
};
