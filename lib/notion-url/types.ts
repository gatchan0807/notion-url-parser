export type NotionUrl = {
	raw: string;
	rawPageId: string;
	pageId: string;
	isDatabasePage: boolean;
	workspaceId?: string;
	rawBasePageId?: string;
	basePageId?: string;
	viewId?: string;
};

export type ParsedFromParam = Pick<
	NotionUrl,
	| "raw"
	| "isDatabasePage"
	| "rawBasePageId"
	| "basePageId"
	| "viewId"
>;
export type ParsedFromPath = Pick<
	NotionUrl,
	"raw" | "rawPageId" | "pageId" | "workspaceId"
>;

export type parseParam = (rawUrl: string) => ParsedFromParam;
export type parsePath = (rawUrl: string) => ParsedFromPath;
export type validate = (rawUrl: string) => boolean;
