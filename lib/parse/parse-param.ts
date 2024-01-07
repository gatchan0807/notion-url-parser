import { parseParam as parseParamFunction } from "../notion-url/types";
import { separatePageId, separatePathName } from "../common/domain";
import { validate } from "../validation/validation";

/**
 * 指定された生のURLを解析し、必要なパラメータを抽出します。
 *
 * @param rawUrl - 解析するURL。
 * @returns 解析されたNotionUrlオブジェクト。
 * @throws URLが無効な場合はエラーが throw されます。
 */
export const parseParam: parseParamFunction = (rawUrl: string) => {
    if (!validate(rawUrl)) {
        throw new Error("Invalid URL");
    }

    const url = new URL(rawUrl);
    const params = separateParam(url.searchParams);

    if (params.viewId !== null && params.viewId !== "") {
        const rawDatabasePageId = separatePathName(url.pathname).rawPageId;
        return {
            raw: rawUrl,
            rawDatabasePageId,
            databasePageId: separatePageId(rawDatabasePageId) ?? "",
            viewId: params.viewId ?? "",
            isDatabasePage: true,
        };
    }

    return {
        raw: rawUrl,
    };
};

/**
 * URLSearchParamsオブジェクトからパラメータを分離します。
 * @param param - パラメータを含むURLSearchParamsオブジェクトです。
 * @returns 分離されたパラメータを持つオブジェクトです。
 */
const separateParam = (param: URLSearchParams) => {
    return { viewId: param.get("v") };
};
