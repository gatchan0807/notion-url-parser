import { describe, expect, test } from "vitest";
import { NotionUrl } from "../notion-url";

describe("NotionUrl", () => {
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
            "$caseTitle( $url )の場合に、エラーを投げる",
            ({ url, expectedException }) => {
                expect(() => new NotionUrl(url)).toThrowError(expectedException);
            }
        );
    });

    describe("異常系（フェイルセーフ）", () => {
        test.each([
            {
                caseTitle: "Workspace IDだけのURL",
                url: "https://notion.so/workspace/",
                expected: {
                    raw: "https://notion.so/workspace/",
                    rawPageId: "workspace",
                    pageId: "",
                    workspaceId: "",
                    isPeeked: false,
                    isDatabasePage: false,
                },
            },
            {
                caseTitle: "想定外のURL Paramsが付与されたURL",
                url: "https://notion.so/1234567890abcdefghijklnmopqrstuv?foo=bar",
                expected: {
                    raw: "https://notion.so/1234567890abcdefghijklnmopqrstuv?foo=bar",
                    rawPageId: "1234567890abcdefghijklnmopqrstuv",
                    pageId: "1234567890abcdefghijklnmopqrstuv",
                    workspaceId: "",
                    isPeeked: false,
                    isDatabasePage: false,
                },
            },
            {
                caseTitle: "Peek Mode情報だけのURL",
                url: "https://notion.so/1234567890abcdefghijklnmopqrstuv?pm=s",
                expected: {
                    raw: "https://notion.so/1234567890abcdefghijklnmopqrstuv?pm=s",
                    rawPageId: "1234567890abcdefghijklnmopqrstuv",
                    pageId: "1234567890abcdefghijklnmopqrstuv",
                    workspaceId: "",
                    isPeeked: false,
                    isDatabasePage: false,
                },
            },


        ])("$caseTitle( $url )を部分的に情報がないNotionUrlとして変換できる", ({ url, expected }) => {
            const nu = new NotionUrl(url);

            expect(nu).toBeInstanceOf(NotionUrl);
            expect(nu).toMatchObject(expected);
        }
        );
    });
});

describe("NotionUrl > getFocusedPageId()", () => {
    describe("正常系", () => {
        test.each([
            {
                url: "https://notion.so/1234567890abcdefghijklnmopqrstuv",
                expected: "1234567890abcdefghijklnmopqrstuv",
            },
            {
                url: "https://notion.so/workspace/1234567890abcdefghijklnmopqrstuv",
                expected: "1234567890abcdefghijklnmopqrstuv",
            },
            {
                url: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                expected: "1234567890abcdefghijklnmopqrstuv",
            },
            {
                url: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv?p=abcdefghijklnmopqrstuv1234567890&pm=s",
                expected: "abcdefghijklnmopqrstuv1234567890",
            },
            {
                url: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv?v=abcdefghijklnmopqrstuv1234567890",
                expected: "abcdefghijklnmopqrstuv1234567890",
            },
            {
                url: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv?v=9876543210abcdefghijklnmopqrstuv&p=abcdefghijklnmopqrstuv1234567890&pm=s",
                expected: "abcdefghijklnmopqrstuv1234567890",
            },
        ])("$url のフォーカス状態のPage IDを取得できる", ({ url, expected }) => {
            const nu = new NotionUrl(url);

            expect(nu).toBeInstanceOf(NotionUrl);
            expect(nu.getFocusedPageId()).toBe(expected);
        });
    });

    describe("異常系（フェイルセーフ）", () => {
        test.each([
            {
                caseTitle: "Workspace IDだけのURL",
                url: "https://notion.so/workspace/",
                expected: "",
            },
            {
                caseTitle: "想定外のURL Paramsが付与されたURL",
                url: "https://notion.so/1234567890abcdefghijklnmopqrstuv?foo=bar",
                expected: "1234567890abcdefghijklnmopqrstuv",
            },
            {
                caseTitle: "Peek Mode情報だけのURL",
                url: "https://notion.so/1234567890abcdefghijklnmopqrstuv?pm=s",
                expected: "1234567890abcdefghijklnmopqrstuv",
            },


        ])("$caseTitle( $url )のフォーカス状態のPage IDを取得できる", ({ url, expected }) => {
            const nu = new NotionUrl(url);

            expect(nu).toBeInstanceOf(NotionUrl);
            expect(nu.getFocusedPageId()).toMatchObject(expected);
        }
        );
    });
});

describe("NotionUrl > getFocusedPageHashedId()", () => {
    describe("正常系", () => {
        test.each([
            {
                url: "https://notion.so/1234567890abcdefghijklnmopqrstuv",
                expected: "8cc7e3c7413d4fbc14f12afe8816d4a009c5e6c57a7ab87d64b35450d6c3f552",
            },
            {
                url: "https://notion.so/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                expected: "8cc7e3c7413d4fbc14f12afe8816d4a009c5e6c57a7ab87d64b35450d6c3f552",
            },
            {
                url: "https://notion.so/abcdefghijklnmopqrstuv1234567890?v=1234567890abcdefghijklnmopqrstuv",
                expected: "8cc7e3c7413d4fbc14f12afe8816d4a009c5e6c57a7ab87d64b35450d6c3f552",
            },
            {
                url: "https://notion.so/abcdefghijklnmopqrstuv1234567890?p=1234567890abcdefghijklnmopqrstuv&pm=s",
                expected: "8cc7e3c7413d4fbc14f12afe8816d4a009c5e6c57a7ab87d64b35450d6c3f552",
            },
            {
                url: "https://notion.so/abcdefghijklnmopqrstuv1234567890?v=9876543210abcdefghijklnmopqrstuv&p=1234567890abcdefghijklnmopqrstuv&pm=s",
                expected: "8cc7e3c7413d4fbc14f12afe8816d4a009c5e6c57a7ab87d64b35450d6c3f552",
            },
            // 以下はフォーカスされているIDが異なるパターン
            {
                url: "https://notion.so/abcdefghijklnmopqrstuv1234567890",
                expected: "c6a04e49d32473aa4a425f42ac4236ff2e229b5089d735291e2f57bb229d12a9",
            },
        ])("$url のフォーカス状態のPage IDからハッシュ値を求めることができる", async ({ url, expected }) => {
            const nu = new NotionUrl(url);

            expect(nu).toBeInstanceOf(NotionUrl);
            expect(nu.getFocusedPageHashedId()).resolves.toBe(expected)
        });
    });
});