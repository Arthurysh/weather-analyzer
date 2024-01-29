import {describe, expect, it} from "vitest";
import Header from "@/components/pages/main-page/main-block/header/Header.tsx";
import {render, screen} from "@/utils/test-utils.tsx";

describe("Header test", () => {
    it("header render", () => {
        render(<Header />);
        const headerElement = screen.getByTestId('header');
        expect(headerElement).toBeInTheDocument();
    });
})