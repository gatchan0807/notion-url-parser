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

    const isDatabasePage = typeof params.viewId === "string" && params.viewId !== "";

    const rawBasePageId = separatePathName(url.pathname).rawPageId;
    const baseResult = {
        raw: rawUrl,
        rawBasePageId,
        basePageId: separatePageId(rawBasePageId) ?? "",
        isDatabasePage,
    };

    if (isDatabasePage) {
        return {
            ...baseResult,
            viewId: params.viewId ?? "",
        };
    }

    // SearchParamsに有効な値がない場合は Page ID 関連のパラメーターを落として返す
    const { rawBasePageId: _r, basePageId: _b, ...result } = baseResult;
    return result;
};

/**
 * URLSearchParamsオブジェクトからパラメータを分離します。
 * @param param - パラメータを含むURLSearchParamsオブジェクトです。
 * @returns 分離されたパラメータを持つオブジェクトです。
 */
const separateParam = (param: URLSearchParams) => {
    return {
        viewId: param.get("v"),
    };
};
