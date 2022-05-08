import MockResponse from "./fetchResponseMock";

export default function(status){
    global.fetch = jest.fn(() =>
        Promise.resolve({
        ok: status,
        json: () => Promise.resolve(MockResponse),
        })
    );
}
