import { describe, expect, test } from "vitest";
import { NotionUrl } from "../notion-url";

describe("notion-url", () => {
    describe("正常系", () => {
        test.each([
            {
                url: "https://notion.so/1234567890abcdefghijklnmopqrstuv",
                expected: {
                    raw: "https://notion.so/1234567890abcdefghijklnmopqrstuv",
                    rawPageId: "1234567890abcdefghijklnmopqrstuv",
                    pageId: "1234567890abcdefghijklnmopqrstuv",
                    workspaceId: "",
                    isPeeked: false,
                    isDatabasePage: false,
                },
            },
            {
                url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv",
                expected: {
                    raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv",
                    rawPageId: "1234567890abcdefghijklnmopqrstuv",
                    pageId: "1234567890abcdefghijklnmopqrstuv",
                    workspaceId: "workspace",
                    isPeeked: false,
                    isDatabasePage: false,
                },
            },
            {
                url: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                expected: {
                    raw: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                    rawPageId: "alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                    pageId: "1234567890abcdefghijklnmopqrstuv",
                    workspaceId: "",
                    isPeeked: false,
                    isDatabasePage: false,
                },
            },
            {
                url: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv?p=abcdefghijklnmopqrstuv1234567890&pm=s",
                expected: {
                    raw: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv?p=abcdefghijklnmopqrstuv1234567890&pm=s",
                    rawPageId: "alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                    pageId: "1234567890abcdefghijklnmopqrstuv",
                    workspaceId: "",
                    isPeeked: true,
                    isDatabasePage: false,
                    basePageId: "1234567890abcdefghijklnmopqrstuv",
                    rawBasePageId:
                        "alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                    peekPageId: "abcdefghijklnmopqrstuv1234567890",
                    peekMode: "s",
                },
            },
            {
                url: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv?v=abcdefghijklnmopqrstuv1234567890",
                expected: {
                    raw: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv?v=abcdefghijklnmopqrstuv1234567890",
                    rawPageId: "alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                    pageId: "1234567890abcdefghijklnmopqrstuv",
                    workspaceId: "",
                    isPeeked: false,
                    isDatabasePage: true,
                    basePageId: "1234567890abcdefghijklnmopqrstuv",
                    rawBasePageId:
                        "alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                    viewId: "abcdefghijklnmopqrstuv1234567890",
                },
            },
            {
                url: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv?v=9876543210abcdefghijklnmopqrstuv&p=abcdefghijklnmopqrstuv1234567890&pm=s",
                expected: {
                    raw: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv?v=9876543210abcdefghijklnmopqrstuv&p=abcdefghijklnmopqrstuv1234567890&pm=s",
                    rawPageId: "alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                    pageId: "1234567890abcdefghijklnmopqrstuv",
                    workspaceId: "",
                    isPeeked: true,
                    isDatabasePage: true,
                    basePageId: "1234567890abcdefghijklnmopqrstuv",
                    rawBasePageId:
                        "alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                    viewId: "9876543210abcdefghijklnmopqrstuv",
                    peekPageId: "abcdefghijklnmopqrstuv1234567890",
                    peekMode: "s",
                },
            },
        ])("$url を正しくNotionUrlクラスに変換できる", ({ url, expected }) => {
            const nu = new NotionUrl(url);

            expect(nu).toBeInstanceOf(NotionUrl);
            expect(nu).toMatchObject(expected);
        });
    });

    describe("異常系（パース失敗）", () => {
        test.each([
            {
                caseTitle: "パスがルートのNotionのURL（サブドメイン無し）の場合",
                url: "https://notion.so",
                expectedException: "Path is empty",
            },
            {
                caseTitle: "パスがルートのNotionのURL（サブドメイン無し）の場合",
                url: "https://workspace.notion.so",
                expectedException: "Path is empty",
            },
            {
                caseTitle: "Notion以外のURL",
                url: "https://google.com",
                expectedException: "Host is not notion.so",
            },
            {
                caseTitle: "URLとして成立しない文字列",
                url: "https://",
                expectedException: "Invalid URL",
            },
            {
                caseTitle: "Notion Page IDだけの場合",
                url: "1234567890abcdefghijklnmopqrstuv",
                expectedException: "Invalid URL",
            },
        ])(
            "$caseTitle( $url )の場合に、エラーを投げる",
            ({ url, expectedException }) => {
                expect(() => new NotionUrl(url)).toThrowError(expectedException);
            }
        );
    });
});
