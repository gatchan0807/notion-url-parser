import { parsePath as parsePathFunction } from "../notion-url/types";
import { separatePageId, separatePathName } from "../common/domain";
import { validate } from "../validation/validation";

/**
 * URLを解析し、NotionUrlオブジェクトを返します。
 * @param rawUrl - 解析するURL。
 * @returns 解析されたNotionUrlオブジェクト。
 * @throws URLが無効な場合はエラーが throw されます。
 */
export const parsePath: parsePathFunction = (rawUrl: string) => {
	const valid = validate(rawUrl);
	if (!valid.result && valid.reason !== null) {
		throw valid.reason;
	} else if (!valid.result) {
		throw new Error("Something went wrong in Notion URL Parser");
	}

	const url = new URL(rawUrl);

	const path = separatePathName(url.pathname);
	const pageId = separatePageId(path.rawPageId);

	return {
		raw: rawUrl,
		rawPageId: path.rawPageId,
		pageId: pageId ?? "",
		workspaceId: path.rawWorkspaceId ?? "",
	};
};
