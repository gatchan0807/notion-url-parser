export type NotionUrl = {
	raw: string;
	rawPageId: string;
	pageId: string;
	workspaceId?: string;
	rawDatabasePageId?: string;
	databasePageId?: string;
	viewId?: string;
};

export type ParsedFromParam = Pick<NotionUrl, "raw" | "viewId" | "databasePageId">;
export type ParsedFromPath = Pick<
	NotionUrl,
	"raw" | "rawPageId" | "pageId" | "workspaceId"
>;

export type parseParam = (rawUrl: string) => ParsedFromParam;
export type parsePath = (rawUrl: string) => ParsedFromPath;
export type validate = (rawUrl: string) => boolean;
