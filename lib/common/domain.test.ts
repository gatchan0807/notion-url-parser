import { describe, expect, test } from "vitest";
import { separatePageId } from "./domain";

describe("separatePageId", () => {
    test.each([
        {
            rawPageId: "1234567890abcdefghijklnmopqrstuv",
            expected: "1234567890abcdefghijklnmopqrstuv",
        },
        {
            rawPageId: "alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv",
            expected: "1234567890abcdefghijklnmopqrstuv",
        },
    ])(
        "[正常系] $rawPageId の場合に Page ID のみになる",
        ({ rawPageId, expected }) => {
            expect(separatePageId(rawPageId)).toStrictEqual(expected);
        }
    );

    test.each([
        {
            testCaseTitle: "QueryParams などが含まれてしまっている",
            rawPageId: "1234567890abcdefghijklnmopqrstuv?query=abcxyz",
            expected: null,
        },
        {
            testCaseTitle: "QueryParams などが含まれてしまっている（ページタイトル付き）",
            rawPageId: "alphabet-in-page-title-1234567890abcdefghijklnmopqrstuv?query=abcxyz",
            expected: null,
        },
        {
            testCaseTitle: "Notion IDにならない文字列が含まれている",
            rawPageId: "1234567890",
            expected: null,
        },
        {
            testCaseTitle: "空文字",
            rawPageId: "",
            expected: null,
        },
    ])(
        "[異常系] $rawPageId の場合( $testCaseTitle )に null になる",
        ({ rawPageId, expected }) => {
            expect(separatePageId(rawPageId)).toStrictEqual(expected);
        }
    );
});
