/**
 * ページIDを生のページIDから分離します。
 *
 * @param rawPageId - 生のページID。
 * @returns 分離されたページID。
 */
export const separatePageId = (rawPageId: string) => {
    const pageId = rawPageId.match(/[a-z0-9]{32}$/);
    if (!pageId || pageId[0] === "") {
        return null;
    }
    return pageId[0];
};

/**
 * パス名をワークスペースとページIDに分割します。
 * @param path - 分割するパス名。
 * @returns ワークスペースとページIDが含まれるオブジェクト（利用可能な場合）。
 */
export const separatePathName = (path: string) => {
    const pathArray = path.split("/").filter((item) => item !== "");
    if (pathArray.length === 0) {
        return { rawPageId: "" };
    }

    if (pathArray.length === 2) {
        return { rawWorkspaceId: pathArray[0], rawPageId: pathArray[1] };
    }

    return { rawPageId: pathArray[0] ?? "" };
};
