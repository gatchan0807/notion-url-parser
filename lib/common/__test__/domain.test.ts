import { describe, expect, test } from "vitest";
import { separatePageId, separatePathName } from "../domain";

describe("separatePageId", () => {
    describe("正常系", () => {
        test.each([
            {
                rawPageId: "1234567890abcdefghijklnmopqrstuv",
                expected: "1234567890abcdefghijklnmopqrstuv",
            },
            {
                rawPageId: "alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                expected: "1234567890abcdefghijklnmopqrstuv",
            },
        ])("$rawPageId の場合に Page ID のみになる", ({ rawPageId, expected }) => {
            expect(separatePageId(rawPageId)).toStrictEqual(expected);
        });
    });

    describe("異常系", () => {
        test.each([
            {
                testCaseTitle: "QueryParams などが含まれてしまっている",
                rawPageId: "1234567890abcdefghijklnmopqrstuv?query=abcxyz",
                expected: null,
            },
            {
                testCaseTitle:
                    "QueryParams などが含まれてしまっている（ページタイトル付き）",
                rawPageId:
                    "alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv?query=abcxyz",
                expected: null,
            },
            {
                testCaseTitle: "Notion IDにならない文字列が含まれている",
                rawPageId: "1234567890",
                expected: null,
            },
            {
                testCaseTitle: "空文字である",
                rawPageId: "",
                expected: null,
            },
        ])(
            "$testCaseTitle 場合( $rawPageId )に null になる",
            ({ rawPageId, expected }) => {
                expect(separatePageId(rawPageId)).toStrictEqual(expected);
            }
        );
    });
});

describe("separatePathName", () => {
    describe("正常系", () => {
        test.each([
            {
                rawPath: "/1234567890abcdefghijklnmopqrstuv",
                expected: { rawPageId: "1234567890abcdefghijklnmopqrstuv" },
            },
            {
                rawPath: "/workspace/1234567890abcdefghijklnmopqrstuv",
                expected: {
                    rawPageId: "1234567890abcdefghijklnmopqrstuv",
                    rawWorkspaceId: "workspace",
                },
            },
            {
                rawPath: "/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                expected: {
                    rawPageId: "alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                },
            },
            {
                rawPath:
                    "/workspace/alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                expected: {
                    rawPageId: "alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
                    rawWorkspaceId: "workspace",
                },
            },
        ])(
            "$rawPath の場合に、適切な形の Object が出力される",
            ({ rawPath, expected }) => {
                expect(separatePathName(rawPath)).toStrictEqual(expected);
            }
        );
    });

    describe("異常系", () => {
        test.each([
            {
                testCaseTitle: "空文字",
                rawPath: "",
                expected: { rawPageId: "" },
            },
            {
                testCaseTitle: "スラッシュのみ",
                rawPath: "///",
                expected: { rawPageId: "" },
            },
            {
                testCaseTitle: "3個以上のパス",
                rawPath: "/a/b/c",
                expected: { rawPageId: "a" },
            },
            {
                testCaseTitle: "3個以上のパス",
                rawPath: "a/b/c/",
                expected: { rawPageId: "a" },
            },
            {
                testCaseTitle: "URLそのまま",
                rawPath: "https://notion.so/a/b/c",
                expected: { rawPageId: "https:" },
            },
            {
                testCaseTitle: "パラメーター付きのまま",
                rawPath: "/a?b=c",
                expected: { rawPageId: "a?b=c" },
            },
        ])(
            "値が$testCaseTitle ( $rawPath )の場合に、異常終了せず適切な形の Object が出力される",
            ({ rawPath, expected }) => {
                expect(separatePathName(rawPath)).toStrictEqual(expected);
            }
        );
    });
});
