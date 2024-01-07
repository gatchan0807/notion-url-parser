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
});
