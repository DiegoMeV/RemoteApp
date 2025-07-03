export const objectToSend = (comment, stateToSend) => {
  const object = {
    approvedData: {
      approvedData: {
        comment,
      },
    },
    rejectedData: {
      rejectedData: {
        comment,
      },
    },
    askForDocs: {
      askForDocs: {
        comment,
      },
    },
  }
  return object?.[stateToSend]
}
