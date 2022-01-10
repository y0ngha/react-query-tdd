import React from 'react';
import App from "./App";
import {render} from "@testing-library/react";
import {useFetchPost} from "./services/api/customHooks/useFetchPost";
import {IPost} from "./model/post/IPost";
import {setUseQueryMockImplementation} from "./__test__/MockImplementation";
import {MockPostData} from "./__test__/__fixture__/MockPostData";

jest.mock("./services/api/customHooks/useFetchPost")
const mockUseFetchPost = useFetchPost as jest.MockedFunction<typeof useFetchPost>;

describe("renders app", () => {
    beforeEach(() => {
        mockUseFetchPost.mockImplementation(setUseQueryMockImplementation<IPost, Error>({
            data: undefined,
            error: null,
            isError: false,
            isLoading: false
        }))
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Loading Test", () => {
        mockUseFetchPost.mockImplementation(setUseQueryMockImplementation<IPost, Error>({
            data: undefined,
            error: null,
            isError: false,
            isLoading: true
        }))
        const wrapper = render(<App/>)
        expect(mockUseFetchPost).toBeCalledTimes(1)
        expect(mockUseFetchPost).toBeCalledWith(1)
        expect(wrapper.getByRole("isLoadingSpan").textContent).toContain("로딩중입니다..")
    })

    it("Error Test", () => {
        mockUseFetchPost.mockImplementation(setUseQueryMockImplementation<IPost, Error>({
            data: undefined,
            error: new Error("알 수 없는 오류 발생"),
            isError: true,
            isLoading: false
        }))
        const wrapper = render(<App/>)
        expect(mockUseFetchPost).toBeCalledTimes(1)
        expect(mockUseFetchPost).toBeCalledWith(1)
        expect(wrapper.getByRole("isErrorSpan").textContent).toContain("알 수 없는 오류 발생")
    })

    it("Result Fetch Test", () => {
        mockUseFetchPost.mockImplementation(setUseQueryMockImplementation<IPost, Error>({
            data: MockPostData,
            error: null,
            isError: false,
            isLoading: false
        }))
        const wrapper = render(<App/>)
        expect(mockUseFetchPost).toBeCalledTimes(1)
        expect(mockUseFetchPost).toBeCalledWith(1)
        const data = mockUseFetchPost(1)
        expect(data.data).toEqual(MockPostData)
        expect(wrapper.getByRole("isResultSpan").textContent).toContain("y0ngha react-tdd")
    })
})
