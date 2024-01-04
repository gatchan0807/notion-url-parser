export type NotionUrl = {
	raw: string;
	rawPageId: string;
    pageId: string;
	workspaceId?: string;
};

export type parsePath = (rawUrl: string) => NotionUrl;
export type validate = (rawUrl: string) => boolean;