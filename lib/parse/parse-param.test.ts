import { describe, expect, test } from "vitest";
import { parseParam } from "./parse-param";

describe("parseParam", () => {
    test.each([
        {
            url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv",
            expected: {
                raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv",
            },
        },
        {
            url: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
            expected: {
                raw: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
            },
        },
        {
            url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?v=abcdefghijklnmopqrstuv1234567890",
            expected: {
                raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?v=abcdefghijklnmopqrstuv1234567890",
                rawDatabasePageId: "1234567890abcdefghijklnmopqrstuv",
                databasePageId: "1234567890abcdefghijklnmopqrstuv",
                viewId: "abcdefghijklnmopqrstuv1234567890",
                isDatabasePage: true,
            },
        },
        {
            url: "https://notion.so/workspace/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv?v=abcdefghijklnmopqrstuv1234567890",
            expected: {
                raw: "https://notion.so/workspace/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv?v=abcdefghijklnmopqrstuv1234567890",
                rawDatabasePageId:
                    "alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                databasePageId: "1234567890abcdefghijklnmopqrstuv",
                viewId: "abcdefghijklnmopqrstuv1234567890",
                isDatabasePage: true,
            },
        },
    ])("[正常系] $url の場合パース成功する", ({ url, expected }) => {
        expect(parseParam(url)).toStrictEqual(expected);
    });

    test.each([
        {
            caseTitle: "パスがルートのNotionのURL（サブドメイン無し）の場合",
            url: "https://notion.so",
            expectedException: "Invalid URL",
        },
        {
            caseTitle: "パスがルートのNotionのURL（サブドメイン無し）の場合",
            url: "https://workspace.notion.so",
            expectedException: "Invalid URL",
        },
        {
            caseTitle: "Notion以外のURL",
            url: "https://google.com",
            expectedException: "Invalid URL",
        },
        {
            caseTitle: "Notion以外のURL（Param付き）",
            url: "https://google.com?query=abcxyz",
            expectedException: "Invalid URL",
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
        "[異常系] $caseTitle( $url )の場合パース失敗する",
        ({ url, expectedException }) => {
            expect(() => parseParam(url)).toThrowError(expectedException);
        }
    );
});
