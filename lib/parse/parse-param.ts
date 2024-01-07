import { parseParam as parseParamFunction } from "../notion-url/types";
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

    if (params.viewId !== null) {
        const rawDatabasePageId = separatePathName(url.pathname).rawPageId;
        return {
            raw: rawUrl,
            rawDatabasePageId,
            databasePageId: separatePageId(rawDatabasePageId) ?? "",
            viewId: params.viewId ?? "",
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


// TODO: この関数はparsePath.tsと重複しているので、共通化する
const separatePathName = (path: string) => {
    const pathArray = path.split("/").filter((item) => item !== "");
    if (pathArray.length >= 2) {
        return { workspaceId: pathArray[0], rawPageId: pathArray[1] };
    }

    return { rawPageId: pathArray[0] };
};

// TODO: この関数はparsePath.tsと重複しているので、共通化する
const separatePageId = (rawPageId: string) => {
    const pageId = rawPageId.match(/[a-z0-9]{32}$/);
    if (!pageId || pageId[0] === "") {
        return null;
    }
    return pageId[0];
};
