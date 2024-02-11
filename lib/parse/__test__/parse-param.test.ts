import { describe, expect, test } from "vitest";
import { parseParam } from "../parse-param";

describe("parseParam", () => {
    describe("正常系", () => {
        test.each([
            {
                url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?v=abcdefghijklnmopqrstuv1234567890",
                expected: {
                    raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?v=abcdefghijklnmopqrstuv1234567890",
                    rawBasePageId: "1234567890abcdefghijklnmopqrstuv",
                    basePageId: "1234567890abcdefghijklnmopqrstuv",
                    viewId: "abcdefghijklnmopqrstuv1234567890",
                    isDatabasePage: true,
                    isPeeked: false,
                },
            },
            {
                url: "https://notion.so/workspace/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv?v=abcdefghijklnmopqrstuv1234567890",
                expected: {
                    raw: "https://notion.so/workspace/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv?v=abcdefghijklnmopqrstuv1234567890",
                    rawBasePageId:
                        "alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                    basePageId: "1234567890abcdefghijklnmopqrstuv",
                    viewId: "abcdefghijklnmopqrstuv1234567890",
                    isDatabasePage: true,
                    isPeeked: false,
                },
            },
            {
                url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?v=abcdefghijklnmopqrstuv1234567890&p=987654321abcdefghijklnmopqrstuv",
                expected: {
                    raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?v=abcdefghijklnmopqrstuv1234567890&p=987654321abcdefghijklnmopqrstuv",
                    rawBasePageId: "1234567890abcdefghijklnmopqrstuv",
                    basePageId: "1234567890abcdefghijklnmopqrstuv",
                    viewId: "abcdefghijklnmopqrstuv1234567890",
                    peekPageId: "987654321abcdefghijklnmopqrstuv",
                    peekMode: "",
                    isDatabasePage: true,
                    isPeeked: true,
                },
            },
            {
                url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?v=abcdefghijklnmopqrstuv1234567890&p=987654321abcdefghijklnmopqrstuv&pm=s",
                expected: {
                    raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?v=abcdefghijklnmopqrstuv1234567890&p=987654321abcdefghijklnmopqrstuv&pm=s",
                    rawBasePageId: "1234567890abcdefghijklnmopqrstuv",
                    basePageId: "1234567890abcdefghijklnmopqrstuv",
                    viewId: "abcdefghijklnmopqrstuv1234567890",
                    peekPageId: "987654321abcdefghijklnmopqrstuv",
                    peekMode: "s",
                    isDatabasePage: true,
                    isPeeked: true,
                },
            },
            {
                url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?v=abcdefghijklnmopqrstuv1234567890&p=987654321abcdefghijklnmopqrstuv&pm=c",
                expected: {
                    raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?v=abcdefghijklnmopqrstuv1234567890&p=987654321abcdefghijklnmopqrstuv&pm=c",
                    rawBasePageId: "1234567890abcdefghijklnmopqrstuv",
                    basePageId: "1234567890abcdefghijklnmopqrstuv",
                    viewId: "abcdefghijklnmopqrstuv1234567890",
                    peekPageId: "987654321abcdefghijklnmopqrstuv",
                    peekMode: "c",
                    isDatabasePage: true,
                    isPeeked: true,
                },
            },
            {
                url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?p=987654321abcdefghijklnmopqrstuv",
                expected: {
                    raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?p=987654321abcdefghijklnmopqrstuv",
                    rawBasePageId: "1234567890abcdefghijklnmopqrstuv",
                    basePageId: "1234567890abcdefghijklnmopqrstuv",
                    peekPageId: "987654321abcdefghijklnmopqrstuv",
                    peekMode: "",
                    isDatabasePage: false,
                    isPeeked: true,
                },
            },
            {
                url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?p=987654321abcdefghijklnmopqrstuv&pm=s",
                expected: {
                    raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?p=987654321abcdefghijklnmopqrstuv&pm=s",
                    rawBasePageId: "1234567890abcdefghijklnmopqrstuv",
                    basePageId: "1234567890abcdefghijklnmopqrstuv",
                    peekPageId: "987654321abcdefghijklnmopqrstuv",
                    peekMode: "s",
                    isDatabasePage: false,
                    isPeeked: true,
                },
            },
            {
                url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?p=987654321abcdefghijklnmopqrstuv&pm=c",
                expected: {
                    raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?p=987654321abcdefghijklnmopqrstuv&pm=c",
                    rawBasePageId: "1234567890abcdefghijklnmopqrstuv",
                    basePageId: "1234567890abcdefghijklnmopqrstuv",
                    peekPageId: "987654321abcdefghijklnmopqrstuv",
                    peekMode: "c",
                    isDatabasePage: false,
                    isPeeked: true,
                },
            },
            {
                // 同じページをサイドページで開くこともできる
                url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?p=1234567890abcdefghijklnmopqrstuv",
                expected: {
                    raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?p=1234567890abcdefghijklnmopqrstuv",
                    rawBasePageId: "1234567890abcdefghijklnmopqrstuv",
                    basePageId: "1234567890abcdefghijklnmopqrstuv",
                    peekPageId: "1234567890abcdefghijklnmopqrstuv",
                    peekMode: "",
                    isDatabasePage: false,
                    isPeeked: true,
                },
            },
            {
                // 同じページをサイドページで開くこともできる
                url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?p=1234567890abcdefghijklnmopqrstuv&pm=s",
                expected: {
                    raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?p=1234567890abcdefghijklnmopqrstuv&pm=s",
                    rawBasePageId: "1234567890abcdefghijklnmopqrstuv",
                    basePageId: "1234567890abcdefghijklnmopqrstuv",
                    peekPageId: "1234567890abcdefghijklnmopqrstuv",
                    peekMode: "s",
                    isDatabasePage: false,
                    isPeeked: true,
                },
            },
            {
                // 同じページをポップアップで開くこともできる
                url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?p=1234567890abcdefghijklnmopqrstuv&pm=c",
                expected: {
                    raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?p=1234567890abcdefghijklnmopqrstuv&pm=c",
                    rawBasePageId: "1234567890abcdefghijklnmopqrstuv",
                    basePageId: "1234567890abcdefghijklnmopqrstuv",
                    peekPageId: "1234567890abcdefghijklnmopqrstuv",
                    peekMode: "c",
                    isDatabasePage: false,
                    isPeeked: true,
                },
            },
        ])("$url の場合、パース成功する", ({ url, expected }) => {
            expect(parseParam(url)).toStrictEqual(expected);
        });
    });

    describe("異常系（パース失敗）", () => {
        test.each([
            {
                caseTitle: "パスがルートのNotionのURL（サブドメイン無し）",
                url: "https://notion.so",
                expectedException: "Path is empty",
            },
            {
                caseTitle: "パスがルートのNotionのURL（サブドメイン無し）",
                url: "https://workspace.notion.so",
                expectedException: "Path is empty",
            },
            {
                caseTitle: "Notion以外のURL",
                url: "https://google.com",
                expectedException: "Host is not notion.so",
            },
            {
                caseTitle: "Notion以外のURL（Param付き）",
                url: "https://google.com?query=abcxyz",
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
            {
                caseTitle: "パラメータだけの場合",
                url: "?v=1234567890abcdefghijklnmopqrstuv&p=1234567890abcdefghijklnmopqrstuv&pm=s",
                expectedException: "Invalid URL",
            },
            {
                caseTitle: "View IDだけがSearch Paramsに付与されている場合",
                url: "https://notion.so/?v=1234567890abcdefghijklnmopqrstuv",
                expected: "Path is empty",
            },
            {
                caseTitle: "Peeked Page IDだけがSearch Paramsに付与されている場合",
                url: "https://notion.so/?p=1234567890abcdefghijklnmopqrstuv",
                expected: "Path is empty",
            },
            {
                caseTitle: "Peeked Mode情報だけがSearch Paramsに付与されている場合",
                url: "https://notion.so/?pm=s",
                expected: "Path is empty",
            },
        ])(
            "$caseTitle( $url )の場合、パース失敗する",
            ({ url, expectedException }) => {
                expect(() => parseParam(url)).toThrowError(expectedException);
            }
        );
    });

    describe("異常系（フェイルセーフ）", () => {
        test.each([
            {
                caseTitle: "URLにvのパラメーターが含まれていない",
                url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv",
                expected: {
                    raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv",
                    isDatabasePage: false,
                    isPeeked: false,
                },
            },
            {
                caseTitle: "URLにvのパラメーターが含まれていない",
                url: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                expected: {
                    raw: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                    isDatabasePage: false,
                    isPeeked: false,
                },
            },
            {
                caseTitle: "NotionのParamsとして想定されないパラメータが含まれている",
                url: "https://notion.so/1234567890abcdefghijklnmopqrstuv?x=abcdefghijklnmopqrstuv1234567890",
                expected: {
                    raw: "https://notion.so/1234567890abcdefghijklnmopqrstuv?x=abcdefghijklnmopqrstuv1234567890",
                    isDatabasePage: false,
                    isPeeked: false,
                },
            },
            {
                caseTitle: "NotionのParamsとして想定されないパラメータが含まれている",
                url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?x=abcdefghijklnmopqrstuv1234567890",
                expected: {
                    raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?x=abcdefghijklnmopqrstuv1234567890",
                    isDatabasePage: false,
                    isPeeked: false,
                },
            },
            {
                caseTitle: "NotionのParamsとして想定されないパラメータが含まれている",
                url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?x",
                expected: {
                    raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?x",
                    isDatabasePage: false,
                    isPeeked: false,
                },
            },
            {
                caseTitle: "vパラメータの中身が含まれていない",
                url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?v",
                expected: {
                    raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?v",
                    isDatabasePage: false,
                    isPeeked: false,
                },
            },
            {
                caseTitle: "pパラメータの中身が含まれていない",
                url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?p",
                expected: {
                    raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?p",
                    isDatabasePage: false,
                    isPeeked: false,
                },
            },
            {
                caseTitle: "pmパラメータの中身が含まれていない",
                url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?pm",
                expected: {
                    raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?pm",
                    isDatabasePage: false,
                    isPeeked: false,
                },
            },
            {
                caseTitle: "vパラメータ・pパラメータ・pmパラメータどの中身も含まれていない",
                url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?v&p&pm",
                expected: {
                    raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?v&p&pm",
                    isDatabasePage: false,
                    isPeeked: false,
                },
            },
            {
                caseTitle: "vパラメータ・pパラメータどちらの中身も含まれていない",
                url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?v&p",
                expected: {
                    raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?v&p",
                    isDatabasePage: false,
                    isPeeked: false,
                },
            },
            {
                caseTitle: "pパラメータ・pmパラメータどの中身も含まれていない",
                url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?p&pm",
                expected: {
                    raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?p&pm",
                    isDatabasePage: false,
                    isPeeked: false,
                },
            },
            {
                caseTitle: "pmパラメータのみ",
                url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?pm=s",
                expected: {
                    raw: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv?pm=s",
                    isDatabasePage: false,
                    isPeeked: false,
                },
            },
        ])(
            "$caseTitle ( $url )場合、そのままURLを返す形でパース成功する",
            ({ url, expected }) => {
                expect(parseParam(url)).toStrictEqual(expected);
            }
        );
    });
});
