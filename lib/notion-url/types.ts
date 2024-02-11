export type NotionUrl = {
	raw: string;
	rawPageId: string;
	pageId: string;
	isPeeked: boolean;
	isDatabasePage: boolean;
	workspaceId?: string;
	rawBasePageId?: string;
	basePageId?: string;
	viewId?: string;
	peekPageId?: string;
	peekMode?: string;
};

export type ParsedFromParam = Pick<
	NotionUrl,
	| "raw"
	| "isDatabasePage"
	| "isPeeked"
	| "rawBasePageId"
	| "basePageId"
	| "viewId"
	| "peekPageId"
	| "peekMode"
>;
export type ParsedFromPath = Pick<
	NotionUrl,
	"raw" | "rawPageId" | "pageId" | "workspaceId"
>;

export type parseParam = (rawUrl: string) => ParsedFromParam;
export type parsePath = (rawUrl: string) => ParsedFromPath;
export type validate = (rawUrl: string) => { result: boolean, reason: Error | null };
