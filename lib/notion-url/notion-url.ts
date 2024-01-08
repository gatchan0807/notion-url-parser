import { parseParam } from "../parse/parse-param";
import { parsePath } from "../parse/parse-path";

export class NotionUrl {
    public raw: string;
    public rawPageId: string;
    public pageId: string;
    public workspaceId: string;
    public isPeeked: boolean;
    public isDatabasePage: boolean;
    public basePageId?: string;
    public rawBasePageId?: string;
    public viewId?: string;
    public peekPageId?: string;
    public peekMode?: string;

    constructor(rawUrl: string) {
        this.raw = rawUrl;
        const path = parsePath(this.raw);
        const param = parseParam(this.raw);

        this.rawPageId = path.rawPageId;
        this.pageId = path.pageId;
        this.workspaceId = path.workspaceId ?? "";
        this.isPeeked = param.isPeeked;
        this.isDatabasePage = param.isDatabasePage;

        if (this.isDatabasePage) {
            this.basePageId = param.basePageId ?? "";
            this.rawBasePageId = param.rawBasePageId ?? "";
            this.viewId = param.viewId ?? "";
        }

        if (this.isPeeked) {
            this.basePageId = param.basePageId ?? "";
            this.rawBasePageId = param.rawBasePageId ?? "";
            this.peekPageId = param.peekPageId ?? "";
            this.peekMode = param.peekMode ?? "";
        }
    }
}
