/**
 * パス名をワークスペースとページIDに分割します。
 * @param path - 分割するパス名。
 * @returns ワークスペースとページIDが含まれるオブジェクト（利用可能な場合）。
 */
export const separatePageId = (rawPageId: string) => {
    const pageId = rawPageId.match(/[a-z0-9]{32}$/);
    if (!pageId || pageId[0] === "") {
        return null;
    }
    return pageId[0];
};

