import peopleReducer, { initialState } from "./"

describe("peopleReducer", () => {
  it("returns initial state when created", () => {
    expect(peopleReducer(undefined, { type: "UNKNOWN" } as never)).toBe(
      initialState,
    )
  })

  it("returns unchanged state when called with UNKNOWN action", () => {
    const state = {
      ids: [],
      byId: {},
    }

    expect(peopleReducer(state, { type: "UNKNOWN" } as never)).toBe(state)
  })

  it("returns updated state when called with DATA_RECEIVED action", () => {
    expect(
      peopleReducer(undefined, {
        type: "DATA_RECEIVED",
        data: {
          people: [
            {
              id: "test-id-1",
              name: "test-name-1",
              age: "test-age-1",
              occupation: "test-occupation-1",
            },
            {
              id: "test-id-2",
              name: "test-name-2",
              age: "test-age-2",
              occupation: "test-occupation-2",
            },
          ],
        },
      }),
    ).toEqual({
      ids: ["test-id-1", "test-id-2"],
      byId: {
        "test-id-1": {
          id: "test-id-1",
          name: "test-name-1",
          age: "test-age-1",
          occupation: "test-occupation-1",
        },
        "test-id-2": {
          id: "test-id-2",
          name: "test-name-2",
          age: "test-age-2",
          occupation: "test-occupation-2",
        },
      },
    })
  })
})
