import catsReducer, { initialState } from "./"

describe("catsReducer", () => {
  it("returns initial state when created", () => {
    expect(catsReducer(undefined, { type: "UNKNOWN" } as never)).toBe(
      initialState,
    )
  })

  it("returns unchanged state when called with UNKNOWN action", () => {
    const state = {
      byOwnerId: {},
    }

    expect(catsReducer(state, { type: "UNKNOWN" } as never)).toBe(state)
  })

  it("returns updated state when called with DATA_RECEIVED action", () => {
    expect(
      catsReducer(undefined, {
        type: "DATA_RECEIVED",
        data: {
          cats: [
            {
              id: "test-id-1",
              name: "test-name-1",
              breed: "test-breed-1",
              photo: "test-photo-1",
              favoriteFood: "test-favoriteFood-1",
              weight: "test-weight-1",
              ownerId: "test-ownerId-1",
            },
            {
              id: "test-id-2",
              name: "test-name-2",
              breed: "test-breed-2",
              photo: "test-photo-2",
              favoriteFood: "test-favoriteFood-2",
              weight: "test-weight-2",
              ownerId: "test-ownerId-2",
            },
          ],
        },
      }),
    ).toEqual({
      byOwnerId: {
        "test-ownerId-1": {
          id: "test-id-1",
          name: "test-name-1",
          breed: "test-breed-1",
          photo: "test-photo-1",
          favoriteFood: "test-favoriteFood-1",
          weight: "test-weight-1",
          ownerId: "test-ownerId-1",
        },
        "test-ownerId-2": {
          id: "test-id-2",
          name: "test-name-2",
          breed: "test-breed-2",
          photo: "test-photo-2",
          favoriteFood: "test-favoriteFood-2",
          weight: "test-weight-2",
          ownerId: "test-ownerId-2",
        },
      },
    })
  })
})
